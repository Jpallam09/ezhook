export type TocHeading = {
  id: string
  text: string
  level: 2 | 3
}

export function extractHeadings(containerSelector: string): TocHeading[] {
  const container = document.querySelector(containerSelector)
  if (!container) return []

  const headings = container.querySelectorAll("h2, h3")
  const toc: TocHeading[] = []

  headings.forEach((heading) => {
    const id = heading.id
    const text = heading.textContent || ""
    const level = heading.tagName === "H2" ? 2 : 3

    if (id && text) {
      toc.push({ id, text, level })
    }
  })

  return toc
}
