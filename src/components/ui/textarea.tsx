import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Textarea component with forwardRef to support ref usage.
 * This is necessary for integration with libraries like react-hook-form,
 * which may attempt to attach refs to the textarea.
 *
 * @example
 * <Textarea ref={myRef} {...props} />
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      data-slot="textarea"
      ref={ref}
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
});

export { Textarea };
