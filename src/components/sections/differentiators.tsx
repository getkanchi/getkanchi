import {
  ArrowRight,
  BookOpen,
  Boxes,
  Check,
  Clock3,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const operatorAdvantages = [
  {
    title: "History survives restarts",
    body: "Kanchi stores task state, retry chains, action history, progress, and registry metadata in SQLite, Postgres, or MySQL.",
    Icon: Clock3,
  },
  {
    title: "Recovery is reviewable",
    body: "Reruns can be checked, edited, skipped, and traced. Operators do not have to reconstruct payloads from memory.",
    Icon: ShieldCheck,
  },
  {
    title: "Runs beside your workers",
    body: "Point Kanchi at RabbitMQ or Redis, keep ownership of the database, and add task operations without changing application code.",
    Icon: Boxes,
  },
];

const docLinks = [
  { label: "Quickstart", href: "/docs/getting-started/quickstart" },
  { label: "Task progress", href: "/docs/core/task-progress" },
  { label: "Workflow automation", href: "/docs/core/workflow-automation" },
  { label: "Authentication", href: "/docs/configuration/authentication" },
];

export function DifferentiatorsSection() {
  return (
    <section className="border-b border-border/60 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-mono uppercase text-primary">
              <ScrollText className="h-3.5 w-3.5" />
              Why it feels different
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-display font-semibold md:text-5xl">
              Kanchi treats task failures as operational work.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              The memorable parts of Kanchi are not the table itself, but the
              way task state becomes recoverable, explainable, and safe to
              automate.
            </p>
            <Button
              asChild
              className="mt-7 bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/changelog">
                Read the changelog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {operatorAdvantages.map(({ title, body, Icon }) => (
              <article
                key={title}
                className="grid gap-4 border border-border/60 bg-surface/50 p-5 sm:grid-cols-[2rem_1fr]"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-border/60 pt-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-mono uppercase text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              Documentation
            </p>
            <h3 className="mt-3 text-2xl font-display font-semibold md:text-3xl">
              Fast setup, deeper controls when you need them.
            </h3>
          </div>

          <div>
            <div className="border border-border/60 bg-surface/50 p-4 font-mono text-xs text-muted-foreground">
              <div>{"CELERY_BROKER_URL=amqp://user:pass@rabbit:5672//"}</div>
              <div className="mt-2 text-foreground">
                docker compose up -d --pull always
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {docLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between border border-border/60 bg-background px-3 py-2 transition hover:border-primary/60 hover:text-foreground"
                >
                  <span>{link.label}</span>
                  <Check className="h-3.5 w-3.5 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
