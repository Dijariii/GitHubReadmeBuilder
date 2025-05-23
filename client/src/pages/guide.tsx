import { Card, CardContent } from "@/components/ui/card";
import { SiGithub, SiVercel } from "react-icons/si";

export default function Guide() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6">How to Create a GitHub Profile README</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">What is a Profile README?</h2>
              <p className="text-muted-foreground mb-4">
                A GitHub profile README is a special repository that appears on your GitHub profile. 
                It's a great way to showcase your work, skills, and personality to other developers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Steps to Create</h2>
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li>Create a new repository with the same name as your GitHub username</li>
                <li>Make sure the repository is public</li>
                <li>Initialize it with a README.md file</li>
                <li>Use our generator to create your README content</li>
                <li>Copy the generated markdown and paste it into your README.md</li>
                <li>Commit and push your changes</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Keep it concise and well-organized</li>
                <li>Include a brief introduction about yourself</li>
                <li>List your key skills and technologies</li>
                <li>Showcase your best projects</li>
                <li>Add ways to connect with you</li>
                <li>Use emojis and formatting to make it visually appealing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Deploying Your Own Instance</h2>
              <p className="text-muted-foreground mb-4">
                Want to deploy your own version of this README generator? Follow these steps to deploy to Vercel:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground mb-4">
                <li>Fork the repository or clone it to your GitHub account</li>
                <li>Sign up for a <a href="https://vercel.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Vercel</a> account if you don't have one</li>
                <li>Connect your GitHub account to Vercel</li>
                <li>Create a new project in Vercel and select your repository</li>
                <li>Keep the default settings (Framework: Other, Build Command: npm run build, Output Directory: dist)</li>
                <li>Click "Deploy" and wait for the build to complete</li>
              </ol>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SiVercel className="h-4 w-4" />
                The application is ready for deployment on Vercel without any additional configuration
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Ready to Create?</h2>
              <p className="text-muted-foreground mb-4">
                Use our generator to create your perfect README. We provide templates
                and live preview to make the process easier.
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
              >
                <SiGithub className="h-5 w-5" />
                Go to Generator
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
