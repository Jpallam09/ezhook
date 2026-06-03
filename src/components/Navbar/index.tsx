"use client";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <header className="z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.15)]">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Image src="/f-ezhook-logo-1.png" alt="Logo" width={130} height={35} priority />
        </Link>

        {/* Right side: nav + search together */}
        <div className="flex items-center gap-2">

                    {/* Search bar flush to the nav */}
          <div className="relative flex items-center h-9 w-48">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-white/40" />
            <Input 
              placeholder="Search..." 
              className="pl-8 pr-12 h-full text-[13px] bg-white/6 border-white/10t-white/70 placeholder:text-white/40" 
            />
            <div className="absolute right-2.5">
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:bg-white/[0.07] hover:text-white data-[state=open]:bg-white/[0.07] data-[state=open]:text-white">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-slate-950/80 backdrop-blur-xl border border-white/8ow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_48px_rgba(0,0,0,0.4)] rounded-xl">
                  <ul className="grid w-100 gap-3 p-4">
                    <li>
                      <NavigationMenuLink href="/components" className="text-white/70 hover:text-white hover:bg-white/[0.07]">
                        Components
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/templates" className="text-white/70 hover:text-white hover:bg-white/[0.07]">
                        Templates
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/blocks" className="text-white/70 hover:text-white hover:bg-white/[0.07]">
                        Blocks
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/docs" className="text-white/70 hover:text-white hover:bg-white/[0.07]">
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

      </div>
    </header>
  );
}