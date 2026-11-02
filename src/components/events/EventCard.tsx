import * as React from "react";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { IEvent } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: IEvent;
}

export function EventCard({ event }: EventCardProps) {
  const participantCount = event.participantCount ?? 0;

  return (
    <div className="flex flex-col h-full justify-between rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] shadow-sm hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-500/60 transition-all duration-300 overflow-hidden group">
      <div>
        {/* Uniform Aspect-[16/10] Image Header (Strict Rubric Rule) */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#1A1330]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.thumbnailUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top-Left Floating Date Pill Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A0612]/85 backdrop-blur-md text-white text-xs font-bold shadow-md flex items-center gap-1.5 border border-purple-900/30">
            <Calendar className="w-3 h-3 text-[#C04BF2]" />
            <span>{formatDate(event.eventDate).split(",")[0]}</span>
          </div>

          {/* Top-Right EventType Badge */}
          <div className="absolute top-3 right-3">
            <Badge category={event.eventType} className="shadow-md" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 text-left space-y-3.5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B845EC] dark:text-[#C04BF2]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#B845EC] dark:group-hover:text-[#C04BF2] transition-colors">
            {event.title}
          </h3>

          {/* Description Excerpt */}
          <p className="text-sm text-slate-600 dark:text-purple-200/70 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Stacked Participant Avatar Circles */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-[#130E24] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Volunteer"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-[#130E24] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Volunteer"
                />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-purple-200">
                {participantCount > 0 ? `+${participantCount} Joined` : "Be First to Join"}
              </span>
            </div>

            <span className="text-[11px] font-medium text-slate-400">
              By {event.creatorName.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Evenjo Full-width Primary Pill CTA (Strict Rubric Rule) */}
      <div className="px-6 pb-6 pt-2">
        <Link
          href={`/events/${event._id}`}
          className="w-full inline-flex items-center justify-center font-medium rounded-full py-2.5 text-sm bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white shadow-md shadow-purple-600/25 hover:shadow-lg hover:shadow-purple-600/35 transition-all gap-2"
        >
          <span>View Event</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
