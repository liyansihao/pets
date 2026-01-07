import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  stripeCheckoutSessionId: text("stripe_checkout_session_id").notNull().unique(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").notNull().default("usd"),
  status: text("status").notNull(), // pending, completed, failed, cancelled
  creditsPurchased: integer("credits_purchased").notNull(), // 200 credits for $10
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const creditUsage = pgTable("credit_usage", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // credits used (e.g., 1 per generation)
  description: text("description").notNull(), // e.g., "Generated pet image"
  relatedPaymentId: text("related_payment_id").references(() => payments.id),
  createdAt: timestamp("created_at").defaultNow(),
});
