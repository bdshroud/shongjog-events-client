import * as React from "react";
import { Compass, Users2, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Compass,
    title: "Hyper-Local Discovery",
    description:
      "Explore upcoming grassroots campaigns filtered by Thana and District—from Mirpur 10 blanket drives to Patenga coastal cleanups.",
    href: "/upcoming-events",
  },
  {
    icon: Users2,
    title: "One-Click Volunteer Join",
    description:
      "Authenticate instantly and join community rosters with duplicate-proof compound MongoDB indexing protecting genuine headcounts.",
    href: "/upcoming-events",
  },
  {
    icon: ShieldCheck,
    title: "Verified Organizers",
    description:
      "Every initiative is organized by recognized community leaders and student volunteer wings with transparent logistics.",
    href: "/create-event",
  },
  {
    icon: BarChart3,
    title: "Real-Time Impact Tracking",
    description:
      "Event organizers manage attendee rosters, coordinate volunteer check-ins, and cascade updates dynamically in real-time.",
    href: "/manage-events",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#FAF8FD] dark:bg-[#090514] border-b border-slate-200 dark:border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Heading */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-[#1A1330] border border-purple-200 dark:border-purple-800/60 text-[#B845EC] dark:text-[#C04BF2] text-xs font-bold uppercase tracking-wider mb-3">
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Unifying For A Better Bangladesh
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
          Built with strict enterprise standards: zero duplicate signups, real-time rosters, and verified grassroots organizers.
        </p>

        {/* 4 Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-white dark:bg-[#130E24] border border-slate-200 dark:border-purple-900/40 hover:border-purple-400 dark:hover:border-purple-500/60 shadow-sm hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-[#1E1438] text-[#B845EC] dark:text-[#C04BF2] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#B845EC] dark:group-hover:text-[#C04BF2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-purple-200/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B845EC] dark:text-[#C04BF2] group-hover:underline"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
