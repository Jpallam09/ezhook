import { AppShell } from "@/components/dashboard/app-shell";
import { CodeBlock } from "@/components/CodeBlocks/code-block";
import { InstallContainer } from "@/components/CodeBlocks/install-container";
import { Hook, CATEGORIES } from "@/registry";

interface HookDocsProps {
  hook: Hook;
}

export function HookDocs({ hook }: HookDocsProps) {
  return (
    <AppShell mainClassName="p-0">
      <div className="max-w-3xl w-full mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="mb-20">
          {/* Breadcrumb */}
          <p className="text-xs font-mono text-muted-foreground/50 tracking-widest uppercase mb-6">
            Hooks / {CATEGORIES[hook.category]}
          </p>
          {/* Title + description */}
          <div className="flex items-center gap-4 mb-3">
            <h1 id="title" className="text-4xl font-extrabold tracking-tight">
              {hook.name}
            </h1>
            {hook.status && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                {hook.status}
              </span>
            )}
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {hook.description}
          </p>
        </div>

        {/* Content Container with Gap */}
        <div className="flex flex-col gap-24">
          {/* Installation */}
          <section>
            <h2
              id="installation"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4"
            >
              Installation
            </h2>
            <InstallContainer hook={hook} />
          </section>

          {/* Usage */}
          <section>
            <h2
              id="usage"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4"
            >
              Usage
            </h2>
            <CodeBlock code={hook.usage} language="tsx" />
          </section>

          {/* API Reference */}
          {hook.api && hook.api.length > 0 && (
            <section>
              <h2
                id="api-reference"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4"
              >
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
                    {hook.api.map((row, i) => (
                      <tr
                        key={row.name}
                        className={
                          i < hook.api.length - 1
                          ? "border-b border-border/40"
                          : ""
                        }
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
          )}

          {/* Examples */}
          {hook.examples && hook.examples.length > 0 && (
            <section>
              <h2
                id="examples"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-8"
              >
                Examples
              </h2>

              <div className="flex flex-col gap-8">
                {hook.examples.map((example) => (
                  <div key={example.name}>
                    <h3
                      id={`examples-${example.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-base font-semibold tracking-tight mb-1"
                    >
                      {example.name}
                    </h3>
                    <p className="text-[13px] text-muted-foreground mb-4">
                      {example.description}
                    </p>
                    <CodeBlock
                      code={example.code}
                      language="tsx"
                      collapsible
                      fileName={`${example.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}.tsx`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </AppShell>
  );
}
