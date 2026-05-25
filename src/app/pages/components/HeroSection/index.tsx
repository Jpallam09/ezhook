"use client";

import SlideTextButton from "@/components/ui/slide-text-button";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-16 overflow-hidden px-4 py-24">
      {/* Scoped Background Effect */}
      <div className="absolute inset-0 z-0">
        <BackgroundRippleEffect rows={12} cols={30} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl lg:text-8xl">
          EzHook
        </h1>
        <p className="max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
          A zero-backend, zero-cost remote registry for your custom React hooks.
          Built for the <span className="text-foreground font-medium">shadcn/ui</span> workflow.
        </p>
      </div>

      <div className="relative z-10">
        <SlideTextButton 
          text="Browse Hooks" 
          hoverText="Search Registry" 
          href="#gallery"
        />
      </div>
    </section>
  );
}
