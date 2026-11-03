import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category?: string;
  shape?: "pill" | "leaf";
}

/**
 * Category Badge Component
 * Dynamically assigns contrasting color themes based on the event classification.
 */
export function Badge({
  category = "",
  shape = "pill",
  className,
  children,
  ...props
}: BadgeProps) {
  const normalized = (
    category || (typeof children === "string" ? children : "")
  ).toLowerCase();

  let colorClasses =
    "bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800";

  if (normalized.includes("clean")) {
    colorClasses =
      "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
  } else if (normalized.includes("plant") || normalized.includes("tree")) {
    colorClasses =
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
  } else if (
    normalized.includes("winter") ||
    normalized.includes("cloth") ||
    normalized.includes("blanket")
  ) {
    colorClasses =
      "bg-blue-100 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200 border-blue-300 dark:border-blue-700";
  } else if (
    normalized.includes("medic") ||
    normalized.includes("camp") ||
    normalized.includes("health")
  ) {
    colorClasses =
      "bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800";
  } else if (
    normalized.includes("food") ||
    normalized.includes("soup") ||
    normalized.includes("ration")
  ) {
    colorClasses =
      "bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  } else if (normalized.includes("donat")) {
    colorClasses =
      "bg-violet-50 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300 border-violet-200 dark:border-violet-800";
  }

  const shapeClasses =
    shape === "leaf"
      ? "rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-none px-3 py-1 shadow-xs"
      : "rounded-full px-3 py-1";

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-bold border tracking-wide uppercase shadow-xs",
        shapeClasses,
        colorClasses,
        className
      )}
      {...props}
    >
      {children || category}
    </span>
  );
}
