import { templates, type Template, type InsertTemplate, type TemplateSearchParams } from "@shared/schema";
import { nanoid } from 'nanoid';

export interface IStorage {
  getTemplates(): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  getTemplateByShareableId(shareableId: string): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: number): Promise<boolean>;
  searchTemplates(params: TemplateSearchParams): Promise<{ templates: Template[], total: number }>;
  likeTemplate(id: number): Promise<Template | undefined>;
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
        name: "Professional",
        content: `# Hi there! I'm {{name}} 👋

<div align="center">
  {{#if showTrophies}}
  <img src="https://github-profile-trophy.vercel.app/?username={{githubUsername}}&theme={{customizeTrophy.theme}}&row={{customizeTrophy.row}}&column={{customizeTrophy.column}}" alt="Trophies" />
  {{/if}}

  {{#if showGitHubStats}}
  <img src="https://github-readme-stats.vercel.app/api?username={{githubUsername}}&show_icons=true&theme=dark" alt="GitHub Stats" />
  {{/if}}

  {{#if showStreak}}
  <img src="https://github-readme-streak-stats.herokuapp.com/?user={{githubUsername}}&theme=dark" alt="GitHub Streak" />
  {{/if}}

  {{#if showLanguageStats}}
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username={{githubUsername}}&layout=compact&theme=dark" alt="Top Languages" />
  {{/if}}
</div>

## About Me
{{bio}}

## 💻 Languages and Tools
{{#each programmingLanguages}}
- {{name}} ({{proficiency}})
{{/each}}

## 🛠 Skills
{{skills}}

## 🤝 Connect with me
{{socialLinks}}

## 📂 Projects
{{projects}}

---
<div align="center">
Made with ❤️ by Dijari in 🇽🇰<br>
For support: dejxhar@gmail.com
</div>`,
        sections: ["About Me", "Languages and Tools", "Skills", "Social Links", "Projects", "GitHub Stats"],
        userId: null,
        isPublic: true,
        tags: ["professional", "developer"]
      },
      {
        name: "Minimalist",
        content: `<h1 align="center">👋 Hi, I'm {{name}}</h1>

{{bio}}

{{#if showGitHubStats}}
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username={{githubUsername}}&show_icons=true&theme=dark" alt="GitHub Stats" />
</p>
{{/if}}

### 💻 Tech Stack
{{#each programmingLanguages}}
- {{name}} ({{proficiency}})
{{/each}}

### 🔗 Links
{{socialLinks}}

### 🚀 Projects
{{projects}}

---
<div align="center">
Made with ❤️ by Dijari in 🇽🇰<br>
For support: dejxhar@gmail.com
</div>`,
        sections: ["Tech Stack", "Links", "Projects", "GitHub Stats"],
        userId: null,
        isPublic: true,
        tags: ["minimal", "clean"]
      }
    ];

    for (const template of defaultTemplates) {
      void this.createTemplate(template);
    }
  }

  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getTemplateByShareableId(shareableId: string): Promise<Template | undefined> {
    // Convert iterator to array first to fix TypeScript error
    const templatesArray = Array.from(this.templates.values());
    
    return templatesArray.find(template => template.shareableId === shareableId);
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const id = this.currentId++;
    
    // Convert sections to proper string array to fix type issue
    const sections: string[] = Array.isArray(template.sections) 
      ? [...template.sections].map(item => String(item))
      : [];
      
    // Convert tags to proper string array to fix type issue
    const tags: string[] = Array.isArray(template.tags) 
      ? [...template.tags].map(item => String(item))
      : [];
    
    const newTemplate: Template = {
      id,
      name: template.name,
      content: template.content,
      sections: sections,
      userId: template.userId || null,
      isPublic: template.isPublic || false,
      tags: tags,
      likes: 0,
      shareableId: nanoid(10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }

  async updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;
    
    // Handle sections in updates specially to ensure proper typing
    let updatedSections = template.sections;
    if (updates.sections) {
      updatedSections = Array.isArray(updates.sections) 
        ? [...updates.sections].map(String) 
        : template.sections;
    }
    
    // Handle tags in updates specially to ensure proper typing
    let updatedTags = template.tags;
    if (updates.tags) {
      updatedTags = Array.isArray(updates.tags) 
        ? [...updates.tags].map(String) 
        : template.tags;
    }
    
    // Create a properly typed updated template
    const updatedTemplate: Template = {
      ...template,
      name: updates.name || template.name,
      content: updates.content || template.content,
      sections: updatedSections,
      userId: updates.userId !== undefined ? updates.userId : template.userId,
      isPublic: updates.isPublic !== undefined ? updates.isPublic : template.isPublic,
      tags: updatedTags,
      updatedAt: new Date()
    };
    
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<boolean> {
    return this.templates.delete(id);
  }

  async searchTemplates(params: TemplateSearchParams): Promise<{ templates: Template[], total: number }> {
    let filteredTemplates = Array.from(this.templates.values());
    
    // Filter by public templates
    if (params.publicOnly) {
      filteredTemplates = filteredTemplates.filter(t => t.isPublic);
    }
    
    // Filter by user ID
    if (params.userId) {
      filteredTemplates = filteredTemplates.filter(t => t.userId === params.userId);
    }
    
    // Filter by search query
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredTemplates = filteredTemplates.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.content.toLowerCase().includes(query)
      );
    }
    
    // Filter by tags
    if (params.tags && params.tags.length > 0 && Array.isArray(params.tags)) {
      filteredTemplates = filteredTemplates.filter(t => {
        // Only process if t.tags is not null and is an array
        if (t.tags && Array.isArray(t.tags)) {
          return params.tags!.some(tag => t.tags!.includes(tag));
        }
        return false;
      });
    }
    
    const total = filteredTemplates.length;
    
    // Apply pagination
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    filteredTemplates = filteredTemplates.slice(start, end);
    
    return { templates: filteredTemplates, total };
  }

  async likeTemplate(id: number): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;
    
    // Safely handle likes count with null check
    const currentLikes = template.likes || 0;
    
    const updatedTemplate: Template = {
      ...template,
      likes: currentLikes + 1
    };
    
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }
}

export const storage = new MemStorage();