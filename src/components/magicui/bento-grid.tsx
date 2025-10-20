import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-card border border-border",
      "transform-gpu transition-all duration-300 ease-out hover:scale-[1.01]",
      className
    )}
  >
    {/* Background animation area - full visibility */}
    <div className="absolute inset-0 z-0">
      {background}
    </div>

    {/* Compact content area at bottom - minimal height */}
    <div className="relative z-20 mt-auto">
      <div className="bg-gradient-to-t from-background via-background/90 to-transparent backdrop-blur-md pt-6 pb-3 px-4">
        <div className="flex items-start gap-2.5 mb-1">
          <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold font-display text-foreground leading-tight mb-0.5">
              {name}
            </h3>
            <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Learn more button - appears on hover */}
        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-7 opacity-0 group-hover:opacity-100">
          <button className="text-[11px] font-semibold transition-colors flex items-center gap-1 mt-1.5 ml-7 font-mono">
            {cta}
            <span className="text-xs">→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
