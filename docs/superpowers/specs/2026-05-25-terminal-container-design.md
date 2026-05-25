# Design Specification: TerminalContainer Integration

## Overview
This design introduces a reusable wrapper component, `TerminalContainer`, to encapsulate the "dark horizon" background effect. This component will house the `TerminalAnimationRoot` and provide centralized styling for the background and layout alignment.

## Component Design
### `TerminalContainer`
- **Location:** `src/components/ui/terminal-container.tsx`
- **Purpose:** Act as a container for the terminal, applying a specific radial background gradient and flexbox alignment.
- **Implementation:**
  ```tsx
  import { cn } from "@/lib/utils";

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

## Integration
- **File:** `src/app/pages/LandingPage.tsx`
- **Changes:**
  - Import `TerminalContainer` from `@/components/ui/terminal-container`.
  - Replace the existing `div` surrounding `TerminalAnimationRoot` with the new `TerminalContainer`.

## Testing
- Verify the background gradient renders correctly.
- Verify the terminal is centered and responsive within the container.
