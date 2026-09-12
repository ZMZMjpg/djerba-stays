import {
  Waves,
  Wind,
  Wifi,
  Car,
  Flame,
  Trees,
  UtensilsCrossed,
  WashingMachine,
  Eye,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import type { Amenity } from "@/lib/types";

const amenityConfig: Record<Amenity, { label: string; icon: LucideIcon }> = {
  pool: { label: "Private pool", icon: Waves },
  "air-conditioning": { label: "Air conditioning", icon: Wind },
  wifi: { label: "Wi-Fi", icon: Wifi },
  parking: { label: "Parking", icon: Car },
  bbq: { label: "BBQ", icon: Flame },
  garden: { label: "Garden", icon: Trees },
  kitchen: { label: "Kitchen", icon: UtensilsCrossed },
  "washing-machine": { label: "Washing machine", icon: WashingMachine },
  "sea-view": { label: "Sea view", icon: Eye },
  "beach-nearby": { label: "Beach nearby", icon: Umbrella },
};

export default function Amenities({ amenities }: { amenities: Amenity[] }) {
  if (amenities.length === 0) return null;

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Amenities</h2>
      <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {amenities.map((amenity) => {
          const config = amenityConfig[amenity];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <li
              key={amenity}
              className="flex items-center gap-2.5 text-sm text-ink/80"
            >
              <Icon size={18} className="shrink-0 text-djerba/70" />
              {config.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}