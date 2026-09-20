import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublishedCategories } from "@/lib/explore";

export const metadata = {
  title: "Explore Djerba",
  description: "Transportation, food, cafes, and local character across the island of Djerba, Tunisia.",
};

export const revalidate = 60;

export default async function ExplorePage() {
  const categories = await getPublishedCategories();

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <section className="container-page max-w-2xl">
          <p className="hand-annotation">beyond the stay</p>
          <h1 className="mt-2 text-display-sm text-ink">Explore Djerba</h1>
          <p className="mt-4 text-base text-ink/70">
            Djerba Stays is more than a place to sleep, here is a closer look at the island around you.
          </p>
        </section>

        <section className="container-page mt-14">
          {categories.length === 0 ? (
            <p className="text-sm text-ink/50">More to come soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-3">
              {categories.map((category) => (
                <Link key={category.id} href={"/explore/" + category.slug} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
                    <Image src={category.coverImage} alt={category.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]" />
                  </div>
                  <h2 className="mt-4 font-serif text-lg text-ink transition-colors group-hover:text-ocean">{category.title}</h2>
                  <p className="mt-1 text-sm text-ink/65">{category.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
