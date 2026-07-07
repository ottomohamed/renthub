import { eq, and, ilike, or, desc } from "drizzle-orm";
import { db } from "./db";
import { items, owners, type InsertItem, type InsertOwner } from "@shared/schema";

export async function searchItemsDb(query: string = "", city: string = "", category: string = "") {
  const conditions = [eq(items.isActive, true), eq(items.available, true)];

  if (query.trim()) {
    conditions.push(ilike(items.titleEs, `%${query.trim()}%`) as any);
  }
  if (city.trim()) {
    conditions.push(ilike(items.city, `%${city.trim()}%`) as any);
  }
  if (category.trim()) {
    conditions.push(eq(items.category, category.trim()));
  }

  return db
    .select()
    .from(items)
    .where(and(...conditions))
    .orderBy(desc(items.isPromoted), desc(items.createdAt));
}

export async function getItemByIdDb(id: number) {
  const [item] = await db.select().from(items).where(eq(items.id, id));
  return item ?? null;
}

export async function getOwnerByIdDb(id: number) {
  const [owner] = await db.select().from(owners).where(eq(owners.id, id));
  return owner ?? null;
}

export async function findOrCreateOwner(data: InsertOwner) {
  const [existing] = await db.select().from(owners).where(eq(owners.email, data.email));
  if (existing) return existing;

  const [created] = await db.insert(owners).values(data).returning();
  return created;
}

export async function createItemDb(data: InsertItem) {
  const [created] = await db.insert(items).values(data).returning();
  return created;
}

export async function listOwnerItemsDb(ownerId: number) {
  return db
    .select()
    .from(items)
    .where(eq(items.ownerId, ownerId))
    .orderBy(desc(items.createdAt));
}