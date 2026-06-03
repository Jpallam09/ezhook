import { AppShell } from "@/app/pages/components/dashboard/app-shell";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallContainer } from "@/components/install-container";

const hookData = {
  name: "use-debounce",
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
};

const apiRows = [
  { name: "value", type: "T", description: "The value to debounce." },
  { name: "delay", type: "number", description: "Delay in milliseconds before the value updates." },
];

export default function UseDebouncePage() {
  return (
    <AppShell>
      <div className="max-w-3xl w-full mx-auto px-8 py-12">

        {/* Header Section */}
        <div className="mb-20">
            {/* Breadcrumb */}
            <p className="text-xs font-mono text-muted-foreground/50 tracking-widest uppercase mb-6">
            Hooks / useDebounce
            </p>

            {/* Title + description */}
            <h1 id="title" className="text-4xl font-extrabold tracking-tight mb-3">
            useDebounce
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {hookData.description}
            </p>
        </div>

        {/* Content Container with Gap */}
        <div className="flex flex-col gap-24">
            {/* Installation */}
            <section>
                <h2 id="installation" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
                    Installation
                </h2>
                <InstallContainer hook={hookData} />
            </section>

            {/* Usage */}
            <section>
                <h2 id="usage" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
                    Usage
                </h2>
                <CodeBlock code={hookData.usage} language="tsx" />
            </section>

            {/* API Reference */}
            <section>
                <h2 id="api-reference" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
                    API Reference
                </h2>
                <div className="rounded-lg border border-border/60 overflow-hidden">
                    <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border/60 bg-muted/40">
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 w-32">
                            Name
                        </th>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 w-32">
                            Type
                        </th>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                            Description
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiRows.map((row, i) => (
                        <tr
                            key={row.name}
                            className={i < apiRows.length - 1 ? "border-b border-border/40" : ""}
                        >
                            <td className="px-4 py-3 font-mono text-[12px] text-foreground/80">
                            {row.name}
                            </td>
                            <td className="px-4 py-3 font-mono text-[12px] text-primary/80">
                            {row.type}
                            </td>
                            <td className="px-4 py-3 text-[13px] text-muted-foreground">
                            {row.description}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </section>

            {/* Examples */}
            <section>
                <h2 id="examples" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-8">
                    Examples
                </h2>

                <div className="flex flex-col gap-8">
                    <div>
                        <h3 id="examples-search-input" className="text-base font-semibold tracking-tight mb-1">
                        Search Input
                        </h3>
                        <p className="text-[13px] text-muted-foreground mb-4">
                        Delays the search query until the user stops typing.
                        </p>
                        <CodeBlock
                        code={hookData.usage}
                        language="tsx"
                        collapsible
                        fileName="search-input.tsx"
                        />
                    </div>

                    <div>
                        <h3 id="examples-window-resize" className="text-base font-semibold tracking-tight mb-1">
                        Window Resize
                        </h3>
                        <p className="text-[13px] text-muted-foreground mb-4">
                        Prevents the resize handler from firing on every pixel change.
                        </p>
                        <CodeBlock
                        code={`import { useDebounce } from "@/hooks/use-debounce";
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
}`}
                        language="tsx"
                        collapsible
                        fileName="resize.tsx"
                        />
                    </div>
                </div>
            </section>
        </div>
      </div>
    </AppShell>
  );
}
