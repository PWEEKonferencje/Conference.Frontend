export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string | Date;
  read: boolean;
  link?: {
    text: string;
    href: string;
  };
}
