"use client";

import { motion } from "framer-motion";
import { Check, CheckCircle2, Code2, Cloud } from "lucide-react";
import NumberTicker from "@/components/magicui/number-ticker";

const differentiators = [
  "Orphan Detection & Recovery",
  "Workflow Automation",
  "Real-Time WebSocket",
  "Environment Filtering",
  "Retry Chain Tracking",
];

const techSpecs = [
  { label: "PostgreSQL", value: "Production Ready" },
  { label: "FastAPI", value: "Type-Safe API" },
  { label: "WebSocket", value: "Zero Polling" },
  { label: "Auto-Discovery", value: "Zero Config" },
];

export function DifferentiatorsSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden border-b border-border">
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: What Makes Us Different */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border  bg-surface border-border backdrop-blur-sm mb-4">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-xs font-mono font-medium">
                    UNIQUE TO KANCHI
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Not just another
                  <br />
                  <span className="text-primary">monitoring tool</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Built from scratch for modern DevOps workflows with features
                  you won't find anywhere else.
                </p>
              </div>

              <div className="space-y-3">
                {differentiators.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-border hover:border-border/30 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tech Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {techSpecs.map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    className="p-3 rounded-lg border border-border bg-card/30"
                  >
                    <div className="text-xs font-mono text-muted-foreground mb-1">
                      {spec.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Code/Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Docker Command */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-primary rounded-lg opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-1000" />
                <div className="relative bg-[#0D0D0D] border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-border bg-raised px-4 py-2">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground ml-2 truncate">
                      docker-compose.yml
                    </span>
                  </div>
                  <div className="p-4 font-mono text-xs space-y-1 overflow-x-auto max-w-full">
                    <div className="flex gap-4">
                      <span className="text-muted-foreground select-none">
                        1
                      </span>
                      <span className="text-special">services:</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground select-none">
                        2
                      </span>
                      <span className="text-info ml-4">kanchi:</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground select-none">
                        3
                      </span>
                      <span className="text-muted-foreground ml-8">
                        image:{" "}
                        <span className="text-success">getkanchi/kanchi</span>
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground select-none">
                        4
                      </span>
                      <span className="text-muted-foreground ml-8">
                        ports:{" "}
                        <span className="text-warning">["8000:8000"]</span>
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground select-none">
                        5
                      </span>
                      <span className="text-success ml-8"># Done!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Cloud className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-primary mb-2">
                    t3.nano
                  </div>
                  <div className="text-sm text-muted">AWS Ready</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    0.5GB RAM
                  </div>
                </div>

                <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm">
                  <div className="text-4xl font-bold font-mono text-info mb-2">
                    <NumberTicker value={5} />
                    <span className="text-2xl text-muted">min</span>
                  </div>
                  <div className="text-sm text-muted">Setup Time</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    docker → prod
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">
                    Production Ready
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="text-muted">✓ Connection Pooling</div>
                  <div className="text-muted">✓ Indexed Queries</div>
                  <div className="text-muted">✓ Auto Migrations</div>
                  <div className="text-muted">✓ Health Checks</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
