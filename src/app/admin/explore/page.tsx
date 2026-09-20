"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllCategoriesForAdmin, deleteCategory } from "@/lib/explore";
import type { ExploreCategory } from "@/lib/types";

export default function AdminExplorePage() {
  const [categories, setCategories] = useState<ExploreCategory[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getAllCategoriesForAdmin();
    setCategories(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? This cannot be undone.")) return;
    await deleteCategory(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-ink">Explore Djerba</h1>
        <Link href="/admin/explore/new" className="flex items-center gap-2 rounded-md bg-djerba px-4 py-2.5 text-sm font-medium text-cream hover:bg-djerba-dark">
          <Plus size={16} />
          Add category
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-black/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-ink/50">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="p-6 text-sm text-ink/50">No categories yet — add Transportation, Food, Cafés, or anything else.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 text-ink/50">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{category.title}</td>
                  <td className="px-5 py-3 text-ink/70">{category.order}</td>
                  <td className="px-5 py-3">
                    <span className={"rounded-full px-2.5 py-1 text-xs font-medium " + (category.published ? "bg-sea/20 text-djerba" : "bg-black/5 text-ink/60")}>
                      {category.published ? "published" : "draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={"/admin/explore/" + category.id} className="text-djerba hover:underline">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(category.id)} className="text-terracotta hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}