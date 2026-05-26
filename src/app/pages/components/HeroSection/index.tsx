"use client";

import SlideTextButton from "@/components/ui/slide-text-button";
import { Badge } from "@/components/ui/badge";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-16 overflow-hidden px-4 py-24 outline-1 outline-white/30 outline-offset-2">
      {/* Scoped Background Effect */}
      <aside className="absolute inset-0 z-0">
        <BackgroundRippleEffect rows={12} cols={30} />
      </aside>

      <header className="relative z-10 flex flex-col items-center gap-6 text-center">
        <Badge variant="outline" className="text-white/70 bg-white/5 border-white/10 px-3 py-1">
          <span className="mr-1">✨</span>
          Registry is now live
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl lg:text-8xl">
          ezhook
        </h1>
        <p className="max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
          A zero-cost remote registry for custom React hooks. Seamlessly inject hooks into your workspace using the native <span className="text-foreground font-medium">shadcn/ui</span> CLI.
        </p>
      </header>

      <nav className="relative z-10">
        <SlideTextButton 
          text="Browse Hooks" 
          hoverText="Search Registry" 
          href="#"
        />
      </nav>
    </section>
  );
}
