import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { readmeFormSchema, type ReadmeFormData, PROGRAMMING_LANGUAGES, SOCIAL_PLATFORMS } from "@shared/schema";
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
import * as SiIcons from "react-icons/si";
import type { IconType } from "react-icons";
import React from 'react';
import { AnalyticsConfig } from "./analytics-config";
import { LanguageSelector } from "./language-selector";
import { GitHubIntegration } from "./github-integration";
import { ProjectDetector } from "./project-detector";
import { CustomSections } from "./custom-sections";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmojiTooltip } from "@/components/ui/emoji-tooltip";

interface ReadmeFormProps {
  onSubmit: (data: ReadmeFormData) => void;
}

const TROPHY_THEMES = ["flat", "onedark", "gruvbox", "dracula", "monokai"] as const;
const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

const SOCIAL_ICONS: Record<string, IconType> = {
  GitHub: SiIcons.SiGithub,
  LinkedIn: SiIcons.SiLinkedin,
  Facebook: SiIcons.SiFacebook,
  Instagram: SiIcons.SiInstagram,
  YouTube: SiIcons.SiYoutube,
  Medium: SiIcons.SiMedium,
  "Dev.to": SiIcons.SiDevdotto,
  "Stack Overflow": SiIcons.SiStackoverflow,
  CodePen: SiIcons.SiCodepen,
};

export function ReadmeForm({ onSubmit }: ReadmeFormProps) {
  const form = useForm<ReadmeFormData>({
    resolver: zodResolver(readmeFormSchema),
    defaultValues: {
      name: "",
      githubUsername: "",
      bio: "",
      skills: [""],
      programmingLanguages: [{ name: PROGRAMMING_LANGUAGES[0].name, proficiency: "Beginner" }],
      socialLinks: [{ platform: SOCIAL_PLATFORMS[0].name, username: "" }],
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
    name: "skills" as any, // Type assertion to handle array of strings
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
          <div className="flex items-center">
            <FormLabel>Programming Languages</FormLabel>
            <EmojiTooltip 
              emoji="💻" 
              content="List the programming languages you're proficient in, each with a skill level."
              className="ml-2"
            />
          </div>
          {languagesArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`programmingLanguages.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROGRAMMING_LANGUAGES.map((lang) => (
                          <SelectItem
                            key={lang.name}
                            value={lang.name}
                            className="flex items-center gap-2"
                          >
                            <img
                              src={lang.logo}
                              alt={lang.name}
                              className="w-4 h-4"
                            />
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            onClick={() => languagesArray.append({
              name: PROGRAMMING_LANGUAGES[0].name,
              proficiency: "Beginner"
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <FormLabel>Skills</FormLabel>
            <EmojiTooltip 
              emoji="🛠️" 
              content="List your technical and soft skills to showcase your capabilities to potential employers."
              className="ml-2"
            />
          </div>
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
            onClick={() => skillsArray.append("" as any)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>

        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">GitHub Configuration</h3>

          <FormField
            control={form.control}
            name="showGitHubStats"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div className="flex items-center">
                  <FormLabel>Show GitHub Statistics</FormLabel>
                  <EmojiTooltip 
                    emoji="📊" 
                    content="Displays your GitHub statistics including stars, commits, and contributions."
                    className="ml-2"
                  />
                </div>
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
                <div className="flex items-center">
                  <FormLabel>Show GitHub Trophies</FormLabel>
                  <EmojiTooltip 
                    emoji="🏆" 
                    content="Displays achievement trophies based on your GitHub activity and contributions."
                    className="ml-2"
                  />
                </div>
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
                <div className="flex items-center">
                  <FormLabel>Show Language Statistics</FormLabel>
                  <EmojiTooltip 
                    emoji="🔍" 
                    content="Visualizes the programming languages you use most frequently in your repositories."
                    className="ml-2"
                  />
                </div>
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
                <div className="flex items-center">
                  <FormLabel>Show Contribution Streak</FormLabel>
                  <EmojiTooltip 
                    emoji="🔥" 
                    content="Showcases your GitHub contribution streak - how many days in a row you've been active."
                    className="ml-2"
                  />
                </div>
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
          <AnalyticsConfig form={form} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <FormLabel>Social Links</FormLabel>
            <EmojiTooltip 
              emoji="🔗" 
              content="Add links to your social media profiles so others can connect with you across platforms."
              className="ml-2"
            />
          </div>
          {socialLinksArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`socialLinks.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOCIAL_PLATFORMS.map((platform) => {
                          const Icon = SOCIAL_ICONS[platform.name];
                          return (
                            <SelectItem
                              key={platform.name}
                              value={platform.name}
                              className="flex items-center gap-2"
                            >
                              {Icon && (
                                <div className="w-4 h-4">
                                  <Icon />
                                </div>
                              )}
                              {platform.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialLinks.${index}.username`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
            onClick={() => socialLinksArray.append({
              platform: SOCIAL_PLATFORMS[0].name,
              username: ""
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <FormLabel>Projects</FormLabel>
            <EmojiTooltip 
              emoji="📂" 
              content="Showcase your best projects with descriptions and links to the repositories or live demos."
              className="ml-2"
            />
          </div>
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

        {/* Advanced Features in Tabs */}
        <div className="border rounded-md p-4 space-y-4">
          <h3 className="font-medium mb-2">Advanced Features</h3>
          
          <Tabs defaultValue="language" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="language" className="relative group">
                Language
                <EmojiTooltip 
                  emoji="🌐" 
                  content="Translates your README content into different languages to reach a global audience."
                  side="bottom"
                  className="absolute -top-2 -right-2"
                />
              </TabsTrigger>
              <TabsTrigger value="github" className="relative group">
                GitHub API
                <EmojiTooltip 
                  emoji="⚡" 
                  content="Connect to GitHub API to automatically pull your profile data and repository information."
                  side="bottom"
                  className="absolute -top-2 -right-2"
                />
              </TabsTrigger>
              <TabsTrigger value="project" className="relative group">
                Project Type
                <EmojiTooltip 
                  emoji="🔍" 
                  content="Automatically detect your project type and suggest appropriate technology stack listings."
                  side="bottom"
                  className="absolute -top-2 -right-2"
                />
              </TabsTrigger>
              <TabsTrigger value="custom" className="relative group">
                Custom Sections
                <EmojiTooltip 
                  emoji="✏️" 
                  content="Add your own custom-titled sections to the README with specialized content."
                  side="bottom"
                  className="absolute -top-2 -right-2"
                />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="language" className="space-y-4">
              <LanguageSelector form={form} />
            </TabsContent>
            
            <TabsContent value="github" className="space-y-4">
              <GitHubIntegration form={form} />
            </TabsContent>
            
            <TabsContent value="project" className="space-y-4">
              <ProjectDetector form={form} />
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4">
              <CustomSections form={form} />
            </TabsContent>
          </Tabs>
        </div>

        <Button type="submit" className="w-full bg-[#2EA44F] hover:bg-[#2C974B]">
          Generate README
        </Button>
      </form>
    </Form>
  );
}