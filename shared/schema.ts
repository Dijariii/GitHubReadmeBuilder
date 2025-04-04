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

// Supported languages for multilingual support
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "ar", name: "Arabic" },
] as const;

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

// Add social media platforms list
export const SOCIAL_PLATFORMS = [
  { name: "GitHub", url: "https://github.com/" },
  { name: "LinkedIn", url: "https://linkedin.com/in/" },
  { name: "Facebook", url: "https://facebook.com/" },
  { name: "Instagram", url: "https://instagram.com/" },
  { name: "YouTube", url: "https://youtube.com/" },
  { name: "Medium", url: "https://medium.com/@" },
  { name: "Dev.to", url: "https://dev.to/" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/" },
  { name: "CodePen", url: "https://codepen.io/" },
] as const;

// Project types for auto-detection
export const PROJECT_TYPES = [
  { id: "nodejs", name: "Node.js", packageFile: "package.json" },
  { id: "python", name: "Python", packageFile: "requirements.txt" },
  { id: "rust", name: "Rust", packageFile: "Cargo.toml" },
  { id: "java", name: "Java", packageFile: "pom.xml" },
  { id: "dotnet", name: "C#/.NET", packageFile: ".csproj" },
  { id: "go", name: "Go", packageFile: "go.mod" },
  { id: "ruby", name: "Ruby", packageFile: "Gemfile" },
  { id: "php", name: "PHP", packageFile: "composer.json" },
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
    platform: z.enum([...SOCIAL_PLATFORMS.map(p => p.name)] as [string, ...string[]]),
    username: z.string().min(1, "Username is required")
  })),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url("Must be a valid URL"),
    technologies: z.array(z.string())
  })),
  customSections: z.array(z.object({
    title: z.string().min(1, "Section title is required"),
    content: z.string().min(1, "Section content is required")
  })).default([]),
  selectedTemplate: z.string().optional(),
  language: z.enum([...SUPPORTED_LANGUAGES.map(lang => lang.code)] as [string, ...string[]]).default("en"),
  detectedProjectType: z.string().optional(),
  showGitHubStats: z.boolean().default(true),
  showTrophies: z.boolean().default(true),
  showLanguageStats: z.boolean().default(true),
  showStreak: z.boolean().default(true),
  customizeTrophy: z.object({
    theme: z.enum(["flat", "onedark", "gruvbox", "dracula", "monokai"]).default("flat"),
    row: z.number().min(1).max(6).default(2),
    column: z.number().min(1).max(6).default(3)
  }).default({}),
  analytics: z.object({
    showContributionGraph: z.boolean().default(true),
    showActivityGraph: z.boolean().default(true),
    showCommitStats: z.boolean().default(true),
    timeRange: z.enum(["last_7_days", "last_30_days", "last_year"]).default("last_30_days"),
    graphStyle: z.enum(["normal", "dracula", "github", "tokyo-night"]).default("github"),
    includePrivateRepos: z.boolean().default(false),
  }).default({}),
  githubApiToken: z.string().optional(),
});

export type ReadmeFormData = z.infer<typeof readmeFormSchema>;

// Analytics graph themes
export const GRAPH_THEMES = [
  { name: "normal", label: "Default" },
  { name: "dracula", label: "Dracula" },
  { name: "github", label: "GitHub" },
  { name: "tokyo-night", label: "Tokyo Night" },
] as const;

export const TIME_RANGES = [
  { value: "last_7_days", label: "Last 7 Days" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_year", label: "Last Year" },
] as const;

// Template profiles
export const PROFILE_TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    description: "A clean and simple profile with essential information",
    showStats: false,
    showGitHubStats: false,
    showTrophies: false,
    showLanguageStats: false,
    showStreak: false,
    showAnalytics: false,
  },
  {
    id: "developer",
    name: "Developer",
    description: "A coding-focused profile highlighting technical skills and repositories",
    showStats: true,
    showGitHubStats: true,
    showTrophies: true,
    showLanguageStats: true,
    showStreak: true,
    showAnalytics: true,
  },
  {
    id: "visual",
    name: "Visual",
    description: "A graphic-rich profile with stats and visuals to showcase your work",
    showStats: true,
    showGitHubStats: true,
    showTrophies: true,
    showLanguageStats: true,
    showStreak: true,
    showAnalytics: true,
  },
  {
    id: "professional",
    name: "Professional",
    description: "A business-oriented profile highlighting experience and achievements",
    showStats: true,
    showGitHubStats: true,
    showTrophies: false,
    showLanguageStats: true,
    showStreak: false,
    showAnalytics: false,
  },
] as const;