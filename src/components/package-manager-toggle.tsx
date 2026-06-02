"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Pnpm, Npm, Bun } from "@dev.icons/react";
import { Button } from "@/components/ui/button";

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
        <Button
          key={id}
          variant="link"
          size="xs"
          onClick={() => onSelect(id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 transition-colors",
            selected === id
              ? "text-foreground underline"
              : "text-muted-foreground hover:text-foreground hover:no-underline"
          )}
        >
          <Icon className="size-4" />
          {" " + label}
        </Button>
      ))}
    </div>
  );
}
