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
  devDependencies: string[];
  registryDependencies: string[];
  tailwind: Record<string, unknown>;
  cssVars: Record<string, unknown>;
}

const HOOKS_DIR = path.join(process.cwd(), "src/hooks");

function extractDocTag(docBlock: string, tag: string): string | null {
  const match = docBlock.match(new RegExp(`@${tag}\\s+(.+)`));
  return match?.[1]?.trim() ?? null;
}

export async function parseHookFile(
  filename: string,
): Promise<{ content: string; metadata: HookMetadata } | null> {
  const filePath = path.resolve(HOOKS_DIR, filename);

  if (!filePath.startsWith(`${HOOKS_DIR}${path.sep}`)) {
    throw new Error("Invalid hook path");
  }

  try {
    const content = await fs.readFile(filePath, "utf-8");

    const docBlock = content.match(/\/\*\*[\s\S]*?\*\//)?.[0] ?? "";
    const name = extractDocTag(docBlock, "name");
    const description = extractDocTag(docBlock, "description");
    const dependenciesTag = extractDocTag(docBlock, "dependencies");

    if (!name || !description || !dependenciesTag) {
      return null;
    }

    const dependencies =
      dependenciesTag.toLowerCase() === "none"
        ? []
        : dependenciesTag
            .split(",")
            .map((dependency) => dependency.trim())
            .filter(Boolean);

    return {
      content,
      metadata: {
        name,
        description,
        dependencies,
      },
    };
  } catch {
    return null;
  }
}

export async function getRegistryItem(hookName: string): Promise<RegistryItem | null> {
  if (!/^[a-z0-9-]+$/i.test(hookName)) {
    return null;
  }

  const result = await parseHookFile(`${hookName}.ts`);

  if (!result) return null;

  return {
    name: result.metadata.name,
    type: "registry:hook",
    files: [
      {
        path: `hooks/${hookName}.ts`,
        content: result.content,
        type: "registry:hook",
      },
    ],
    dependencies: result.metadata.dependencies,
    devDependencies: [],
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
