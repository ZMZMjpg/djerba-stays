import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import SearchBar from "@/components/SearchBar";
import { getPublishedProperties } from "@/lib/properties";

export const metadata = {
  title: "All Stays",
  description:
    "Browse premium villas, houses, and traditional stays across Djerba, Tunisia.",
};

interface StaysPageProps {
  searchParams: {
    location?: string;
    bedrooms?: string;
    pool?: string;
    checkIn?: string;
  };
}

export default async function StaysPage({ searchParams }: StaysPageProps) {
  const allProperties = await getPublishedProperties();

  const filtered = allProperties.filter((property) => {
    if (
      searchParams.location &&
      !property.location.toLowerCase().includes(searchParams.location.toLowerCase())
    ) {
      return false;
    }
    if (searchParams.bedrooms && property.bedrooms < Number(searchParams.bedrooms)) {
      return false;
    }
    if (searchParams.pool === "yes" && !property.amenities.includes("pool")) {
      return false;
    }
    if (searchParams.pool === "no" && property.amenities.includes("pool")) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="container-page">
          <p className="hand-annotation">somewhere in Djerba</p>
          <h1 className="mt-2 text-display-sm text-ink">All stays</h1>

          <div className="mt-8">
            <SearchBar />
          </div>

          {searchParams.checkIn && (
            <p className="mt-4 text-xs text-ink/50">
              Showing all stays matching your other filters — we&apos;ll confirm
              availability for {searchParams.checkIn} once you send an inquiry.
            </p>
          )}
        </section>

        <section className="container-page py-16">
          <PropertyGrid
            properties={filtered}
            emptyMessage="No results for the selected filters."
          />
        </section>
      </main>
      <Footer />
    </>
  );
}