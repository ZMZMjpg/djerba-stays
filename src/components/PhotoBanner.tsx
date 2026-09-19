"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoBanner({
  images,
  headline,
  subtext,
}: {
  images: string[];
  headline: string;
  subtext: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [hasMultiple, next]);

  if (images.length === 0) return null;

  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src + i}
          src={src}
          alt={headline}
          className={"absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-smooth " + (i === index ? "opacity-100" : "opacity-0")}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />

      <div className="container-page relative z-10 text-center text-cream">
        <h2 className="text-display-md" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
          {headline}
        </h2>
        <p className="mt-3 text-base text-cream/85">{subtext}</p>
      </div>

      {hasMultiple && (
        <>
          <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-cream hover:bg-black/50 md:left-8">
            <ChevronLeft size={22} />
          </button>
          <button type="button" onClick={next} aria-label="Next photo" className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-cream hover:bg-black/50 md:right-8">
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={"Go to photo " + (i + 1)}
                className={"h-1.5 rounded-full transition-all " + (i === index ? "w-6 bg-cream" : "w-1.5 bg-cream/50")}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}