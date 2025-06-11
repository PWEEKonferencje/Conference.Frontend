"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  LayoutDashboardIcon,
  UsersIcon,
  FileTextIcon,
  Settings2Icon,
  MenuIcon,
  XIcon,
  LogInIcon,
  BarChart3Icon,
  ClipboardListIcon,
  PlusIcon,
  MessageSquareIcon,
  UserCheckIcon,
  BookOpenIcon,
  UserIcon,
  CheckSquareIcon,
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

interface RoleSidebarProps {
  role: "chairman" | "committee" | "participant" | "reviewer";
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRoleNavItems = (): NavItem[] => {
    switch (role) {
      case "chairman":
        return [
          {
            title: "Dashboard",
            href: "/demo/chairman",
            icon: <LayoutDashboardIcon className="h-5 w-5" />,
          },
          {
            title: "Papers Management",
            href: "/demo/chairman/papers",
            icon: <FileTextIcon className="h-5 w-5" />,
          },
          {
            title: "Committee",
            href: "/demo/chairman/committee",
            icon: <UsersIcon className="h-5 w-5" />,
          },
          {
            title: "Participants",
            href: "/demo/chairman/participants",
            icon: <UsersIcon className="h-5 w-5" />,
          },
          {
            title: "Statistics",
            href: "/demo/chairman/statistics",
            icon: <BarChart3Icon className="h-5 w-5" />,
          },
          {
            title: "Schedule",
            href: "/demo/chairman/schedule",
            icon: <CalendarIcon className="h-5 w-5" />,
          },
          {
            title: "Settings",
            href: "/demo/chairman/settings",
            icon: <Settings2Icon className="h-5 w-5" />,
          },
        ];
      case "committee":
        return [
          {
            title: "Dashboard",
            href: "/demo/committee",
            icon: <LayoutDashboardIcon className="h-5 w-5" />,
          },
          {
            title: "Submissions",
            href: "/demo/committee/submissions",
            icon: <FileTextIcon className="h-5 w-5" />,
          },
          {
            title: "Reviewers",
            href: "/demo/committee/reviewers",
            icon: <UserCheckIcon className="h-5 w-5" />,
          },
          {
            title: "Decisions",
            href: "/demo/committee/decisions",
            icon: <CheckSquareIcon className="h-5 w-5" />,
          },
          {
            title: "Reports",
            href: "/demo/committee/reports",
            icon: <BarChart3Icon className="h-5 w-5" />,
          },
        ];
      case "participant":
        return [
          {
            title: "Dashboard",
            href: "/demo/participant",
            icon: <LayoutDashboardIcon className="h-5 w-5" />,
          },
          {
            title: "My Submissions",
            href: "/demo/participant/submissions",
            icon: <FileTextIcon className="h-5 w-5" />,
          },
          {
            title: "Submit Paper",
            href: "/demo/participant/submit",
            icon: <PlusIcon className="h-5 w-5" />,
          },
          {
            title: "Feedback",
            href: "/demo/participant/feedback",
            icon: <MessageSquareIcon className="h-5 w-5" />,
          },
          {
            title: "Schedule",
            href: "/demo/participant/schedule",
            icon: <CalendarIcon className="h-5 w-5" />,
          },
          {
            title: "Profile",
            href: "/demo/participant/profile",
            icon: <UserIcon className="h-5 w-5" />,
          },
        ];
      case "reviewer":
        return [
          {
            title: "Dashboard",
            href: "/demo/reviewer",
            icon: <LayoutDashboardIcon className="h-5 w-5" />,
          },
          {
            title: "Assigned Papers",
            href: "/demo/reviewer/assigned",
            icon: <ClipboardListIcon className="h-5 w-5" />,
          },
          {
            title: "Completed Reviews",
            href: "/demo/reviewer/completed",
            icon: <CheckSquareIcon className="h-5 w-5" />,
          },
          {
            title: "Guidelines",
            href: "/demo/reviewer/guidelines",
            icon: <BookOpenIcon className="h-5 w-5" />,
          },
          {
            title: "Profile",
            href: "/demo/reviewer/profile",
            icon: <UserIcon className="h-5 w-5" />,
          },
        ];
      default:
        return [];
    }
  };

  const navItems = getRoleNavItems();
  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1);

  if (!mounted) {
    return (
      <>
        {/* Mobile Navigation - Static version */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            <span className="text-xl font-bold">{roleTitle} Portal</span>
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
              <CalendarIcon className="h-6 w-6" />
              <span className="text-xl font-bold">{roleTitle} Portal</span>
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
                  <Settings2Icon className="h-4 w-4" />
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
          <CalendarIcon className="h-6 w-6" />
          <span className="text-xl font-bold">{roleTitle} Portal</span>
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
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-xl font-bold">{roleTitle} Portal</span>
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
            <CalendarIcon className="h-6 w-6" />
            <span className="text-xl font-bold">{roleTitle} Portal</span>
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
                <Settings2Icon className="h-4 w-4" />
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
