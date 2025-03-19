import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Copy, Download, Code, Eye } from 'lucide-react';
import { useState } from 'react';

interface PreviewProps {
  markdown: string;
  onCopy: () => void;
}

function SampleAnalytics() {
  return (
    <div className="space-y-4 p-4 border rounded-md bg-muted/20">
      <div className="text-sm text-muted-foreground">Sample Analytics Preview</div>
      <div className="space-y-2">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-md animate-pulse" />
        <div className="h-24 bg-gradient-to-r from-primary/15 to-primary/5 rounded-md animate-pulse" />
        <div className="h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

export function Preview({ markdown, onCopy }: PreviewProps) {
  const [showRaw, setShowRaw] = useState(false);

  const handleDownload = () => {
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
        <h2 className="text-lg font-semibold">Preview</h2>
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
        <pre className="p-4 bg-white rounded-md border font-mono text-sm overflow-auto whitespace-pre">
          {markdown}
        </pre>
      ) : (
        <div className="prose max-w-none dark:prose-invert border rounded-md p-4 bg-white text-foreground">
          {markdown ? (
            <>
              <ReactMarkdown>{markdown}</ReactMarkdown>
              {!markdown.includes('github-readme-activity-graph') && <SampleAnalytics />}
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