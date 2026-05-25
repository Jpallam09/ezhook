# TerminalContainer Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `TerminalContainer` component and integrate it into `LandingPage.tsx` to apply the background effect.

**Architecture:** Create a new UI component in `src/components/ui` to encapsulate the background styling, then wrap the existing terminal component in `LandingPage` with this new container.

**Tech Stack:** Next.js 16.2.6 (App Router), TypeScript, Tailwind CSS.

---

### Task 1: Create TerminalContainer Component

**Files:**
- Create: `src/components/ui/terminal-container.tsx`

- [ ] **Step 1: Write `src/components/ui/terminal-container.tsx`**

```tsx
import { cn } from "@/lib/utils";
import React from "react";

interface TerminalContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function TerminalContainer({ children, className }: TerminalContainerProps) {
  return (
    <div className={cn("min-h-screen w-full relative flex items-center justify-center p-4", className)}>
      {/* Dark Horizon Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-5xl">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/terminal-container.tsx
git commit -m "feat: add TerminalContainer component"
```

### Task 2: Integrate TerminalContainer into LandingPage

**Files:**
- Modify: `src/app/pages/LandingPage.tsx`

- [ ] **Step 1: Import TerminalContainer**

Modify `src/app/pages/LandingPage.tsx` to add:
```tsx
import { TerminalContainer } from "@/components/ui/terminal-container";
```

- [ ] **Step 2: Update JSX to use TerminalContainer**

Locate the `TerminalAnimationRoot` usage in `src/app/pages/LandingPage.tsx` and wrap it:

```tsx
// Before
<TerminalAnimationRoot ... >
  ...
</TerminalAnimationRoot>

// After
<TerminalContainer>
  <TerminalAnimationRoot ... >
    ...
  </TerminalAnimationRoot>
</TerminalContainer>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/LandingPage.tsx
git commit -m "refactor: use TerminalContainer in LandingPage"
```
