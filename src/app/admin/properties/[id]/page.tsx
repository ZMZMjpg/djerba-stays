import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/properties";
import AdminPropertyForm from "@/components/AdminPropertyForm";

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Edit house</h1>
      <p className="mt-1 text-sm text-ink/60">{property.name}</p>

      <div className="mt-6">
        <AdminPropertyForm initialProperty={property} />
      </div>
    </div>
  );
}