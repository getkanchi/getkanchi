"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Zap,
  BarChart3,
  Layers,
  Search,
  Workflow,
  Cpu,
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import NumberTicker from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const features = [
  {
    Icon: AlertTriangle,
    name: "Orphan Detection",
    description:
      "Only Celery monitoring tool with automatic orphan detection and one-click retry.",
    href: "#",
    cta: "Learn more",
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-transparent to-transparent" />
        <div className="grid grid-cols-3 gap-2 p-6 scale-90">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                "h-14 w-14 rounded border transition-all duration-300 relative",
                i === 4
                  ? "border-warning/80 bg-warning/25 shadow-lg shadow-warning/30 animate-pulse"
                  : "border-muted bg-card/30 hover:border hover:border-muted/80 duration-0",
              )}
            >
              {i === 4 && (
                <div className="absolute inset-0 flex items-center justify-center text-warning text-xs font-mono font-bold">
                  !
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Activity,
    name: "Real-Time WebSocket",
    description:
      "Live task updates without polling overhead. Zero latency monitoring.",
    href: "#",
    cta: "Learn more",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent" />
        <div className="flex flex-col gap-1.5 px-4 w-full scale-95">
          {[
            { status: "success", task: "send_email", id: "a4f2" },
            { status: "running", task: "process_data", id: "b8e1" },
            { status: "success", task: "cache_update", id: "c3d9" },
            { status: "running", task: "webhook_call", id: "d7a2" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                x: [-30, 0, 0, 0, 30],
              }}
              transition={{
                duration: 3,
                delay: i * 0.6,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
              className={cn(
                "h-7 rounded border px-2.5 backdrop-blur-sm flex items-center justify-between font-mono text-xs",
                item.status === "success"
                  ? "bg-background text-success"
                  : "border-info/70 bg-info/20 text-info",
              )}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    item.status === "success"
                      ? "bg-success"
                      : "bg-info animate-pulse",
                  )}
                />
                <span className="font-semibold">{item.task}</span>
              </span>
              <span className="text-[10px] text-muted-foreground">
                #{item.id}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Workflow,
    name: "Workflow Automation",
    description:
      "Event-driven actions without writing code. 14+ operators, webhooks, retries.",
    href: "#",
    cta: "Learn more",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-special/15 via-transparent to-transparent" />
        <div className="relative w-32 h-32 scale-90">
          {/* Top node - trigger */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-9 rounded border-2 border-special/80 bg-special/25 shadow-lg shadow-special/20 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-sm bg-special animate-pulse" />
          </motion.div>

          {/* Bottom left node */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-0 left-0 w-8 h-8 rounded border-2 border-info/80 bg-info/25 shadow-md shadow-info/20 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-sm bg-info" />
          </motion.div>

          {/* Bottom right node */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-0 right-0 w-8 h-8 rounded border-2 border-success/80 bg-success/25 shadow-md shadow-success/20 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-sm bg-success" />
          </motion.div>

          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ overflow: "visible" }}
          >
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              x1="50%"
              y1="18"
              x2="16"
              y2="88%"
              stroke="hsl(199, 89%, 58%)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              strokeDasharray="3 3"
            />
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              x1="50%"
              y1="18"
              x2="112"
              y2="88%"
              stroke="hsl(158, 64%, 52%)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    Icon: Zap,
    name: "Worker Health",
    description:
      "Real-time status, CPU/memory metrics, and heartbeat monitoring.",
    href: "#",
    cta: "Learn more",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-success/15 via-transparent to-transparent" />
        <div className="px-6 w-full space-y-1.5 scale-95">
          {[
            {
              label: "CPU",
              value: 45,
              colorClass: "text-success",
              bgClass: "bg-success",
            },
            {
              label: "MEM",
              value: 62,
              colorClass: "text-info",
              bgClass: "bg-info",
            },
            {
              label: "LOAD",
              value: 28,
              colorClass: "text-warning",
              bgClass: "bg-warning",
            },
          ].map((metric, i) => (
            <div key={metric.label} className="space-y-0.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-foreground/70 font-bold">
                  {metric.label}
                </span>
                <span className={cn("font-bold", metric.colorClass)}>
                  {metric.value}%
                </span>
              </div>
              <div className="h-1 rounded-sm bg-card/40 border border-border/30 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                  className={cn("h-full", metric.bgClass)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: BarChart3,
    name: "Advanced Analytics",
    description:
      "Daily statistics, timeline visualization, and trend analysis built-in.",
    href: "#",
    cta: "Learn more",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center pb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-info/10 via-transparent to-transparent" />
        <div className="h-32 w-full flex items-end justify-around px-6 gap-1 scale-95">
          {[
            { height: 65, color: "info" },
            { height: 45, color: "success" },
            { height: 85, color: "info" },
            { height: 35, color: "warning" },
            { height: 75, color: "success" },
            { height: 55, color: "info" },
            { height: 95, color: "success" },
          ].map((bar, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${bar.height}%`, opacity: 1 }}
              transition={{
                height: { duration: 0.8, delay: i * 0.1, ease: "easeOut" },
                opacity: { duration: 0.3, delay: i * 0.1 },
              }}
              className={cn(
                "flex-1 rounded-t shadow-md border-t-2",
                bar.color === "info" &&
                  "bg-info/30 shadow-info/20 border-info/70",
                bar.color === "success" &&
                  "bg-success/30 shadow-success/20 border-success/70",
                bar.color === "warning" &&
                  "bg-warning/30 shadow-warning/20 border-warning/70",
              )}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Layers,
    name: "Multi-Environment",
    description:
      "Separate prod/staging/dev with wildcard patterns and session persistence.",
    href: "#",
    cta: "Learn more",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 via-transparent to-transparent">
        <div className="space-y-2 px-5 w-full scale-95">
          {[
            { env: "prod", count: 12, color: "success" },
            { env: "staging", count: 8, color: "warning" },
            { env: "dev", count: 5, color: "info" },
          ].map((item, i) => (
            <motion.div
              key={item.env}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: "easeOut",
              }}
              className={cn(
                "rounded border p-2.5 text-xs font-mono flex items-center justify-between backdrop-blur-sm",
                item.color === "success" && "border-success/70 bg-success/15",
                item.color === "warning" && "border-warning/70 bg-warning/15",
                item.color === "info" && "border-info/70 bg-info/15",
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    item.color === "success" && "bg-success",
                    item.color === "warning" && "bg-warning",
                    item.color === "info" && "bg-info",
                  )}
                />
                <span className="text-foreground font-bold text-[11px]">
                  {item.env}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "font-bold text-xs",
                    item.color === "success" && "text-success",
                    item.color === "warning" && "text-warning",
                    item.color === "info" && "text-info",
                  )}
                >
                  <NumberTicker value={item.count} />
                </span>
                <span className="text-muted-foreground text-[10px]">tasks</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-b border-border">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-surface border-border backdrop-blur-sm mb-4">
              <Cpu className="w-3 h-3" />
              <span className="text-xs font-mono font-medium">
                CORE FEATURES
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Everything you need.
              <br />
              <span className="text-primary">Nothing you don't.</span>
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
