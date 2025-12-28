"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

interface LightboxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  title?: string;
  description?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export function LightboxImage({
  src,
  alt,
  width,
  height,
  sizes,
  title,
  description,
  priority,
  className,
  imageClassName,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const heading = title ?? alt;

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={cn("h-auto w-full", imageClassName)}
        />
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5" />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-mono text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 className="h-3 w-3" />
          Zoom
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogId}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out bg-black/70 backdrop-blur-sm"
            aria-label="Close enlarged image"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_40px_120px_rgba(0,0,0,0.75)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="space-y-1">
                <p
                  id={dialogId}
                  className="text-sm font-semibold text-white"
                >
                  {heading}
                </p>
                {description ? (
                  <p className="text-xs text-white/70">{description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-black/60 p-4">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="100vw"
                className="h-auto w-full rounded-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
