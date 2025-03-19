import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface PreviewProps {
  markdown: string;
  onCopy: () => void;
}

export function Preview({ markdown, onCopy }: PreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Button 
          onClick={onCopy}
          variant="outline"
          className="text-[#0366D6] hover:text-[#0366D6]/90"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Markdown
        </Button>
      </div>
      
      <div className="prose max-w-none dark:prose-invert border rounded-md p-4 bg-white">
        {markdown ? (
          <ReactMarkdown>{markdown}</ReactMarkdown>
        ) : (
          <div className="text-muted-foreground text-center py-8">
            Your README preview will appear here
          </div>
        )}
      </div>
    </div>
  );
}
