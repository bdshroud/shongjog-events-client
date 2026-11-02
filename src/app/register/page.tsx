"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useAuthSync } from "@/components/auth/JwtSyncProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { HeartHandshake, UserPlus, CheckCircle2 } from "lucide-react";

// Strict rubric requirement: minimum 6 chars, >=1 uppercase letter, >=1 lowercase letter
const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Full name is required" })
      .trim()
      .min(2, "Full name must be at least 2 characters long"),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("A valid email address is required"),
    photoURL: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || /^https?:\/\/.+/.test(val),
        "Photo URL must be a valid http or https web link"
      ),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter (a-z)"),
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const { session, refetchJwt } = useAuthSync();
  const [isLoading, setIsLoading] = React.useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (session?.user) {
      router.replace("/upcoming-events");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      photoURL: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedPassword = watch("password") || "";
  const hasMin6 = watchedPassword.length >= 6;
  const hasUpper = /[A-Z]/.test(watchedPassword);
  const hasLower = /[a-z]/.test(watchedPassword);

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        values.name
      )}&backgroundColor=B845EC`;

      const finalImage = values.photoURL?.trim() || defaultAvatar;

      const response = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        image: finalImage,
      });

      if (response.error) {
        toast.error(response.error.message || "Failed to create account");
        setIsLoading(false);
        return;
      }

      // Ensure BetterAuth user image record is updated with provided photoURL
      try {
        await authClient.updateUser({
          name: values.name.trim(),
          image: finalImage,
        });
      } catch (e) {
        // Continue even if secondary update is skipped
      }

      await refetchJwt();

      await Swal.fire({
        title: "Registration Successful!",
        text: `Welcome to Shongjog, ${values.name}! You are now part of our grassroots social network.`,
        icon: "success",
        confirmButtonColor: "#B845EC",
        confirmButtonText: "Explore Initiatives",
        background: document.documentElement.classList.contains("dark")
          ? "#130E24"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f8f5fe"
          : "#0f0a1a",
      });

      router.push("/upcoming-events");
      router.refresh();
    } catch (err: any) {
      console.error("[Register Error]", err);
      toast.error(
        err?.message || "An unexpected error occurred during registration."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] p-8 sm:p-10 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block py-1">
          <span className="font-['Playball',cursive] text-4xl font-normal text-[#C04BF2] tracking-wide filter drop-shadow-[0_0_12px_rgba(192,75,242,0.45)]">
            Shongjog
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Create an Account
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-purple-300/60">
          Sign up to organize and participate in community drives across Bangladesh
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Tanzimul Islam"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@domain.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Profile Photo URL (Optional)"
          type="url"
          placeholder="https://images.unsplash.com/..."
          helperText="Leave empty for an automatic customized avatar"
          error={errors.photoURL?.message}
          {...register("photoURL")}
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Min 6 chars (A-Z and a-z)"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Realtime password rule indicators */}
          <div className="mt-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#0E091C] border border-slate-100 dark:border-purple-900/30 text-xs space-y-1.5">
            <p className="font-bold text-slate-700 dark:text-slate-300">
              Password Requirements:
            </p>
            <div className="grid grid-cols-1 gap-1 text-[11px]">
              <span
                className={`flex items-center gap-1.5 ${
                  hasMin6 ? "text-[#B845EC] dark:text-[#C04BF2] font-bold" : "text-slate-400"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> At least 6 characters
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  hasUpper ? "text-[#B845EC] dark:text-[#C04BF2] font-bold" : "text-slate-400"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> At least 1 uppercase letter (A-Z)
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  hasLower ? "text-[#B845EC] dark:text-[#C04BF2] font-bold" : "text-slate-400"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> At least 1 lowercase letter (a-z)
              </span>
            </div>
          </div>
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          <UserPlus className="w-4 h-4 mr-1" />
          Create Account
        </Button>
      </form>

      {/* Link to Login */}
      <div className="text-center pt-2 text-sm text-slate-600 dark:text-purple-300/60">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-[#B845EC] dark:text-[#C04BF2] hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <React.Suspense
        fallback={
          <div className="w-full max-w-md h-96 rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
        }
      >
        <RegisterForm />
      </React.Suspense>
    </div>
  );
}
