import { useQuery } from "@tanstack/react-query";
import { Template } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';

interface TemplatesProps {
  onSelect: (template: Template) => void;
  selectedId?: number;
}

export function Templates({ onSelect, selectedId }: TemplatesProps) {
  const { data: templates, isLoading, error } = useQuery<Template[]>({
    queryKey: ['/api/templates']
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Choose a Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="p-4 space-y-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-4">
        <p>Failed to load templates</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Choose a Template</h2>
      <RadioGroup
        value={selectedId?.toString()}
        onValueChange={(value) => {
          const template = templates?.find(t => t.id === parseInt(value));
          if (template) onSelect(template);
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {templates?.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem
              value={template.id.toString()}
              id={`template-${template.id}`}
              className="sr-only peer"
            />
            <Label
              htmlFor={`template-${template.id}`}
              className="block cursor-pointer"
            >
              <Card className={`p-4 hover:border-[#0366D6] transition-colors peer-checked:border-[#0366D6] peer-checked:border-2`}>
                <div className="space-y-2">
                  <h3 className="font-medium">{template.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    Sections: {template.sections.join(", ")}
                  </div>
                  <ScrollArea className="h-32 w-full rounded border p-2">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{template.content}</ReactMarkdown>
                    </div>
                  </ScrollArea>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
