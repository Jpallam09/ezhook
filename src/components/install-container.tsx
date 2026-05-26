"use client";

import { useState } from "react";
import { PackageManagerToggle, PackageManager } from "@/components/package-manager-toggle";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      case "npm": return `npx ezhook@latest add ${hook.name}`;
      case "pnpm": return `pnpx ezhook@latest add ${hook.name}`;
      case "yarn": return `yarn dlx ezhook@latest add ${hook.name}`;
      case "bun": return `bunx ezhook@latest add ${hook.name}`;
    }
  };

  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {/* Detail/Preview Card */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>{hook.name}</CardTitle>
          <CardDescription>{hook.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <CodeBlock code={hook.usage} language="typescript" />
        </CardContent>
      </Card>

      {/* Combined Install Block */}
      <Card className="p-4 space-y-4">
        <h3 className="font-semibold text-sm">Installation</h3>
        <PackageManagerToggle selected={manager} onSelect={setManager} />
        <Separator />
        <CodeBlock code={getCommand(manager)} language="bash" />
      </Card>
    </div>
  );
}
