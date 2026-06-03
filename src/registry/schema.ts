export type HookCategory = "state" | "browser" | "timing" | "utility";

export const CATEGORIES: Record<HookCategory, string> = {
  state: "State Management",
  browser: "Browser Hooks",
  timing: "Timing & Performance",
  utility: "Utilities",
};

export interface ApiRow {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
}

export interface Example {
  name: string;
  description: string;
  code: string;
}

export interface Hook {
  slug: string;
  name: string;
  description: string;
  usage: string;
  category: HookCategory;
  status?: "new" | "experimental" | "deprecated";
  api: ApiRow[];
  examples: Example[];
}
