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
        sections: ["About Me", "Languages and Tools", "Skills", "Social Links", "Projects", "GitHub Stats"]
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
        sections: ["Tech Stack", "Links", "Projects", "GitHub Stats"]
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

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const id = this.currentId++;
    const newTemplate: Template = {
      id,
      name: template.name,
      content: template.content,
      sections: template.sections,
    };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }
}

export const storage = new MemStorage();