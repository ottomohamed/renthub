import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ==============================================================================
// RentHub - Owners & Items (real listings)
// ==============================================================================

export const owners = pgTable("owners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull(),
  city: text("city").notNull(),
  ratingAvg: real("rating_avg").notNull().default(0),
  totalRatings: integer("total_ratings").notNull().default(0),
  verified: boolean("verified").notNull().default(false),
  memberSince: timestamp("member_since").notNull().defaultNow(),
  plan: text("plan").notNull().default("FREE"),
});

export const insertOwnerSchema = createInsertSchema(owners).pick({
  name: true,
  email: true,
  phoneNumber: true,
  city: true,
});

export type InsertOwner = z.infer<typeof insertOwnerSchema>;
export type Owner = typeof owners.$inferSelect;

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").notNull().references(() => owners.id),
  titleEs: text("title_es").notNull(),
  description: text("description").notNull().default(""),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  category: text("category").notNull(),
  pricePerDay: real("price_per_day").notNull(),
  currency: text("currency").notNull().default(""),
  city: text("city").notNull(),
  country: text("country").notNull().default("España"),
  available: boolean("available").notNull().default(true),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  rating: real("rating").notNull().default(0),
  totalReviews: integer("total_reviews").notNull().default(0),
  isPromoted: boolean("is_promoted").notNull().default(false),
  specifications: jsonb("specifications").$type<Record<string, string>>().notNull().default({}),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertItemSchema = createInsertSchema(items).pick({
  ownerId: true,
  titleEs: true,
  description: true,
  features: true,
  category: true,
  pricePerDay: true,
  currency: true,
  city: true,
  country: true,
  images: true,
  specifications: true,
});

export type InsertItem = z.infer<typeof insertItemSchema>;
export type ItemRecord = typeof items.$inferSelect;