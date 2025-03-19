import { templates, type Template, type InsertTemplate } from "@shared/schema";

export interface IStorage {
  getTemplates(): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
}

export class MemStorage implements IStorage {
  private templates: Map<number, Template>;
  private currentId: number;

  constructor() {
    this.templates = new Map();
    this.currentId = 1;
    this.initializeDefaultTemplates();
  }

  private initializeDefaultTemplates() {
    const defaultTemplates: InsertTemplate[] = [
      {
        name: "Basic",
        content: "# Hi there 👋\n\nI'm {{name}}\n\n## About Me\n{{bio}}\n\n## Skills\n{{skills}}\n",
        sections: ["About Me", "Skills"]
      },
      {
        name: "Professional",
        content: "# {{name}}\n\n## 👨‍💻 About Me\n{{bio}}\n\n## 🛠 Skills\n{{skills}}\n\n## 🔗 Connect with me\n{{socialLinks}}\n\n## 📂 Projects\n{{projects}}",
        sections: ["About Me", "Skills", "Social Links", "Projects"]
      }
    ];

    defaultTemplates.forEach(template => {
      this.createTemplate(template);
    });
  }

  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const id = this.currentId++;
    const newTemplate = { ...template, id };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }
}

export const storage = new MemStorage();
