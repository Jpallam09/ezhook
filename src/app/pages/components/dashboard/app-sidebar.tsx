"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/app/pages/components/dashboard/logo";
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

const hooks = [
  { href: "/docs/use-debounce", label: "useDebounce" },
  { href: "#", label: "useBoolean" },
  { href: "#", label: "useLocalStorage" },
  { href: "#", label: "useToggle" },
  { href: "#", label: "useCopyToClipboard" },
  { href: "#", label: "useUnmount" },
  { href: "#", label: "useDebounceCallback" },
  { href: "#", label: "useIsomorphicLayoutEffect" },
  { href: "#", label: "useInterval" },
  { href: "#", label: "useTimeout" },
  { href: "#", label: "useDocumentTitle" },
  { href: "#", label: "useCounter" },
  { href: "#", label: "useMousePosition" },
  { href: "#", label: "useWindowSize" },
  { href: "#", label: "useScrollPosition" },
  { href: "#", label: "useHover" },
  { href: "#", label: "useLockBodyScroll" },
  { href: "#", label: "useEventListener" },
  { href: "#", label: "useIntersectionObserver" },
  { href: "#", label: "useLocalStorageState" },
  { href: "#", label: "useMediaQuery" },
  { href: "#", label: "useNetworkStatus" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);

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
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Hooks
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {hooks.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <SidebarMenuItem key={label}>
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
                        <Link href={href} className="flex items-center gap-2.5">
                          {isActive && (
                            <span
                              aria-hidden
                              className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-r-full bg-primary"
                            />
                          )}
                          <span className="font-mono text-[13px] tracking-tight">
                            {label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
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