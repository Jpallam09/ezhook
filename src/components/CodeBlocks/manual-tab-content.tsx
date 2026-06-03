import { CodeBlock } from "@/components/CodeBlocks/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ManualTabContentProps {
  sourceCode: {
    hook: { code: string; fileName: string };
    types?: { code: string; fileName: string };
  };
}

export function ManualTabContent({ sourceCode }: ManualTabContentProps) {
  const hasTypes = !!sourceCode.types;

  if (!hasTypes) {
    return <CodeBlock code={sourceCode.hook.code} language="tsx" fileName={sourceCode.hook.fileName} />;
  }

  return (
    <Tabs defaultValue="hook" className="w-full">
      <TabsList variant="line" className="gap-4 px-4">
        <TabsTrigger value="hook" className="text-xs">{sourceCode.hook.fileName}</TabsTrigger>
        <TabsTrigger value="types" className="text-xs">{sourceCode.types?.fileName}</TabsTrigger>
      </TabsList>
      <TabsContent value="hook" className="mt-0">
        <CodeBlock code={sourceCode.hook.code} language="tsx" />
      </TabsContent>
      <TabsContent value="types" className="mt-0">
        <CodeBlock code={sourceCode.types?.code || ""} language="tsx" />
      </TabsContent>
    </Tabs>
  );
}
