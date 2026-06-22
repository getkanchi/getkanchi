import { ArrowRight, Github, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ctaTags = [
  "Self-hosted",
  "MIT licensed",
  "RabbitMQ",
  "Redis",
  "Prometheus",
];

export function CTASection() {
  return (
    <section className="border-b border-border/60 bg-surface/35 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs font-mono uppercase text-primary">
              <Terminal className="h-3.5 w-3.5" />
              Run it beside your workers
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-display font-semibold md:text-5xl">
              Bring task recovery into the same place you monitor the queue.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Start with broker visibility. Add progress instrumentation,
              workflow automation, auth, retention, and Prometheus metrics as
              the workload gets more serious.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
              {ctaTags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border/60 bg-background/70 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              size="lg"
              asChild
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/docs/getting-started/quickstart">
                Quickstart
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-border/60 bg-background/50 text-foreground hover:bg-background/80"
            >
              <a
                href="https://github.com/getkanchi/kanchi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
