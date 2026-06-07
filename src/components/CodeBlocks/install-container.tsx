"use client";

import { useState } from "react";
import {
  PackageManagerToggle,
  PackageManager,
} from "@/components/CodeBlocks/package-manager-toggle";
import { InstallCodeBlock } from "@/components/CodeBlocks/install-code-block";
import { ManualTabContent } from "@/components/CodeBlocks/manual-tab-content";
import { cn } from "@/lib/utils";
import { Hook } from "@/registry/schema";

type HookData = Hook;
type Tab = "cli" | "manual";

export function InstallContainer({
  hook,
  className,
}: {
  hook: HookData;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("cli");
  const [manager, setManager] = useState<PackageManager>("npm");

  const registryUrl = "https://ezhook.vercel.app";

  const getCommand = (mgr: PackageManager) => {
    const addCommand = `${registryUrl}/r/${hook.slug}`;
    switch (mgr) {
      case "npm":  return `npx shadcn@latest add "${addCommand}"`;
      case "pnpm": return `pnpm dlx shadcn@latest add "${addCommand}"`;
      case "yarn": return `yarn dlx shadcn@latest add "${addCommand}"`;
      case "bun":  return `bunx shadcn@latest add "${addCommand}"`;
    }
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-border/50", className)}>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-3">
        {/* Tab buttons — plain, no TabsList */}
        <div className="flex items-center">
          {(["cli", "manual"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 px-3 py-2.5 font-mono text-xs font-medium transition-colors duration-150 capitalize",
                activeTab === tab
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "cli" ? "CLI" : "Manual"}
            </button>
          ))}
        </div>

        {/* Package manager — only on CLI */}
        {activeTab === "cli" && (
          <PackageManagerToggle selected={manager} onSelect={setManager} />
        )}
      </div>

      {/* ── Content ── */}
      {activeTab === "cli" && (
        <div className="px-4 py-3">
          <InstallCodeBlock code={getCommand(manager)} />
        </div>
      )}

      {activeTab === "manual" && (
        <ManualTabContent sourceCode={hook.sourceCode} />
      )}

    </div>
  );
}