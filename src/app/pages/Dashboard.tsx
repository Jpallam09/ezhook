"use client";

import { InstallContainer } from "@/components/install-container";

export default function Dashboard() {
  const dummyHook = {
    name: "use-local-storage",
    description: "Persist state to localStorage with automatic JSON serialization.",
    usage: `import { useState } from 'react';\n\nexport function useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    if (typeof window === "undefined") return initialValue;\n    const item = window.localStorage.getItem(key);\n    return item ? JSON.parse(item) : initialValue;\n  });\n  // ...\n}`
  };

  return (
    <div >
      <h2 className="text-2xl font-bold">Registry Dashboard</h2>
      <InstallContainer hook={dummyHook} />
    </div>
  );
}
