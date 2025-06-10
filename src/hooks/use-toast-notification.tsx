"use client";

import { useNotifications } from "@/context/notification-context";
import type { NotificationType } from "@/types/notification";
import { useToast } from "@/hooks/use-toast";

export function useToastNotification() {
  const { addNotification } = useNotifications();
  const { toast } = useToast();

  const showNotification = (
    title: string,
    message: string,
    type: NotificationType = "info",
    link?: { text: string; href: string },
  ) => {
    // Add to notification system
    addNotification({
      title,
      message,
      type,
      link,
    });

    // Also show as toast
    toast({
      title,
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  return {
    success: (
      title: string,
      message: string,
      link?: { text: string; href: string },
    ) => showNotification(title, message, "success", link),
    error: (
      title: string,
      message: string,
      link?: { text: string; href: string },
    ) => showNotification(title, message, "error", link),
    warning: (
      title: string,
      message: string,
      link?: { text: string; href: string },
    ) => showNotification(title, message, "warning", link),
    info: (
      title: string,
      message: string,
      link?: { text: string; href: string },
    ) => showNotification(title, message, "info", link),
  };
}
