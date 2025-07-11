import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input component with forwardRef to support ref usage.
 * Ensures input is always controlled or always uncontrolled for its lifetime.
 * If a `value` prop is provided but is undefined or null, it is replaced with an empty string.
 * This prevents React warnings about switching between controlled and uncontrolled.
 *
 * @example
 * <Input ref={myRef} value={value ?? ""} {...props} />
 */
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(function Input({ className, type, value, defaultValue, ...props }, ref) {
  // If value is provided (even as undefined/null), force controlled with empty string fallback
  const isControlled = value !== undefined;
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
      {...(isControlled ? { value: value ?? "" } : { defaultValue })}
    />
  );
});

export { Input };
