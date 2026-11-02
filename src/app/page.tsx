import * as React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { MissionCountdownSection } from "@/components/home/MissionCountdownSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { RecentEventsSection } from "@/components/home/RecentEventsSection";
import { ImpactGallery } from "@/components/home/ImpactGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* 1. Hero Banner with Giant Watermark & Layered Wavy SVG Divider */}
      <HeroBanner />

      {/* 2. Overlapping Photo Collage + Live Next-Event Countdown Banner */}
      <MissionCountdownSection />

      {/* 3. Feature Section ("Unifying For A Better World" with signature teardrop icon badges) */}
      <FeaturesSection />

      {/* 4. Recent Upcoming Events Section (3-Column Equal-Height Grid) */}
      <RecentEventsSection />

      {/* 5. Mosaic Community Gallery with Solid Blue Center Tile */}
      <ImpactGallery />

      {/* 6. Integrated Impact Stats + Newsletter Banner */}
      <NewsletterSection />
    </main>
  );
}
