"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  className?: string;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  className,
}: AnimatedGridPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    const cols = Math.ceil(rect.width / width);
    const rows = Math.ceil(rect.height / height);

    let animationFrameId: number;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.strokeStyle = "hsl(0, 0%, 10%)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= cols; i++) {
        const x = i * width;
        const opacity = Math.sin((i + offset) * 0.1) * 0.5 + 0.5;
        ctx.globalAlpha = opacity * 0.3;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }

      for (let i = 0; i <= rows; i++) {
        const y = i * height;
        const opacity = Math.sin((i + offset) * 0.1) * 0.5 + 0.5;
        ctx.globalAlpha = opacity * 0.3;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      offset += 0.5;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
