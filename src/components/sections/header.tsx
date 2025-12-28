"use client";

import { Github, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_1px_0_rgba(255,255,255,0.04)]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold"
        >
          <Image
            src="/logo_kanchi.svg"
            alt="Kanchi Logo"
            width={20}
            height={20}
            priority
          />
          Kanchi
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/70">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:inline-flex border-border/60 bg-background/30 text-foreground/80 hover:text-foreground hover:bg-background/60"
          >
            <a
              href="https://github.com/getkanchi/kanchi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button
            size="sm"
            asChild
            className="hidden md:inline-flex bg-foreground text-background hover:bg-foreground/90"
          >
            <Link href="/docs/getting-started/quickstart">Get started</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-display">
                  <Image
                    src="/logo_kanchi.svg"
                    alt="Kanchi Logo"
                    width={24}
                    height={24}
                    priority
                  />
                  Kanchi
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/docs/getting-started/quickstart"
                  className="text-lg font-medium text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Get started
                </Link>
                <div className="border-t border-border pt-4 mt-4">
                  <a
                    href="https://github.com/getkanchi/kanchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
