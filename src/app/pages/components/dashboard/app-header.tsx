"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { SearchDialog } from "@/app/pages/components/dashboard/SearchDialog";
import { Kbd } from "@/components/ui/kbd";

export function AppHeader() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsSearchOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 bg-background px-4 md:px-6"
			)}
		>
			<div className="flex items-center gap-2">
				<SidebarTrigger className="md:hidden" />
				<Separator
					className="mr-2 data-[orientation=vertical]:h-4 md:hidden"
					orientation="vertical"
				/>
			</div>
			
			<div className="flex items-center gap-4">
				<div className="relative hidden w-64 md:flex">
					<div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
						<SearchIcon className="h-4 w-4 text-muted-foreground" />
					</div>
					<Input
						placeholder="Search..."
						className="pl-8 pr-16"
						onClick={() => setIsSearchOpen(true)}
						readOnly
					/>
					<div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
						<Kbd>Ctrl+K</Kbd>
					</div>
				</div>
				<Button aria-label="Search" size="icon" variant="ghost" className="md:hidden" onClick={() => setIsSearchOpen(true)}>
					<SearchIcon />
				</Button>
			</div>
			
			<SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
		</header>
	);
}
