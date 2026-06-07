"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/dashboard/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { registry, CATEGORIES, HookCategory } from "@/registry";

export function AppSidebar() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);

  // Group hooks by category
  const groupedHooks = Object.values(registry).reduce((acc, hook) => {
    if (!acc[hook.category]) {
      acc[hook.category] = [];
    }
    acc[hook.category].push(hook);
    return acc;
  }, {} as Record<HookCategory, typeof registry[string][]>);

  const updateFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setFadeTop(el.scrollTop > 8);
    setFadeBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFades();
    el.addEventListener("scroll", updateFades, { passive: true });
    const ro = new ResizeObserver(updateFades);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFades);
      ro.disconnect();
    };
  }, []);

  return (
    <Sidebar
      className="static min-h-full border-r border-border/50 bg-sidebar"
      collapsible="icon"
      variant="sidebar"
    >
      {/* Header */}
      <div className="h-14 flex items-center px-4 border-b border-border/40 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>

      {/* Scroll container with fades */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {/* Top fade */}
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-8 z-10 transition-opacity duration-200 bg-linear-to-b from-sidebar to-transparent"
          style={{ opacity: fadeTop ? 1 : 0 }}
        />

        {/* Scrollable area */}
        <SidebarContent
          ref={scrollRef}
          className="h-full overflow-y-auto px-2 py-3 scrollbar-none"
        >
          {Object.entries(CATEGORIES).map(([category, label]) => {
            const categoryHooks = groupedHooks[category as HookCategory];
            if (!categoryHooks || categoryHooks.length === 0) return null;

            return (
              <SidebarGroup key={category}>
                <SidebarGroupLabel className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {label}
                </SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {categoryHooks.map((hook) => {
                      const href = `/docs/${hook.slug}`;
                      const isActive = pathname === href;
                      return (
                        <SidebarMenuItem key={hook.slug}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className={[
                              "group relative w-full rounded-md px-3 py-2 text-sm font-medium transition-all duration-150",
                              "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                              isActive
                                ? "bg-accent text-foreground font-semibold shadow-sm"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            <Link
                              href={href}
                              className="flex items-center justify-between gap-2.5"
                            >
                              <div className="flex items-center gap-2.5">
                                {isActive && (
                                  <span
                                    aria-hidden
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-r-full bg-primary"
                                  />
                                )}
                                <span className="font-mono text-[13px] tracking-tight">
                                  {hook.name}
                                </span>
                              </div>
                              {hook.status && (
                                <span className="text-[9px] font-bold uppercase tracking-tight bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 leading-none">
                                  {hook.status}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-8 z-10 transition-opacity duration-200 bg-linear-to-t from-sidebar to-transparent"
          style={{ opacity: fadeBottom ? 1 : 0 }}
        />
      </div>
    </Sidebar>
  );
}