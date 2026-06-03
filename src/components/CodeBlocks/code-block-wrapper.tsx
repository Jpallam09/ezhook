"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(true);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative", className)} {...props}>
        <CollapsibleContent>
          <div className="overflow-auto">{children}</div>
        </CollapsibleContent>

        {/* Fade + trigger — only shows when collapsed */}
        <div className="relative">
          {!isOpened && (
            <div className="absolute -top-12 inset-x-0 h-12 pointer-events-none bg-linear-to-t from-muted/60 to-transparent" />
          )}

          <CollapsibleTrigger className={cn(
            "group flex w-full items-center justify-center gap-1.5 py-2 mt-1",
            "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60",
            "transition-colors duration-150 hover:text-foreground",
          )}>
            <span>{isOpened ? "Collapse" : expandButtonTitle}</span>
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                isOpened && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}