"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TerminalSection } from "@/components/TerminalSection";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <Navbar />
      <HeroSection />
      <TerminalSection />
      <Footer/>
    </div>
  );
}
