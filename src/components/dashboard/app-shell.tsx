import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FullWidthDivider } from "@/components/dashboard/full-width-divider";
import { AppHeader } from "@/components/dashboard/app-header";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { AppRightSidebar } from "@/components/dashboard/app-right-sidebar";
import { Main } from "@/components/dashboard/Main";

export function AppShell({ children, mainClassName }: { children: React.ReactNode; mainClassName?: string }) {
	return (
		<div className="overflow-hidden">
			<SidebarProvider className="relative h-svh w-full">
				<FullWidthDivider className="top-14 z-60 -translate-y-px" />
				<AppSidebar />
				<SidebarInset>
					<AppHeader />
					<Main mainClassName={mainClassName}>{children}</Main>
				</SidebarInset>
				<AppRightSidebar />
			</SidebarProvider>
		</div>
	);
}
