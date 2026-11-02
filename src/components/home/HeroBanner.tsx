"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Music,
  Tv,
  Trophy,
  PartyPopper,
  Search,
  MapPin,
  Calendar,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

export function HeroBanner() {
  const router = useRouter();

  // Category tabs matching the Figma screenshot: Concerts, Shows, Sports, Festivals
  const [activeTab, setActiveTab] = React.useState<string>("Concerts");
  const [whatQuery, setWhatQuery] = React.useState("");
  const [whereLocation, setWhereLocation] = React.useState("");
  const [whenDate, setWhenDate] = React.useState("");

  const categories = [
    { id: "Concerts", label: "Concerts", icon: Music, param: "Cultural" },
    { id: "Shows", label: "Shows", icon: Tv, param: "Cleanup" },
    { id: "Sports", label: "Sports", icon: Trophy, param: "Plantation" },
    { id: "Festivals", label: "Festivals", icon: PartyPopper, param: "Winter Clothes" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (whatQuery.trim()) {
      params.set("search", whatQuery.trim());
    }
    if (whereLocation.trim() && whereLocation !== "All") {
      params.set("location", whereLocation.trim());
    }
    const currentCat = categories.find((c) => c.id === activeTab);
    if (currentCat?.param) {
      params.set("category", currentCat.param);
    }

    router.push(`/upcoming-events?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0612] text-white pt-20 pb-28 md:pt-28 md:pb-36">
      {/* Central Radiant Purple Spotlight Glow (Figma clone) */}
      <div className="absolute inset-0 bg-evenjo-hero pointer-events-none" />

      {/* Atmospheric Stage / Crowd Silhouette Overlay (matching Figma Evenjo background) */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-20 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      {/* Bottom vignette gradient merging into the dark background */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0612] via-[#0A0612]/80 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Evenjo Headline Clone: "What Concert would you like to go to?" */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto">
          What{" "}
          <span className="text-[#C04BF2] transition-colors duration-300">
            {activeTab === "Concerts" ? "Concert" : activeTab === "Shows" ? "Show" : activeTab === "Sports" ? "Sport Drive" : "Festival"}
          </span>{" "}
          would you like to go to?
        </h1>

        {/* Subtitle Clone: "More than 100 concerts in different countries are now available to you." */}
        <p className="mt-5 text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal">
          More than 100 concerts and grassroots social initiatives across Bangladesh are now available to you.
        </p>

        {/* Floating Multi-Tab Search / Filter Capsule (Figma design clone) */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto bg-[#140E24]/90 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-purple-950/70 text-left">
          {/* Top Row: Category Tabs */}
          <div className="flex items-center gap-6 sm:gap-10 border-b border-purple-900/30 pb-4 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all pb-1 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "text-white border-b-2 border-[#C04BF2]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#C04BF2]" : "text-slate-400"
                    }`}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Filter Inputs + Vibrant Purple Search Button */}
          <form
            onSubmit={handleSearch}
            className="pt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
          >
            {/* Field 1: What */}
            <div className="sm:col-span-4 flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#0E091C]/80 border border-purple-900/30 focus-within:border-[#C04BF2] transition-colors">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="w-full">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  What
                </span>
                <input
                  type="text"
                  value={whatQuery}
                  onChange={(e) => setWhatQuery(e.target.value)}
                  placeholder="e.g. Winter Blanket Aid, Mirpur"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Field 2: Where */}
            <div className="sm:col-span-3 flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#0E091C]/80 border border-purple-900/30 focus-within:border-[#C04BF2] transition-colors">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="w-full">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Where
                </span>
                <select
                  value={whereLocation}
                  onChange={(e) => setWhereLocation(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-[#140E24] text-slate-300">
                    All Bangladesh
                  </option>
                  <option value="Dhaka" className="bg-[#140E24] text-slate-300">
                    Dhaka
                  </option>
                  <option value="Chattogram" className="bg-[#140E24] text-slate-300">
                    Chattogram
                  </option>
                  <option value="Sylhet" className="bg-[#140E24] text-slate-300">
                    Sylhet
                  </option>
                  <option value="Mirpur" className="bg-[#140E24] text-slate-300">
                    Mirpur 10
                  </option>
                  <option value="Patenga" className="bg-[#140E24] text-slate-300">
                    Patenga Beach
                  </option>
                </select>
              </div>
            </div>

            {/* Field 3: When */}
            <div className="sm:col-span-3 flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#0E091C]/80 border border-purple-900/30 focus-within:border-[#C04BF2] transition-colors">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="w-full">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  When
                </span>
                <select
                  value={whenDate}
                  onChange={(e) => setWhenDate(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-[#140E24] text-slate-300">
                    Upcoming (Future)
                  </option>
                  <option value="this-month" className="bg-[#140E24] text-slate-300">
                    This Month
                  </option>
                  <option value="next-month" className="bg-[#140E24] text-slate-300">
                    Next Month
                  </option>
                </select>
              </div>
            </div>

            {/* Search Action Button Clone */}
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                aria-label="Search Events"
                className="w-full sm:w-14 h-12 rounded-2xl bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white flex items-center justify-center shadow-lg shadow-purple-600/35 transition-all active:scale-95 cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
