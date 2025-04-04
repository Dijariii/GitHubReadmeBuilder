import { UseFormReturn } from "react-hook-form";
import { ReadmeFormData, PROJECT_TYPES } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useState } from "react";
import { Scan, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface ProjectDetectorProps {
  form: UseFormReturn<ReadmeFormData>;
}

export function ProjectDetector({ form }: ProjectDetectorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const detectProjectType = () => {
    setIsLoading(true);
    // In a real implementation, we would allow users to upload package files
    // or connect to their repository to auto-detect project type
    // For now, we'll simulate detection after a delay
    setTimeout(() => {
      // Simulated detection - would be replaced with actual file analysis
      const detectedType = PROJECT_TYPES[0].id; // Pretend we detected Node.js
      form.setValue("detectedProjectType", detectedType);
      
      // Add project-specific skills based on detected type
      if (detectedType === "nodejs") {
        form.setValue("skills", ["JavaScript", "Node.js", "Express", "npm"]);
      } else if (detectedType === "python") {
        form.setValue("skills", ["Python", "Flask", "Django", "pip"]);
      } else if (detectedType === "rust") {
        form.setValue("skills", ["Rust", "Cargo", "WebAssembly"]);
      } else if (detectedType === "java") {
        form.setValue("skills", ["Java", "Spring", "Maven", "JUnit"]);
      } else if (detectedType === "go") {
        form.setValue("skills", ["Go", "Goroutines", "Go Modules"]);
      }
      
      setIsLoading(false);
      toast({
        title: "Project Detected",
        description: `Detected ${PROJECT_TYPES.find(p => p.id === detectedType)?.name} project type`,
      });
    }, 1500);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Scan className="h-5 w-5" />
        <h3 className="font-medium">Project Type Detection</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Let us analyze your project type to automatically fill in relevant technologies and sections.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="detectedProjectType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project Type</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select or detect project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <Button
            type="button"
            className="mt-8"
            variant="outline"
            onClick={detectProjectType}
            disabled={isLoading}
          >
            {isLoading ? "Detecting..." : "Auto-Detect"}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Select your project type or click auto-detect to analyze and fill relevant project information
        </div>
      </div>
    </Card>
  );
}