import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ReadmeFormData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2, GripVertical } from "lucide-react";

interface CustomSectionsProps {
  form: UseFormReturn<ReadmeFormData>;
}

export function CustomSections({ form }: CustomSectionsProps) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "customSections"
  });

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Custom Sections</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: "", content: "" })}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center p-4 border border-dashed rounded-md text-muted-foreground">
          Add custom sections to your README
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
              <div className="absolute right-2 top-2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  <span className="sr-only">Move up</span>
                  <GripVertical className="h-4 w-4 rotate-90" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === fields.length - 1}
                >
                  <span className="sr-only">Move down</span>
                  <GripVertical className="h-4 w-4 -rotate-90" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={() => remove(index)}
                >
                  <span className="sr-only">Remove</span>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`customSections.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Achievements, Education, Hobbies" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`customSections.${index}.content`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Markdown content for this section"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}