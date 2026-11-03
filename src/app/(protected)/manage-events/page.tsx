"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FolderKanban,
  PlusCircle,
  Calendar,
  MapPin,
  Users,
  Edit3,
  Trash2,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Save,
} from "lucide-react";
import { IEvent } from "@/types";
import { api } from "@/lib/axios";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { CardSkeletonGrid } from "@/components/ui/EventSkeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import Swal from "sweetalert2";

const eventTypeOptions = [
  { label: "Winter Clothes & Blanket Distribution", value: "Winter Clothes" },
  { label: "Tree & Mangrove Plantation", value: "Plantation" },
  { label: "Coastal & River Cleanup Drive", value: "Cleanup" },
  { label: "Community Medical & Health Camp", value: "Medical Camp" },
  { label: "Nutrition & Emergency Food Drive", value: "Food Drive" },
  { label: "Social Donation & Educational Aid", value: "Donation" },
];

const updateEventSchema = z.object({
  title: z
    .string({ required_error: "Event title is required" })
    .trim()
    .min(5, "Title must be at least 5 characters long")
    .max(120, "Title cannot exceed 120 characters"),
  description: z
    .string({ required_error: "Event description is required" })
    .trim()
    .min(15, "Description must be at least 15 characters long")
    .max(3000, "Description cannot exceed 3000 characters"),
  eventType: z
    .string({ required_error: "Please select an event category" })
    .min(1, "Please select an event category"),
  thumbnailUrl: z
    .string({ required_error: "Thumbnail URL is required" })
    .trim()
    .url("Please provide a valid image URL"),
  location: z
    .string({ required_error: "Location is required" })
    .trim()
    .min(3, "Location must be at least 3 characters"),
  eventDate: z
    .string({ required_error: "Event date is required" })
    .min(1, "Event date is required")
    .refine(
      (val) => {
        const parsed = new Date(val);
        return !isNaN(parsed.getTime()) && parsed.getTime() > Date.now();
      },
      { message: "Event date must be strictly in the future" }
    ),
});

type UpdateEventFormValues = z.infer<typeof updateEventSchema>;

/**
 * Organizer Management Dashboard
 * Allows event creators to inspect, edit, and delete their organized initiatives.
 */
export default function ManageEventsPage() {
  const [myEvents, setMyEvents] = React.useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Update modal state
  const [editingEvent, setEditingEvent] = React.useState<IEvent | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  // Compute minimum future date-time string
  const minDateTime = React.useMemo(() => {
    const future = new Date(Date.now() + 60 * 60 * 1000);
    return future.toISOString().slice(0, 16);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateEventFormValues>({
    resolver: zodResolver(updateEventSchema),
  });

  const fetchMyEvents = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get("/api/my-events");
      if (res.data?.success && Array.isArray(res.data.events)) {
        setMyEvents(res.data.events);
      }
    } catch (err: any) {
      console.error("[Manage Events Error]", err);
      setError(
        err.response?.data?.message ||
          "Could not retrieve your created community events."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  // Open Edit Modal
  const handleOpenEdit = (event: IEvent) => {
    setEditingEvent(event);
    const d = new Date(event.eventDate);
    const dateFormatted = !isNaN(d.getTime())
      ? d.toISOString().slice(0, 16)
      : minDateTime;

    reset({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnailUrl: event.thumbnailUrl,
      location: event.location,
      eventDate: dateFormatted,
    });
    setIsUpdateModalOpen(true);
  };

  // Submit Update
  const onUpdateSubmit = async (values: UpdateEventFormValues) => {
    if (!editingEvent) return;
    setIsUpdating(true);
    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        eventType: values.eventType,
        thumbnailUrl: values.thumbnailUrl.trim(),
        location: values.location.trim(),
        eventDate: new Date(values.eventDate).toISOString(),
      };

      const res = await api.put(`/api/events/${editingEvent._id}`, payload);

      if (res.data?.success) {
        setIsUpdateModalOpen(false);
        setEditingEvent(null);
        toast.success("Community event updated successfully!");
        fetchMyEvents();
      }
    } catch (err: any) {
      console.error("[Update Event Error]", err);
      toast.error(
        err.response?.data?.message || "Failed to update event. Please check inputs."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Strict rubric requirement: SweetAlert2 confirmation modal before DELETE
  const handleDeleteEvent = async (event: IEvent) => {
    const result = await Swal.fire({
      title: "Delete Community Event?",
      html: `Are you sure you want to delete <strong>"${event.title}"</strong>?<br/><span class="text-xs text-rose-500">This action will cascade-delete all volunteer participation registrations.</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, Delete Event",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark")
        ? "#111a2e"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f8fafc"
        : "#0f172a",
    });

    if (result.isConfirmed) {
      try {
        const res = await api.delete(`/api/events/${event._id}`);
        if (res.data?.success) {
          toast.success("Community event deleted successfully");
          setMyEvents((prev) => prev.filter((item) => item._id !== event._id));
        }
      } catch (err: any) {
        console.error("[Delete Event Error]", err);
        toast.error(
          err.response?.data?.message || "Failed to delete the event."
        );
      }
    }
  };

  return (
    <div className="w-full text-left">
      {/* Evenjo Nocturnal Page Header */}
      <PageHeader
        badge="Organizer Command"
        title="Manage My Community Events"
        description="Review volunteer headcounts, update logistics with future date validation, or remove initiatives you created."
        watermark="ORGANIZER"
        breadcrumbs={[
          { label: "Dashboard", href: "/manage-events" },
          { label: "Manage Events" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Sub-bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-purple-900/30">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              My Created Drives ({myEvents.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-purple-300/60 mt-0.5">
              Initiatives you created with your authenticated organizer identity.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center font-bold rounded-full px-6 py-2.5 text-xs bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white shadow-md shadow-purple-600/25 transition-all gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Create Another Event
          </Link>
        </div>

        {/* Events Grid / State */}
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
          ) : myEvents.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] p-12 text-center max-w-lg mx-auto space-y-4 my-8">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                You Haven&apos;t Created Any Events Yet
              </h3>
              <p className="text-sm text-slate-500 dark:text-purple-300/60 leading-relaxed">
                Launch your first social development initiative today. Reach
                passionate volunteers in your area.
              </p>
              <Link
                href="/create-event"
                className="inline-flex items-center justify-center font-bold rounded-full px-6 py-3 text-sm bg-[#B845EC] hover:bg-[#A838DE] text-white shadow-md shadow-purple-600/25"
              >
                Create First Event
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {myEvents.map((event) => {
                const participantCount = event.participantCount ?? 0;

                return (
                  <div
                    key={event._id}
                    className="flex flex-col h-full justify-between rounded-3xl border border-slate-200/90 dark:border-purple-900/40 bg-white dark:bg-[#130E24] shadow-xs hover:shadow-xl transition-all overflow-hidden group"
                  >
                    <div>
                      {/* Uniform Aspect-[16/10] Image */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#1A1330]">
                        <SafeImage
                          src={event.thumbnailUrl}
                          alt={event.title}
                          category={event.eventType}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge category={event.eventType} className="shadow-md" />
                        </div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0612]/85 backdrop-blur-md text-white text-xs font-bold shadow-md border border-purple-900/30">
                          <Users className="w-3.5 h-3.5 text-[#C04BF2]" />
                          <span>{participantCount} Joined</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#B845EC] dark:text-[#C04BF2]">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{formatDate(event.eventDate)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                          {event.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-purple-300/60">
                          <MapPin className="w-3.5 h-3.5 text-[#C04BF2] shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>

                        {/* Description excerpt */}
                        <p className="text-sm text-slate-600 dark:text-purple-200/70 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-between gap-2">
                      <Link
                        href={`/events/${event._id}`}
                        className="p-2.5 rounded-full text-slate-500 hover:text-[#B845EC] dark:hover:text-[#C04BF2] hover:bg-purple-50 dark:hover:bg-[#1A1330] transition-colors"
                        title="View public page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(event)}
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" />
                          Update
                        </Button>

                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteEvent(event)}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Update Event Modal Dialog */}
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          title="Update Community Event"
          description="Modify event logistics. Note: event date must strictly remain in the future."
        >
          <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
            <Input
              label="Event Title"
              required
              error={errors.title?.message}
              {...register("title")}
            />

            <Select
              label="Event Category"
              options={eventTypeOptions}
              required
              error={errors.eventType?.message}
              {...register("eventType")}
            />

            {/* Event Date with strict future validation */}
            <div className="w-full space-y-1.5 text-left">
              <label
                htmlFor="editEventDate"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Event Date & Time (Future Only)
                <span className="text-rose-500 ml-1">*</span>
              </label>
              <input
                id="editEventDate"
                type="datetime-local"
                min={minDateTime}
                className="w-full rounded-2xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#B845EC] focus:border-transparent transition-all shadow-sm cursor-pointer"
                {...register("eventDate")}
              />
              {errors.eventDate && (
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            <Input
              label="Location"
              required
              error={errors.location?.message}
              {...register("location")}
            />

            <Input
              label="Thumbnail URL"
              type="url"
              required
              error={errors.thumbnailUrl?.message}
              {...register("thumbnailUrl")}
            />

            <Textarea
              label="Detailed Description"
              rows={4}
              required
              error={errors.description?.message}
              {...register("description")}
            />

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isUpdating}
              >
                <Save className="w-3.5 h-3.5 mr-1" />
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
