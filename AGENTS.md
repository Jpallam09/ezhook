<!-- BEGIN:nextjs-agent-rules -->
# EzHook Agent Rulebook

This codebase follows strict architectural and operational conventions for AI agents. Adherence to these rules is mandatory to ensure project stability and maintainability.

## Package Manager

This project uses **pnpm**. Never use `npm` or `yarn` to install dependencies or run scripts. Always use `pnpm`.

## Core Principles

1. **Framework Explicit:** Always reference the official [Next.js App Router docs](https://nextjs.org/docs) and the project's `next.config.*` files before assuming default behavior. Prefer Server Components by default; use `"use client"` only when necessary (event handlers, browser APIs, hooks).

2. **Type Safety First:** Never use `any`. Prioritize explicit TypeScript definitions. If a type is complex, define it in a `types.ts` file or the relevant registry schema rather than inline.

3. **Component Isolation:** Prefer small, composable, and reusable components. New components should reside in `src/components/` and adhere to the existing structural patterns.

4. **Verification-Driven Development:** When modifying logic, run `pnpm run lint`, `pnpm run typecheck` (or `tsc --noEmit`), and `pnpm run build` to verify correctness. If a test suite exists (`__tests__/`, `*.test.ts`), update or add tests. Never mark a task complete with TypeScript or build errors.

5. **Minimalist Implementation:** Prioritize simplicity. Do not introduce complex abstractions ("just-in-case" code). Favor explicit composition over complex inheritance.

6. **No Silent Failures:** All async functions must handle errors explicitly. Propagate errors to the nearest error boundary, return typed error states, or throw with a descriptive message—never silently discard them or use `console.log` as a substitute for handling.

7. **Server/Client Boundary Awareness:** Never import server-only modules (e.g., `fs`, `db`, env secrets) into client components. Keep data fetching in Server Components or Route Handlers.

8. **Tailwind Over Custom CSS:** Never write raw CSS or `style={{}}` inline styles unless Tailwind genuinely cannot express it. Extend via `tailwind.config.*`, not one-off styles.

9. **No Unreviewed Dependency Additions:** Never add a new pnpm package without justification. Prefer native browser APIs, existing project utilities, or React/Next.js built-ins first. If a package is genuinely needed, use `pnpm add` and note why in a comment or PR description.
<!-- END:nextjs-agent-rules -->
