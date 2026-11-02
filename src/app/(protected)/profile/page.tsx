"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useAuthSync } from "@/components/auth/JwtSyncProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  Save,
  ShieldCheck,
} from "lucide-react";

const profileSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters long"),
  image: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "Image must be a valid http or https web URL"
    ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { session, refetchJwt } = useAuthSync();
  const user = session?.user;

  const [isUpdating, setIsUpdating] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      image: user?.image || "",
    },
  });

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user, reset]);

  const watchedImage = watch("image");
  const displayName = user?.name || "Volunteer";

  const presetAvatars = [
    {
      label: "Green Youth",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      label: "Community Leader",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    {
      label: "Volunteer Medic",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const onSubmit = async (values: ProfileFormValues) => {
    setIsUpdating(true);
    try {
      const finalImage =
        values.image?.trim() ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          values.name
        )}&backgroundColor=2563EB`;

      const res = await authClient.updateUser({
        name: values.name.trim(),
        image: finalImage,
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to update profile");
        setIsUpdating(false);
        return;
      }

      await refetchJwt();

      await Swal.fire({
        title: "Profile Updated!",
        text: "Your volunteer name and profile picture have been updated across Shongjog.",
        icon: "success",
        confirmButtonColor: "#B845EC",
        timer: 1800,
        showConfirmButton: false,
        background: document.documentElement.classList.contains("dark")
          ? "#130E24"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f8f5fe"
          : "#0f0a1a",
      });

      toast.success("Profile saved successfully");
    } catch (err: any) {
      console.error("[Profile Update Error]", err);
      toast.error(err?.message || "Failed to save profile changes.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full text-left">
      {/* Evenjo Nocturnal Page Header */}
      <PageHeader
        badge="Account Settings"
        title="Volunteer Profile"
        description="Manage your display identity and public avatar picture visible across all Shongjog community drives."
        watermark="PROFILE"
        breadcrumbs={[
          { label: "Settings", href: "/profile" },
          { label: "My Profile" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-purple-900/30 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Personal Identity
              </h2>
              <p className="text-xs text-slate-500 dark:text-purple-300/60 mt-1">
                Your volunteer profile information across all 64 districts.
              </p>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-[#1A1330] border border-purple-200 dark:border-purple-800 text-xs font-bold text-[#B845EC] dark:text-[#C04BF2] self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-[#B845EC]" />
              <span>Verified Changemaker</span>
            </div>
          </div>

          {/* Profile Card & Avatar Preview */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-[#0E091C] border border-slate-100 dark:border-purple-900/30 mb-8">
            <div className="relative group">
              {watchedImage || user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={watchedImage || user?.image || ""}
                  alt={displayName}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#B845EC] shadow-md"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      displayName
                    )}&backgroundColor=B845EC`;
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#9333EA] to-[#C04BF2] text-white font-extrabold text-2xl flex items-center justify-center ring-4 ring-[#B845EC] shadow-md">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {displayName}
              </h3>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Mail className="w-3.5 h-3.5 text-[#B845EC]" />
                <span>{user?.email}</span>
              </div>
              <p className="text-xs text-[#B845EC] dark:text-[#C04BF2] font-bold pt-1">
                Active Grassroots Volunteer &bull; Bangladesh
              </p>
            </div>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Display Name"
              placeholder="e.g. Tanzimul Islam"
              required
              error={errors.name?.message}
              {...register("name")}
            />

            <div>
              <Input
                label="Profile Picture URL"
                type="url"
                placeholder="https://images.unsplash.com/..."
                error={errors.image?.message}
                {...register("image")}
              />

              {/* Quick avatar preset pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Preset Avatars:
                </span>
                {presetAvatars.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() =>
                      setValue("image", p.url, { shouldValidate: true })
                    }
                    className="px-3 py-1 text-xs rounded-full border border-slate-200 dark:border-purple-900/40 bg-slate-50 dark:bg-[#1A1330] hover:border-[#B845EC] text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email (Readonly) */}
            <div className="w-full space-y-1.5 text-left">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Registered Email (Primary Identity)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full rounded-2xl border border-slate-200 dark:border-purple-900/40 bg-slate-100 dark:bg-[#0E091C] px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-400">
                Email addresses cannot be edited once verified.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-purple-900/30 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isUpdating}
              >
                <Save className="w-4 h-4 mr-1.5" />
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
