import { Hook } from "../schema";

export const useDebounce: Hook = {
  slug: "use-debounce",
  name: "useDebounce",
  description:
    "Debounces a value, delaying updates until after a specified idle period. Useful for search inputs, resize handlers, and any scenario where you want to limit how often a value triggers downstream effects.",
  usage: `import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";

export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}`,
  category: "timing",
  api: [
    { name: "value", type: "T", description: "The value to debounce." },
    { name: "delay", type: "number", description: "Delay in milliseconds before the value updates." },
  ],
  examples: [
    {
      name: "Search Input",
      description: "Delays the search query until the user stops typing.",
      code: `import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";

export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}`,
    },
    {
      name: "Window Resize",
      description: "Prevents the resize handler from firing on every pixel change.",
      code: `import { useDebounce } from "@/hooks/use-debounce";
import { useState, useEffect } from "react";

export function WindowResize() {
  const [size, setSize] = useState(window.innerWidth);
  const debouncedSize = useDebounce(size, 300);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>Window width: {debouncedSize}</div>;
}`,
    },
  ],
  sourceCode: {
    hook: {
      fileName: "use-debounce.ts",
      code: `import { useState, useEffect } from 'react';

/**
 * A hook that debounces a value, delaying updates until after a specified delay.
 * 
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {T} - The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
`
    }
  },
};
