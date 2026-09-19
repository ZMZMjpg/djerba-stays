import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { HomepagePromoCard } from "@/lib/types";

export default function PromoCards({ cards }: { cards: HomepagePromoCard[] }) {
  return (
    <section className="container-page py-20">
      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.title} href={card.linkHref} className="group overflow-hidden rounded-lg border border-djerba/10 bg-cream shadow-card transition-shadow duration-300 hover:shadow-elevated">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={card.image} alt={card.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{card.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ocean">
                {card.linkText}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}