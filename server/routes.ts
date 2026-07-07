import type { Express, Request, Response } from "express";
import { z } from "zod";
import {
  searchItemsDb,
  getItemByIdDb,
  getOwnerByIdDb,
  findOrCreateOwner,
  createItemDb,
  listOwnerItemsDb,
} from "./items-storage";
import { insertOwnerSchema, insertItemSchema } from "@shared/schema";

export function registerRoutes(app: Express): void {
  app.get("/api/items", async (req: Request, res: Response) => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q : "";
      const city = typeof req.query.city === "string" ? req.query.city : "";
      const category = typeof req.query.category === "string" ? req.query.category : "";
      const results = await searchItemsDb(q, city, category);
      res.json(results);
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Error fetching items" });
    }
  });

  app.get("/api/items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid item id" });
      const item = await getItemByIdDb(id);
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
      const owner = await getOwnerByIdDb(id);
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
      const results = await listOwnerItemsDb(id);
      res.json(results);
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Error fetching owner items" });
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

      const owner = await findOrCreateOwner(parsed.data.owner);
      const item = await createItemDb({ ...parsed.data.item, ownerId: owner.id });

      res.status(201).json({ owner, item });
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Error creating listing" });
    }
  });
}