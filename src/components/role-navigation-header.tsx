"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  User,
  Settings,
  LogOut,
  GraduationCap,
  Microscope,
  BookOpen,
} from "lucide-react";

interface RoleNavigationHeaderProps {
  role: "chairman" | "committee" | "participant";
  conferenceId: string;
  conferenceName?: string;
}

export function RoleNavigationHeader({
  role,
  conferenceId,
  conferenceName = "AI Research Conference 2025",
}: RoleNavigationHeaderProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRoleInfo = () => {
    switch (role) {
      case "chairman":
        return {
          title: "Conference Chair",
          icon: <GraduationCap className="h-4 w-4" />,
          color: "bg-purple-100 text-purple-800 border-purple-200",
        };
      case "committee":
        return {
          title: "Program Committee",
          icon: <Microscope className="h-4 w-4" />,
          color: "bg-blue-100 text-blue-800 border-blue-200",
        };
      case "participant":
        return {
          title: "Research Participant",
          icon: <BookOpen className="h-4 w-4" />,
          color: "bg-green-100 text-green-800 border-green-200",
        };
    }
  };

  const getCurrentPageTitle = () => {
    if (!mounted) return "";

    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] ?? "";

    if (lastSegment === conferenceId) return "Research Dashboard";

    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Navigation breadcrumb */}
        <div className="flex items-center space-x-3">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              Dashboard
            </Button>
          </Link>

          <ChevronRight className="h-4 w-4 text-gray-400" />

          <Badge variant="outline" className={`gap-1.5 ${roleInfo.color}`}>
            {roleInfo.icon}
            {roleInfo.title}
          </Badge>

          <ChevronRight className="h-4 w-4 text-gray-400" />

          <span className="text-sm font-medium text-gray-900">
            {getCurrentPageTitle()}
          </span>
        </div>

        {/* Right side - Conference info and user menu */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {conferenceName}
            </p>
            <p className="text-xs text-gray-500">
              Conference ID: {conferenceId}
            </p>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">MK</span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">Mariusz Kolanko</p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="flex items-center">
                  Dashboard
                </Link>
              </DropdownMenuItem>
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
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
