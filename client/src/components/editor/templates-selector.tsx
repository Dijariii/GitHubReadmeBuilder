import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PROFILE_TEMPLATES } from "@shared/schema";
import { UseFormReturn } from "react-hook-form";
import { ReadmeFormData } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface TemplateSelectorProps {
  form: UseFormReturn<ReadmeFormData>;
}

export function TemplateSelector({ form }: TemplateSelectorProps) {
  const applyTemplate = (templateId: string) => {
    const template = PROFILE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    form.setValue("selectedTemplate", templateId);
    form.setValue("showGitHubStats", template.showGitHubStats);
    form.setValue("showTrophies", template.showTrophies);
    form.setValue("showLanguageStats", template.showLanguageStats);
    form.setValue("showStreak", template.showStreak);
    
    // Update analytics settings
    if (template.showAnalytics) {
      form.setValue("analytics.showContributionGraph", true);
      form.setValue("analytics.showActivityGraph", true);
      form.setValue("analytics.showCommitStats", true);
    } else {
      form.setValue("analytics.showContributionGraph", false);
      form.setValue("analytics.showActivityGraph", false);
      form.setValue("analytics.showCommitStats", false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choose a Profile Template</h3>
      <p className="text-sm text-muted-foreground">
        Select a template to quickly set up your profile README
      </p>

      <RadioGroup
        value={form.watch("selectedTemplate")}
        onValueChange={(value) => applyTemplate(value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {PROFILE_TEMPLATES.map((template) => (
          <div key={template.id} className="flex items-start space-x-2">
            <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
            <Label htmlFor={template.id} className="flex-1 cursor-pointer">
              <Card className={`p-4 hover:border-primary/50 transition-colors ${form.watch("selectedTemplate") === template.id ? "border-primary" : ""}`}>
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-base">{template.name}</div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.showGitHubStats && (
                      <Badge variant="outline" className="text-xs bg-primary/10">Stats</Badge>
                    )}
                    {template.showTrophies && (
                      <Badge variant="outline" className="text-xs bg-primary/10">Trophies</Badge>
                    )}
                    {template.showLanguageStats && (
                      <Badge variant="outline" className="text-xs bg-primary/10">Languages</Badge>
                    )}
                    {template.showAnalytics && (
                      <Badge variant="outline" className="text-xs bg-primary/10">Analytics</Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}