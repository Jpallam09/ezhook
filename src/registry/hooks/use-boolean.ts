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
  sourceCode: {
    hook: {
      fileName: "use-boolean.ts",
      code: `import { useState, useCallback } from 'react';

export function useBoolean(defaultValue = false): [boolean, { toggle: () => void; setTrue: () => void; setFalse: () => void }] {
  const [value, setValue] = useState(defaultValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, { toggle, setTrue, setFalse }];
}
`
    }
  },
};
