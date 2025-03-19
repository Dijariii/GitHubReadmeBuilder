import { ReadmeForm } from "@/components/editor/readme-form";
import { Preview } from "@/components/editor/preview";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ReadmeFormData } from "@shared/schema";
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
            Generate a professional README for your GitHub profile in minutes
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
      </div>
    </main>
  );
}

function generateMarkdown(data: ReadmeFormData): string {
  const skillsList = data.skills.map(skill => `- ${skill}`).join('\n');
  const socialList = data.socialLinks
    .map(link => `- [${link.platform}](${link.url})`)
    .join('\n');
  const projectsList = data.projects
    .map(project => `### ${project.name}\n${project.description}\n[View Project](${project.url})`)
    .join('\n\n');

  return `# Hi there! I'm ${data.name} 👋

## About Me
${data.bio}

## Skills
${skillsList}

## Connect with me
${socialList}

## Projects
${projectsList}
`;
}