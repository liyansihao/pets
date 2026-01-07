import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import { user, payments } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
  });
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const creditsPurchased = parseInt(session.metadata?.credits || "0");

      if (!userId || creditsPurchased === 0) {
        console.error("Invalid session metadata:", session.metadata);
        return NextResponse.json({ error: "Invalid metadata" }, { status: 400 });
      }

      // Get payment details
      const paymentIntentId = session.payment_intent as string;
      const amount = session.amount_total || 0;
      const currency = session.currency || "usd";

      // Create payment record
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await db.insert(payments).values({
        id: paymentId,
        userId,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: paymentIntentId,
        amount,
        currency,
        status: "completed",
        creditsPurchased,
      });

      // Update user's credit balance and stripeCustomerId
      await db
        .update(user)
        .set({
          credits: sql`${user.credits} + ${creditsPurchased}`,
          stripeCustomerId: session.customer as string,
        })
        .where(eq(user.id, userId));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
