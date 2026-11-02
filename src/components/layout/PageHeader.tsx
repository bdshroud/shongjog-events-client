import * as React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  watermark?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({
  badge,
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-[#0A0612] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-purple-900/30">
      {/* Central Radiant Purple Spotlight Glow */}
      <div className="absolute inset-0 bg-evenjo-hero pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
        {breadcrumbs && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-purple-300 mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1330] border border-purple-800/60 text-[#C04BF2] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
