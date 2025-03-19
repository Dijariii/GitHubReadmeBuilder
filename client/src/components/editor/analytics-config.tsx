import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UseFormReturn } from "react-hook-form";
import { ReadmeFormData, GRAPH_THEMES, TIME_RANGES } from "@shared/schema";
import { ChartBar, Calendar, Lock, HelpCircle } from "lucide-react";

interface AnalyticsConfigProps {
  form: UseFormReturn<ReadmeFormData>;
}

export function AnalyticsConfig({ form }: AnalyticsConfigProps) {
  return (
    <TooltipProvider>
      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <ChartBar className="h-5 w-5" />
          <h3 className="font-medium">Profile Analytics</h3>
        </div>

        <FormField
          control={form.control}
          name="analytics.showContributionGraph"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center gap-2">
                <div>
                  <FormLabel>Contribution Graph</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Show your GitHub contribution calendar
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Displays your daily contribution activity in a calendar view</p>
                  </TooltipContent>
                </Tooltip>
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
          name="analytics.showActivityGraph"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center gap-2">
                <div>
                  <FormLabel>Activity Timeline</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Display your coding activity timeline
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shows your coding activity over time in a detailed timeline view</p>
                  </TooltipContent>
                </Tooltip>
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
          name="analytics.showCommitStats"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center gap-2">
                <div>
                  <FormLabel>Commit Statistics</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Show detailed commit statistics
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Displays commit frequency, lines of code, and other metrics</p>
                  </TooltipContent>
                </Tooltip>
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
          name="analytics.timeRange"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                <FormLabel>Time Range</FormLabel>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the time period for your analytics data</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="analytics.graphStyle"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 mb-2">
                <ChartBar className="h-4 w-4" />
                <FormLabel>Graph Theme</FormLabel>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose a visual style for your analytics graphs</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select graph theme" />
                </SelectTrigger>
                <SelectContent>
                  {GRAPH_THEMES.map((theme) => (
                    <SelectItem key={theme.name} value={theme.name}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="analytics.includePrivateRepos"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FormLabel>Include Private Repositories</FormLabel>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Include statistics from your private repositories (requires additional permissions)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Include statistics from private repositories
                  </div>
                </div>
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
      </Card>
    </TooltipProvider>
  );
}