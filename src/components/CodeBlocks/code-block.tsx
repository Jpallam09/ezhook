"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getHighlighter } from "@/lib/shiki";
import { type Highlighter } from "shiki";

interface CodeBlockProps {
  code: string;
  language: "tsx" | "bash" | "json";
  collapsible?: boolean;
  fileName?: string;
}

export function CodeBlock({
  code,
  language,
  collapsible = false,
  fileName,
}: CodeBlockProps) {
  const [highlighter, setHighlighter] = React.useState<Highlighter | null>(null);
  const [isCopied, setIsCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(!collapsible);

  React.useEffect(() => {
    async function init() {
      const h = await getHighlighter();
      setHighlighter(h);
    }
    init();
  }, []);

  const html = React.useMemo(() => {
    if (highlighter) {
      return highlighter.codeToHtml(code, { lang: language, theme: "github-dark" });
    }
    return "";
  }, [highlighter, code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">

      {/* Top bar — filename + copy */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-zinc-800/80">
        {/* Left: language badge or filename */}
        <span className="text-[11px] font-mono text-zinc-500 tracking-wide">
          {fileName ?? language}
        </span>

        {/* Right: copy button */}
        <motion.button
          onClick={copyToClipboard}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "flex items-center gap-1.5 h-6 px-2 rounded text-[11px] font-medium",
            "border border-zinc-700/60 bg-zinc-900",
            "text-zinc-400 hover:text-zinc-100 hover:border-zinc-600",
            "transition-colors duration-150"
          )}
          aria-label="Copy code"
        >
          <span className="relative size-3">
            <motion.div
              initial={false}
              animate={{ scale: isCopied ? 0 : 1, opacity: isCopied ? 0 : 1, rotate: isCopied ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <Copy className="size-full" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ scale: isCopied ? 1 : 0, opacity: isCopied ? 1 : 0, rotate: isCopied ? 0 : -90 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 text-emerald-400"
            >
              <Check className="size-full" />
            </motion.div>
          </span>

          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isCopied ? "copied" : "copy"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className={isCopied ? "text-emerald-400" : ""}
            >
              {isCopied ? "Copied!" : "Copy"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code area */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          collapsible && !isExpanded ? "max-h-48" : "max-h-162.5"
        )}
      >
        {/* Collapse fade overlay */}
        {collapsible && !isExpanded && (
          <div className="absolute bottom-10 inset-x-0 h-16 pointer-events-none bg-linear-to-t from-zinc-950 to-transparent z-10" />
        )}

        <div
          className="p-4 overflow-x-auto text-[13px] leading-relaxed
            [&_pre]:bg-transparent! [&_pre]:p-0! [&_code]:text-[13px]!"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {/* Expand / collapse footer */}
      {collapsible && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex w-full items-center justify-center gap-1.5 py-2",
            "border-t border-zinc-800/80 bg-zinc-950",
            "text-[11px] font-medium uppercase tracking-widest",
            "text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
          )}
        >
          <span>{isExpanded ? "Collapse" : "Expand"}</span>
          <ChevronDown
            className={cn(
              "size-3 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </button>
      )}
    </div>
  );
}