"use client"
import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/ui/dot-pattern"

export function DotPatternWithGlowEffect() {
  return (
    <div className="absolute inset-0 flex w-full flex-col items-center justify-center overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  )
}
