import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type EmojiTooltipProps = {
  emoji: string;
  content: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  showEmoji?: boolean;
};

export function EmojiTooltip({
  emoji,
  content,
  children,
  side = "top",
  className,
  showEmoji = true,
}: EmojiTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={cn("inline-flex items-center cursor-help", className)}>
            {children}
            {showEmoji && (
              <span className="ml-1 text-sm animate-pulse">{emoji}</span>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          className="max-w-sm p-3 text-sm bg-gray-800 text-white border border-gray-700 rounded-md shadow-md"
        >
          <div className="flex items-start">
            <span className="mr-2 text-lg">{emoji}</span>
            <div>{content}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}