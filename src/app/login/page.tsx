"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useAuthSync } from "@/components/auth/JwtSyncProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { HeartHandshake, LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/upcoming-events";
  const { session, refetchJwt } = useAuthSync();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (session?.user) {
      router.replace(callbackUrl);
    }
  }, [session, router, callbackUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (response.error) {
        toast.error(response.error.message || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      await refetchJwt();

      await Swal.fire({
        title: "Welcome Back!",
        text: "You have signed in successfully.",
        icon: "success",
        confirmButtonColor: "#B845EC",
        timer: 1500,
        showConfirmButton: false,
        background: document.documentElement.classList.contains("dark")
          ? "#130E24"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f8f5fe"
          : "#0f0a1a",
      });

      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      console.error("[Login Error]", err);
      toast.error(
        err?.message || "Failed to sign in. Please verify your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL:
          typeof window !== "undefined"
            ? window.location.origin + callbackUrl
            : "/",
      });
    } catch (error: any) {
      console.error("[Google OAuth Error]", error);
      toast.error(
        "Google sign-in could not be initiated. Please use email & password."
      );
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] p-8 sm:p-10 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block py-1">
          <span className="font-['Playball',cursive] text-4xl font-normal text-[#C04BF2] tracking-wide filter drop-shadow-[0_0_12px_rgba(192,75,242,0.45)]">
            Shongjog
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Sign In
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-purple-300/60">
          Join community volunteers and power social initiatives across Bangladesh
        </p>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-slate-300 dark:border-purple-900/50 bg-white dark:bg-[#1A1330] hover:bg-slate-50 dark:hover:bg-[#271B48] text-sm font-bold text-slate-700 dark:text-slate-200 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#B845EC] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-slate-200 dark:border-purple-900/30" />
        <span className="absolute bg-white dark:bg-[#130E24] px-3 text-xs uppercase font-bold tracking-wider text-slate-400">
          or sign in with email
        </span>
      </div>

      {/* Email & Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          <LogIn className="w-4 h-4 mr-1" />
          Sign In
        </Button>
      </form>

      {/* Link to Register */}
      <div className="text-center pt-2 text-sm text-slate-600 dark:text-purple-300/60">
        New to Shongjog?{" "}
        <Link
          href="/register"
          className="font-bold text-[#B845EC] dark:text-[#C04BF2] hover:underline"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <React.Suspense
        fallback={
          <div className="w-full max-w-md h-96 rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
        }
      >
        <LoginForm />
      </React.Suspense>
    </div>
  );
}
