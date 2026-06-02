"use client";

import { useState } from "react";
import { PackageManagerToggle, PackageManager } from "@/components/package-manager-toggle";
import { InstallCodeBlock } from "@/components/install-code-block";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
      case "npm": return `npm ezhook@latest add ${hook.name}`;
      case "pnpm": return `pnpm ezhook@latest add ${hook.name}`;
      case "yarn": return `yarn dlx ezhook@latest add ${hook.name}`;
      case "bun": return `bun ezhook@latest add ${hook.name}`;
    }
  };

  return (
    <div className={cn("max-w-2xl mx-auto w-full", className)}>
      <Card>
        <Tabs defaultValue="cli" className="w-full">
          <div className="flex items-center justify-between px-6 pt-4">
            <TabsList variant="line">
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="mt-2" />
          <CardContent className="pt-4 pb-4">
            <TabsContent value="cli" className="mt-0">
              <div className="flex items-center justify-end mb-2">
                <PackageManagerToggle selected={manager} onSelect={setManager} />
              </div>
              <InstallCodeBlock code={getCommand(manager)} />
            </TabsContent>
            <TabsContent value="manual" className="mt-0">
              <CodeBlockWrapper>
                <p className="text-sm text-muted-foreground p-4">
                  Manual installation steps for {hook.name} will be here.
                </p>
              </CodeBlockWrapper>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
