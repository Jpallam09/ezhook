"use client";

import { Logo } from "@/app/pages/components/dashboard/logo";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
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

				{/* Hook selection will go here */}
			</SidebarContent>
		</Sidebar>
	);
}
