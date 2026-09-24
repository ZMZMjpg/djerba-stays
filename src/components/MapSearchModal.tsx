"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { X, LocateFixed } from "lucide-react";

const LeafletMap = dynamic(() => import("./LeafletRadiusMap"), { ssr: false });

const DJERBA_CENTER: [number, number] = [33.8076, 10.8451];

export default function MapSearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [center, setCenter] = useState<[number, number]>(DJERBA_CENTER);
  const [radiusKm, setRadiusKm] = useState(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handlePick = useCallback((lat: number, lng: number) => {
    setCenter([lat, lng]);
  }, []);

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter([position.coords.latitude, position.coords.longitude]);
    });
  }

  function apply() {
    const params = new URLSearchParams();
    params.set("lat", center[0].toString());
    params.set("lng", center[1].toString());
    params.set("radius", radiusKm.toString());
    router.push("/stays?" + params.toString());
    onClose();
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-[92vw] max-w-2xl flex-col overflow-hidden rounded-lg bg-cream shadow-elevated">
        <div className="flex items-center justify-between border-b border-djerba/10 px-5 py-4">
          <p className="font-serif text-lg text-ink">Search on map</p>
          <button type="button" onClick={onClose} aria-label="Close map search" className="text-ink/60 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="h-[360px] w-full">
          <LeafletMap center={center} radiusKm={radiusKm} onPick={handlePick} />
        </div>

        <div className="space-y-4 px-5 py-4">
          <p className="text-xs text-ink/60">Click anywhere on the map to set your search area, or use your current location.</p>

          <button type="button" onClick={useMyLocation} className="flex items-center gap-2 text-sm font-medium text-ocean hover:underline">
            <LocateFixed size={15} />
            Use my current location
          </button>

          <div>
            <div className="flex items-center justify-between text-sm text-ink/70">
              <span>Radius</span>
              <span>{radiusKm} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="mt-2 w-full accent-ocean"
            />
          </div>

          <button type="button" onClick={apply} className="w-full rounded-md bg-ocean px-6 py-3 text-sm font-medium text-cream hover:bg-ocean-dark">
            Search this area
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}