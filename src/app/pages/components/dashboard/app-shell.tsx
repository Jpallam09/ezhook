import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FullWidthDivider } from "@/app/pages/components/dashboard/full-width-divider";
import { AppHeader } from "@/app/pages/components/dashboard/app-header";
import { AppSidebar } from "@/app/pages/components/dashboard/app-sidebar";
import { AppRightSidebar } from "@/app/pages/components/dashboard/app-right-sidebar";
import { Main } from "@/app/pages/components/dashboard/Main";

export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="overflow-hidden">
			<SidebarProvider className="relative h-svh w-full">
				<FullWidthDivider className="top-14 z-60 -translate-y-px" />
				<AppSidebar />
				<SidebarInset>
					<AppHeader />
					<Main>{children}</Main>
				</SidebarInset>
				<AppRightSidebar />
			</SidebarProvider>
		</div>
	);
}
