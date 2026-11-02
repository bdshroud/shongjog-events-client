"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { IJoinedEvent } from "@/types";
import { api } from "@/lib/axios";
import { Badge } from "@/components/ui/Badge";
import { CardSkeletonGrid } from "@/components/ui/EventSkeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils";

export default function JoinedEventsPage() {
  const [joinedList, setJoinedList] = React.useState<IJoinedEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCurrent = true;

    async function fetchJoinedEvents() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get("/api/joined-events");
        if (isCurrent && res.data?.success && Array.isArray(res.data.joinedEvents)) {
          setJoinedList(res.data.joinedEvents);
        }
      } catch (err: any) {
        console.error("[Joined Events Error]", err);
        if (isCurrent) {
          setError(
            err.response?.data?.message ||
              "Could not load your joined initiatives."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    fetchJoinedEvents();

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div className="w-full text-left">
      {/* Evenjo Nocturnal Page Header */}
      <PageHeader
        badge="My Roster"
        title="My Joined Community Events"
        description="All grassroots social development initiatives you have registered to volunteer for, sorted chronologically by event date."
        watermark="JOINED"
        breadcrumbs={[
          { label: "Dashboard", href: "/manage-events" },
          { label: "Joined Events" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Sub-bar */}
        <div className="pb-6 border-b border-slate-200 dark:border-purple-900/30">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Registered Commitments ({joinedList.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-purple-300/60 mt-0.5">
            Keep track of your meetup times and locations across Bangladesh.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8">
          {isLoading ? (
            <CardSkeletonGrid count={3} />
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 p-8 text-center max-w-lg mx-auto">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                {error}
              </p>
            </div>
          ) : joinedList.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] p-12 text-center max-w-lg mx-auto space-y-4 my-8">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                No Joined Events Yet
              </h3>
              <p className="text-sm text-slate-500 dark:text-purple-300/60 leading-relaxed">
                You haven&apos;t joined any community events yet. Explore upcoming
                drives in Dhaka and Chattogram and be the change!
              </p>
              <Link
                href="/upcoming-events"
                className="inline-flex items-center justify-center font-bold rounded-full px-6 py-3 text-sm bg-[#B845EC] hover:bg-[#A838DE] text-white shadow-md shadow-purple-600/25"
              >
                Explore Upcoming Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {joinedList.map((item) => {
                const details = item.eventDetails;

                return (
                  <div
                    key={item._id}
                    className="flex flex-col h-full justify-between rounded-3xl border border-slate-200/90 dark:border-purple-900/40 bg-white dark:bg-[#130E24] shadow-xs hover:shadow-xl transition-all overflow-hidden group"
                  >
                    <div>
                      {/* Uniform Aspect-[16/10] Image */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#1A1330]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={details.thumbnailUrl}
                          alt={details.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge category={details.eventType} className="shadow-md" />
                        </div>
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#B845EC] text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Registered</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        {/* Chronological Date */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#B845EC] dark:text-[#C04BF2]">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{formatDate(details.eventDate)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                          {details.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-purple-300/60">
                          <MapPin className="w-3.5 h-3.5 text-[#C04BF2] shrink-0" />
                          <span className="truncate">{details.location}</span>
                        </div>

                        {/* Description excerpt */}
                        <p className="text-sm text-slate-600 dark:text-purple-200/70 line-clamp-2 leading-relaxed">
                          {details.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        By {details.creatorName}
                      </span>
                      <Link
                        href={`/events/${item.eventId}`}
                        className="inline-flex items-center justify-center font-bold rounded-full px-5 py-2 text-xs bg-[#B845EC] hover:bg-[#A838DE] text-white shadow-md shadow-purple-600/25 transition-all gap-1.5"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
