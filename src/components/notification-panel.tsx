"use client";

import { useNotifications } from "@/context/notification-context";
import { NotificationItem } from "@/components/notification-item";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface NotificationPanelProps {
  maxHeight?: string;
}

export function NotificationPanel({
  maxHeight = "500px",
}: NotificationPanelProps) {
  const { notifications, markAllAsRead, unreadCount } = useNotifications();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="h-5 px-2 text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      {notifications.length > 0 ? (
        <ScrollArea className={`max-h-[${maxHeight}]`}>
          <div className="space-y-3 pr-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </ScrollArea>
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
