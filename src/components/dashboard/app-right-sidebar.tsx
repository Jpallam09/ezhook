"use client";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { useToc } from "@/hooks/use-toc";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function AppRightSidebar() {
  const headings = useToc("main");
  const [activeId, setActiveId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

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
      side="right"
      className="hidden lg:flex static min-h-full border-l border-border/50"
      collapsible="none"
      variant="sidebar"
    >
      {/* Header */}
      <SidebarHeader className="h-14 shrink-0 flex items-start justify-center px-5 pt-3 border-b border-border/40">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          On this page
        </span>
      </SidebarHeader>

      {/* Scroll container with fades */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {/* Top fade */}
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-6 z-10 transition-opacity duration-200 bg-linear-to-b from-sidebar to-transparent"
          style={{ opacity: fadeTop ? 1 : 0 }}
        />

        <SidebarContent
          ref={scrollRef}
          className="h-full overflow-y-auto py-4 scrollbar-none"
        >
          <div className="px-5">
            {/* Left border track */}
            <div className="relative border-l border-border/40 pl-3">
              <ul className="flex flex-col gap-0.5">
                {headings.map((heading) => {
                  const isActive = activeId === heading.id;
                  return (
                    <li
                      key={heading.id}
                      className={cn(
                        "relative",
                        heading.level === 3 && "pl-3"
                      )}
                    >
                      {/* Active indicator dot on the track */}
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute -left-4 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-sidebar"
                        />
                      )}

                                            <a
                        href={`#${heading.id}`}
                        className={cn(
                          "block py-1 font-mono text-[12px] tracking-tight transition-all duration-150 leading-snug",
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground/60 hover:text-foreground"
                        )}
                      >
                        {heading.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </SidebarContent>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-6 z-10 transition-opacity duration-200 bg-linear-to-t from-sidebar to-transparent"
          style={{ opacity: fadeBottom ? 1 : 0 }}
        />
      </div>
    </Sidebar>
  );
}