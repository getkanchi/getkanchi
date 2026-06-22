import { LightboxImage } from "@/components/ui/lightbox-image";
import { cn } from "@/lib/utils";

const screenshots = [
  {
    title: "Operations cockpit",
    description:
      "Failed tasks, orphaned tasks, workers, and live queue events stay visible on one screen.",
    src: "/images/screenshots/operations-cockpit.png",
    width: 2880,
    height: 1920,
    className: "lg:col-span-12",
  },
  {
    title: "Rerun review",
    description:
      "Inspect captured payloads, repair inputs, skip unsafe tasks, and submit a tracked rerun batch.",
    src: "/images/screenshots/rerun-review.png",
    width: 2880,
    height: 1920,
    className: "lg:col-span-7",
  },
  {
    title: "Action history",
    description:
      "Every resolve, unresolve, rerun, skip, failure, and edited payload has somewhere to live.",
    src: "/images/screenshots/action-history.png",
    width: 2880,
    height: 1920,
    className: "lg:col-span-5",
  },
  {
    title: "Task progress",
    description:
      "Long-running jobs can report progress percentages, named steps, and current messages.",
    src: "/images/screenshots/task-progress.png",
    width: 2880,
    height: 1920,
    className: "lg:col-span-5",
  },
  {
    title: "Workflow guardrails",
    description:
      "Build no-code task automations with conditions, cooldowns, execution limits, and circuit breakers.",
    src: "/images/screenshots/workflow-guardrails.png",
    width: 2880,
    height: 1920,
    className: "lg:col-span-7",
  },
  {
    title: "Retention controls",
    description:
      "Keep successful task history lean while preserving failed, retried, and orphaned history for analysis.",
    src: "/images/screenshots/retention-controls.png",
    width: 2880,
    height: 1920,
    className: "lg:col-span-12",
  },
];

export function ScreenshotsSection() {
  return (
    <section className="border-b border-border/60 bg-surface/35 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-mono uppercase text-primary">
              Product tour
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-display font-semibold md:text-5xl">
              Real operational surfaces, not decorative mockups.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            See the surfaces operators use when queues misbehave: live task
            state, guarded reruns, recorded decisions, progress reporting, and
            automation controls.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {screenshots.map((item) => (
            <div
              key={item.title}
              className={cn(
                "col-span-12 overflow-hidden border border-border/60 bg-background p-3",
                item.className,
              )}
            >
              <LightboxImage
                src={item.src}
                alt={item.title}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 70vw, 100vw"
                title={item.title}
                description={item.description}
                className="overflow-hidden"
                imageClassName="border border-border/50"
              />
              <div className="mt-4 border-t border-border/60 pt-4">
                <h3 className="text-sm font-semibold uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
