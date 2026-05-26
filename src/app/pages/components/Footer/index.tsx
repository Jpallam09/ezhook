import { BookOpen, Home, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Docs", href: "/docs", icon: BookOpen },
  { label: "Hooks", href: "/hooks", icon: Zap },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background">
      <Separator className="bg-white/10" />
      <div className="container mx-auto px-6 py-8">
        <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <article className="flex flex-col gap-1">
            <h2 className="font-mono text-sm font-semibold tracking-tight text-foreground">
              ezhook<span className="text-primary">.</span>
            </h2>
            <p className="font-mono text-xs text-muted-foreground">
              Built for developers, by a developer.
            </p>
          </article>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <Button
                key={label}
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 px-2 font-mono text-xs text-muted-foreground hover:text-foreground"
                onClick={() => window.location.href = href}
              >
                <Icon size={12} />
                {label}
              </Button>
            ))}
          </nav>
        </section>

        {/* Bottom bar */}
        <Separator className="my-4 bg-white/5" />
        <section>
          <p className="font-mono text-xs text-muted-foreground/50">
            © {currentYear} ezhook. All rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
};