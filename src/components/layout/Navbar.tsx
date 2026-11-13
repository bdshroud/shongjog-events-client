"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Swal from "sweetalert2";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  React.useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    const result = await Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B845EC",
      cancelButtonColor: "#6B5E80",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark")
        ? "#130E24"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f8f5fe"
        : "#0f0a1a",
    });

    if (result.isConfirmed) {
      try {
        await authClient.signOut();
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
        }
        toast.success("Signed out successfully");
        router.push("/");
        router.refresh();
      } catch (err) {
        toast.error("Error signing out. Please try again.");
      }
    }
  };

  // Evenjo style navigation links matching the Figma layout: Home, Shows, Concerts, Sports, Festivals
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/upcoming-events" },
    { label: "Relief Drives", href: "/upcoming-events?category=Winter+Clothes" },
    { label: "Plantations", href: "/upcoming-events?category=Plantation" },
    { label: "Cleanups", href: "/upcoming-events?category=Cleanup" },
  ];

  const user = session?.user;
  const displayName = user?.name || user?.email?.split("@")[0] || "Volunteer";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-purple-900/30 bg-white/85 dark:bg-[#0A0612]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Evenjo Script Logo Clone */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none py-1"
        >
          <span className="font-['Playball',cursive] text-3xl sm:text-4xl font-normal text-[#B845EC] dark:text-[#C04BF2] hover:text-[#A838DE] dark:hover:text-[#D946EF] tracking-wide transition-all filter drop-shadow-[0_0_12px_rgba(192,75,242,0.35)]">
            Shongjog
          </span>
        </Link>

        {/* Desktop Navigation Links - Centered like Evenjo */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("?")[0]) &&
                  (link.href.includes("?")
                    ? false
                    : pathname === link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#B845EC] dark:text-[#C04BF2] font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#B845EC] dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Section: ThemeToggle, Auth */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          {/* Auth State */}
          {isPending ? (
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-purple-950/40 animate-pulse ring-2 ring-purple-500/30" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Avatar with Hover Tooltip (Strict Rubric Rule) */}
              <div
                className="relative inline-block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#B845EC] rounded-full cursor-pointer transition-transform active:scale-95"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label="User account menu"
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={displayName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#B845EC] shadow-md shadow-purple-950/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9333EA] to-[#C04BF2] text-white font-bold text-sm flex items-center justify-center ring-2 ring-[#B845EC] shadow-md shadow-purple-950/20">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Floating Tooltip displaying displayName on Hover */}
                {showTooltip && !isDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-12 z-50 px-3 py-1 text-xs font-bold text-white bg-slate-900 dark:bg-[#130E24] border border-slate-850 dark:border-purple-900/50 rounded-lg shadow-xl pointer-events-none whitespace-nowrap animate-in fade-in">
                    {displayName}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900 dark:border-b-[#130E24]" />
                  </div>
                )}
              </div>

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-[#130E24] border border-slate-200 dark:border-purple-900/50 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-purple-900/30">
                    <p className="text-xs text-purple-600 dark:text-purple-300 font-medium">
                      Signed in as
                    </p>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/create-event"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-[#271B48] hover:text-[#B845EC] dark:hover:text-[#C04BF2] font-medium transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-[#B845EC]" />
                      Create Event
                    </Link>
                    <Link
                      href="/manage-events"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-[#271B48] hover:text-[#B845EC] dark:hover:text-[#C04BF2] font-medium transition-colors"
                    >
                      <FolderKanban className="w-4 h-4 text-[#B845EC]" />
                      Manage Events
                    </Link>
                    <Link
                      href="/joined-events"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-[#271B48] hover:text-[#B845EC] dark:hover:text-[#C04BF2] font-medium transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B845EC]" />
                      Joined Events
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-[#271B48] hover:text-[#B845EC] dark:hover:text-[#C04BF2] font-medium transition-colors"
                    >
                      <User className="w-4 h-4 text-[#B845EC]" />
                      Profile Settings
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-purple-900/30">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Evenjo Pill Signup Button Clone */
            <Link
              href="/login"
              className="inline-flex items-center justify-center font-medium rounded-lg md:rounded-full px-5 py-2 text-sm bg-[#B845EC] hover:bg-[#A838DE] active:bg-[#9333EA] text-white shadow-lg shadow-purple-600/30 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all active:scale-[0.98]"
            >
              Signup
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1A1330] focus:outline-none focus:ring-2 focus:ring-[#B845EC] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-purple-900/30 bg-white dark:bg-[#0A0612] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href.split("?")[0];
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? "bg-[#B845EC] text-white"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#130E24]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <div className="pt-3 border-t border-slate-200 dark:border-purple-900/30 space-y-1">
              <div className="px-3 py-2 flex items-center gap-3">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={displayName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#B845EC]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#B845EC] text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#B845EC]">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="truncate">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/create-event"
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#130E24] transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-[#B845EC]" />
                Create Event
              </Link>
              <Link
                href="/manage-events"
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#130E24] transition-colors"
              >
                <FolderKanban className="w-4 h-4 text-[#B845EC]" />
                Manage Events
              </Link>
              <Link
                href="/joined-events"
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#130E24] transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#B845EC]" />
                Joined Events
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#130E24] transition-colors"
              >
                <User className="w-4 h-4 text-[#B845EC]" />
                Profile Settings
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 dark:border-purple-900/30">
              <Link
                href="/login"
                className="block text-center font-bold rounded-xl py-3 text-sm bg-[#B845EC] text-white shadow-md shadow-purple-600/30"
              >
                Signup / Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
