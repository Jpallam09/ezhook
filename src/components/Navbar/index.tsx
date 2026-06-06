"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-foreground">
            <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 11L6.5 2L11 11"
                stroke="hsl(var(--background))"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 8.5H9.5"
                stroke="hsl(var(--background))"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight">ezhook</span>
        </Link>

        <Separator orientation="vertical" className="h-4" />

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
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

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/docs/use-debounce">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}