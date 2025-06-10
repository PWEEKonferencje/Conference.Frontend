"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, FileText, Bell } from "lucide-react";

interface NotificationProps {
  id: number;
  type: "success" | "info" | "warning" | "error";
  title: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

interface NotificationSidebarProps {
  notifications?: NotificationProps[];
}

export function NotificationSidebar({
  notifications: externalNotifications,
}: NotificationSidebarProps) {
  // Default notifications if none provided
  const defaultNotifications: NotificationProps[] = [
    {
      id: 1,
      type: "success" as const,
      title: "Your paper 'Neural Network in Healthcare' was approved",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "info" as const,
      title: "New paper assigned for review",
      time: "1 day ago",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "warning" as const,
      title: "Deadline for 'AI IN FUTURE' paper submission is in 3 days",
      time: "2 days ago",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
  ];

  const [notifications] = useState<NotificationProps[]>(
    externalNotifications ?? defaultNotifications,
  );

  const handleMarkAllAsRead = () => {
    // Handle mark all as read functionality
    console.log("Mark all as read");
  };

  return (
    <div className="w-80 border-l bg-muted/30 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Notification</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={handleMarkAllAsRead}
        >
          Mark all as read
        </Button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className="p-3 bg-background rounded-lg border"
              >
                <div className="flex items-start gap-3">
                  <IconComponent
                    className={`h-4 w-4 mt-0.5 ${notification.color}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No notifications</p>
          <p className="text-xs text-muted-foreground mt-1">
            You&apos;re all caught up!
          </p>
        </div>
      )}
    </div>
  );
}
