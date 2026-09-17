import PropertyCard from "./PropertyCard";
import type { Property } from "@/lib/types";

export default function PropertyGrid({
  properties,
  emptyMessage = "No properties found.",
}: {
  properties: Property[];
  emptyMessage?: string;
}) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ocean/30 bg-ocean/5 py-24 text-center">
        <p className="font-serif text-xl text-ink/70">{emptyMessage}</p>
        <p className="mt-2 text-sm text-ink/50">
          Try adjusting your filters or check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}