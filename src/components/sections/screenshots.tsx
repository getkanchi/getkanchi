import { cn } from "@/lib/utils";
import { LightboxImage } from "@/components/ui/lightbox-image";

const screenshots = [
  {
    title: "Failed task triage",
    description: "Filter incidents by worker, runtime, and status fast.",
    src: "/images/screenshots/failed-tasks-table.png",
    width: 2822,
    height: 1016,
    className: "lg:col-span-7",
  },
  {
    title: "Task profile insights",
    description: "Drill into payload context, trend stats, and errors.",
    src: "/images/screenshots/task-detail-panel.png",
    width: 2846,
    height: 1578,
    className: "lg:col-span-5",
  },
  {
    title: "Workflow automation",
    description: "Define rules, monitor success, and ship retries.",
    src: "/images/screenshots/workflow-automation.png",
    width: 2904,
    height: 1282,
    className: "lg:col-span-5",
  },
  {
    title: "Retry chain visibility",
    description: "Trace retries, arguments, and worker history.",
    src: "/images/screenshots/task-retry-chain.png",
    width: 2866,
    height: 1104,
    className: "lg:col-span-7",
  },
  {
    title: "Safer retries",
    description: "Confirm replays with guardrails before enqueueing.",
    src: "/images/screenshots/retry-task-modal.png",
    width: 2488,
    height: 1204,
    className: "lg:col-span-12",
  },
];

export function ScreenshotsSection() {
  return (
    <section className="relative border-b border-border/60 py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/70 px-3 py-1 text-xs font-mono text-muted-foreground">
            Product tour
          </div>
          <h2 className="text-3xl font-display font-semibold md:text-5xl">
            See how Kanchi keeps queues in focus.
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            From failed task triage to workflow automation, every surface stays
            fast, searchable, and ready for action.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {screenshots.map((item) => (
            <div
              key={item.title}
              className={cn(
                "col-span-12 overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
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
                className="rounded-xl"
                imageClassName="rounded-xl border border-border/40 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              />
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">
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
