"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
  FileText,
  UserCheck,
  Calendar,
  Building2,
  Settings,
  MoreVertical,
  User,
  Microscope,
  PresentationIcon as PresentationChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChairmanSidebarProps {
  conferenceId?: string;
}

export function ChairmanSidebar({
  conferenceId = "ai-research-2025",
}: ChairmanSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      title: "Research Overview",
      href: `/chairman/${conferenceId}`,
      icon: <PresentationChart className="h-5 w-5" />,
    },
    {
      title: "Research Papers",
      href: `/chairman/${conferenceId}/papers`,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Review Committee",
      href: `/chairman/${conferenceId}/committee`,
      icon: <Microscope className="h-5 w-5" />,
    },
    {
      title: "Researchers",
      href: `/chairman/${conferenceId}/participants`,
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      title: "Conference Schedule",
      href: `/chairman/${conferenceId}/schedule`,
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Institutions",
      href: `/chairman/${conferenceId}/affiliation`,
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Conference Settings",
      href: `/chairman/${conferenceId}/settings`,
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  if (!mounted) {
    return (
      <div className="w-[255px] border-r h-screen bg-white flex flex-col fixed left-0 top-0 z-50">
        <div className="p-4 border-b">
          <h1 className="text-sm font-semibold text-gray-900">
            AI Research Conference 2025
          </h1>
        </div>
        <div className="flex-1 p-2">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-1"
            >
              <div className="h-5 w-5" />
              <span className="text-gray-700">{item.title}</span>
            </div>
          ))}
        </div>
        <div className="p-3 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">MK</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                Mariusz Kolanko
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[255px] border-r h-screen bg-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-4 border-b">
        <h1 className="text-sm font-semibold text-gray-900">
          AI Research Conference 2025
        </h1>
      </div>
      <div className="flex-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-1 transition-colors",
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="p-3 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">MK</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              Mariusz Kolanko
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard/settings/profile"
                  className="flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Researcher Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
