import Link from "next/link";
import { Check, BookOpen, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";

const changelogHighlights = [
  "Live task monitoring with streaming updates.",
  "Search and filter across tasks, workers, and queues.",
  "Orphan detection with bulk retry workflows.",
  "Auto migrations with SQLite or Postgres storage.",
];

const docLinks = [
  { label: "Quickstart", href: "/docs/getting-started/quickstart" },
  { label: "Architecture", href: "/docs/core/architecture" },
  { label: "Orphan detection", href: "/docs/core/orphan-detection" },
  { label: "Workflow automation", href: "/docs/core/workflow-automation" },
];

export function DifferentiatorsSection() {
  return (
    <section className="relative border-b border-border/60 py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/50 bg-background/40 p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-mono text-muted-foreground">
              <ScrollText className="h-3 w-3" />
              From the changelog
            </div>
            <h2 className="mt-4 text-2xl font-display font-semibold md:text-3xl">
              Kanchi 1.0: Ship with confidence
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Release notes focus on what matters: fast monitoring, clear search,
              and recovery tools that keep your queues moving.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {changelogHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-6 bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/changelog">Read the changelog</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background/50 p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-mono text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              Documentation
            </div>
            <h2 className="mt-4 text-2xl font-display font-semibold md:text-3xl">
              Docs built for fast setup
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              No agents, no SDK changes. Point Kanchi at your broker and start
              monitoring in minutes.
            </p>
            <div className="mt-5 rounded-lg border border-border/60 bg-background/70 p-4 text-xs font-mono text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <code>CELERY_BROKER_URL=amqp://user:pass@rabbit:5672//</code>
              <div className="mt-2 text-[11px] text-muted-foreground/80">
                docker compose up -d --pull always
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {docLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-border/50 bg-background/40 px-3 py-2 transition hover:border-foreground/20 hover:text-foreground hover:bg-background/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Button
              variant="outline"
              asChild
              className="mt-6 border-border/60 bg-background/30 text-foreground/80 hover:text-foreground hover:bg-background/60"
            >
              <Link href="/docs">Open documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
