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
  githubUsername: z.string().min(1, "GitHub username is required"),
  bio: z.string().min(1, "Bio is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  programmingLanguages: z.array(z.object({
    name: z.string(),
    proficiency: z.enum(["Beginner", "Intermediate", "Advanced"])
  })).min(1, "At least one programming language is required"),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url("Must be a valid URL")
  })),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url("Must be a valid URL"),
    technologies: z.array(z.string())
  })),
  showGitHubStats: z.boolean().default(true),
  showTrophies: z.boolean().default(true),
  showLanguageStats: z.boolean().default(true),
  showStreak: z.boolean().default(true),
  customizeTrophy: z.object({
    theme: z.enum(["flat", "onedark", "gruvbox", "dracula", "monokai"]).default("flat"),
    row: z.number().min(1).max(6).default(2),
    column: z.number().min(1).max(6).default(3)
  }).default({})
});

export type ReadmeFormData = z.infer<typeof readmeFormSchema>;