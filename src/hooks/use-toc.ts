/**
 * @name useToc
 * @description Extracts headings from a content container to build a table of contents.
 * @dependencies none
 */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { extractHeadings, type TocHeading } from "@/lib/toc";

export function useToc(containerSelector: string) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const updateToc = () => {
      setHeadings(extractHeadings(containerSelector));
    };

    updateToc();

    const timer = setTimeout(updateToc, 100);
    return () => clearTimeout(timer);
  }, [containerSelector, pathname]);

  return headings;
}
