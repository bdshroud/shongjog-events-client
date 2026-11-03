"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { IEvent } from "@/types";
import { api } from "@/lib/axios";
import { EventCard } from "@/components/events/EventCard";
import { CardSkeletonGrid } from "@/components/ui/EventSkeleton";

/**
 * Recent Events Section
 * Fetches and presents the 6 most imminent future community initiatives on the home page.
 */
export function RecentEventsSection() {
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function fetchRecentEvents() {
      try {
        setIsLoading(true);
        const res = await api.get("/api/events/recent");
        if (isMounted) {
          if (res.data?.success && Array.isArray(res.data.events)) {
            // Strictly enforce future events only
            const now = Date.now();
            const validFutureEvents = res.data.events.filter(
              (ev: IEvent) => new Date(ev.eventDate).getTime() >= now
            );
            setEvents(validFutureEvents);
          } else {
            setEvents([]);
          }
        }
      } catch (err: any) {
        console.error("[RecentEvents] Fetch failed:", err);
        if (isMounted) {
          setError("Unable to load recent events at this time.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRecentEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-[#FAF8FD] dark:bg-[#090514]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-[#1A1330] border border-purple-200 dark:border-purple-800/60 text-[#B845EC] dark:text-[#C04BF2] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upcoming Initiatives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Upcoming Community Drives
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            Discover and join verified grassroots winter aid, tree plantations, and emergency relief drives in Dhaka, Chattogram, and beyond.
          </p>
        </div>

        {/* Dynamic 6 Events Content / Skeletons */}
        {isLoading ? (
          <CardSkeletonGrid count={6} />
        ) : error ? (
          <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-center max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <p className="text-sm font-semibold text-rose-800 dark:text-rose-200">
              {error}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white dark:bg-[#130E24] border border-slate-200 dark:border-purple-900/40 text-center max-w-md mx-auto space-y-4">
            <p className="text-slate-600 dark:text-purple-200/70 text-sm">
              No upcoming events found. Launch a community initiative today!
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center justify-center font-medium rounded-full px-6 py-2.5 text-sm bg-[#B845EC] text-white hover:bg-[#A838DE] shadow-md shadow-purple-600/30"
            >
              Launch an Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* View All Events Button */}
        <div className="mt-14 text-center">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border-2 border-purple-500/40 hover:border-[#B845EC] bg-transparent hover:bg-purple-500/10 text-[#B845EC] dark:text-[#C04BF2] font-semibold text-sm transition-all"
          >
            <span>Explore All 100+ Initiatives</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
