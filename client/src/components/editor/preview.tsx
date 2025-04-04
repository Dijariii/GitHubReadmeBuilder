import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Copy, Download, Code, Eye } from 'lucide-react';
import { useState } from 'react';
import { AnalyticsVisualizer } from './analytics-visualizer';
import { ReadmeFormData } from '@shared/schema';

interface PreviewProps {
  markdown: string;
  onCopy: () => void;
  onDownload?: () => void;
  formData?: ReadmeFormData;
  isLivePreview?: boolean;
}

function SampleAnalytics({ formData }: { formData?: ReadmeFormData }) {
  if (formData?.githubUsername && formData.analytics) {
    return (
      <AnalyticsVisualizer 
        githubUsername={formData.githubUsername}
        analyticsConfig={formData.analytics}
        showApiKeyWarning={!formData.githubApiToken && formData.analytics.includePrivateRepos}
      />
    );
  }
  
  return (
    <div className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900/20 shadow-inner">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Sample Analytics Preview</div>
      <div className="space-y-3">
        <div className="h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/20 rounded-md animate-pulse shadow-sm" />
        <div className="h-24 bg-gradient-to-r from-green-500/30 to-blue-500/20 rounded-md animate-pulse shadow-sm" />
        <div className="h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/10 rounded-md animate-pulse shadow-sm" />
      </div>
      <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
        Actual analytics will appear when your GitHub username is properly set
      </div>
    </div>
  );
}

export function Preview({ markdown, onCopy, onDownload, formData, isLivePreview }: PreviewProps) {
  const [showRaw, setShowRaw] = useState(false);

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
      return;
    }
    
    // Default download handler if no external handler provided
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Preview</h2>
          {isLivePreview && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowRaw(!showRaw)}
            variant="outline"
            className="text-primary"
          >
            {showRaw ? <Eye className="h-4 w-4 mr-2" /> : <Code className="h-4 w-4 mr-2" />}
            {showRaw ? 'Preview' : 'Raw'}
          </Button>
          <Button 
            onClick={onCopy}
            variant="outline"
            className="text-[#0366D6] hover:text-[#0366D6]/90"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="text-[#2EA44F] hover:text-[#2EA44F]/90"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {showRaw ? (
        <pre className="p-4 bg-white rounded-md border font-mono text-sm overflow-auto whitespace-pre text-black">
          {markdown}
        </pre>
      ) : (
        <div className="prose max-w-none dark:prose-invert border rounded-md p-4 bg-white text-black dark:text-foreground shadow-sm">
          {markdown ? (
            <>
              <ReactMarkdown>{markdown}</ReactMarkdown>
              {!markdown.includes('github-readme-activity-graph') && <SampleAnalytics formData={formData} />}
            </>
          ) : (
            <div className="text-muted-foreground text-center py-8">
              Your README preview will appear here
            </div>
          )}
        </div>
      )}
    </div>
  );
}