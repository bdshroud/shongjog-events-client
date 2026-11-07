"use client";

import * as React from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast.success(
        "Subscribed successfully! You will receive urgent volunteer calls for Dhaka and Chattogram."
      );
    }, 600);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-[#0A0612] text-white">
      {/* Central Ambient Glow */}
      <div className="absolute inset-0 bg-evenjo-hero pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10 sm:space-y-14">
        {/* Top Row: 3 Large Translucent Outline Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#140E24]/80 backdrop-blur-md border border-purple-500/20 text-center">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200">
              50+
            </span>
            <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 mt-2">
              Social Drives Completed
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#140E24]/80 backdrop-blur-md border border-purple-500/20 text-center">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200">
              25+
            </span>
            <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 mt-2">
              Local Thanas Mobilized
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#140E24]/80 backdrop-blur-md border border-purple-500/20 text-center">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200">
              70k+
            </span>
            <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 mt-2">
              Neighbors Reached
            </span>
          </div>
        </div>

        {/* Bottom Row: Centered Heading & Pill Subscription Capsule */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Never Miss A Local Initiative
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Get notified of emergency relief drives, plantation alerts, and beach cleanup meets in your district.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 p-0 sm:p-2 sm:rounded-full sm:bg-[#140E24] sm:border sm:border-purple-500/30 sm:shadow-2xl sm:shadow-purple-950/70 sm:focus-within:border-purple-400 sm:focus-within:ring-2 sm:focus-within:ring-purple-500/20 transition-all"
          >
            <div className="flex items-center gap-3 w-full sm:flex-1 px-4 py-3.5 sm:py-2 rounded-full sm:rounded-none bg-[#140E24] sm:bg-transparent border border-purple-500/30 sm:border-0 shadow-lg sm:shadow-none shadow-purple-950/50 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
              <Mail className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal or student email"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 placeholder:truncate focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center font-semibold rounded-full px-7 py-3.5 sm:py-3 text-sm bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white shadow-lg shadow-purple-600/30 transition-all shrink-0 cursor-pointer disabled:opacity-60 gap-2"
            >
              <span>{isSubmitting ? "Subscribing..." : "Subscribe Now"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
