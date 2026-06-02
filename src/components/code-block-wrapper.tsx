"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(true) // Default to opened for visibility

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative", className)} {...props}>
        <CollapsibleContent>
          <div className="overflow-auto">
            {children}
          </div>
        </CollapsibleContent>
        <div className="flex items-center justify-center p-2 mt-2">
          <CollapsibleTrigger
            className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-secondary px-3 text-xs font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {isOpened ? "Collapse" : expandButtonTitle}
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  )
}
