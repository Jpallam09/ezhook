"use client";

import Link from "next/link";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import {TerminalUiBg} from "@/components/ui/terminalUiBg"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
  type TabContent,
  type TerminalLine,
} from "@/components/ui/terminal-animation";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const tabs = [
    {
      label: "install",
      command: "npm install",
      lines: [
        { text: "", delay: 80 },
        {
          text: "added 1,247 packages in 12s",
          color: "text-[#6FF7CC]",
          delay: 400,
        },
        { text: "", delay: 80 },
        {
          text: "  Cult UI is looking for funding",
          color: "text-slate-400",
          delay: 150,
        },
        {
          text: "    run `npm fund cult-ui` for details",
          color: "text-slate-500",
          delay: 100,
        },
        {
          text: "  +-----------------------+",
          color: "text-[#ED42B5]",
          delay: 120,
        },
        {
          text: "  |       CULT UI         |",
          color: "text-[#ED42B5]",
          delay: 120,
        },
        {
          text: "  |   Shadcn expanded    |",
          color: "text-[#ED42B5]",
          delay: 120,
        },
        {
          text: "  +-----------------------+",
          color: "text-[#ED42B5]",
          delay: 160,
        },
        { text: "", delay: 80 },
        {
          text: "  found 0 vulnerabilities",
          color: "text-[#ADFA1F]",
          delay: 250,
        },
      ],
    },
    {
      label: "build",
      command: "npm run build",
      lines: [
        { text: "", delay: 80 },
        {
          text: "  ▲ Next.js 16.1.6",
          color: "text-slate-300",
          delay: 300,
        },
        { text: "", delay: 80 },
        {
          text: "  Creating an optimized production build...",
          color: "text-slate-400",
          delay: 250,
        },
        {
          text: "  ✓ Compiled successfully",
          color: "text-[#6FF7CC]",
          delay: 200,
        },
        {
          text: "  ✓ Linting and checking validity of types",
          color: "text-[#6FF7CC]",
          delay: 150,
        },
        {
          text: "  ✓ Generating static pages (12/12)",
          color: "text-[#6FF7CC]",
          delay: 150,
        },
        {
          text: "  Route (app)  /  142 kB  |  First Load JS 198 kB",
          color: "text-slate-500",
          delay: 150,
        },
        {
          text: "  Route (app)  /blog 61 kB | First Load JS 57 kB",
          color: "text-slate-500",
          delay: 150,
        },
        {
          text: "  Route (app)  /about 75 kB | First Load JS 92 kB",
          color: "text-slate-500",
          delay: 150,
        },
        { text: "", delay: 80 },
        {
          text: "  ✓ Build completed in 4.2s",
          color: "text-[#6FF7CC]",
          delay: 300,
        },
      ],
    },
    {
      label: "deploy",
      command: "vercel deploy --prod",
      lines: [
        { text: "", delay: 80 },
        { text: "  Vercel CLI 39.2.0", color: "text-slate-400", delay: 200 },
        { text: "", delay: 80 },
        {
          text: "  > Deploying to production...",
          color: "text-[#ED42B5]",
          delay: 300,
        },
        { text: "", delay: 80 },
        { text: "  ✓ Building", color: "text-[#6FF7CC]", delay: 250 },
        { text: "  ✓ Uploading", color: "text-[#6FF7CC]", delay: 200 },
        { text: "  ✓ Finalizing", color: "text-[#6FF7CC]", delay: 200 },
        { text: "", delay: 80 },
        {
          text: "  Production: https://aisdkagents.vercel.app",
          color: "text-[#ED42B5]",
          delay: 400,
        },
        { text: "", delay: 80 },
        {
          text: "  ✓ Deployment complete",
          color: "text-[#6FF7CC]",
          delay: 250,
        },
      ],
    },
    {
      label: "test",
      command: "npm test",
      lines: [
        { text: "", delay: 80 },
        {
          text: "  PASS  src/components/Button.test.tsx",
          color: "text-slate-400",
          delay: 200,
        },
        {
          text: "    ✓ renders correctly",
          color: "text-[#ADFA1F]",
          delay: 100,
        },
        {
          text: "    ✓ handles click events",
          color: "text-[#ADFA1F]",
          delay: 100,
        },
        {
          text: "  PASS  src/utils/format.test.ts",
          color: "text-slate-400",
          delay: 150,
        },
        {
          text: "    ✓ formats currency",
          color: "text-[#ADFA1F]",
          delay: 100,
        },
        {
          text: "    ✓ formats dates",
          color: "text-[#ADFA1F]",
          delay: 100,
        },
        { text: "", delay: 80 },
        {
          text: "  Test Suites: 2 passed, 2 total",
          color: "text-[#ADFA1F]",
          delay: 200,
        },
        {
          text: "  Tests:       4 passed, 4 total",
          color: "text-[#ADFA1F]",
          delay: 150,
        },
        { text: "  Time:        1.234 s", color: "text-slate-500", delay: 100 },
      ],
    },
  ] satisfies TabContent[];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <BackgroundRippleEffect />

      <header className="z-50 w-full">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">Logo</Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid w-100 gap-3 p-4">
                    <li>
                      <NavigationMenuLink href="/components">
                        Components
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink href="/templates">
                        Templates
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink href="/blocks">
                        Blocks
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <div className="mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold md:text-4xl lg:text-7xl">
          Interactive Background Boxes Ripple Effect
        </h2>

        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Hover over the boxes above and click. To be used on backgrounds of
          hero sections OR Call to Action sections.
        </p>
      </div>
    
      <TerminalAnimationRoot
        alwaysDark
        className="relative z-10 flex w-full justify-center overflow-clip "
        tabs={tabs}
        defaultActiveTab={1}
        hideCursorOnComplete={false}
      >
        <TerminalUiBg />
        <TerminalAnimationContainer className="max-w-172">
          <TerminalAnimationWindow className="outline-1 outline-white/30 outline-offset-2">
            <TerminalAnimationContent className="min-h-104">
              <div className="flex items-center gap-2 leading-relaxed">
                <span className="select-none font-mono text-[10px] text-muted-foreground md:text-sm">
                  $
                </span>
                <TerminalAnimationCommandBar
                  className="font-mono text-[10px] text-foreground md:text-sm"
                  cursor={<TerminalAnimationBlinkingCursor />}
                />
              </div>

              <TerminalAnimationOutput
                className="mt-1"
                renderLine={(
                  line: TerminalLine,
                  _i: number,
                  visible: boolean
                ) => {
                  if (!visible) {
                    return null;
                  }

                  return (
                    <div className="leading-relaxed">
                      <span
                        className={cn(
                          "font-mono text-[10px] md:text-sm",
                          line.color ?? "text-muted-foreground"
                        )}
                      >
                        {line.text || "\u00A0"}
                      </span>
                    </div>
                  );
                }}
              />

              <TerminalAnimationTrailingPrompt className="mt-1 flex items-center gap-2 leading-relaxed">
                <span className="select-none font-mono text-sm text-muted-foreground">
                  $
                </span>
                <TerminalAnimationBlinkingCursor />
              </TerminalAnimationTrailingPrompt>
            </TerminalAnimationContent>

            <div className="flex justify-center pb-6">
              <TerminalAnimationTabList className="inline-flex items-center gap-0 rounded-lg border border-border bg-muted/50 px-1 py-1">
                {tabs.map((tab, i) => (
                  <TerminalAnimationTabTrigger
                    key={tab.label}
                    index={i}
                    className={cn(
                      "cursor-pointer rounded-md px-3.5 py-1 font-mono text-sm transition-all duration-150",
                      "data-[state=active]:bg-primary data-[state=active]:font-medium data-[state=active]:text-primary-foreground",
                      "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </TerminalAnimationTabTrigger>
                ))}
              </TerminalAnimationTabList>
            </div>
          </TerminalAnimationWindow>
        </TerminalAnimationContainer>
      </TerminalAnimationRoot>
    </div>
  );
}
