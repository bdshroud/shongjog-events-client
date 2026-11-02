"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, PlusCircle, X, Sparkles, AlertCircle } from "lucide-react";
import { IEvent } from "@/types";
import { api } from "@/lib/axios";
import { EventCard } from "@/components/events/EventCard";
import { CardSkeletonGrid } from "@/components/ui/EventSkeleton";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

const categories = [
  "All",
  "Winter Clothes",
  "Plantation",
  "Cleanup",
  "Medical Camp",
  "Food Drive",
  "Donation",
];

function UpcomingEventsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = React.useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Debounced search query
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch upcoming events from backend API
  React.useEffect(() => {
    let isCurrent = true;

    async function fetchEvents() {
      try {
        setIsLoading(true);
        setError(null);

        const params: Record<string, string> = {};
        if (debouncedSearch.trim()) {
          params.search = debouncedSearch.trim();
        }
        if (selectedCategory && selectedCategory !== "All") {
          params.eventType = selectedCategory;
        }

        const res = await api.get("/api/events/upcoming", { params });

        if (isCurrent) {
          if (res.data?.success && Array.isArray(res.data.events)) {
            // Strictly exclude past events as required by rubric rule 5
            const now = Date.now();
            const futureEvents = res.data.events.filter(
              (e: IEvent) => new Date(e.eventDate).getTime() >= now
            );
            setEvents(futureEvents);
          } else {
            setEvents([]);
          }
        }
      } catch (err: any) {
        console.error("[UpcomingEvents] Error fetching events:", err);
        if (isCurrent) {
          setError(
            err.response?.data?.message ||
              "Could not retrieve upcoming events. Please check your connection."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      isCurrent = false;
    };
  }, [debouncedSearch, selectedCategory]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
  };

  return (
    <div className="w-full">
      {/* Cobalt Blue Wavy Page Header */}
      <PageHeader
        badge="Community Directory"
        title="Upcoming Community Initiatives"
        description="Explore verified grassroots social development campaigns across Dhaka, Chattogram, and all 64 districts in Bangladesh."
        watermark="SCHEDULE"
        breadcrumbs={[{ label: "Upcoming Events" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Search and Category Filter Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Real-time Search Input */}
            <div className="relative w-full max-w-xl">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, thana or city (e.g. Mirpur, Patenga, Dhanmondi)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-full border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-[#130E24] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-[#B845EC] shadow-xs transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-[#1A1330] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center font-bold rounded-full px-6 py-3 text-sm bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white shadow-md shadow-purple-600/25 transition-all gap-2 shrink-0 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Create Initiative
            </Link>
          </div>

          {/* Category Pills Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-left pt-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#B845EC] text-white shadow-md shadow-purple-600/25"
                      : "bg-white dark:bg-[#130E24] border border-slate-200 dark:border-purple-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1A1330]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing{" "}
            <strong className="text-slate-900 dark:text-white font-bold">
              {events.length}
            </strong>{" "}
            verified community {events.length === 1 ? "drive" : "drives"}
          </span>

          {(search || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="font-bold text-[#B845EC] dark:text-[#C04BF2] hover:underline cursor-pointer"
            >
              Clear active filters
            </button>
          )}
        </div>

        {/* Events Grid / State */}
        <div className="mt-8">
          {isLoading ? (
            <CardSkeletonGrid count={6} />
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 p-8 text-center max-w-lg mx-auto">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                {error}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={handleResetFilters}
              >
                Reset Filters & Retry
              </Button>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center max-w-lg mx-auto space-y-4 my-8">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                No Matching Upcoming Events Found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We couldn&apos;t find any future community events matching your search
                criteria. Try clearing filters or create a new event.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
                <Link
                  href="/create-event"
                  className="inline-flex items-center justify-center font-bold rounded-full px-6 py-2.5 text-sm bg-[#B845EC] hover:bg-[#A838DE] text-white shadow-md shadow-purple-600/25"
                >
                  Create Event
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UpcomingEventsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16">
          <CardSkeletonGrid count={6} />
        </div>
      }
    >
      <UpcomingEventsContent />
    </React.Suspense>
  );
}
