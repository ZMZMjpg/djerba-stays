"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/stays", label: "Stays" },
  { href: "/explore", label: "Explore Djerba" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ transparentAtTop = false }: { transparentAtTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen || !transparentAtTop;
  const headerBg = solid ? "bg-cream/90 shadow-card backdrop-blur-md" : "bg-transparent";
  const logoColor = solid ? "text-djerba" : "text-cream";
  const linkColor = solid ? "text-ink/80 hover:text-djerba" : "text-cream/90 hover:text-cream";
  const iconColor = solid ? "text-djerba" : "text-cream";

  return (
    <header className={"fixed top-0 z-40 w-full transition-all duration-300 ease-smooth " + headerBg}>
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className={"font-hand text-3xl transition-colors duration-300 " + logoColor}>
          Djerba Stays
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={"group relative text-sm font-medium transition-colors " + linkColor}>
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ocean transition-all duration-300 ease-smooth group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/stays" className="rounded-md bg-ocean px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-ocean-dark">
            Discover stays
          </Link>
        </div>

        <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} className={"md:hidden transition-colors " + iconColor} onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-djerba/10 bg-cream md:hidden">
          <nav className="container-page flex flex-col gap-1 py-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-md px-2 py-3 text-base font-medium text-ink/85 transition-colors hover:bg-sand">
                {link.label}
              </Link>
            ))}
            <Link href="/stays" onClick={() => setMobileOpen(false)} className="mt-3 rounded-md bg-ocean px-5 py-3 text-center text-sm font-medium text-cream">
              Discover stays
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}