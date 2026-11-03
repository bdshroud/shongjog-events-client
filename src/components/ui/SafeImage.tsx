"use client";

import * as React from "react";

export const VERIFIED_EVENT_IMAGES: Record<string, string> = {
  "Winter Clothes":
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=80",
  Donation:
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80",
  Plantation:
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
  Cleanup:
    "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80",
  "Food Drive":
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
  "Medical Camp":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
};

export const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80";

export function getFallbackForCategory(category?: string, customFallback?: string): string {
  if (customFallback) return customFallback;
  if (category && VERIFIED_EVENT_IMAGES[category]) {
    return VERIFIED_EVENT_IMAGES[category];
  }
  return DEFAULT_FALLBACK_IMAGE;
}

export interface SafeImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  category?: string;
}

/**
 * SafeImage Component
 * Guarantees zero broken images across Next.js SSR hydration and prevents alt text overlap.
 */
export function SafeImage({
  src,
  alt = "",
  className = "",
  fallbackSrc,
  category,
  onError,
  ...rest
}: SafeImageProps) {
  const fallback = React.useMemo(
    () => getFallbackForCategory(category, fallbackSrc),
    [category, fallbackSrc]
  );

  const resolveInitialSrc = React.useCallback(
    (inputSrc?: string) => {
      if (!inputSrc || inputSrc.includes("photo-1532629345422-7515f3d16bb0")) {
        return fallback;
      }
      return inputSrc;
    },
    [fallback]
  );

  const [currentSrc, setCurrentSrc] = React.useState<string>(() =>
    resolveInitialSrc(typeof src === "string" ? src : undefined)
  );

  const imgRef = React.useRef<HTMLImageElement>(null);

  // Sync if src or fallback changes
  React.useEffect(() => {
    setCurrentSrc(resolveInitialSrc(typeof src === "string" ? src : undefined));
  }, [src, resolveInitialSrc]);

  // SSR hydration check: catch images that 404'd before React hydration attached listeners
  React.useEffect(() => {
    if (
      imgRef.current &&
      imgRef.current.complete &&
      imgRef.current.naturalWidth === 0
    ) {
      setCurrentSrc(fallback);
    }
  }, [currentSrc, fallback]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={`text-transparent ${className}`.trim()}
      onError={handleError}
      {...rest}
    />
  );
}

export default SafeImage;
