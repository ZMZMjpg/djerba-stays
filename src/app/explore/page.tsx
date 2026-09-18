import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Explore Djerba",
  description: "Beaches, food, and local character across the island of Djerba, Tunisia.",
};

const spots = [
  {
    title: "Beaches",
    description:
      "Djerba's coastline runs from the lively, resort-lined sands of Sidi Mahres in the northeast to quieter, wide-open stretches near Aghir and Sidi Jmour in the south. Mornings are calm and clear; by afternoon the water stays warm well into the evening.",
  },
  {
    title: "Food",
    description:
      "Expect grilled fresh fish straight off the boat, ojja with merguez and egg, brik pastries, and long lazy lunches under vine-covered terraces. Houmt Souk's market stalls and small family-run restaurants are worth wandering into without a plan.",
  },
  {
    title: "Houmt Souk & the old souks",
    description:
      "The island's main town mixes whitewashed alleyways, working pottery studios, and a genuine daily market rhythm rather than a purely touristic one. Early morning, before the heat sets in, is the best time to walk through.",
  },
  {
    title: "Djerbian architecture",
    description:
      "Traditional Djerbian houses (menzels) are built low, thick-walled, and whitewashed, designed around courtyards to stay cool through the summer — a strong reference point for the island's calm, understated visual identity.",
  },
];

export default function ExplorePage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <section className="container-page max-w-2xl">
          <p className="hand-annotation">beyond the stay</p>
          <h1 className="mt-2 text-display-sm text-ink">Explore Djerba</h1>
          <p className="mt-4 text-base text-ink/70">
            Djerba Stays is more than a place to sleep — here&apos;s a closer look at the island around you.
          </p>
        </section>

        <section className="container-page mt-14 space-y-14">
          {spots.map((spot) => (
            <div key={spot.title} className="max-w-2xl border-t border-djerba/10 pt-10 first:border-t-0 first:pt-0">
              <h2 className="font-serif text-2xl text-ink">{spot.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink/75">{spot.description}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}