"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  BookOpen,
  Terminal as TerminalIcon,
} from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden border-b border-border">
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-2">
              <TerminalIcon className="w-3 h-3 text-primary" />
              <span className="text-xs font-mono font-medium text-primary">
                GET STARTED
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Start monitoring in
              <br />
              <span className="text-primary">under 5 minutes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              docker run, configure, monitor. Self-hosted. Open source. MIT
              licensed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {/* <ShimmerButton className="text-base font-semibold">
              Quick Start Guide
              <ArrowRight className="w-4 h-4" />
            </ShimmerButton> */}

            <Button
              variant="outline"
              size="lg"
              className="bg-card/50 backdrop-blur-sm hover:bg-card font-semibold"
              asChild
            >
              <a
                href="https://github.com/getkanchi/kanchi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-mono"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>100% Open Source</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-muted/50" />
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>MIT Licensed</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-muted/50" />
            <div className="flex items-center gap-2">
              <span>Self-hosted</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
