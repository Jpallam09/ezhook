"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";

export function AppRightSidebar() {
	return (
		<Sidebar
			side="right"
			className="static min-h-full"
			collapsible="none"
			variant="sidebar"
		>
			<SidebarHeader className="relative h-14 justify-center px-2 py-0">
			</SidebarHeader>
			<SidebarContent>
				{/* Add right panel content here */}
			</SidebarContent>
		</Sidebar>
	);
}
