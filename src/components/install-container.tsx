"use client";

import { useState } from "react";
import { PackageManagerToggle, PackageManager } from "@/components/package-manager-toggle";
import { InstallCodeBlock } from "@/components/install-code-block";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface HookData {
  name: string;
  description: string;
  usage: string;
}

import { Separator } from "@/components/ui/separator";

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
    <div className={cn("max-w-lg mx-auto w-full", className)}>
      <Card>
        <CardContent className="flex flex-col gap-4 py-4">
          <div className="flex justify-center">
            <PackageManagerToggle selected={manager} onSelect={setManager} />
          </div>
          <Separator />
          <InstallCodeBlock code={getCommand(manager)} />
        </CardContent>
      </Card>
    </div>
  );
}
