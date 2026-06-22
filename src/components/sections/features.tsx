import {
  AlertTriangle,
  ClipboardCheck,
  GitBranch,
  RotateCcw,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const workflowStages = [
  {
    eyebrow: "Detect",
    title: "Know what broke while it is still fresh.",
    description:
      "Kanchi keeps failed, orphaned, retrying, and running tasks visible with live broker events, worker heartbeat context, and filters that match how incidents are investigated.",
    Icon: AlertTriangle,
    sample: ["failed tasks: 6 unresolved", "orphaned tasks: 7 detected"],
  },
  {
    eyebrow: "Inspect",
    title: "Open the task, not a pile of logs.",
    description:
      "Task detail pages preserve args, kwargs, traceback, queue, worker, retry chain, rerun lineage, and progress steps in one place your team can link to.",
    Icon: GitBranch,
    sample: ["args + kwargs", "traceback + worker", "progress steps"],
  },
  {
    eyebrow: "Recover",
    title: "Rerun deliberately instead of replaying blind.",
    description:
      "Bulk actions open a rerun review where Kanchi checks available payloads, lets you repair inputs, skips unsafe items, and records what happened.",
    Icon: RotateCcw,
    sample: ["ready as-is: 12", "needs input: 2", "will rerun: 10"],
  },
  {
    eyebrow: "Automate",
    title: "Turn repeat incidents into guarded workflows.",
    description:
      "Use triggers, conditions, Slack or webhook notifications, retries, cooldowns, and circuit breakers to automate recovery without creating retry loops.",
    Icon: Workflow,
    sample: ["when task failed", "if retries < 3", "then retry + notify"],
  },
];

const productionControls = [
  {
    title: "Production access",
    body: "Basic auth, OAuth, sessions, host/origin controls, and email allowlists for teams that cannot leave dashboards open.",
    Icon: ShieldCheck,
  },
  {
    title: "Auditable operations",
    body: "Manual resolve, unresolve, rerun, skipped, failed, and edited actions are stored so the next person can see what changed.",
    Icon: ClipboardCheck,
  },
];

export function FeaturesSection() {
  return (
    <section className="border-b border-border/60 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-mono uppercase text-primary">
              Task operations loop
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-display font-semibold md:text-5xl">
              Built for the part after the alert fires.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Flower and dashboards are good at telling you that something
            happened. Kanchi is shaped around what operators do next: inspect
            the payload, choose a recovery path, leave an audit trail, and
            automate the repeat case.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {workflowStages.map((stage) => (
            <article
              key={stage.title}
              className="border border-border/60 bg-surface/45 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-mono uppercase text-primary">
                    {stage.eyebrow}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {stage.title}
                  </h3>
                </div>
                <stage.Icon className="h-5 w-5 shrink-0 text-primary" />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {stage.description}
              </p>
              <div className="mt-5 space-y-2 border-t border-border/60 pt-4 font-mono text-xs text-muted-foreground">
                {stage.sample.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {productionControls.map((control) => (
            <article
              key={control.title}
              className="flex gap-4 border border-border/60 bg-raised/40 p-5"
            >
              <control.Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">
                  {control.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {control.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
