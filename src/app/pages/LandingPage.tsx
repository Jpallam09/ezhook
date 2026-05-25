"use client";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TerminalSection } from "./components/TerminalSection";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <BackgroundRippleEffect />
      <Navbar />
      <HeroSection />
      <TerminalSection />
    </div>
  );
}
