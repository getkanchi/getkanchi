"use client";

import { Github, BookOpen } from "lucide-react";

// Custom X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={'/logo_kanchi.svg'} alt="Kanchi Logo" className="h-8 w-8" />
              <span className="font-display font-bold text-xl">Kanchi</span>
            </div>
            <p className="text-sm text-muted">
              Real-time Celery monitoring.
              <br />
              Built for developers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/getkanchi/kanchi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center hover:bg-raised"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/czyber_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center hover:bg-raised"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/getkanchi/kanchi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/getkanchi/kanchi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">
              © 2025 Kanchi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
