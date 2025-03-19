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

// Predefined list of programming languages
export const PROGRAMMING_LANGUAGES = [
  { name: "TypeScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "Python", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "Java", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
  { name: "C++", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
  { name: "Ruby", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg" },
  { name: "Go", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" },
  { name: "Rust", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg" },
  { name: "PHP", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" },
  { name: "Swift", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg" },
  { name: "Kotlin", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg" },
  { name: "React", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Vue", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" },
  { name: "Angular", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg" },
  { name: "Node.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
] as const;

export const readmeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  githubUsername: z.string().min(1, "GitHub username is required"),
  bio: z.string().min(1, "Bio is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  programmingLanguages: z.array(z.object({
    name: z.enum([...PROGRAMMING_LANGUAGES.map(lang => lang.name)] as [string, ...string[]]),
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