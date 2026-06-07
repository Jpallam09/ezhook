"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Pnpm, Npm, Bun } from "@dev.icons/react";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

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
    <div className="flex items-center gap-0.5 rounded-md border border-border/50 bg-muted/40 p-0.5">
      {PM_OPTIONS.map(({ id, label, Icon }) => {
        const isSelected = selected === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              "flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-medium transition-all duration-150",
              isSelected
                ? "bg-background text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground/60 hover:text-foreground hover:bg-background/50"
            )}
          >
            <Icon className="size-3.5 shrink-0" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}