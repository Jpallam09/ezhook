"use client";

import Link from "next/link";
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
  );
}
