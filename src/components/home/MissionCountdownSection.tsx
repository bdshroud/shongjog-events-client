"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Heart, Users2, ShieldCheck, Clock } from "lucide-react";
import { api } from "@/lib/axios";

export function MissionCountdownSection() {
  const [targetDate, setTargetDate] = React.useState<Date>(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000)
  );
  const [nextEventTitle, setNextEventTitle] = React.useState<string>(
    "Winter Clothes Distribution – Mirpur 10, Dhaka"
  );
  const [timeLeft, setTimeLeft] = React.useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  // Fetch earliest event to set real countdown target
  React.useEffect(() => {
    let isCurrent = true;
    async function getEarliestEvent() {
      try {
        const res = await api.get("/api/events/recent");
        if (isCurrent && res.data?.success && Array.isArray(res.data.events) && res.data.events.length > 0) {
          const earliest = res.data.events[0];
          const eventTime = new Date(earliest.eventDate);
          if (eventTime.getTime() > Date.now()) {
            setTargetDate(eventTime);
            setNextEventTitle(earliest.title);
          }
        }
      } catch (e) {
        // Fallback target date remains
      }
    }
    getEarliestEvent();
    return () => {
      isCurrent = false;
    };
  }, []);

  // Live countdown timer tick
  React.useEffect(() => {
    const timer = setInterval(() => {
      const difference = targetDate.getTime() - Date.now();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-20 bg-white dark:bg-[#0D0818] border-b border-slate-200 dark:border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Bangladeshi Mission Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-[#1A1330] border border-purple-200 dark:border-purple-800/60 text-[#B845EC] dark:text-[#C04BF2] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Grassroots Mission</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Mobilizing Changemakers For Bangladesh
            </h2>

            <p className="text-slate-600 dark:text-purple-200/70 text-base leading-relaxed">
              From distributing warm blankets during shivering winter nights in Mirpur, Dhaka to restoring coastal mangroves along Patenga Beach in Chattogram, ShongjogBD unites active citizen volunteers to address immediate social needs.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-[#140E24] border border-purple-100 dark:border-purple-900/40">
                <Users2 className="w-6 h-6 text-[#B845EC] mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Verified Volunteers
                </h4>
                <p className="text-xs text-slate-500 dark:text-purple-300/60 mt-1">
                  Over 12,000+ registered active community volunteers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-[#140E24] border border-purple-100 dark:border-purple-900/40">
                <ShieldCheck className="w-6 h-6 text-[#B845EC] mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Zero Duplicates
                </h4>
                <p className="text-xs text-slate-500 dark:text-purple-300/60 mt-1">
                  Compound indexed registration guarantees honest rosters.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Event Countdown Banner */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#140E24] border border-purple-500/30 p-8 sm:p-10 text-white shadow-2xl shadow-purple-950/60 relative overflow-hidden">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B845EC]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C04BF2] uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Next Major Mobilization</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {nextEventTitle}
                </h3>

                {/* 4-Box Countdown Timer */}
                <div className="grid grid-cols-4 gap-3 pt-2 text-center">
                  <div className="p-3.5 rounded-2xl bg-[#0E091C] border border-purple-900/40">
                    <span className="block text-2xl sm:text-3xl font-black text-[#C04BF2]">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Days
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#0E091C] border border-purple-900/40">
                    <span className="block text-2xl sm:text-3xl font-black text-[#C04BF2]">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Hours
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#0E091C] border border-purple-900/40">
                    <span className="block text-2xl sm:text-3xl font-black text-[#C04BF2]">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Mins
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#0E091C] border border-purple-900/40">
                    <span className="block text-2xl sm:text-3xl font-black text-[#C04BF2]">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Secs
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/upcoming-events"
                    className="w-full sm:w-auto inline-flex items-center justify-center font-medium rounded-full px-6 py-3 text-sm bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white shadow-lg shadow-purple-600/30 transition-all gap-2"
                  >
                    <span>Register to Volunteer</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C04BF2]" />
                    Mirpur 10, Dhaka
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
