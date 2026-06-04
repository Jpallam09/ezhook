# Project: ezhook

This is a [Next.js](https://nextjs.org) application bootstrapped with `create-next-app`.

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + `tailwind-merge` + `class-variance-authority`
- **Library:** React 19.2.4
- **Package Manager:** pnpm
- **UI Primitives:** Radix UI, Base UI (`@base-ui/react`), shadcn
- **Animation:** Framer Motion / Motion
- **Syntax Highlighting:** Shiki
- **Utilities:** `clsx`, `tailwind-merge` (always combine via `cn()` helper), `next-themes`

## Building and Running

The following scripts are available in `package.json`:

- `pnpm dev`: Starts the development server at <http://localhost:3000>
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint.
- `pnpm typecheck`: Runs `tsc --noEmit` for type checking without building.

> **Note:** Add `"typecheck": "tsc --noEmit"` to the `scripts` section of `package.json`
> if not already present.

## Development Conventions

- **Routing:** Uses the Next.js App Router located in the `app/` directory.
- **Styling:** Tailwind CSS v4 only. Never write raw CSS or `style={{}}` inline styles.
- **Class merging:** Always use the `cn()` helper (via `clsx` + `tailwind-merge`).
  Never concatenate class strings manually.
- **Variants:** Use `class-variance-authority` (cva) for component variants.
- **Components:** New components go in `src/components/`. Use shadcn CLI to scaffold:
  `pnpm dlx shadcn@latest add <component>`
- **Animation:** Use `framer-motion` or `motion`. Do not install alternatives.
- **Syntax highlighting:** Use `shiki`. Do not install alternatives.
- **Linting:** ESLint is configured via `eslint.config.mjs`.
- **Type Checking:** Run `pnpm typecheck` to verify types without a full build.

## Agent Operational Guidelines

- **Strict adherence to rules:** All agents must follow the architectural and
  operational conventions documented in [`AGENTS.md`](./AGENTS.md).
- **Package manager:** Always use `pnpm`. Never use `npm` or `yarn`.
- **Before installing any package:** Check the dependencies above first —
  the package may already exist.
- **Before marking any task complete:** Run `pnpm lint`, `pnpm typecheck`,
  and `pnpm build` with zero errors.
