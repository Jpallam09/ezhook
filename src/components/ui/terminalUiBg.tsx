import { cn } from "@/lib/utils"

export function TerminalUiBg({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
      {/* Dark Horizon Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
        }}
      />
    </div>
  )
}
