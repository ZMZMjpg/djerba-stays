"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({
  images,
  propertyName,
}: {
  images: string[];
  propertyName: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const showPrev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, showNext, showPrev]);

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 5).map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`relative overflow-hidden rounded-md bg-sand ${
              i === 0 ? "col-span-4 row-span-2 aspect-[16/9]" : "aspect-square"
            }`}
          >
            <Image
              src={src}
              alt={`${propertyName} photo ${i + 1}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 ease-smooth hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-djerba-dark/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={close}
            className="absolute right-6 top-6 text-cream/80 hover:text-cream"
          >
            <X size={28} />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 text-cream/70 hover:text-cream md:left-8"
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="relative h-[70vh] w-[90vw] max-w-4xl scale-100 transition-transform duration-300 ease-smooth"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={`${propertyName} photo ${openIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 text-cream/70 hover:text-cream md:right-8"
          >
            <ChevronRight size={32} />
          </button>

          <p className="absolute bottom-6 text-sm text-cream/70">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}