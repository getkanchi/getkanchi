"use client";

import Link from "next/link";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <img src="/logo_kanchi.svg" alt="Kanchi Logo" className="h-8 w-8" /> Kanchi
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex text-muted">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={cn(navigationMenuTriggerStyle(), 'hover:text-foreground')}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs" className={cn(navigationMenuTriggerStyle(), 'hover:text-foreground')}>
                  Documentation
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/changelog" className={cn(navigationMenuTriggerStyle(), 'hover:text-foreground')}>
                  Changelog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-display">
                  <img src="/logo_kanchi.svg" alt="Kanchi Logo" className="h-6 w-6" />
                  Kanchi
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                {/* <Link
                  href="/docs"
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Documentation
                </Link> */}
                <Link
                  href="/changelog"
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Changelog
                </Link>
                <div className="border-t border-border pt-4 mt-4">
                  <a
                    href="https://github.com/getkanchi/kanchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* GitHub Button (Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden md:flex text-muted-foreground hover:text-foreground"
          >
            <a
              href="https://github.com/getkanchi/kanchi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>
          {/* <Button size="sm" variant={'ghost'} className="hidden sm:flex">
            Get Started
          </Button> */}
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
