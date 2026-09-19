import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import Categories from "@/components/Categories";
import WhyDjerbaStays from "@/components/WhyDjerbaStays";
import ExploreDjerba from "@/components/ExploreDjerba";
import HeroSearchBar from "@/components/HeroSearchBar";
import PromoCards from "@/components/PromoCards";
import PhotoBanner from "@/components/PhotoBanner";
import Link from "next/link";
import { getFeaturedProperties } from "@/lib/properties";
import { getHomepageSettings } from "@/lib/homepage-settings";

export default async function HomePage() {
  const [featured, settings] = await Promise.all([getFeaturedProperties(6), getHomepageSettings()]);

  return (
    <>
      <Header transparentAtTop />
      <main>
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-djerba">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="Djerba coastline" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/35" />

          <div className="container-page relative z-10 flex flex-col items-center pb-16 pt-32 text-center text-cream">
            <h1 className="max-w-3xl text-display-lg text-cream" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)" }}>
              Find your place in the sun.
            </h1>

            <div className="mt-10 w-full drop-shadow-2xl">
              <HeroSearchBar />
            </div>
          </div>
        </section>

        <PromoCards cards={settings.promoCards} />

        <Categories />

        <section className="container-page py-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="hand-annotation">see you by the sea</p>
              <h2 className="mt-2 text-display-sm text-ink">Featured stays</h2>
            </div>
            <Link href="/stays" className="hidden text-sm font-medium text-djerba underline-offset-4 hover:underline md:block">
              View all stays
            </Link>
          </div>

          <div className="mt-10 pb-16">
            <PropertyGrid properties={featured} emptyMessage="Featured stays are coming soon." />
          </div>
        </section>

        <PhotoBanner image={settings.bannerImage} headline={settings.bannerHeadline} subtext={settings.bannerSubtext} />

        <WhyDjerbaStays />
        <ExploreDjerba />

        <section className="bg-djerba py-24 text-center text-cream">
          <div className="container-page">
            <p className="hand-annotation text-sun">somewhere in Djerba</p>
            <h2 className="mt-3 text-display-sm">Long lunches. Warm nights. Somewhere in Djerba.</h2>
            <Link href="/stays" className="mt-8 inline-block rounded-md bg-cream px-7 py-3.5 text-sm font-medium text-djerba transition-colors duration-300 hover:bg-sand">
              Discover your stay
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}