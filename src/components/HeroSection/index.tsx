"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DottedSurface } from "@/components/ui/dotted-surface";

const STATS = [
  { value: "48+", label: "hooks" },
  { value: "shadcn", label: "compatible" },
  { value: "zero", label: "vendor lock-in" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-24">
      {/* Animated dot background */}
      <aside className="absolute inset-0 z-0">
        <DottedSurface />
      </aside>

      {/* Badge */}
      <div className="relative z-10 mb-6">
        <Badge variant="outline" className="gap-1.5 rounded-full px-3 py-1 font-mono text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]" />
          Registry is now live
        </Badge>
      </div>

      {/* Headline */}
      <h1 className="relative z-10 mb-4 max-w-140 text-center text-[clamp(38px,6vw,64px)] font-semibold leading-[1.05] tracking-tight text-foreground">
        ezhook
      </h1>

      {/* Sub */}
      <p className="relative z-10 mb-8 max-w-120 text-balance text-center text-sm leading-relaxed text-muted-foreground">
        A zero-cost remote registry for custom React hooks. Seamlessly inject
        hooks into your workspace using the native{" "}
        <span className="font-medium text-foreground">shadcn/ui</span> CLI.
      </p>

      {/* CTAs */}
      <nav className="relative z-10 flex items-center gap-2">
        <Button size="sm" asChild>
          <Link href="/docs/use-debounce">
            Browse Hooks
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/docs">View docs</Link>
        </Button>
      </nav>

      {/* Stat strip */}
      <div className="relative z-10 mt-10 flex w-full max-w-sm items-center justify-center gap-6 border-t pt-7">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-lg font-semibold leading-none tracking-tight text-foreground">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                {s.label}
              </div>
            </div>
            {i < STATS.length - 1 && (
              <Separator orientation="vertical" className="h-6" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}