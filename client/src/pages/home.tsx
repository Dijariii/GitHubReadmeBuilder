import { ReadmeForm } from "@/components/editor/readme-form";
import { Preview } from "@/components/editor/preview";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ReadmeFormData, PROGRAMMING_LANGUAGES, SOCIAL_PLATFORMS } from "@shared/schema";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [markdown, setMarkdown] = useState("");
  const { toast } = useToast();

  const handleFormSubmit = (data: ReadmeFormData) => {
    const md = generateMarkdown(data);
    setMarkdown(md);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: "Copied!",
        description: "README content copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="container mx-auto p-4 py-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Create Your GitHub Profile README</h1>
          <p className="text-muted-foreground text-lg">
            Generate an awesome README for your GitHub profile in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card">
            <ReadmeForm onSubmit={handleFormSubmit} />
          </Card>

          <Card className="p-6 bg-card">
            <Preview markdown={markdown} onCopy={handleCopy} />
          </Card>
        </div>

        <footer className="mt-8 text-center text-muted-foreground">
          <p>Made with ❤️ by Dijari in 🇽🇰</p>
          <p>For support: <a href="mailto:dejxhar@gmail.com" className="text-primary hover:underline">dejxhar@gmail.com</a></p>
        </footer>
      </div>
    </main>
  );
}

function generateMarkdown(data: ReadmeFormData): string {
  const languagesList = data.programmingLanguages
    .map(lang => {
      const langData = PROGRAMMING_LANGUAGES.find(l => l.name === lang.name);
      return `<img src="${langData?.logo}" alt="${lang.name}" width="40" height="40" /> ${lang.name} (${lang.proficiency})`;
    })
    .join('\n');

  const skillsList = data.skills
    .map(skill => `- ${skill}`)
    .join('\n');

  const socialList = data.socialLinks
    .map(link => {
      const platform = SOCIAL_PLATFORMS.find(p => p.name === link.platform);
      const url = platform ? `${platform.url}${link.username}` : '';
      return `- [${link.platform}](${url})`;
    })
    .join('\n');

  const projectsList = data.projects
    .map(project => `### ${project.name}\n${project.description}\n[View Project](${project.url})`)
    .join('\n\n');

  const statsSection = data.showGitHubStats ? `
<div align="center">
  ${data.showTrophies ? `
  <img src="https://github-profile-trophy.vercel.app/?username=${data.githubUsername}&theme=${data.customizeTrophy.theme}&row=${data.customizeTrophy.row}&column=${data.customizeTrophy.column}" alt="Trophies" />
  ` : ''}

  <img src="https://github-readme-stats.vercel.app/api?username=${data.githubUsername}&show_icons=true&theme=dark" alt="GitHub Stats" />

  ${data.showStreak ? `
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.githubUsername}&theme=dark" alt="GitHub Streak" />
  ` : ''}

  ${data.showLanguageStats ? `
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.githubUsername}&layout=compact&theme=dark" alt="Top Languages" />
  ` : ''}
</div>` : '';

  const analyticsSection = `
<div align="center">
  ${data.analytics.showContributionGraph ? `
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.githubUsername}&theme=${data.analytics.graphStyle}" alt="Contribution Graph" />
  ` : ''}

  ${data.analytics.showActivityGraph ? `
  <img src="https://activity-graph.herokuapp.com/graph?username=${data.githubUsername}&theme=${data.analytics.graphStyle}&hide_border=true" alt="Activity Graph" />
  ` : ''}

  ${data.analytics.showCommitStats ? `
  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${data.githubUsername}&layout=compact&theme=dark" alt="Coding Stats" />
  ` : ''}
</div>`;

  return `# Hi there! I'm ${data.name} 👋

${statsSection}

${analyticsSection}

## About Me
${data.bio}

## 💻 Languages and Tools
${languagesList}

## 🛠 Skills
${skillsList}

## 🤝 Connect with me
${socialList}

## 📂 Projects
${projectsList}

---
<div align="center">
Made with ❤️ by Dijari in 🇽🇰<br>
For support: dejxhar@gmail.com
</div>`;
}