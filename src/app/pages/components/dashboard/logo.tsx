import type React from "react";
import Image from "next/image";
import logoImg from "../../../../../public/ezhook-dashboard-logo.ico";
import { cn } from "@/lib/utils";

/**
 * Standard Logo component for the application.
 * Uses static import to maintain proportions automatically.
 */
export const Logo = ({ className, ...props }: Partial<React.ComponentProps<typeof Image>>) => (
	<Image
		src={logoImg}
		alt="Logo"
		priority
		className={cn("h-6 w-auto object-contain", className)}
		{...props}
	/>
);

/**
 * Smaller icon version of the logo.
 */
export const LogoIcon = ({ className, ...props }: Partial<React.ComponentProps<typeof Image>>) => (
	<Image
		src={logoImg}
		alt="Logo Icon"
		className={cn("h-5 w-auto object-contain", className)}
		{...props}
	/>
);
