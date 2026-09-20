"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllPropertiesForAdmin } from "@/lib/properties";
import { setPropertyStatus, setPropertyAvailability, deleteProperty } from "@/lib/admin-properties";
import type { Property } from "@/lib/types";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getAllPropertiesForAdmin();
    setProperties(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function togglePublish(property: Property) {
    const nextStatus = property.status === "published" ? "draft" : "published";
    await setPropertyStatus(property.id, nextStatus);
    load();
  }

  async function toggleAvailability(property: Property) {
    const nextAvailable = property.available === false ? true : false;
    await setPropertyAvailability(property.id, nextAvailable);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    await deleteProperty(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-ink">Houses</h1>
        <Link href="/admin/properties/new" className="flex items-center gap-2 rounded-md bg-djerba px-4 py-2.5 text-sm font-medium text-cream hover:bg-djerba-dark">
          <Plus size={16} />
          Add house
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-ink/50">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="p-6 text-sm text-ink/50">No properties yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 text-ink/50">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Visibility</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => {
                const isHidden = property.available === false;
                return (
                  <tr key={property.id} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-3 font-medium text-ink">{property.name}</td>
                    <td className="px-5 py-3 text-ink/70">{property.location}</td>
                    <td className="px-5 py-3 text-ink/70">{property.price} TND</td>
                    <td className="px-5 py-3">
                      <span className={"rounded-full px-2.5 py-1 text-xs font-medium " + (property.status === "published" ? "bg-sea/20 text-djerba" : "bg-black/5 text-ink/60")}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={"rounded-full px-2.5 py-1 text-xs font-medium " + (isHidden ? "bg-terracotta/15 text-terracotta" : "bg-black/5 text-ink/50")}>
                        {isHidden ? "hidden" : "visible"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <Link href={"/admin/properties/" + property.id} className="text-djerba hover:underline">
                          Edit
                        </Link>
                        <button onClick={() => togglePublish(property)} className="text-ink/70 hover:underline">
                          {property.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button onClick={() => toggleAvailability(property)} className="text-ocean hover:underline">
                          {isHidden ? "Show again" : "Hide (guest staying)"}
                        </button>
                        <button onClick={() => handleDelete(property.id)} className="text-terracotta hover:underline">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}