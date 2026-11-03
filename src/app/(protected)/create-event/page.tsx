"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { SafeImage } from "@/components/ui/SafeImage";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { PlusCircle, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

const eventTypeOptions = [
  { label: "Winter Clothes & Blanket Distribution", value: "Winter Clothes" },
  { label: "Tree & Mangrove Plantation", value: "Plantation" },
  { label: "Coastal & River Cleanup Drive", value: "Cleanup" },
  { label: "Community Medical & Health Camp", value: "Medical Camp" },
  { label: "Nutrition & Emergency Food Drive", value: "Food Drive" },
  { label: "Social Donation & Educational Aid", value: "Donation" },
];

const createEventSchema = z.object({
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
    .min(3, "Location must be at least 3 characters (e.g., Mirpur 10, Dhaka)"),
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

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Compute minimum future date-time string
  const minDateTime = React.useMemo(() => {
    const future = new Date(Date.now() + 60 * 60 * 1000);
    return future.toISOString().slice(0, 16);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      eventType: "Winter Clothes",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      location: "",
      eventDate: "",
    },
  });

  const selectedThumbnail = watch("thumbnailUrl");

  const sampleImages = [
    {
      label: "Winter Relief",
      url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Tree Plantation",
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Beach Cleanup",
      url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Food Drive",
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Medical Camp",
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const onSubmit = async (values: CreateEventFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        eventType: values.eventType,
        thumbnailUrl: values.thumbnailUrl.trim(),
        location: values.location.trim(),
        eventDate: new Date(values.eventDate).toISOString(),
      };

      const res = await api.post("/api/events", payload);

      if (res.data?.success) {
        await Swal.fire({
          title: "Community Event Created!",
          text: `"${values.title}" is now published and live for volunteers to join.`,
          icon: "success",
          confirmButtonColor: "#2563EB",
          confirmButtonText: "View Upcoming Events",
          background: document.documentElement.classList.contains("dark")
            ? "#111a2e"
            : "#ffffff",
          color: document.documentElement.classList.contains("dark")
            ? "#f8fafc"
            : "#0f172a",
        });

        router.push("/upcoming-events");
        router.refresh();
      }
    } catch (err: any) {
      console.error("[Create Event Error]", err);
      const msg =
        err.response?.data?.message ||
        "Failed to create community event. Please verify all fields.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Evenjo Nocturnal Page Header */}
      <PageHeader
        badge="Initiative Dispatch"
        title="Launch a Community Event"
        description="Publish your grassroots social action program. Mobilize volunteers across Dhaka, Chattogram, and 64 districts in Bangladesh."
        watermark="LAUNCH"
        breadcrumbs={[
          { label: "Events", href: "/upcoming-events" },
          { label: "Create Event" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#B845EC] dark:hover:text-[#C04BF2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-purple-900/30 pb-6 mb-8 text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Community Event Logistics
            </h2>
            <p className="text-sm text-slate-500 dark:text-purple-300/60">
              Provide exact details so prospective volunteers know where to meet and what supplies are required.
            </p>
          </div>

          {/* Event Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
            {/* Title */}
            <Input
              label="Event Title"
              placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
              required
              error={errors.title?.message}
              {...register("title")}
            />

            {/* Category & Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  htmlFor="eventDate"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Event Date & Time (Future Dates Only)
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <input
                  id="eventDate"
                  type="datetime-local"
                  min={minDateTime}
                  className="w-full rounded-2xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#B845EC] focus:border-transparent transition-all shadow-sm cursor-pointer"
                  {...register("eventDate")}
                />
                {errors.eventDate && (
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    {errors.eventDate.message}
                  </p>
                )}
                <p className="text-[11px] text-slate-500 dark:text-purple-300/60">
                  Past dates are strictly disallowed by platform rules.
                </p>
              </div>
            </div>

            {/* Location */}
            <Input
              label="Event Location"
              placeholder="e.g. Rabindra Sarobar, Dhanmondi Lake, Dhaka"
              required
              error={errors.location?.message}
              helperText="Provide specific landmarks and district for volunteer meetup"
              {...register("location")}
            />

            {/* Thumbnail URL with Quick Presets */}
            <div className="space-y-2">
              <Input
                label="Thumbnail Image URL"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                required
                error={errors.thumbnailUrl?.message}
                {...register("thumbnailUrl")}
              />

              {/* Quick preset thumbnail pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Preset Cover Photos:
                </span>
                {sampleImages.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setValue("thumbnailUrl", s.url, { shouldValidate: true })}
                    className="px-3 py-1 text-xs rounded-full border border-slate-200 dark:border-purple-900/40 bg-slate-50 dark:bg-[#1A1330] hover:border-[#B845EC] text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Thumbnail Preview with uniform aspect-[16/10] */}
              {selectedThumbnail && (
                <div className="pt-2">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    Card Cover Preview (aspect-[16/10]):
                  </p>
                  <div className="w-full max-w-sm aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 dark:border-purple-900/40 bg-slate-100 dark:bg-[#130E24]">
                    <SafeImage
                      src={selectedThumbnail}
                      alt="Cover Preview"
                      category={watch("eventType")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <Textarea
              label="Detailed Event Description"
              rows={5}
              placeholder="Describe the objective, what volunteers should bring, exact meeting points, and contact guidelines..."
              required
              error={errors.description?.message}
              {...register("description")}
            />

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-end gap-3">
              <Link
                href="/upcoming-events"
                className="px-6 py-3 rounded-full border border-slate-300 dark:border-purple-900/50 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1A1330] transition-colors"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Publish Community Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
