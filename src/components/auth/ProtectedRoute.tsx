"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthSync } from "./JwtSyncProvider";
import { CardSkeletonGrid } from "@/components/ui/EventSkeleton";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, isPending, isJwtReady } = useAuthSync();

  React.useEffect(() => {
    // Strictly wait for both BetterAuth session and JWT exchange before checking authentication
    if (!isPending && isJwtReady) {
      if (!session?.user) {
        const redirectUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;
        router.replace(redirectUrl);
      }
    }
  }, [session, isPending, isJwtReady, router, pathname]);

  // While session is hydrating or JWT is syncing, render skeleton UI (NEVER redirect)
  if (isPending || !isJwtReady) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-96 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <CardSkeletonGrid count={3} />
      </div>
    );
  }

  // If not authenticated after full hydration, return skeleton while router redirects
  if (!session?.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 animate-pulse">
        <div className="h-8 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <CardSkeletonGrid count={3} />
      </div>
    );
  }

  // Hydration complete & user is authenticated
  return <>{children}</>;
}
