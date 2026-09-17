import { ShieldCheck, KeyRound, MessageCircleHeart } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified, local stays",
    description: "Every property is known to us personally — not scraped from another platform.",
  },
  {
    icon: KeyRound,
    title: "Real local knowledge",
    description: "We know Djerba. We'll point you to the right area for what you're after.",
  },
  {
    icon: MessageCircleHeart,
    title: "A human on the other end",
    description: "Send an inquiry and talk to someone who actually knows the house.",
  },
];

export default function WhyDjerbaStays() {
  return (
    <section className="bg-ocean/10 py-24">
      <div className="container-page">
        <p className="hand-annotation">why us</p>
        <h2 className="mt-2 max-w-xl text-display-sm text-ink">A local team, not a booking algorithm.</h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <Icon size={24} className="text-ocean" />
              <h3 className="mt-4 font-serif text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}