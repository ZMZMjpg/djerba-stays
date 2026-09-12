import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import Categories from "@/components/Categories";
import WhyDjerbaStays from "@/components/WhyDjerbaStays";
import ExploreDjerba from "@/components/ExploreDjerba";
import Link from "next/link";
import { getFeaturedProperties } from "@/lib/properties";

export default async function HomePage() {
  const featured = await getFeaturedProperties(6);

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[90vh] items-end bg-djerba">
          <div className="container-page relative z-10 pb-24 pt-40 text-cream">
            <p className="hand-annotation text-sun">summer starts here</p>
            <h1 className="mt-4 max-w-3xl text-display-lg text-cream">
              Find your place in the sun.
            </h1>
            <p className="mt-6 max-w-lg text-base text-cream/80">
              Premium villas, houses, and traditional stays across Djerba —
              for families, couples, and long summer afternoons by the pool.
            </p>
            <Link
              href="/stays"
              className="mt-8 inline-block rounded-md bg-sun px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-terracotta hover:text-cream"
            >
              Discover stays
            </Link>
          </div>
        </section>

        <Categories />

        <section className="container-page py-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="hand-annotation">see you by the sea</p>
              <h2 className="mt-2 text-display-sm text-ink">Featured stays</h2>
            </div>
            <Link
              href="/stays"
              className="hidden text-sm font-medium text-djerba underline-offset-4 hover:underline md:block"
            >
              View all stays
            </Link>
          </div>

          <div className="mt-10 pb-16">
            <PropertyGrid
              properties={featured}
              emptyMessage="Featured stays are coming soon."
            />
          </div>
        </section>

        <WhyDjerbaStays />
        <ExploreDjerba />

        <section className="bg-djerba py-24 text-center text-cream">
          <div className="container-page">
            <p className="hand-annotation text-sun">somewhere in Djerba</p>
            <h2 className="mt-3 text-display-sm">
              Long lunches. Warm nights. Somewhere in Djerba.
            </h2>
            <Link
              href="/stays"
              className="mt-8 inline-block rounded-md bg-sun px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-terracotta hover:text-cream"
            >
              Discover your stay
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}