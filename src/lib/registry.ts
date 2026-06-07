import fs from "fs/promises";
import path from "path";

export interface HookMetadata {
  name: string;
  description: string;
  dependencies: string[];
}

export interface RegistryItem {
  name: string;
  type: "registry:hook";
  files: Array<{
    path: string;
    content: string;
    type: "registry:hook";
  }>;
  dependencies: string[];
  registryDependencies: string[];
  tailwind: Record<string, unknown>;
  cssVars: Record<string, unknown>;
}

const HOOKS_DIR = path.join(process.cwd(), "src/hooks");

export async function parseHookFile(filename: string): Promise<{ content: string; metadata: HookMetadata } | null> {
  const filePath = path.join(HOOKS_DIR, filename);
  
  // Security check: Path traversal prevention
  if (!filePath.startsWith(HOOKS_DIR)) {
    throw new Error("Invalid hook path");
  }

  try {
    const content = await fs.readFile(filePath, "utf-8");
    
    const nameMatch = content.match(/@name\s+(.+)/);
    const descMatch = content.match(/@description\s+(.+)/);
    const depsMatch = content.match(/@dependencies\s+(.+)/);

    if (!nameMatch || !descMatch || !depsMatch) {
      return null;
    }

    const dependencies = depsMatch[1].trim() === "none" 
      ? [] 
      : depsMatch[1].split(",").map(d => d.trim());

    return {
      content,
      metadata: {
        name: nameMatch[1].trim(),
        description: descMatch[1].trim(),
        dependencies
      }
    };
  } catch {
    return null;
  }
}

export async function getRegistryItem(hookName: string): Promise<RegistryItem | null> {
  // sanitize input
  const sanitizedName = hookName.replace(/[^a-zA-Z0-9-]/g, "");
  const result = await parseHookFile(`${sanitizedName}.ts`);

  if (!result) return null;

  return {
    name: result.metadata.name,
    type: "registry:hook",
    files: [
      {
        path: `hooks/${sanitizedName}.ts`,
        content: result.content,
        type: "registry:hook",
      },
    ],
    dependencies: result.metadata.dependencies,
    registryDependencies: [],
    tailwind: {},
    cssVars: {},
  };
}

export async function getRegistryIndex() {
  try {
    const files = await fs.readdir(HOOKS_DIR);
    const hooks = await Promise.all(
      files
        .filter(file => file.endsWith(".ts"))
        .map(async file => {
          const result = await parseHookFile(file);
          if (!result) return null;
          return {
            name: result.metadata.name,
            description: result.metadata.description,
            slug: file.replace(".ts", ""),
          };
        })
    );
    return hooks.filter(h => h !== null);
  } catch {
    return [];
  }
}
