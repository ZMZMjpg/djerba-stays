import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PropertyNotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] items-center justify-center pt-20">
        <div className="container-page text-center">
          <p className="hand-annotation">not quite</p>
          <h1 className="mt-2 text-display-sm text-ink">
            We couldn&apos;t find that stay.
          </h1>
          <p className="mt-3 text-sm text-ink/60">
            It may have been unpublished, or the link might be incorrect.
          </p>
          <Link
            href="/stays"
            className="mt-8 inline-block rounded-md bg-djerba px-6 py-3 text-sm font-medium text-cream hover:bg-djerba-dark"
          >
            Browse all stays
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}