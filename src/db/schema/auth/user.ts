import { boolean, pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: text("role").default("member").notNull(),
  gender: boolean("gender").notNull(),
  credits: integer("credits").notNull().default(0), // User's credit balance
  stripeCustomerId: text("stripe_customer_id").unique(), // Stripe customer ID
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
}).enableRLS();

export type UserType = typeof user.$inferSelect;
