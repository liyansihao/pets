-- Stripe Integration SQL Setup Script
-- Run these SQL commands in your Supabase SQL Editor or PostgreSQL client

-- Add new columns to user table
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "credits" integer DEFAULT 0 NOT NULL;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "stripe_customer_id" text UNIQUE;

-- Create payments table
CREATE TABLE IF NOT EXISTS "payments" (
  "id" text PRIMARY KEY,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "stripe_checkout_session_id" text NOT NULL UNIQUE,
  "stripe_payment_intent_id" text,
  "amount" integer NOT NULL,
  "currency" text NOT NULL DEFAULT 'usd',
  "status" text NOT NULL,
  "credits_purchased" integer NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

-- Create index on payments table for faster queries
CREATE INDEX IF NOT EXISTS "payments_user_id_idx" ON "payments"("user_id");

-- Create credit_usage table
CREATE TABLE IF NOT EXISTS "credit_usage" (
  "id" text PRIMARY KEY,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "amount" integer NOT NULL,
  "description" text NOT NULL,
  "related_payment_id" text REFERENCES "payments"("id"),
  "created_at" timestamp DEFAULT now()
);

-- Create index on credit_usage table for faster queries
CREATE INDEX IF NOT EXISTS "credit_usage_user_id_idx" ON "credit_usage"("user_id");
