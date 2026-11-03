import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Form Input Primitive
 * Supports floating labels, validation error styling, and forwardRef binding.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-[#B845EC] focus:border-transparent transition-all shadow-sm",
            error && "border-rose-500 dark:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
