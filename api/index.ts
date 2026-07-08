import express, { type Request, type Response } from "express";
import multer from "multer";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, varchar, integer, real, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { eq, and, ilike, desc } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import { put } from "@vercel/blob";

const owners = pgTable("owners", {
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

const insertOwnerSchema = createInsertSchema(owners).pick({
  name: true,
  email: true,
  phoneNumber: true,
  city: true,
});

const items = pgTable("items", {
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

const insertItemSchema = createInsertSchema(items).pick({
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

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in Vercel Environment Variables.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(pool);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4.4 * 1024 * 1024 },
});

app.post("/api/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ningún archivo." });
    }

    const blob = await put(req.file.originalname, req.file.buffer, {
      access: "public",
      contentType: req.file.mimetype,
      addRandomSuffix: true,
    });

    res.json(blob);
  } catch (err: any) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "La imagen es demasiado grande (máx. 4 MB). Prueba con una foto de menor resolución." });
    }
    res.status(500).json({ message: err.message || "Error al subir la imagen" });
  }
});

app.get("/api/items", async (req: Request, res: Response) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const city = typeof req.query.city === "string" ? req.query.city : "";
    const category = typeof req.query.category === "string" ? req.query.category : "";

    const conditions = [eq(items.isActive, true), eq(items.available, true)];
    if (q.trim()) conditions.push(ilike(items.titleEs, `%${q.trim()}%`) as any);
    if (city.trim()) conditions.push(ilike(items.city, `%${city.trim()}%`) as any);
    if (category.trim()) conditions.push(eq(items.category, category.trim()));

    const results = await db
      .select()
      .from(items)
      .where(and(...conditions))
      .orderBy(desc(items.isPromoted), desc(items.createdAt));

    res.json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error fetching items" });
  }
});

app.get("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid item id" });
    const [item] = await db.select().from(items).where(eq(items.id, id));
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error fetching item" });
  }
});

app.get("/api/owners/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid owner id" });
    const [owner] = await db.select().from(owners).where(eq(owners.id, id));
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.json(owner);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error fetching owner" });
  }
});

app.get("/api/owners/:id/items", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid owner id" });
    const results = await db.select().from(items).where(eq(items.ownerId, id)).orderBy(desc(items.createdAt));
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error fetching owner items" });
  }
});

app.patch("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid item id" });

    const updateSchema = insertItemSchema.omit({ ownerId: true }).partial();
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    }

    const [updated] = await db
      .update(items)
      .set(parsed.data)
      .where(eq(items.id, id))
      .returning();

    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating item" });
  }
});

const createListingSchema = z.object({
  owner: insertOwnerSchema,
  item: insertItemSchema.omit({ ownerId: true }),
});

app.post("/api/items", async (req: Request, res: Response) => {
  try {
    const parsed = createListingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    }

    const [existingOwner] = await db.select().from(owners).where(eq(owners.email, parsed.data.owner.email));
    const owner = existingOwner ?? (await db.insert(owners).values(parsed.data.owner).returning())[0];

    const [item] = await db.insert(items).values({ ...parsed.data.item, ownerId: owner.id }).returning();

    res.status(201).json({ owner, item });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error creating listing" });
  }
});

app.use((err: any, _req: Request, res: Response, _next: any) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

export default app;