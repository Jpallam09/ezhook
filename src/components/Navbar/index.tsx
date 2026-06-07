"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/dashboard/logo";

const NAV_LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "Registry", href: "/docs/use-debounce" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-12 items-center gap-4 px-6">
        {/* Logo */}
        <Logo/>
        <Separator orientation="vertical" className="h-4" />
        {/* Nav links */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}