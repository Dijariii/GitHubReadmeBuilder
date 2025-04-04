import { SUPPORTED_LANGUAGES } from "@shared/schema";
import { UseFormReturn } from "react-hook-form";
import { ReadmeFormData } from "@shared/schema";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  form: UseFormReturn<ReadmeFormData>;
}

export function LanguageSelector({ form }: LanguageSelectorProps) {
  return (
    <Card className="p-4">
      <FormField
        control={form.control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4" />
              <FormLabel>README Language</FormLabel>
            </div>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <div className="text-xs text-muted-foreground mt-1">
              README content will be translated to this language
            </div>
          </FormItem>
        )}
      />
    </Card>
  );
}