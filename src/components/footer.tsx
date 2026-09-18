import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-djerba/10 bg-djerba text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-hand text-3xl">Djerba Stays</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            Long lunches. Warm nights. Somewhere in Djerba. Premium villas and stays across the island, curated for summer.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cream/50">Explore</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/stays" className="text-cream/80 hover:text-cream">All stays</Link></li>
            <li><Link href="/explore" className="text-cream/80 hover:text-cream">Explore Djerba</Link></li>
            <li><Link href="/about" className="text-cream/80 hover:text-cream">About us</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cream/50">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2 text-cream/80"><Phone size={16} /> +216 00 000 000</li>
            <li className="flex items-center gap-2 text-cream/80"><Mail size={16} /> hello@djerbastays.com</li>
            <li className="flex items-center gap-2 text-cream/80"><Instagram size={16} /> @djerbastays</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <p className="container-page text-xs text-cream/50">© {new Date().getFullYear()} Djerba Stays. All rights reserved.</p>
      </div>
    </footer>
  );
}