import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  app.get("/api/templates", async (_req, res) => {
    const templates = await storage.getTemplates();
    res.json(templates);
  });

  app.get("/api/templates/:id", async (req, res) => {
    const template = await storage.getTemplate(Number(req.params.id));
    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    res.json(template);
  });

  const httpServer = createServer(app);
  return httpServer;
}
