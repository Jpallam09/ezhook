import React from "react";
import { cn } from "@/lib/utils";

interface MainProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

/**
 * Main content container for the dashboard.
 * Encapsulates the scrollable area and consistent padding.
 */
export function Main({ children, className, ...props }: MainProps) {
	return (
		<div 
			className={cn("flex flex-1 overflow-hidden bg-background text-foreground", className)} 
			{...props}
		>
			<main className="flex-1 overflow-y-auto p-4 md:p-6">
				{children}
			</main>
		</div>
	);
}
