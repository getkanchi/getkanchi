import Link from "next/link";
import { Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ctaTags = [
  "Self-hosted",
  "Open source",
  "MIT licensed",
  "Broker-agnostic",
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border/50 bg-background/50 px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:px-12 md:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-mono text-muted-foreground">
            <Terminal className="h-3 w-3 text-primary" />
            Get started
          </div>
          <h2 className="mt-4 text-3xl font-display font-semibold md:text-5xl">
            Start monitoring in under 5 minutes
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            docker run, configure, monitor. Kanchi keeps the setup short so you
            can stay focused on your queue.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/docs/getting-started/quickstart">Quickstart</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-border/60 bg-background/30 text-foreground/80 hover:text-foreground hover:bg-background/60"
            >
              <a
                href="https://github.com/getkanchi/kanchi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            {ctaTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-background/40 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
