"use client";

/**
 * @author: @kokonut-labs
 * @description: Slide Text Button with animated vertical text transition
 * @version: 1.0.0
 * @date: 2025-11-02
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SlideTextButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  hoverText?: string;
  href?: string;
  className?: string;
  variant?: "default" | "ghost";
}

export default function SlideTextButton({
  text = "Browse Components",
  hoverText,
  href = "/docs/cards/card-flip",
  className,
  variant = "default",
  ...props
}: SlideTextButtonProps) {
  const slideText = hoverText ?? text;
  const variantStyles =
    variant === "ghost"
      ? "border border-black/10 text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
      : "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90";

  return (
    <motion.div
      animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
      className="relative"
      initial={{ x: 0, opacity: 0 }}
    >
      <Link
        className={cn(
          "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg px-8 font-medium text-md tracking-tighter transition-all duration-300 md:min-w-64",
          variantStyles,
          className
        )}
        href={href}
        {...props}
      >
        <span className="relative inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          <span className="flex items-center justify-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0 whitespace-nowrap">
            <span className="font-medium">{text}</span>
          </span>
          <span className="absolute top-full left-0 flex w-full items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
            <span className="font-medium">{slideText}</span>
          </span>
          {/* Ghost element to ensure the container is wide enough for the longer of the two texts */}
          <span className="invisible block h-0 overflow-hidden whitespace-nowrap px-2" aria-hidden="true">
            {text.length > slideText.length ? text : slideText}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
