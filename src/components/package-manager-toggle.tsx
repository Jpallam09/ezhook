"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Pnpm, Npm, Bun } from "@dev.icons/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

// ─── Package Manager Toggle ───────────────────────────────────────────────────

const PM_OPTIONS: { id: PackageManager; label: string; Icon: React.ElementType }[] = [
  { id: "npm",  label: "npm",  Icon: Npm  },
  { id: "pnpm", label: "pnpm", Icon: Pnpm },
  { id: "bun",  label: "bun",  Icon: Bun  },
];

export function PackageManagerToggle({
  selected,
  onSelect,
}: {
  selected: PackageManager;
  onSelect: (pm: PackageManager) => void;
}) {
  return (
    <div className="flex gap-1">
      {PM_OPTIONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-1 text-xs font-medium transition-colors",
            selected === id
              ? "border-foreground bg-background text-foreground ring-1 ring-foreground"
              : "border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Icon className="size-4" />
          {" " + label}
        </button>
      ))}
    </div>
  );
}
