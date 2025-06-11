import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  Settings2Icon,
  MoreVertical,
  PlusIcon,
  ClipboardListIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarNavProps {
  role: "chairman" | "committee" | "participant";
  conferenceId?: string;
}

export function SidebarNav({ role, conferenceId }: SidebarNavProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getConferenceTitle = () => {
    if (role === "chairman") {
      return "AI Research Conference 2025";
    }
    return "Neutroal Network in Health Care";
  };

  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href:
          role === "chairman" && conferenceId
            ? `/chairman/${conferenceId}`
            : role === "committee" && conferenceId
              ? `/committee/${conferenceId}`
              : role === "participant" && conferenceId
                ? `/participant/${conferenceId}`
                : "/dashboard",
        icon: <LayoutDashboardIcon className="h-5 w-5" />,
      },
    ];

    // Add role-specific items
    if (role === "participant") {
      baseItems.push(
        {
          title: "My Papers",
          href: `/participant/${conferenceId}/my-papers`,
          icon: <FileTextIcon className="h-5 w-5" />,
        },
        {
          title: "Submit Paper",
          href: `/participant/${conferenceId}/submit-paper`,
          icon: <PlusIcon className="h-5 w-5" />,
        },
        {
          title: "Assigned Reviews",
          href: `/participant/${conferenceId}/reviews`,
          icon: <ClipboardListIcon className="h-5 w-5" />,
        },
      );
    } else {
      baseItems.push({
        title: "Papers",
        href:
          role === "chairman" && conferenceId
            ? `/chairman/${conferenceId}/papers`
            : role === "committee" && conferenceId
              ? `/committee/${conferenceId}/papers`
              : "/papers",
        icon: <FileTextIcon className="h-5 w-5" />,
      });

      // Add chairman-specific items
      if (role === "chairman") {
        baseItems.push(
          {
            title: "Committee",
            href: `/chairman/${conferenceId}/committee`,
            icon: <UsersIcon className="h-5 w-5" />,
          },
          {
            title: "Participants",
            href: `/chairman/${conferenceId}/participants`,
            icon: <UserIcon className="h-5 w-5" />,
          },
        );
      }
    }

    // Add schedule for all roles
    baseItems.push({
      title: "Schedule",
      href:
        role === "chairman" && conferenceId
          ? `/chairman/${conferenceId}/schedule`
          : role === "committee" && conferenceId
            ? `/committee/${conferenceId}/schedule`
            : role === "participant" && conferenceId
              ? `/participant/${conferenceId}/schedule`
              : "/schedule",
      icon: <CalendarIcon className="h-5 w-5" />,
    });

    // Add affiliation for all roles
    baseItems.push({
      title: "Affiliation",
      href:
        role === "chairman" && conferenceId
          ? `/chairman/${conferenceId}/affiliation`
          : role === "committee" && conferenceId
            ? `/committee/${conferenceId}/affiliation`
            : role === "participant" && conferenceId
              ? `/participant/${conferenceId}/affiliation`
              : "/affiliation",
      icon: <UserIcon className="h-5 w-5" />,
    });

    // Add settings only for chairman
    if (role === "chairman") {
      baseItems.push({
        title: "Settings",
        href: `/chairman/${conferenceId}/settings`,
        icon: <Settings2Icon className="h-5 w-5" />,
      });
    }

    return baseItems;
  };

  const navItems = getNavItems();
  const userName = "Mariusz Kolanko";
  const userEmail = "maria@colan.co";

  // Helper function to check if a path matches the current pathname
  const isActive = (item: { title: string; href: string }) => {
    if (!mounted) return false;

    // Exact match for dashboard
    if (item.title === "Dashboard") {
      return pathname === item.href;
    }

    // For other items, check if pathname starts with the href
    if (item.title !== "Dashboard") {
      return (
        pathname.startsWith(item.href) &&
        // Make sure we don't match subpaths of other items
        !navItems.some(
          (otherItem) =>
            otherItem !== item &&
            otherItem.href.length > item.href.length &&
            pathname.startsWith(otherItem.href),
        )
      );
    }

    return false;
  };

  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{getConferenceTitle()}</h2>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className="px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                isActive(item) ? "bg-[#24242a] text-white" : "hover:bg-muted",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
