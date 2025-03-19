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
    // Generate markdown from form data
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
    <div className="min-h-screen bg-[#F6F8FA]">
      <header className="bg-[#24292E] text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">GitHub README Generator</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <ReadmeForm onSubmit={handleFormSubmit} />
          </Card>

          <Card className="p-4">
            <Preview markdown={markdown} onCopy={handleCopy} />
          </Card>
        </div>
      </main>
    </div>
  );
}

function generateMarkdown(data: ReadmeFormData): string {
  const skillsList = data.skills.map(skill => `- ${skill}`).join('\n');
  const socialList = data.socialLinks.map(link => 
    `- [${link.platform}](${link.url})`
  ).join('\n');
  const projectsList = data.projects.map(project =>
    `### ${project.name}\n${project.description}\n[View Project](${project.url})`
  ).join('\n\n');

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
