"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface InstallCodeBlockProps {
  code: string
  className?: string
}

export function InstallCodeBlock({ code, className }: InstallCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderBash = (code: string) => {
    const parts = code.split(" ")
    return (
      <span className="whitespace-pre">
        <span className="select-none">$ </span>
        <span>{parts[0]}</span>{" "}
        <span>{parts[1]}</span>{" "}
        {parts.slice(2).map((part, i) => (
          <span key={i}>
            {part === "add" ? (
              <span>add </span>
            ) : (
              <span className="font-semibold">{part}</span>
            )}
          </span>
        ))}
      </span>
    )
  }

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between gap-6 rounded-xl border p-2 bg-muted/50 w-full",
        className
      )}
    >
      <pre className="text-sm font-mono text-zinc-950 dark:text-zinc-50 overflow-x-auto px-2 py-1">
        {renderBash(code)}
      </pre>

      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex shrink-0 items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg",
          "text-zinc-500 dark:text-zinc-400",
          "bg-background border border-border",
          "hover:bg-accent hover:text-foreground",
          "transition-all duration-150"
        )}
        aria-label="Copy code"
      >
        <span className="relative size-3.5">
          <motion.div
            initial={false}
            animate={{
              scale: copied ? 0 : 1,
              opacity: copied ? 0 : 1,
              rotate: copied ? 90 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Copy className="size-full" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{
              scale: copied ? 1 : 0,
              opacity: copied ? 1 : 0,
              rotate: copied ? 0 : -90,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Check className="size-full" />
          </motion.div>
        </span>
        <span>{copied ? "Copied" : "Copy"}</span>
      </motion.button>
    </div>
  )
}
