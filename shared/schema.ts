import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  sections: jsonb("sections").notNull().$type<string[]>(),
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  name: true,
  content: true,
  sections: true,
});

export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

export const readmeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(1, "Bio is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url("Must be a valid URL")
  })),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url("Must be a valid URL")
  }))
});

export type ReadmeFormData = z.infer<typeof readmeFormSchema>;
