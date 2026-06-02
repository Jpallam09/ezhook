import { AppShell } from "@/app/pages/components/dashboard/app-shell";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallContainer } from "@/components/install-container";

export default function UseDebouncePage() {
  const hookData = {
    name: "use-debounce",
    description: "A hook that debounces a value, delaying updates until after a specified delay.",
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
}`
  };

  return (
    <AppShell>
      <div className="max-w-3xl space-y-8 p-6">
        {/* 1. Breadcrumb */}
        <p className="text-sm text-muted-foreground">Hooks / useDebounce</p>

        {/* 2. Title */}
        <h1 id="title" className="text-4xl font-extrabold tracking-tight">useDebounce</h1>

        {/* 3. Description */}
        <p className="text-lg text-muted-foreground">{hookData.description}</p>

        {/* 4. Installation */}
        <h2 id="installation" className="text-2xl font-semibold tracking-tight">Installation</h2>
        <InstallContainer hook={hookData} />

        {/* 5. Usage */}
        <h2 id="usage" className="text-2xl font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={hookData.usage} language="tsx" />

        {/* 6. API Reference */}
        <h2 id="api-reference" className="text-2xl font-semibold tracking-tight">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">value</td>
                <td className="p-3 font-mono text-xs">T</td>
                <td className="p-3">The value to debounce.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">delay</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3">The delay in milliseconds.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 7. Examples */}
        <h2 id="examples" className="text-2xl font-semibold tracking-tight">Examples</h2>
        
        <h3 id="examples-search-input" className="text-xl font-semibold tracking-tight">Search Input</h3>
        <CodeBlock code={hookData.usage} language="tsx" collapsible={true} fileName="search-input.tsx" />

        <h3 id="examples-window-resize" className="text-xl font-semibold tracking-tight">Window Resize</h3>
        <CodeBlock code={`import { useDebounce } from "@/hooks/use-debounce";
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
}`} language="tsx" collapsible={true} fileName="resize.tsx" />
      </div>
    </AppShell>
  );
}
