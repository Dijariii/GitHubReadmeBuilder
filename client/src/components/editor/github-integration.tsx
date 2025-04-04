import { UseFormReturn } from "react-hook-form";
import { ReadmeFormData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Github, RefreshCw, Check, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface GitHubIntegrationProps {
  form: UseFormReturn<ReadmeFormData>;
}

export function GitHubIntegration({ form }: GitHubIntegrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const fetchGitHubData = async () => {
    const username = form.getValues("githubUsername");
    const token = form.getValues("githubApiToken");
    
    if (!username) {
      toast({
        title: "Error",
        description: "Please enter your GitHub username first",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // GitHub API request headers
      const headers: HeadersInit = {
        "Accept": "application/vnd.github.v3+json",
      };
      
      // Add token if available for higher rate limits and private repos
      if (token) {
        headers.Authorization = `token ${token}`;
      }
      
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
      
      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      
      const userData = await userResponse.json();
      
      // Fetch repos
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, { headers });
      
      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }
      
      const reposData = await reposResponse.json();
      
      // Populate form with fetched data
      form.setValue("name", userData.name || username);
      form.setValue("bio", userData.bio || form.getValues("bio"));
      
      // Set up projects from repos
      const projects = reposData
        .filter((repo: any) => !repo.fork)
        .slice(0, 3)
        .map((repo: any) => ({
          name: repo.name,
          description: repo.description || "",
          url: repo.html_url,
          technologies: []
        }));
      
      if (projects.length > 0) {
        form.setValue("projects", projects);
      }
      
      setIsVerified(true);
      toast({
        title: "Success",
        description: "GitHub data fetched successfully!",
      });
    } catch (error) {
      console.error("GitHub API error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch GitHub data",
        variant: "destructive",
      });
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Github className="h-5 w-5" />
        <h3 className="font-medium">GitHub Integration</h3>
      </div>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="githubApiToken"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>GitHub API Token</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Optional: Provide a GitHub personal access token to fetch private repo data 
                        and increase rate limits. Token never leaves your browser.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="GitHub personal access token (optional)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={fetchGitHubData}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Fetching...
              </>
            ) : isVerified ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Refresh Data
              </>
            ) : (
              <>
                <Github className="h-4 w-4 mr-2" />
                Fetch GitHub Data
              </>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {isVerified ? 
            "✓ GitHub data loaded successfully. Your profile and projects have been populated." : 
            "Connect to GitHub to automatically import your profile information, repositories, and statistics."}
        </div>
      </div>
    </Card>
  );
}