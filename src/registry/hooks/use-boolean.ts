import { Hook } from "../schema";

export const useBoolean: Hook = {
  slug: "use-boolean",
  name: "useBoolean",
  description: "A simple boolean state management hook with helper functions.",
  usage: `import { useBoolean } from "@/hooks/use-boolean";

export function ToggleComponent() {
  const [value, { toggle, setTrue, setFalse }] = useBoolean(false);

  return (
    <div>
      <p>Value: {value.toString()}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
}`,
  category: "state",
  status: "new",
  api: [
    { name: "defaultValue", type: "boolean", description: "The initial value." },
  ],
  examples: [
    {
      name: "Basic Toggle",
      description: "Simple toggle switch implementation.",
      code: `// ... code here`,
    },
  ],
};
