import type { Metadata } from "next";
import { DM_Serif_Display, Manrope, Caveat } from "next/font/google";
import "./globals.css";

const editorial = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-editorial",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://djerbastays.com"),
  title: {
    default: "Djerba Stays — Find your place in the sun",
    template: "%s | Djerba Stays",
  },
  description:
    "Premium villas, houses and traditional stays in Djerba, Tunisia. Private pools, sea views, and warm summer evenings.",
  openGraph: {
    title: "Djerba Stays",
    description:
      "Premium villas, houses and traditional stays in Djerba, Tunisia.",
    url: "https://djerbastays.com",
    siteName: "Djerba Stays",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${editorial.variable} ${sans.variable} ${hand.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}