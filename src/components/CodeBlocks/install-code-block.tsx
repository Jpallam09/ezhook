"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface InstallCodeBlockProps {
  code: string;
  className?: string;
}

export function InstallCodeBlock({ code, className }: InstallCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderBash = (code: string) => {
    const parts = code.split(" ");
    const pkg = parts[0];       // npm / pnpm / yarn / bun
    const rest = parts.slice(1);

    return (
      <span className="whitespace-pre flex items-center gap-1.5 flex-wrap">
        {/* $ prompt */}
        <span className="select-none text-muted-foreground/40">$</span>

        {/* Package manager — primary accent */}
        <span className="text-foreground font-semibold">{pkg}</span>

        {rest.map((part, i) => {
          if (part === "add") {
            return (
              <span key={i} className="text-muted-foreground/60">{part}</span>
            );
          }
          // hook name — stands out most
          if (part.startsWith("use") || part.startsWith("@")) {
            return (
              <span key={i} className="text-primary font-semibold">{part}</span>
            );
          }
          // everything else (ezhook@latest etc.)
          return (
            <span key={i} className="text-muted-foreground/70">{part}</span>
          );
        })}
      </span>
    );
  };

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between gap-4",
        "rounded-lg border border-border/60 bg-muted/40",
        "px-4 py-3 w-full",
        className
      )}
    >
      <pre className="text-[13px] font-mono overflow-x-auto">
        {renderBash(code)}
      </pre>

      {/* Copy button */}
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "relative shrink-0 flex items-center gap-1.5",
          "h-7 px-2.5 rounded-md text-[11px] font-medium",
          "border border-border/60 bg-background",
          "text-muted-foreground hover:text-foreground hover:bg-accent",
          "transition-colors duration-150"
        )}
        aria-label="Copy code"
      >
        <span className="relative size-3">
          <motion.div
            initial={false}
            animate={{ scale: copied ? 0 : 1, opacity: copied ? 0 : 1, rotate: copied ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0"
          >
            <Copy className="size-full" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ scale: copied ? 1 : 0, opacity: copied ? 1 : 0, rotate: copied ? 0 : -90 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 text-primary"
          >
            <Check className="size-full" />
          </motion.div>
        </span>

        {/* Animated label */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className={copied ? "text-primary" : ""}
          >
            {copied ? "Copied!" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}