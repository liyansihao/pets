import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { user, payments, creditUsage } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user's current credit balance
    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: {
        credits: true,
      },
    });

    // Get payment history
    const paymentHistory = await db.query.payments.findMany({
      where: eq(payments.userId, userId),
      orderBy: [desc(payments.createdAt)],
    });

    // Get credit usage history
    const usageHistory = await db.query.creditUsage.findMany({
      where: eq(creditUsage.userId, userId),
      orderBy: [desc(creditUsage.createdAt)],
    });

    return NextResponse.json({
      credits: userData?.credits || 0,
      paymentHistory,
      usageHistory,
    });
  } catch (error) {
    console.error("Billing API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch billing information" },
      { status: 500 }
    );
  }
}
