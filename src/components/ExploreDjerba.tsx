import Image from "next/image";
import type { ExploreSpot } from "@/lib/types";

export default function ExploreDjerba({ spots }: { spots: ExploreSpot[] }) {
  return (
    <section className="container-page py-24">
      <p className="hand-annotation">beyond the stay</p>
      <h2 className="mt-2 max-w-xl text-display-sm text-ink">Explore Djerba</h2>
      <p className="mt-4 max-w-lg text-sm text-ink/70">
        Djerba Stays is more than a place to sleep — here&apos;s a taste of the island around you.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {spots.map((spot) => (
          <div key={spot.title} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
              <Image src={spot.image} alt={spot.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]" />
            </div>
            <h3 className="mt-4 font-serif text-lg text-ink">{spot.title}</h3>
            <p className="mt-1 text-sm text-ink/65">{spot.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}