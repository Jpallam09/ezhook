import { Hook } from "./schema";
import { useDebounce } from "./hooks/use-debounce";
import { useBoolean } from "./hooks/use-boolean";

export const registry: Record<string, Hook> = {
  "use-debounce": useDebounce,
  "use-boolean": useBoolean,
};

export * from "./schema";
