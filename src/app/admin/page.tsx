import Link from "next/link";
import { getAllPropertiesForAdmin } from "@/lib/properties";
import { getAllInquiries } from "@/lib/admin-inquiries";

export default async function AdminDashboardPage() {
  const [properties, inquiries] = await Promise.all([getAllPropertiesForAdmin(), getAllInquiries()]);

  const published = properties.filter((p) => p.status === "published").length;
  const drafts = properties.filter((p) => p.status === "draft").length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const stats = [
    { label: "Published properties", value: published },
    { label: "Draft properties", value: drafts },
    { label: "New inquiries", value: newInquiries },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-black/10 bg-white p-6">
            <p className="text-3xl font-semibold text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-ink">Recent inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm text-djerba hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {inquiries.slice(0, 5).map((inquiry) => (
              <li key={inquiry.id} className="text-sm">
                <p className="font-medium text-ink">{inquiry.name}</p>
                <p className="text-ink/60">{inquiry.propertyName}</p>
              </li>
            ))}
            {inquiries.length === 0 && <p className="text-sm text-ink/50">No inquiries yet.</p>}
          </ul>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-ink">Recent properties</h2>
            <Link href="/admin/properties" className="text-sm text-djerba hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {properties.slice(0, 5).map((property) => (
              <li key={property.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{property.name}</span>
                <span className="text-ink/50">{property.status}</span>
              </li>
            ))}
            {properties.length === 0 && <p className="text-sm text-ink/50">No properties yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}