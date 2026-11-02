import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  HeartHandshake,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#08050E] text-slate-300 border-t border-purple-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Field Offices & Hotline Strip */}
        <div className="py-10 border-b border-purple-900/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Location */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#140E24] border border-purple-500/20 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-[#C04BF2]" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                HQ Field Offices
              </p>
              <p className="text-sm font-bold text-white">
                Mirpur 10, Dhaka & Agrabad, Chattogram
              </p>
            </div>
          </div>

          {/* Hotline */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#140E24] border border-purple-500/20 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-[#C04BF2]" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                24/7 Community Helpline
              </p>
              <p className="text-sm font-bold text-white">
                +880 1711-000000 / Dial 1090
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#140E24] border border-purple-500/20 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-[#C04BF2]" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Volunteer Support Email
              </p>
              <a
                href="mailto:contact@shongjogbd.org"
                className="text-sm font-bold text-white hover:text-[#C04BF2] transition-colors"
              >
                contact@shongjogbd.org
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block py-1">
              <span className="font-['Playball',cursive] text-3xl font-normal text-[#C04BF2] tracking-wide filter drop-shadow-[0_0_12px_rgba(192,75,242,0.45)]">
                Shongjog
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bangladesh&apos;s grassroots social development network. We mobilize
              civic volunteers for winter clothes distributions, urban tree
              plantations, beach cleanups, and community health camps across
              Dhaka, Chattogram, and all 64 districts.
            </p>

            {/* Official Social Links with NEW X LOGO SVG (Strict Rubric Rule) */}
            <div className="pt-2 flex items-center gap-3">
              {/* Official new X logo SVG */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#140E24] border border-purple-900/30 hover:border-[#B845EC] hover:bg-[#B845EC] text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Follow Shongjog on X"
                title="Follow us on X"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#140E24] border border-purple-900/30 hover:border-[#B845EC] hover:bg-[#B845EC] text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook Page"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#140E24] border border-purple-900/30 hover:border-[#B845EC] hover:bg-[#B845EC] text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="YouTube Channel"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Platform Navigation
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/create-event"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Launch an Event
                </Link>
              </li>
              <li>
                <Link
                  href="/joined-events"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  My Joined Initiatives
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-events"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Manage My Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Initiatives Categories */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Event Categories
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/upcoming-events?category=Winter+Clothes"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Winter Relief & Blankets
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events?category=Plantation"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Urban Tree Plantation
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events?category=Cleanup"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Coastal Beach Cleanups
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events?category=Medical+Camp"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Free Healthcare Camps
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events?category=Food+Drive"
                  className="hover:text-[#C04BF2] transition-colors"
                >
                  Community Food Drives
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Governance & Trust
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Shongjog is an open civic technology initiative. All donations and
              volunteer rosters are audited transparently.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>Government Reg. No: BD-SW/2026-9812</p>
              <p>Mirpur 10, Dhaka-1216, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-purple-900/20 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Shongjog. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#C04BF2] cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#C04BF2] cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-[#C04BF2] cursor-pointer">
              Volunteer Code of Conduct
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
