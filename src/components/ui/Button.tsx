import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

/**
 * Reusable Button Component
 * Pill-shaped action component supporting primary, secondary, outline, and loading states.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    // Pill-shaped button architecture inspired by the Evenjo event design
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer";

    const sizeStyles = {
      sm: "px-4 py-1.5 text-xs gap-1.5",
      md: "px-6 py-2.5 text-sm gap-2",
      lg: "px-8 py-3.5 text-base gap-2.5",
    };

    // Evenjo vibrant orchid / purple styling
    const variantStyles = {
      primary:
        "bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white shadow-md shadow-purple-600/30 hover:shadow-lg hover:shadow-purple-600/40 focus:ring-purple-400 focus:ring-offset-slate-900",
      secondary:
        "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-[#1A1330] dark:hover:bg-[#271B48] dark:text-purple-100 focus:ring-purple-400",
      outline:
        "border-2 border-purple-500/40 hover:border-purple-400 bg-transparent hover:bg-purple-500/10 text-purple-600 dark:text-purple-300 focus:ring-purple-400",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 focus:ring-rose-500",
      ghost:
        "bg-transparent hover:bg-purple-50 dark:hover:bg-[#1A1330] text-slate-700 dark:text-purple-200 focus:ring-purple-400",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
