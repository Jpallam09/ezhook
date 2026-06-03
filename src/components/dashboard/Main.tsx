import React from "react";
import { cn } from "@/lib/utils";

interface MainProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
	mainClassName?: string;
}

/**
 * Main content container for the dashboard.
 * Encapsulates the scrollable area and consistent padding.
 */
export function Main({ children, className, mainClassName, ...props }: MainProps) {
	return (
		<div
			className={cn("flex flex-1 overflow-hidden bg-background text-foreground", className)}
			{...props}
		>
			<main className={cn("flex-1 overflow-y-auto p-4 md:p-6", mainClassName)}>
				{children}
			</main>
		</div>
	);
}
