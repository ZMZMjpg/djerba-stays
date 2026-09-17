"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Map as MapIcon } from "lucide-react";
import MapSearchModal from "./MapSearchModal";

export default function HeroSearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [mapOpen, setMapOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    router.push("/stays?" + params.toString());
  }

  return (
    <div className="flex w-full flex-col items-center">
      <form onSubmit={handleSubmit} className="flex w-full max-w-xl overflow-hidden rounded-md bg-cream shadow-elevated">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter area, e.g. Midoun, Houmt Souk..."
          className="w-full bg-transparent px-5 py-4 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <button type="submit" aria-label="Search" className="flex shrink-0 items-center justify-center bg-ocean px-5 text-cream transition-colors hover:bg-ocean-dark">
          <Search size={18} />
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMapOpen(true)}
        className="mt-4 flex items-center justify-center gap-2 rounded-md bg-ocean px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-ocean-dark"
      >
        <MapIcon size={16} />
        Search on map
      </button>

      {mapOpen && <MapSearchModal onClose={() => setMapOpen(false)} />}
    </div>
  );
}