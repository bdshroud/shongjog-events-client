import * as React from "react";
import { cn } from "@/lib/utils";

export function EventSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col h-full justify-between rounded-3xl border border-slate-200 dark:border-purple-900/30 bg-white dark:bg-[#130E24] p-6 shadow-xs animate-pulse overflow-hidden",
        className
      )}
    >
      <div>
        {/* Aspect-[16/10] Image skeleton */}
        <div className="w-full aspect-[16/10] rounded-2xl bg-slate-200 dark:bg-[#1A1330] mb-4" />

        {/* Badge & Date skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-[#1A1330]" />
          <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-[#1A1330]" />
        </div>

        {/* Title skeleton */}
        <div className="h-6 w-5/6 rounded-md bg-slate-200 dark:bg-[#1A1330] mb-2" />
        <div className="h-4 w-4/6 rounded-md bg-slate-200 dark:bg-[#1A1330] mb-3" />

        {/* Description skeleton */}
        <div className="space-y-1.5 mb-4">
          <div className="h-3.5 w-full rounded-md bg-slate-200 dark:bg-[#1A1330]" />
          <div className="h-3.5 w-11/12 rounded-md bg-slate-200 dark:bg-[#1A1330]" />
          <div className="h-3.5 w-3/4 rounded-md bg-slate-200 dark:bg-[#1A1330]" />
        </div>
      </div>

      {/* Footer / CTA skeleton */}
      <div className="pt-4 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-between">
        <div className="h-4 w-28 rounded-md bg-slate-200 dark:bg-[#1A1330]" />
        <div className="h-10 w-28 rounded-full bg-slate-200 dark:bg-[#1A1330]" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <EventSkeleton key={idx} />
      ))}
    </div>
  );
}
