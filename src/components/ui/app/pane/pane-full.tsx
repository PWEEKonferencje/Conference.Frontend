import clsx from "clsx";
import { ReactNode } from "react";

interface PaneFullProps {
  children: ReactNode;
  className?: string;
}

function PaneFull({ children, className }: PaneFullProps) {
  return <div className={clsx("w-full h-full", className)}>{children}</div>;
}

export { PaneFull };
