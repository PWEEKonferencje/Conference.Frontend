"use client";

import type React from "react";

import { useState } from "react";
import type { Notification } from "@/types/notification";
import { useNotifications } from "@/context/notification-context";
import { formatDistanceToNow } from "date-fns";
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  showActions?: boolean;
}

export function NotificationItem({
  notification,
  showActions = true,
}: NotificationItemProps) {
  const { markAsRead, removeNotification } = useNotifications();
  const [isHovered, setIsHovered] = useState(false);

  const handleMarkAsRead = () => {
    markAsRead(notification.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(notification.id);
  };

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTimeAgo = () => {
    try {
      return formatDistanceToNow(new Date(notification.time), {
        addSuffix: true,
      });
    } catch {
      return "recently";
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-colors",
        notification.read ? "bg-background" : "bg-background border-l-4",
        notification.type === "success" &&
          !notification.read &&
          "border-l-green-500",
        notification.type === "warning" &&
          !notification.read &&
          "border-l-amber-500",
        notification.type === "error" &&
          !notification.read &&
          "border-l-red-500",
        notification.type === "info" &&
          !notification.read &&
          "border-l-blue-500",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMarkAsRead}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            {showActions && (isHovered || !notification.read) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full -mt-1 -mr-1"
                onClick={handleRemove}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Dismiss</span>
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            {notification.message}
          </p>

          {notification.link && (
            <Link
              href={notification.link.href}
              className="text-sm text-primary hover:underline mt-2 inline-block"
            >
              {notification.link.text}
            </Link>
          )}

          <p className="text-xs text-muted-foreground mt-2">{getTimeAgo()}</p>
        </div>
      </div>
    </div>
  );
}
