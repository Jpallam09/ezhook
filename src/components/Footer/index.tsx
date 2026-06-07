"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "MIT License", href: "/license" },
];

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="flex h-12 items-center justify-between px-6">
        {/* Logo + copyright */}
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded-lg bg-foreground">
            <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 11L6.5 2L11 11"
                stroke="hsl(var(--background))"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 8.5H9.5"
                stroke="hsl(var(--background))"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground">© 2026 ezhook</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-1">
          {LINKS.map((link, i) => (
            <div key={link.label} className="flex items-center gap-1">
              {i > 0 && <Separator orientation="vertical" className="h-3" />}
              <Link
                href={link.href}
                className="rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}