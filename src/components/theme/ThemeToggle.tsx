"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-slate-200 dark:border-purple-900/50 bg-slate-100/50 dark:bg-[#1A1330]/50 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-purple-900/50 bg-white dark:bg-[#1A1330] text-slate-700 dark:text-purple-200 hover:bg-slate-100 dark:hover:bg-[#271B48] hover:text-[#B845EC] dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#B845EC] cursor-pointer shadow-xs ${className}`}
      aria-label="Toggle theme mode"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
