import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Copy, Download, Code, Eye } from 'lucide-react';
import { useState } from 'react';

interface PreviewProps {
  markdown: string;
  onCopy: () => void;
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
        <div className="prose max-w-none dark:prose-invert border rounded-md p-4 bg-white">
          {markdown ? (
            <ReactMarkdown>{markdown}</ReactMarkdown>
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