"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { useToc } from "@/hooks/use-toc";
import { cn } from "@/lib/utils";

export function AppRightSidebar() {
    const headings = useToc("main");

	return (
		<Sidebar
			side="right"
			className="hidden lg:flex static min-h-full"
			collapsible="none"
			variant="sidebar"
		>
			<SidebarHeader className="relative h-14 justify-center px-4 py-0 font-semibold">
                On this page
			</SidebarHeader>
			<SidebarContent className="px-4 py-2">
				<ul className="space-y-2 text-sm text-muted-foreground">
                    {headings.map((heading) => (
                        <li key={heading.id} className={cn(heading.level === 3 && "pl-4")}>
                            <a href={`#${heading.id}`} className="hover:text-foreground transition-colors">
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
			</SidebarContent>
		</Sidebar>
	);
}
