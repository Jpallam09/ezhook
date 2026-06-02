"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { createHighlighter, type Highlighter } from "shiki"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language: "tsx" | "bash" | "json"
  collapsible?: boolean
  fileName?: string
}

export function CodeBlock({
  code,
  language,
  collapsible = false,
  fileName,
}: CodeBlockProps) {
  const [highlighter, setHighlighter] = React.useState<Highlighter | null>(null)
  const [isCopied, setIsCopied] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(!collapsible)

  React.useEffect(() => {
    async function init() {
      const h = await createHighlighter({
        themes: ["github-dark"],
        langs: ["tsx", "bash", "json"],
      })
      setHighlighter(h)
    }
    init()
  }, [])

  const html = React.useMemo(() => {
    if (highlighter) {
      return highlighter.codeToHtml(code, { lang: language, theme: "github-dark" })
    }
    return ""
  }, [highlighter, code, language])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative my-6 w-full rounded-xl border bg-zinc-950">
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 text-xs text-zinc-400 border-b border-zinc-800">
          {fileName}
        </div>
      )}
      <div className="absolute right-2 top-2 z-10">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-zinc-400 hover:text-zinc-50"
          onClick={copyToClipboard}
        >
          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          collapsible && !isExpanded ? "max-h-30" : "max-h-162.5"
        )}
      >
        <div 
          className="p-4 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {collapsible && (
        <div className="border-t border-zinc-800 p-2 text-center">
          <Button
            variant="ghost"
            className="h-8 text-xs text-zinc-400 hover:text-zinc-50"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      )}
    </div>
  )
}
