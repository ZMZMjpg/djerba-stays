import Link from "next/link";
import { Waves, Home, Users, Landmark, Gem, Wallet } from "lucide-react";

const categories = [
  { label: "Private pools", icon: Waves, query: "pool" },
  { label: "Near the beach", icon: Home, query: "beach-nearby" },
  { label: "Family stays", icon: Users, query: "family" },
  { label: "Traditional homes", icon: Landmark, query: "traditional" },
  { label: "Luxury villas", icon: Gem, query: "villa" },
  { label: "Affordable stays", icon: Wallet, query: "affordable" },
];

export default function Categories() {
  return (
    <section className="container-page py-20">
      <p className="hand-annotation">a pool kind of day</p>
      <h2 className="mt-2 text-display-sm text-ink">Browse by category</h2>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map(({ label, icon: Icon, query }) => (
          <Link
            key={query}
            href={`/stays?category=${query}`}
            className="group flex flex-col items-center gap-3 rounded-lg border border-djerba/10 px-4 py-7 text-center transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-djerba/25 hover:shadow-card"
          >
            <Icon
              size={22}
              className="text-djerba/70 transition-colors group-hover:text-terracotta"
            />
            <span className="text-sm font-medium text-ink/80">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}