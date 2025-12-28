import Link from "next/link";
import { Github, ShieldCheck, Workflow, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LightboxImage } from "@/components/ui/lightbox-image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_20%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(800px_circle_at_85%_10%,rgba(56,189,248,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-info/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-mono text-muted-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <span className="h-2 w-2 rounded-full bg-success" />
              Kanchi 1.0 is live
            </div>
            <h1 className="text-4xl font-display font-semibold tracking-tight text-foreground md:text-6xl">
              Real-time Celery monitoring without the chaos.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Kanchi connects directly to your message broker. Track tasks, retries, failures, and worker health in
              real time.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/docs/getting-started/quickstart">
                  Read the docs
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
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
            <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
              {[
                { label: "Workflow automation ready", Icon: Workflow },
                { label: "RabbitMQ and Redis", Icon: Database },
                { label: "MIT licensed", Icon: ShieldCheck },
              ].map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1"
                >
                  <Icon className="h-3 w-3 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-info/10 blur-2xl" />
            <div className="relative rounded-2xl border border-border/50 bg-background/40 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between px-2 pb-3 text-xs font-mono text-muted-foreground">
                <span>Live dashboard</span>
                <span className="inline-flex items-center gap-2 text-success">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Connected
                </span>
              </div>
              <LightboxImage
                src="/images/screenshots/dashboard-overview.png"
                alt="Kanchi dashboard overview"
                width={2870}
                height={1608}
                sizes="(min-width: 1024px) 45vw, 100vw"
                title="Dashboard overview"
                description="All workers, tasks, and alerts in one live view."
                priority
                imageClassName="rounded-xl border border-border/40 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
