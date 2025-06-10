"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
  PresentationIcon as PresentationChart,
  FileText,
  ClipboardCheck,
  BarChart3,
  Calendar,
  Settings2,
  MenuIcon,
  XIcon,
  LogInIcon,
  Building2,
  Microscope,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function CommitteeSidebar({ conferenceId }: { conferenceId: string }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems: NavItem[] = [
    {
      title: "Research Overview",
      href: `/committee/${conferenceId}`,
      icon: <PresentationChart className="h-5 w-5" />,
    },
    {
      title: "Research Papers",
      href: `/committee/${conferenceId}/papers`,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Peer Reviewers",
      href: `/committee/${conferenceId}/reviewers`,
      icon: <Microscope className="h-5 w-5" />,
    },
    {
      title: "Review Decisions",
      href: `/committee/${conferenceId}/decisions`,
      icon: <ClipboardCheck className="h-5 w-5" />,
    },
    {
      title: "Analytics Reports",
      href: `/committee/${conferenceId}/reports`,
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Conference Schedule",
      href: `/committee/${conferenceId}/schedule`,
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Research Institutions",
      href: `/committee/${conferenceId}/affiliation`,
      icon: <Building2 className="h-5 w-5" />,
    },
  ];

  if (!mounted) {
    return (
      <>
        {/* Mobile Navigation - Static version */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6" />
            <span className="text-xl font-bold">Research Committee</span>
          </div>
          <Button variant="outline" size="icon" disabled>
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Desktop Navigation - Static version */}
        <div className="hidden lg:flex lg:flex-col h-full w-64 border-r">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-6 w-6" />
              <span className="text-xl font-bold">Research Committee</span>
            </div>
          </div>
          <ScrollArea className="flex-1 py-4">
            <div className="px-4 space-y-2">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary hover:bg-muted"
                >
                  {item.icon}
                  {item.title}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-6 border-t">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <Button variant="outline" size="sm">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 button-spacing"
                >
                  <LogInIcon className="h-4 w-4" />
                  Login
                </Button>
                <Button size="sm" className="flex-1">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-6 w-6" />
          <span className="text-xl font-bold">Research Committee</span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="h-6 w-6" />
                  <span className="text-xl font-bold">Research Committee</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-6 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground hover:text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-6 border-t">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <Button
                    variant="outline"
                    size="sm"
                    className="button-spacing"
                  >
                    <LogInIcon className="h-4 w-4" />
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-col h-full w-64 border-r">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6" />
            <span className="text-xl font-bold">Research Committee</span>
          </div>
        </div>
        <ScrollArea className="flex-1 py-4">
          <div className="px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground hover:text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        </ScrollArea>
        <div className="p-6 border-t">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 button-spacing"
              >
                <LogInIcon className="h-4 w-4" />
                Login
              </Button>
              <Button size="sm" className="flex-1">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
