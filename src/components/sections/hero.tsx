import {
  Activity,
  Database,
  Github,
  RotateCcw,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const proofPoints = [
  { label: "RabbitMQ and Redis", Icon: Database },
  { label: "Safe rerun review", Icon: RotateCcw },
  { label: "Workflow guardrails", Icon: Workflow },
  { label: "MIT licensed", Icon: ShieldCheck },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="absolute inset-0">
        <Image
          src="/images/screenshots/dashboard-overview.png"
          alt="Kanchi operations dashboard showing failed tasks, orphaned tasks, workers, and live task events"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_30%] opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(0_0%_0%)_0%,hsl(0_0%_0%/0.92)_34%,hsl(0_0%_0%/0.55)_68%,hsl(0_0%_0%/0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(0_0%_0%/0.78)_0%,hsl(0_0%_0%/0.08)_42%,hsl(0_0%_0%/0.95)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[78svh] items-end px-4 pb-10 pt-24 md:pb-14 md:pt-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Activity className="h-3.5 w-3.5" />
            Real-time Celery recovery
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-display font-semibold text-foreground md:text-6xl">
            Self-hosted Celery operations
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Watch tasks move through your broker, review failures with their
            payloads, rerun safely, and automate the incidents your team has
            already seen too many times.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/docs/getting-started/quickstart">Start locally</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-border/70 bg-background/55 text-foreground hover:bg-background/80"
            >
              <a
                href="https://github.com/getkanchi/kanchi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                View source
              </a>
            </Button>
          </div>

          <div className="mt-9 grid gap-2 text-xs font-mono text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 border border-border/60 bg-background/50 px-3 py-2"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
