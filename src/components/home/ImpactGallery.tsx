import * as React from "react";
import { Sparkles, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";

interface GalleryBlock {
  title: string;
  location: string;
  category: string;
  imageUrl: string;
}

const galleryPhotos: GalleryBlock[] = [
  {
    title: "Mirpur Winter Clothes Distribution",
    location: "Mirpur 10, Dhaka",
    category: "Winter Relief",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mohammadpur Blanket Aid for Needy",
    location: "Geneva Camp, Dhaka",
    category: "Blanket Drive",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Patenga Sea Beach Plastic Cleanup",
    location: "Patenga, Chattogram",
    category: "Coastal Ecology",
    imageUrl:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dhanmondi Lake 500 Urban Trees",
    location: "Rabindra Sarobar, Dhaka",
    category: "Urban Forestry",
    imageUrl:
      "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sylhet Emergency Flood Nutrition Drive",
    location: "Sunamganj & Sylhet",
    category: "Emergency Aid",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Youth Voluntary Blood Donation Camp",
    location: "Agrabad, Chattogram",
    category: "Healthcare",
    imageUrl:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Street Children Basic Education Aid",
    location: "Farmgate Overbridge, Dhaka",
    category: "Education Aid",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  },
];

export function ImpactGallery() {
  return (
    <section className="py-20 bg-white dark:bg-[#0D0818] border-b border-slate-200 dark:border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-[#1A1330] border border-purple-200 dark:border-purple-800/60 text-[#B845EC] dark:text-[#C04BF2] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Community Highlights</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Ground Impact In Action
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto leading-relaxed">
          Visual chronicles of active volunteers and community organizers delivering tangible change across Dhaka, Chattogram, and 64 districts.
        </p>

        {/* 4-column by 2-row Responsive Grid with Solid Purple Center Tile */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Photo 1 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-sm bg-slate-200 dark:bg-[#130E24] border border-purple-900/20">
            <SafeImage
              src={galleryPhotos[0].imageUrl}
              alt={galleryPhotos[0].title}
              category={galleryPhotos[0].category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-transparent to-transparent opacity-90 p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C04BF2]">
                {galleryPhotos[0].category}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {galleryPhotos[0].title}
              </p>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-sm bg-slate-200 dark:bg-[#130E24] border border-purple-900/20">
            <SafeImage
              src={galleryPhotos[1].imageUrl}
              alt={galleryPhotos[1].title}
              category={galleryPhotos[1].category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-transparent to-transparent opacity-90 p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C04BF2]">
                {galleryPhotos[1].category}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {galleryPhotos[1].title}
              </p>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-sm bg-slate-200 dark:bg-[#130E24] border border-purple-900/20">
            <SafeImage
              src={galleryPhotos[2].imageUrl}
              alt={galleryPhotos[2].title}
              category={galleryPhotos[2].category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-transparent to-transparent opacity-90 p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C04BF2]">
                {galleryPhotos[2].category}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {galleryPhotos[2].title}
              </p>
            </div>
          </div>

          {/* Photo 4 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-sm bg-slate-200 dark:bg-[#130E24] border border-purple-900/20">
            <SafeImage
              src={galleryPhotos[3].imageUrl}
              alt={galleryPhotos[3].title}
              category={galleryPhotos[3].category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-transparent to-transparent opacity-90 p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C04BF2]">
                {galleryPhotos[3].category}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {galleryPhotos[3].title}
              </p>
            </div>
          </div>

          {/* Tile 5: Solid Vibrant Purple Center Highlight Card */}
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#B845EC] via-[#9333EA] to-[#7E22CE] text-white p-6 flex flex-col justify-between text-left group">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-200">
                Join The Movement
              </span>
              <h3 className="text-lg sm:text-xl font-black mt-1 leading-snug">
                Be The Catalyst For Real Change
              </h3>
              <p className="text-xs text-purple-100/90 mt-1 line-clamp-2">
                12,000+ volunteers across Bangladesh.
              </p>
            </div>
            <Link
              href="/upcoming-events"
              className="text-xs font-bold underline underline-offset-4 text-white hover:text-purple-200"
            >
              Join Next Drive &rarr;
            </Link>
          </div>

          {/* Photo 6 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-sm bg-slate-200 dark:bg-[#130E24] border border-purple-900/20">
            <SafeImage
              src={galleryPhotos[4].imageUrl}
              alt={galleryPhotos[4].title}
              category={galleryPhotos[4].category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-transparent to-transparent opacity-90 p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C04BF2]">
                {galleryPhotos[4].category}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {galleryPhotos[4].title}
              </p>
            </div>
          </div>

          {/* Photo 7 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-sm bg-slate-200 dark:bg-[#130E24] border border-purple-900/20">
            <SafeImage
              src={galleryPhotos[5].imageUrl}
              alt={galleryPhotos[5].title}
              category={galleryPhotos[5].category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-transparent to-transparent opacity-90 p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C04BF2]">
                {galleryPhotos[5].category}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {galleryPhotos[5].title}
              </p>
            </div>
          </div>

          {/* Photo 8 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-sm bg-slate-200 dark:bg-[#130E24] border border-purple-900/20">
            <SafeImage
              src={galleryPhotos[6].imageUrl}
              alt={galleryPhotos[6].title}
              category={galleryPhotos[6].category}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0612]/90 via-transparent to-transparent opacity-90 p-4 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C04BF2]">
                {galleryPhotos[6].category}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {galleryPhotos[6].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
