"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { extractHeadings, type TocHeading } from "@/lib/toc"

export function useToc(containerSelector: string) {
  const [headings, setHeadings] = useState<TocHeading[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const updateToc = () => {
      setHeadings(extractHeadings(containerSelector))
    }

    // Run after component mount
    updateToc()

    // Add a small delay to ensure content is rendered
    const timer = setTimeout(updateToc, 100)
    return () => clearTimeout(timer)
  }, [containerSelector, pathname])

  return headings
}
