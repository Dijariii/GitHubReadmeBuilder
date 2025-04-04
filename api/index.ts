import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { storage } from "../server/storage";

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.set('etag', 'strong');
app.use(compression());

// Middleware to log API requests
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// API Routes
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

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  console.error(err);
});

export default app;