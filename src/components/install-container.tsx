"use client";
import { useState } from "react";
import { PackageManagerToggle, PackageManager } from "@/components/package-manager-toggle";
import { InstallCodeBlock } from "@/components/install-code-block";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HookData {
  name: string;
  description: string;
  usage: string;
}

export function InstallContainer({
  hook,
  className,
}: {
  hook: HookData;
  className?: string;
}) {
  const [manager, setManager] = useState<PackageManager>("npm");

  const getCommand = (mgr: PackageManager) => {
    switch (mgr) {
      case "npm":  return `npm ezhook@latest add ${hook.name}`;
      case "pnpm": return `pnpm ezhook@latest add ${hook.name}`;
      case "yarn": return `yarn dlx ezhook@latest add ${hook.name}`;
      case "bun":  return `bun ezhook@latest add ${hook.name}`;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="cli" className="w-full">
        {/* Tab bar row */}
        <div className="flex items-center justify-between border-b border-border/50 px-1">
          <TabsList variant="line" className="gap-1">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
        </div>

        {/* CLI tab */}
        <TabsContent value="cli" className="mt-0">
          <div className="rounded-b-lg border border-t-0 border-border/50 bg-muted/30">
            {/* Package manager toggle — sits in its own slim toolbar */}
            <div className="flex items-center justify-end px-4 py-2 border-b border-border/40">
              <PackageManagerToggle selected={manager} onSelect={setManager} />
            </div>
            {/* Command */}
            <div className="px-4 py-3">
              <InstallCodeBlock code={getCommand(manager)} />
            </div>
          </div>
        </TabsContent>

        {/* Manual tab */}
        <TabsContent value="manual" className="mt-0">
          <div className="rounded-b-lg border border-t-0 border-border/50 bg-muted/30">
            <CodeBlockWrapper>
              <p className="text-sm text-muted-foreground px-4 py-4">
                Manual installation steps for{" "}
                <code className="font-mono text-foreground/80 text-[12px] bg-accent px-1.5 py-0.5 rounded">
                  {hook.name}
                </code>{" "}
                will be here.
              </p>
            </CodeBlockWrapper>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}