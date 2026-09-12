import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About",
  description:
    "Djerba Stays is a local team curating premium villas and stays across Djerba, Tunisia.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <section className="container-page max-w-2xl">
          <p className="hand-annotation">who we are</p>
          <h1 className="mt-2 text-display-sm text-ink">About Djerba Stays</h1>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/80">
            <p>
              Djerba Stays started with a simple idea: the island deserves a
              better way to find a place to stay than scrolling through
              generic listings that could belong anywhere.
            </p>
            <p>
              We&apos;re a small local team based on Djerba. Every property on
              this site is one we know personally — the owners, the
              neighborhood, what the mornings actually feel like there.
            </p>
            <p>
              Whether you&apos;re a Tunisian family looking for a summer house,
              a couple wanting a quiet villa with a pool, or a group of
              friends chasing warm evenings by the sea, we&apos;re here to help
              you find the right stay — and to actually reply when you reach
              out.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}