"use client";

import { useEffect, useState, useRef } from "react";
import { X, Play } from "lucide-react";

export default function VideoModal({
  videoUrl,
  posterUrl,
}: {
  videoUrl: string;
  posterUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    videoRef.current?.play().catch(() => {
      // Autoplay can be blocked by the browser; the user can press play manually.
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      videoRef.current?.pause();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-sand"
      >
        {posterUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterUrl}
            alt="Property video preview"
            className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-djerba-dark/20 transition-colors group-hover:bg-djerba-dark/30">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-djerba shadow-elevated">
            <Play size={26} className="ml-1" fill="currentColor" />
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-djerba-dark/85 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 text-cream/80 hover:text-cream"
          >
            <X size={28} />
          </button>

          <div
            className="w-[92vw] max-w-5xl scale-100 transition-transform duration-300 ease-smooth"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full rounded-lg shadow-elevated"
            />
          </div>
        </div>
      )}
    </>
  );
}