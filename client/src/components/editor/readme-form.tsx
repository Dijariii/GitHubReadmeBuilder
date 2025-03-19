import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { readmeFormSchema, type ReadmeFormData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface ReadmeFormProps {
  onSubmit: (data: ReadmeFormData) => void;
}

const TROPHY_THEMES = ["flat", "onedark", "gruvbox", "dracula", "monokai"] as const;
const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export function ReadmeForm({ onSubmit }: ReadmeFormProps) {
  const form = useForm<ReadmeFormData>({
    resolver: zodResolver(readmeFormSchema),
    defaultValues: {
      name: "",
      githubUsername: "",
      bio: "",
      skills: [""],
      programmingLanguages: [{ name: "", proficiency: "Beginner" }],
      socialLinks: [{ platform: "", url: "" }],
      projects: [{ name: "", description: "", url: "", technologies: [] }],
      showGitHubStats: true,
      showTrophies: true,
      showLanguageStats: true,
      showStreak: true,
      customizeTrophy: {
        theme: "flat",
        row: 2,
        column: 3
      }
    },
  });

  const skillsArray = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const languagesArray = useFieldArray({
    control: form.control,
    name: "programmingLanguages",
  });

  const socialLinksArray = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const projectsArray = useFieldArray({
    control: form.control,
    name: "projects",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Username</FormLabel>
              <FormControl>
                <Input placeholder="Your GitHub username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short bio about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Programming Languages</FormLabel>
          {languagesArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`programmingLanguages.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Language name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`programmingLanguages.${index}.proficiency`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select 
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROFICIENCY_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => languagesArray.remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => languagesArray.append({ name: "", proficiency: "Beginner" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>

        <div className="space-y-2">
          <FormLabel>Skills</FormLabel>
          {skillsArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`skills.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Enter a skill" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => skillsArray.remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => skillsArray.append("")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>

        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">GitHub Stats Configuration</h3>

          <FormField
            control={form.control}
            name="showGitHubStats"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Show GitHub Statistics</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showTrophies"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Show GitHub Trophies</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showLanguageStats"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Show Language Statistics</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showStreak"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Show Contribution Streak</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customizeTrophy.theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trophy Theme</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {TROPHY_THEMES.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Social Links</FormLabel>
          {socialLinksArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`socialLinks.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Platform (e.g. GitHub)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialLinks.${index}.url`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => socialLinksArray.remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => socialLinksArray.append({ platform: "", url: "" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>

        <div className="space-y-2">
          <FormLabel>Projects</FormLabel>
          {projectsArray.fields.map((field, index) => (
            <div key={field.id} className="space-y-2 p-4 border rounded-md">
              <FormField
                control={form.control}
                name={`projects.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Project description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Project URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => projectsArray.remove(index)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Project
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              projectsArray.append({ name: "", description: "", url: "", technologies: [] })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        <Button type="submit" className="w-full bg-[#2EA44F] hover:bg-[#2C974B]">
          Generate README
        </Button>
      </form>
    </Form>
  );
}