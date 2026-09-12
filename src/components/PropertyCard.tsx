import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Waves } from "lucide-react";
import type { Property } from "@/lib/types";

export default function PropertyCard({ property }: { property: Property }) {
  const hasPool = property.amenities.includes("pool");

  return (
    <Link
      href={`/stays/${property.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
        <Image
          src={property.media.coverImage}
          alt={property.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
        />
        {hasPool && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-cream/90 px-2.5 py-1 text-xs font-medium text-djerba backdrop-blur-sm">
            <Waves size={13} /> Private pool
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5">
        <div>
          <h3 className="font-serif text-lg text-ink">{property.name}</h3>
          <p className="mt-1 text-sm text-ink/60">{property.location}</p>
          <p className="mt-1 text-sm text-ink/60">
            {property.guests} guests · {property.bedrooms} bedrooms
          </p>
        </div>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-djerba transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <p className="mt-2 text-sm font-medium text-ink">
        {property.price} TND <span className="font-normal text-ink/50">/ night</span>
      </p>
    </Link>
  );
}