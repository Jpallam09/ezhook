# 🪝 EzHook - Custom React Hooks Registry Plan

EzHook is a zero-backend, zero-cost remote registry that hosts custom React hooks using Next.js (App Router). It enables developers to seamlessly inject production-ready hooks straight into their local workspaces using the native `shadcn/ui` CLI.

---

## 🎯 Project Goals

- **Zero Cost & Zero Maintained Infrastructure:** Runs purely on Vercel's Global CDN Edge network using dynamic Node.js Route Handlers.
- **Flawless Integration:** Emits strict `ui.shadcn.com` compliant JSON schemas.
- **Showcase Gallery:** Features a premium dark-mode dashboard showcasing hook documentation and terminal installation blocks.

---

## 🗺️ Architectural Map & Backbone

```text
ezhook/
├── .next/                         # Next.js local build cache (safe to delete/regenerate)
├── node_modules/                  # Project dependencies
├── public/                        # Static assets (logos, icons, open-graph images)
│   ├── favicon.ico
│   └── og-image.png
│
├── src/
│   ├── app/                       # Next.js App Router (Routing and Pages)
│   │   ├── layout.tsx             # Root layout: Theme providers, global navbar, and footer
│   │   ├── globals.css            # Tailwind CSS directives and shadcn custom color tokens
│   │   │
│   │   ├── page.tsx               # Landing Page: Hero section & searchable Hooks Gallery
│   │   │
│   │   ├── hooks/                 # Web View Routes (For browsing documentation via browser)
│   │   │   └── [name]/
│   │   │       └── page.tsx       # Detail View: Usage guide, copy-paste block
│   │   │
│   │   └── r/                     # The API Registry Endpoints (For shadcn-ui CLI installation)
│   │       ├── index/
│   │       │   └── route.ts       # GET /r/index -> Returns a list of all available hooks in the registry
│   │       └── [name]/
│   │           └── route.ts       # GET /r/[name] -> Returns shadcn-compliant JSON schema for a specific hook
│   │
│   ├── components/                # Modular UI Components
│   │   ├── ui/                    # Raw Shadcn/ui atomic elements (Button, Card, Input, Toast, etc.)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── input.tsx
│   │   ├── hook-card.tsx          # Card component summarizing an individual hook on the main gallery page
│   │   ├── code-block.tsx         # Syntax-highlighted block for terminal/code display with copy button
│   │   ├── navbar.tsx             # Universal responsive global header
│   │   └── footer.tsx             # Minimal branding footer
│   │
│   ├── conductor/                 # Internal project tracking and roadmap documentations
│   │   └── registry-plan.md
│   │
│   ├── hooks/                     # THE REGISTRY SOURCE (Pure, standalone custom React hooks)
│   │   ├── use-local-storage.ts   # Example Hook
│   │   ├── use-debounce.ts        # Example Hook
│   │   └── use-media-query.ts     # Example Hook
│   │
│   └── lib/                       # Utility Functions & Configuration Singletons
│       ├── registry.ts            # Helper methods to extract, validate, and parse raw files from src/hooks/
│       └── utils.ts               # Core shadcn tailwind-merge helper (clsx + tailwind-merge)
│
├── .gitignore
├── README.md
├── components.json                # Shadcn configuration tracking target directory paths
├── next.config.ts                 # Next.js core application settings (includes outputFileTracingIncludes)
├── package.json                   # Project dependencies and script declarations
├── postcss.config.mjs             # PostCSS configurations for Tailwind processing
├── tailwind.config.ts             # Tailwind design token overrides and animations
└── tsconfig.json                  # TypeScript compiler settings and @/* paths resolution
```

---

## ⚙️ Deployment Configuration

### Vercel Free Tier Compatibility

This project runs entirely on Vercel's Hobby (free) tier. Route handlers use the **Node.js runtime** (not Edge) to allow `fs/promises` access.

Because hook files in `src/hooks/` are read dynamically at runtime and are never statically imported, Vercel's build tracer cannot detect them automatically. They must be explicitly included in the deployment output via `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/r/[name]': ['./src/hooks/**/*'],
    '/r/index': ['./src/hooks/**/*'],
  },
};

export default nextConfig;
```

Without this, `fs.readFile` will succeed locally but silently fail in production.

---

## 🏷️ Hook Metadata Convention

`registry.ts` needs more than raw hook code to build a valid shadcn JSON schema — it also needs each hook's display name, description, and dependencies. Since hook files are read dynamically, metadata is embedded via **JSDoc at the top of each hook file**:

```ts
/**
 * @name useDebounce
 * @description Delays updating a value until after a specified wait time.
 * @dependencies none
 */
export function useDebounce<T>(value: T, delay: number): T {
  // ...
}
```

### Required JSDoc Fields

| Field | Purpose |
|---|---|
| `@name` | Display name used in the gallery and JSON schema |
| `@description` | Short summary shown in hook cards and detail pages |
| `@dependencies` | npm packages required (comma-separated, or `none`) |

`registry.ts` parses these fields from the raw file content before transforming it into the shadcn-compliant JSON schema. All three fields are required — a hook file missing any of them will be rejected by the registry engine at read time.

---

## 🔧 Registry Engine Implementation Details

- **File System Interaction:**
  - Use `fs/promises` to read hook files from `src/hooks/`.
  - Use `path` module for secure path resolution within the `hooks/` directory.
- **Security & Validation:**
  - **Path Traversal Prevention:** Ensure resolved hook paths start with the base `hooks/` directory path.
  - **Input Sanitization:** Restrict `[name]` route parameter to alphanumeric characters and hyphens.
- **Registry Schema:**
  - Each hook must have a standard structure to allow for reliable transformation into `shadcn`-compliant JSON.
  - Schema fields: `name`, `type`, `files`, `dependencies`, `devDependencies`, `registryDependencies`, `tailwind`, `cssVars`.
  - The `files` array is the most critical — each entry requires `path` and `content`.
- **Workflow:**
    1. Route handler extracts and sanitizes `[name]`.
    2. Securely resolve path to `src/hooks/[name].ts`.
    3. Read file content via `fs/promises` and validate existence.
    4. Parse JSDoc metadata fields (`@name`, `@description`, `@dependencies`).
    5. Compile into shadcn-compliant JSON schema.
    6. Serve response with `Content-Type: application/json`.

---

## 🏗️ Recommended Build Order

1. `lib/registry.ts` — the core engine (metadata parsing + schema transformation)
2. `app/r/[name]/route.ts` + `app/r/index/route.ts` — the API layer
3. Gallery UI — landing page, hook cards, detail pages
