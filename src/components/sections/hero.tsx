"use client";

import {
  Terminal as TerminalIcon,
  Github,
  ArrowRight,
  Activity,
} from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { DotPatternWithGlowEffect } from "@/components/common/animated-dot-pattern";
import NumberTicker from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <DotPatternWithGlowEffect />

      <div className="flex items-center justify-center min-h-screen border-border">
        <div className="container relative z-10 mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                <BlurFade duration={0.6}>Monitor Celery.</BlurFade>
                <BlurFade delay={0.5} duration={0.6}>
                  In Real-Time.
                </BlurFade>
              </h1>
              <BlurFade direction={"right"} delay={2 * 0.5}>
                <p className="text-muted max-w-xl leading-relaxed">
                  The only monitoring tool with automatic orphan detection.
                  Track tasks, automate workflows, and never lose a job again.
                </p>
              </BlurFade>
              <BlurFade delay={3 * 0.5} duration={0.6} direction={"right"}>
                <div className="flex w-full justify-between max-w-xs mb-4 mt-8">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono">
                        <NumberTicker value={100} />%
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">
                      Open Source
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono">
                        <NumberTicker value={10} />+
                      </span>
                    </div>
                    <span className="text-sm  font-mono">Unique Features</span>
                  </div>
                </div>
                <div className="flex sm:flex-row gap-3 mt-8 items-center">
                  <ShimmerButton
                    className="shadow-2xl"
                    onClick={() =>
                      window.open(
                        "https://github.com/getkanchi/kanchi",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Show on GitHub
                  </ShimmerButton>
                </div>
                <p className="text-xs font-mono text-muted-foreground mb-2 mt-32">
                  ONE COMMAND TO START
                </p>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-transparent to-info rounded-lg opacity-20 group-hover:opacity-30 blur transition-opacity" />
                  <div className="relative bg-background border border-border rounded-lg p-3 font-mono text-sm flex items-center justify-between">
                    <code className="text-muted-foreground flex-1">
                      $ docker run getkanchi/kanchi
                    </code>
                    <button
                      className="text-muted-foreground hover:text-primary transition-colors text-xs"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          "docker run -d -p 8000:8000 getkanchi/kanchi",
                        )
                      }
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </BlurFade>
            </div>

            <BlurFade delay={5 * 0.5} direction={"right"} duration={0.6}>
              <div className="hidden md:block">
                <Terminal className="bg-surface border-border">
                  <TypingAnimation delay={0} className="text-muted">
                    $ docker run -d -p 8000:8000 getkanchi/kanchi
                  </TypingAnimation>

                  <AnimatedSpan delay={600} className="text-[hsl(158,64%,52%)]">
                    ✓ Container started successfully
                  </AnimatedSpan>
                  <AnimatedSpan delay={700} className="text-[hsl(199,89%,58%)]">
                    → Connecting to redis://localhost:6379
                  </AnimatedSpan>
                  <AnimatedSpan delay={900} className="text-[hsl(158,64%,52%)]">
                    ✓ Connected to broker
                  </AnimatedSpan>

                  <TypingAnimation delay={1200} className="text-muted">
                    $ curl localhost:8000/health
                  </TypingAnimation>

                  <AnimatedSpan delay={1600} className="text-primary">
                    {`{"status": "healthy", "workers": 3, "tasks": 127}`}
                  </AnimatedSpan>

                  <TypingAnimation delay={2000} className="text-muted">
                    $ open http://localhost:8000
                  </TypingAnimation>

                  <AnimatedSpan
                    delay={2400}
                    className="text-[hsl(158,64%,52%)]"
                  >
                    ✓ Dashboard ready - Monitoring 3 workers
                  </AnimatedSpan>
                </Terminal>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
