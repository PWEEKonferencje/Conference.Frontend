"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/context/theme-provider";

interface ToasterProps {
  className?: string;
}

function Toaster({ className, ...props }: ToasterProps) {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme === "system" ? undefined : theme}
      className={className}
      {...props}
    />
  );
}

export { Toaster };
