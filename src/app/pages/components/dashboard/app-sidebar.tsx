"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/app/pages/components/dashboard/logo";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
    const pathname = usePathname();

	return (
		<Sidebar
			className="static min-h-full border-r"
			collapsible="none"
			variant="sidebar"
		>
			<SidebarHeader className="relative h-14 justify-center px-2 py-0">
				<div className="flex items-center px-3">
					<Logo />
				</div>
			</SidebarHeader>
			<SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/use-debounce"}>
                            <Link href="/dashboard/use-debounce">useDebounce</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
}
