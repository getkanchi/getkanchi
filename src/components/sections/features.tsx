import {
  Activity,
  AlertTriangle,
  BarChart3,
  Cpu,
  Search,
  Workflow,
} from "lucide-react";

const features = [
  {
    title: "Live task monitoring",
    description:
      "WebSocket updates so you see tasks as they move through the queue.",
    Icon: Activity,
  },
  {
    title: "Search and filter that works",
    description:
      "Filter by status, task name, worker, or queue with instant feedback.",
    Icon: Search,
  },
  {
    title: "Orphan detection",
    description:
      "Automatically flag lost tasks and retry in batches without log dives.",
    Icon: AlertTriangle,
  },
  {
    title: "Workflow automation",
    description:
      "Event-driven actions, webhooks, and retries without extra code.",
    Icon: Workflow,
  },
  {
    title: "Worker health at a glance",
    description:
      "Heartbeat status, load, and utilization so you can spot drift fast.",
    Icon: Cpu,
  },
  {
    title: "Analytics and history",
    description:
      "Daily stats, trend analysis, and task timelines that stay searchable.",
    Icon: BarChart3,
  },
];

export function FeaturesSection() {
  return (
    <section className="relative border-b border-border/60 py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/70 px-3 py-1 text-xs font-mono text-muted-foreground">
            Core features
          </div>
          <h2 className="text-3xl font-display font-semibold md:text-5xl">
            Everything you need to debug faster.
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Kanchi keeps the signal high and the noise low with tooling built
            around how dev teams actually work.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border/50 bg-background/40 p-5 transition duration-200 hover:border-foreground/20 hover:bg-background/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-primary">
                  <feature.Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
