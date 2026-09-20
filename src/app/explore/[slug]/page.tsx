import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getCategoryBySlug } from "@/lib/explore";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.summary,
  };
}

export const revalidate = 60;

export default async function ExploreCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <section className="container-page max-w-2xl">
          <p className="hand-annotation">beyond the stay</p>
          <h1 className="mt-2 text-display-sm text-ink">{category.title}</h1>
          <p className="mt-4 text-base text-ink/70">{category.summary}</p>
        </section>

        <section className="container-page mt-10">
          <div className="relative aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-lg bg-sand">
            <Image src={category.coverImage} alt={category.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
        </section>

        <section className="container-page mt-10 max-w-2xl">
          <p className="whitespace-pre-line text-base leading-relaxed text-ink/80">{category.content}</p>
        </section>

        {category.gallery.length > 0 && (
          <section className="container-page mt-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {category.gallery.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-md bg-sand">
                  <Image src={src} alt={category.title} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}