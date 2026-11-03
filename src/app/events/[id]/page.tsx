"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Sparkles,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { IEvent } from "@/types";
import { api } from "@/lib/axios";
import { useAuthSync } from "@/components/auth/JwtSyncProvider";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import Swal from "sweetalert2";

/**
 * Event Details & Volunteer Registration View
 * Comprehensive view with meeting guidelines, creator contact, and one-click join action.
 */
export default function EventDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { session } = useAuthSync();

  const [event, setEvent] = React.useState<IEvent | null>(null);
  const [hasJoined, setHasJoined] = React.useState(false);
  const [participantCount, setParticipantCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isJoining, setIsJoining] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch event details
  React.useEffect(() => {
    if (!id) return;

    let isCurrent = true;

    async function fetchEventDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get(`/api/events/${id}`);
        if (isCurrent && res.data?.success && res.data.event) {
          setEvent(res.data.event);
          setParticipantCount(res.data.event.participantCount || 0);
        }
      } catch (err: any) {
        console.error("[Event Details Error]", err);
        if (isCurrent) {
          setError(
            err.response?.data?.message || "Community event could not be found."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    fetchEventDetails();

    return () => {
      isCurrent = false;
    };
  }, [id]);

  // Check if current user already joined this event
  React.useEffect(() => {
    if (!id || !session?.user?.email) return;

    let isCurrent = true;

    async function checkStatus() {
      try {
        const res = await api.get(`/api/events/${id}/join-status`);
        if (isCurrent && res.data?.success) {
          setHasJoined(!!res.data.hasJoined);
        }
      } catch {
        // Not joined or unauthorized
      }
    }

    checkStatus();

    return () => {
      isCurrent = false;
    };
  }, [id, session]);

  // Handle Joining
  const handleJoinEvent = async () => {
    if (!session?.user) {
      toast.info("Please sign in or create an account to join this initiative.");
      router.push(`/login?callbackUrl=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }

    if (hasJoined) {
      toast.info("You have already joined this event!");
      return;
    }

    setIsJoining(true);
    try {
      const res = await api.post(`/api/events/${id}/join`);

      if (res.data?.success) {
        setHasJoined(true);
        setParticipantCount((prev) => prev + 1);

        await Swal.fire({
          title: "You are on the Volunteer Roster!",
          text: `You have successfully joined "${event?.title}". Thank you for taking action with ShongjogBD!`,
          icon: "success",
          confirmButtonColor: "#2563EB",
          confirmButtonText: "View Joined Events",
          showCancelButton: true,
          cancelButtonText: "Stay Here",
          cancelButtonColor: "#94a3b8",
          background: document.documentElement.classList.contains("dark")
            ? "#111a2e"
            : "#ffffff",
          color: document.documentElement.classList.contains("dark")
            ? "#f8fafc"
            : "#0f172a",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/joined-events");
          }
        });
      }
    } catch (err: any) {
      console.error("[Join Event Error]", err);
      const msg =
        err.response?.data?.message || "Failed to join event. Please try again.";
      if (err.response?.status === 409) {
        setHasJoined(true);
        toast.info("You are already registered for this event.");
      } else {
        toast.error(msg);
      }
    } finally {
      setIsJoining(false);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6 animate-pulse">
        <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="w-full aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Event Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {error || "The requested community event does not exist or has been removed."}
        </p>
        <Link
          href="/upcoming-events"
          className="inline-flex items-center justify-center font-bold rounded-full px-6 py-3 text-sm bg-[#B845EC] hover:bg-[#A838DE] text-white shadow-md shadow-purple-600/25"
        >
          Browse Upcoming Events
        </Link>
      </div>
    );
  }

  const isPast = new Date(event.eventDate).getTime() < Date.now();

  return (
    <div className="w-full text-left">
      {/* Evenjo Nocturnal Page Header */}
      <PageHeader
        badge={event.eventType}
        title={event.title}
        description={`Organized by ${event.creatorName} • ${event.location}`}
        watermark="DETAILS"
        breadcrumbs={[
          { label: "Upcoming Events", href: "/upcoming-events" },
          { label: "Event Overview" },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Back Link & Share Action */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#B845EC] dark:hover:text-[#C04BF2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upcoming Events
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1A1330] transition-colors cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Link
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] overflow-hidden shadow-2xl">
          {/* Full Banner Header - aspect-[16/10] */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-slate-950">
            <SafeImage
              src={event.thumbnailUrl}
              alt={event.title}
              category={event.eventType}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-[#0A0612]/40 to-transparent" />

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge category={event.eventType} className="shadow-lg" />
              {isPast ? (
                <span className="px-3.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
                  Event Concluded
                </span>
              ) : (
                <span className="px-3.5 py-1 rounded-full bg-[#B845EC] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" /> Open for Volunteers
                </span>
              )}
            </div>

            {/* Bottom Banner Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Key Logistics Metadata Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-[#0E091C] border border-slate-100 dark:border-purple-900/30">
              {/* Date */}
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-[#1A1330] text-[#B845EC] dark:text-[#C04BF2]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-purple-300/60 font-bold uppercase tracking-wider">
                    Date & Time
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {formatDate(event.eventDate)}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-[#1A1330] text-[#B845EC] dark:text-[#C04BF2]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-purple-300/60 font-bold uppercase tracking-wider">
                    Location & Meetup
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate mt-0.5">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Volunteer Count */}
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-[#1A1330] text-[#B845EC] dark:text-[#C04BF2]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-purple-300/60 font-bold uppercase tracking-wider">
                    Volunteer Roster
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {participantCount} {participantCount === 1 ? "Volunteer" : "Volunteers"} Registered
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                About This Initiative
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {event.description}
              </div>
            </div>

            {/* Organizer Info Card */}
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#0E091C] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#9333EA] to-[#C04BF2] text-white font-black flex items-center justify-center text-lg shadow-md shadow-purple-900/25">
                  {event.creatorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-base font-extrabold text-slate-900 dark:text-white">
                      {event.creatorName}
                    </p>
                    <ShieldCheck className="w-4 h-4 text-[#B845EC]" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Organizer &bull; {event.creatorEmail}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-50 dark:bg-[#1A1330] text-[#B845EC] dark:text-[#C04BF2] border border-purple-200 dark:border-purple-800">
                Verified Creator
              </span>
            </div>

            {/* CTA Action Banner */}
            <div className="pt-6 border-t border-slate-100 dark:border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                {hasJoined ? (
                  <div className="flex items-center gap-2 text-[#B845EC] dark:text-[#C04BF2] font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>You are registered as a volunteer for this initiative!</span>
                  </div>
                ) : isPast ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    This event took place on {formatDate(event.eventDate)}.
                  </p>
                ) : (
                  <p className="text-sm text-slate-600 dark:text-purple-200/70 font-medium">
                    Join fellow changemakers in delivering immediate relief to this community.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {hasJoined ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    disabled
                    className="w-full sm:w-auto cursor-not-allowed bg-purple-50 dark:bg-[#1A1330] text-[#B845EC] dark:text-[#C04BF2] border border-purple-300 dark:border-purple-800"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Joined Successfully
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    isLoading={isJoining}
                    disabled={isPast}
                    onClick={handleJoinEvent}
                    className="w-full sm:w-auto"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Join Event as Volunteer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
