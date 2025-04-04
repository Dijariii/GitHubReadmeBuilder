import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ReadmeFormData } from '@shared/schema';

interface AnalyticsVisualizerProps {
  githubUsername: string;
  analyticsConfig: ReadmeFormData['analytics'];
  showApiKeyWarning?: boolean;
}

// Sample data structure for a contribution heatmap
interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = no contributions, 4 = highest level
}

// Sample data structure for activity timeline
interface ActivityPoint {
  date: string;
  commits: number;
  additions: number;
  deletions: number;
}

export function AnalyticsVisualizer({ 
  githubUsername, 
  analyticsConfig, 
  showApiKeyWarning = false 
}: AnalyticsVisualizerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sample data for the visualizations
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [activityData, setActivityData] = useState<ActivityPoint[]>([]);
  const [commitStats, setCommitStats] = useState({
    totalCommits: 0,
    averageCommitsPerDay: 0,
    streakDays: 0,
    topDay: { date: '', count: 0 }
  });
  
  // Simulated API loading
  useEffect(() => {
    if (!githubUsername) {
      setError("Please enter a GitHub username");
      setLoading(false);
      return;
    }
    
    // Reset state when username changes
    setLoading(true);
    setError(null);
    
    // Simulated API call
    const timer = setTimeout(() => {
      setLoading(false);
      
      // If no GitHub API key provided when needed, show warning instead of data
      if (showApiKeyWarning) {
        setError("GitHub API token required for analytics data");
        return;
      }
      
      // This would be replaced with actual API data
      // Generate sample visualization data for preview
      generateSampleData();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [githubUsername, analyticsConfig, showApiKeyWarning]);
  
  // Function to generate sample data for the visualizations
  const generateSampleData = () => {
    // Generate sample contribution data
    const contributions: ContributionDay[] = [];
    const now = new Date();
    
    // Create a year of sample data
    for (let i = 364; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate random contribution level
      const level = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
      const count = level === 0 ? 0 : level * Math.floor(Math.random() * 5 + 1);
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    setContributionData(contributions);
    
    // Generate sample activity data
    const activity: ActivityPoint[] = [];
    const timeRange = analyticsConfig.timeRange;
    let daysToShow = 30;
    
    if (timeRange === 'last_7_days') {
      daysToShow = 7;
    } else if (timeRange === 'last_year') {
      daysToShow = 365;
    }
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      activity.push({
        date: date.toISOString().split('T')[0],
        commits: Math.floor(Math.random() * 10),
        additions: Math.floor(Math.random() * 100),
        deletions: Math.floor(Math.random() * 50)
      });
    }
    
    setActivityData(activity);
    
    // Calculate commit statistics
    const totalCommits = activity.reduce((sum, day) => sum + day.commits, 0);
    const averageCommits = totalCommits / activity.length;
    
    // Find longest streak
    let currentStreak = 0;
    let longestStreak = 0;
    let topDay = { date: '', count: 0 };
    
    activity.forEach(day => {
      if (day.commits > 0) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 0;
      }
      
      if (day.commits > topDay.count) {
        topDay = { date: day.date, count: day.commits };
      }
    });
    
    // In case the streak is active at the end
    longestStreak = Math.max(longestStreak, currentStreak);
    
    setCommitStats({
      totalCommits,
      averageCommitsPerDay: averageCommits,
      streakDays: longestStreak,
      topDay
    });
  };
  
  // Render contribution heatmap
  const renderHeatmap = () => {
    if (!analyticsConfig.showContributionGraph) return null;
    
    const CELL_SIZE = 10;
    const CELL_MARGIN = 2;
    const WEEK_COUNT = 52;
    const DAYS_IN_WEEK = 7;
    
    // Get only the subset of data we need
    const heatmapData = contributionData.slice(-WEEK_COUNT * DAYS_IN_WEEK);
    
    // Group by week
    const weeks = [];
    for (let i = 0; i < WEEK_COUNT; i++) {
      weeks.push(heatmapData.slice(i * DAYS_IN_WEEK, (i + 1) * DAYS_IN_WEEK));
    }
    
    const heatmapColors = {
      0: '#ebedf0',
      1: '#9be9a8',
      2: '#40c463',
      3: '#30a14e',
      4: '#216e39'
    };
    
    // Apply theme if one is selected
    let colors = heatmapColors;
    if (analyticsConfig.graphStyle === 'dracula') {
      colors = {
        0: '#2d3436',
        1: '#6272a4',
        2: '#8be9fd',
        3: '#bd93f9',
        4: '#ff79c6'
      };
    } else if (analyticsConfig.graphStyle === 'tokyo-night') {
      colors = {
        0: '#1a1b26',
        1: '#414868',
        2: '#7aa2f7',
        3: '#bb9af7',
        4: '#ff79c6'
      };
    }
    
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Contribution Activity</h3>
        <div className="border p-4 rounded-md bg-white/50 dark:bg-black/20">
          <div className="flex">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="flex flex-col">
                {week.map((day, dayIndex) => (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      margin: CELL_MARGIN,
                      backgroundColor: colors[day.level],
                      borderRadius: '2px'
                    }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              Less
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={`legend-${level}`}
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: colors[level as 0 | 1 | 2 | 3 | 4],
                    borderRadius: '1px'
                  }}
                />
              ))}
              More
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render activity timeline
  const renderActivityTimeline = () => {
    if (!analyticsConfig.showActivityGraph) return null;
    
    // Calculate the maximum value for scaling
    const maxCommits = Math.max(...activityData.map(day => day.commits));
    const chartHeight = 100;
    
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Coding Activity</h3>
        <div className="border p-4 rounded-md bg-white/50 dark:bg-black/20 h-40">
          <div className="flex h-full items-end">
            {activityData.map((day, index) => {
              const barHeight = day.commits === 0 ? 0 : (day.commits / maxCommits) * chartHeight;
              
              // Select color based on theme
              let barColor = '#40c463';
              if (analyticsConfig.graphStyle === 'dracula') {
                barColor = '#bd93f9';
              } else if (analyticsConfig.graphStyle === 'tokyo-night') {
                barColor = '#7aa2f7';
              }
              
              return (
                <div 
                  key={`activity-${index}`}
                  className="flex-1 mx-px flex flex-col justify-end"
                  title={`${day.date}: ${day.commits} commits, +${day.additions} -${day.deletions}`}
                >
                  <div 
                    style={{ 
                      height: `${barHeight}%`,
                      backgroundColor: barColor
                    }}
                    className="rounded-t-sm"
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex justify-between">
            <span>{activityData[0]?.date}</span>
            <span>{activityData[activityData.length - 1]?.date}</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Render commit statistics
  const renderCommitStats = () => {
    if (!analyticsConfig.showCommitStats) return null;
    
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Commit Statistics</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="border p-3 rounded-md bg-white/50 dark:bg-black/20">
            <div className="text-xs text-muted-foreground">Total Commits</div>
            <div className="text-2xl font-medium">{commitStats.totalCommits}</div>
          </div>
          <div className="border p-3 rounded-md bg-white/50 dark:bg-black/20">
            <div className="text-xs text-muted-foreground">Longest Streak</div>
            <div className="text-2xl font-medium">{commitStats.streakDays} days</div>
          </div>
          <div className="border p-3 rounded-md bg-white/50 dark:bg-black/20">
            <div className="text-xs text-muted-foreground">Daily Average</div>
            <div className="text-2xl font-medium">{commitStats.averageCommitsPerDay.toFixed(1)}</div>
          </div>
          <div className="border p-3 rounded-md bg-white/50 dark:bg-black/20">
            <div className="text-xs text-muted-foreground">Most Active Day</div>
            <div className="text-lg font-medium">{commitStats.topDay.date}</div>
            <div className="text-xs text-muted-foreground">{commitStats.topDay.count} commits</div>
          </div>
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <Card className="p-4 space-y-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="p-4 text-center">
        <div className="text-amber-500 mb-2">
          {error}
        </div>
        <p className="text-sm text-muted-foreground">
          {showApiKeyWarning ? 
            "To view your GitHub analytics, please provide a GitHub API token in the GitHub integration tab." : 
            "Please enter a valid GitHub username to view analytics."}
        </p>
      </Card>
    );
  }
  
  return (
    <Card className="p-4">
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-6">
          {renderHeatmap()}
          {renderActivityTimeline()}
          {renderCommitStats()}
          
          <div className="text-xs text-center text-muted-foreground mt-4">
            Note: This visualization is a preview. The actual README will contain GitHub-hosted images.
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}