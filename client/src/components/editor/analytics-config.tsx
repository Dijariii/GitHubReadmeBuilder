import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { ReadmeFormData, GRAPH_THEMES, TIME_RANGES } from "@shared/schema";
import { ChartBar, Calendar, Lock } from "lucide-react";

interface AnalyticsConfigProps {
  form: UseFormReturn<ReadmeFormData>;
}

export function AnalyticsConfig({ form }: AnalyticsConfigProps) {
  return (
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
            <div className="space-y-0.5">
              <FormLabel>Contribution Graph</FormLabel>
              <div className="text-sm text-muted-foreground">
                Show your GitHub contribution calendar
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

      <FormField
        control={form.control}
        name="analytics.showActivityGraph"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>Activity Timeline</FormLabel>
              <div className="text-sm text-muted-foreground">
                Display your coding activity timeline
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

      <FormField
        control={form.control}
        name="analytics.showCommitStats"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>Commit Statistics</FormLabel>
              <div className="text-sm text-muted-foreground">
                Show detailed commit statistics
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

      <FormField
        control={form.control}
        name="analytics.timeRange"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              <FormLabel>Time Range</FormLabel>
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
                <FormLabel>Include Private Repositories</FormLabel>
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
  );
}
