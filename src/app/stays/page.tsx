import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import SearchBar from "@/components/SearchBar";
import { getPublishedProperties } from "@/lib/properties";
import { distanceKm } from "@/lib/geo";

export const metadata = {
  title: "All Stays",
  description: "Browse premium villas, houses, and traditional stays across Djerba, Tunisia.",
};

interface StaysPageProps {
  searchParams: Promise<{
    location?: string;
    bedrooms?: string;
    pool?: string;
    checkIn?: string;
    lat?: string;
    lng?: string;
    radius?: string;
  }>;
}

export default async function StaysPage({ searchParams }: StaysPageProps) {
  const params = await searchParams;
  const allProperties = await getPublishedProperties();

  const lat = params.lat ? Number(params.lat) : null;
  const lng = params.lng ? Number(params.lng) : null;
  const radius = params.radius ? Number(params.radius) : null;

  const filtered = allProperties.filter((property) => {
    if (params.location && !property.location.toLowerCase().includes(params.location.toLowerCase())) {
      return false;
    }
    if (params.bedrooms && property.bedrooms < Number(params.bedrooms)) {
      return false;
    }
    if (params.pool === "yes" && !property.amenities.includes("pool")) {
      return false;
    }
    if (params.pool === "no" && property.amenities.includes("pool")) {
      return false;
    }
    if (lat !== null && lng !== null && radius !== null) {
      if (property.latitude === undefined || property.longitude === undefined) return false;
      if (distanceKm(lat, lng, property.latitude, property.longitude) > radius) return false;
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

          {lat !== null && (
            <p className="mt-4 text-xs text-ink/50">Showing stays within {radius} km of your selected area.</p>
          )}
        </section>

        <section className="container-page py-16">
          <PropertyGrid properties={filtered} emptyMessage="No results for the selected filters." />
        </section>
      </main>
      <Footer />
    </>
  );
}