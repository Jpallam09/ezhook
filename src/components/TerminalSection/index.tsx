"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// Terminal output palette — always dark, these are terminal colors not UI colors
const ACC = "#6FF7CC";
const WHITE = "#e4e4e7";
const MUTED = "#71717a";
const DIM = "#3f3f46";
const PURPLE = "#a78bfa";

type TerminalLine = { text: string; color?: string };

type TabData = {
  title: string;
  hint: string;
  cmd: string;
  lines: TerminalLine[];
};

const tabs: Record<string, TabData> = {
  browse: {
    title: "ezhook — browse",
    hint: "// open the registry in your browser or search by category",
    cmd: "npx ezhook browse",
    lines: [
      { text: "" },
      { text: "  ezhook registry  —  48 hooks available", color: WHITE },
      { text: "" },
      { text: "  ┌─ state ──────────────────────────────┐", color: "#27272a" },
      { text: "  │  use-debounce        delay state updates   │", color: MUTED },
      { text: "  │  use-local-storage   persist to localStorage│", color: MUTED },
      { text: "  │  use-previous        track previous value  │", color: MUTED },
      { text: "  ├─ ui ────────────────────────────────-┤", color: "#27272a" },
      { text: "  │  use-click-outside   detect outside clicks │", color: MUTED },
      { text: "  │  use-media-query     responsive breakpoints│", color: MUTED },
      { text: "  ├─ async ──────────────────────────────┤", color: "#27272a" },
      { text: "  │  use-fetch           data fetching + cache │", color: MUTED },
      { text: "  │  use-interval        safe setInterval hook │", color: MUTED },
      { text: "  └──────────────────────────────────────┘", color: "#27272a" },
      { text: "" },
      { text: "  → run `npx ezhook add <hook>` to install", color: ACC },
    ],
  },
  install: {
    title: "ezhook — install",
    hint: "// the hook source is copied into your project — no runtime dependency",
    cmd: 'npx shadcn@latest add "https://ezhook.dev/r/use-debounce"',
    lines: [
      { text: "" },
      { text: "  Resolving hook from registry...", color: MUTED },
      { text: "  ✓ Found use-debounce@2.1.0", color: ACC },
      { text: "" },
      { text: "  Checking dependencies...", color: MUTED },
      { text: "  ✓ No additional packages required", color: ACC },
      { text: "" },
      { text: "  Writing files...", color: MUTED },
      { text: "  ✓ hooks/use-debounce.ts", color: ACC },
      { text: "" },
      { text: "  Done. The hook is yours — edit it freely.", color: WHITE },
    ],
  },
  use: {
    title: "ezhook — use-debounce.ts",
    hint: "// the installed hook, living in your codebase",
    cmd: "cat hooks/use-debounce.ts",
    lines: [
      { text: "" },
      { text: "  import { useState, useEffect } from 'react'", color: PURPLE },
      { text: "" },
      { text: "  export function useDebounce<T>(", color: MUTED },
      { text: "    value: T,", color: MUTED },
      { text: "    delay: number = 300", color: MUTED },
      { text: "  ): T {", color: MUTED },
      { text: "    const [debouncedValue, set] = useState(value)", color: MUTED },
      { text: "" },
      { text: "    useEffect(() => {", color: MUTED },
      { text: "      const t = setTimeout(() => set(value), delay)", color: MUTED },
      { text: "      return () => clearTimeout(t)", color: MUTED },
      { text: "    }, [value, delay])", color: MUTED },
      { text: "" },
      { text: "    return debouncedValue", color: MUTED },
      { text: "  }", color: MUTED },
    ],
  },
  list: {
    title: "ezhook — list",
    hint: "// see every hook installed in your project",
    cmd: "npx ezhook list",
    lines: [
      { text: "" },
      { text: "  Installed hooks in this project", color: WHITE },
      { text: "" },
      { text: "  use-debounce          v2.1.0   state", color: ACC },
      { text: "  use-click-outside     v1.4.2   ui", color: ACC },
      { text: "  use-local-storage     v3.0.1   state", color: ACC },
      { text: "  use-fetch             v2.8.0   async", color: ACC },
      { text: "" },
      { text: "  4 hooks installed  ·  44 available in registry", color: MUTED },
      { text: "" },
      { text: "  → npx ezhook update    update all hooks", color: DIM },
      { text: "  → npx ezhook add       install more", color: DIM },
    ],
  },
};

const TAB_KEYS = ["browse", "install", "use", "list"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const STEP_LABELS: Record<TabKey, string> = {
  browse: "Browse",
  install: "Install",
  use: "Use",
  list: "Explore",
};

export function TerminalSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("browse");
  const [cmdText, setCmdText] = useState("");
  const [outputLines, setOutputLines] = useState<TerminalLine[]>([]);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable ref to the animation runner — avoids stale closures without
  // re-declaring inside useEffect (which would trigger the lint rule)
  const runTerminal = useCallback((name: TabKey) => {
    if (animRef.current) clearTimeout(animRef.current);

    const data = tabs[name];
    const speed = data.cmd.length > 40 ? 14 : 22;
    let i = 0;

    // Reset via refs so we don't call setState synchronously in the effect body
    const resetAndStart = () => {
      setCmdText("");
      setOutputLines([]);
      animRef.current = setTimeout(typeCmd, 150);
    };

    function typeCmd() {
      if (i <= data.cmd.length) {
        const slice = data.cmd.slice(0, i);
        setCmdText(i < data.cmd.length ? slice + "▌" : slice);
        i++;
        animRef.current = setTimeout(typeCmd, speed);
      } else {
        setCmdText(data.cmd);
        showLines(0);
      }
    }

    function showLines(idx: number) {
      if (idx >= data.lines.length) return;
      setOutputLines((prev) => [...prev, data.lines[idx]]);
      animRef.current = setTimeout(
        () => showLines(idx + 1),
        80 + Math.random() * 40
      );
    }

    resetAndStart();
  }, []);

  useEffect(() => {
    // Kick off animation in a deferred callback so setState is never called
    // synchronously in the effect body — satisfies react-hooks/set-state-in-effect
    const id = setTimeout(() => runTerminal(activeTab), 0);
    return () => {
      clearTimeout(id);
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, [activeTab, runTerminal]);

  const data = tabs[activeTab];

  return (
    <section className="flex w-full flex-col items-center border-t px-4 py-24">

      {/* Header */}
      <div className="mb-10 text-center">
        <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground">
          how it works
        </p>
        <h2 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-foreground">
          Any hook, one command
        </h2>
        <p className="mx-auto max-w-100 text-sm leading-relaxed text-muted-foreground">
          Browse the registry, install with the{" "}
          <span className="font-medium text-foreground">shadcn/ui</span> CLI,
          and the hook lives in your project — fully owned by you.
        </p>
      </div>

      {/* Tab strip */}
      <div className="mb-6 inline-flex items-center gap-1 rounded-lg border p-1">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "rounded-md px-3 py-1.5 font-mono text-xs transition-all duration-150",
              activeTab === key
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Terminal window — always dark, intentional */}
      <div className="w-full max-w-145 overflow-hidden rounded-lg border border-white/9 bg-[#111113]">
        {/* Chrome bar */}
        <div className="flex items-center justify-between border-b border-white/6 bg-[#0c0c0e] px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[11px] text-[#3f3f46]">
            {data.title}
          </span>
          <div className="w-10.5" />
        </div>

        {/* Output */}
        <div className="min-h-55 px-5 py-4 font-mono text-[12px] leading-[1.85]">
          <div className="flex gap-2">
            <span className="shrink-0 select-none text-[#3f3f46]">$</span>
            <span className="break-all text-[#e4e4e7]">{cmdText}</span>
          </div>
          <div className="mt-1.5">
            {outputLines.map((line, i) => (
              <div
                key={i}
                style={{ color: line.color ?? "#52525b" }}
                className="font-mono text-[12px] leading-[1.85]"
              >
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>
        </div>

        {/* Hint footer */}
        <div className="border-t border-white/5 px-5 pb-4 pt-3">
          <p className="font-mono text-[11px] text-[#3f3f46]">{data.hint}</p>
        </div>
      </div>

      {/* Step indicators */}
      <div className="mt-10 flex w-full max-w-sm items-center justify-center border-t pt-7">
        {TAB_KEYS.map((key, idx) => {
          const isActive = activeTab === key;
          return (
            <div key={key} className="flex items-center">
              <button
                onClick={() => setActiveTab(key)}
                className="flex flex-col items-center gap-1.5 px-2"
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-200",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {idx + 1}
                </div>
                <span
                  className={cn(
                    "font-mono text-[11px] transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {STEP_LABELS[key]}
                </span>
              </button>
              {idx < TAB_KEYS.length - 1 && (
                <Separator className="w-8 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}