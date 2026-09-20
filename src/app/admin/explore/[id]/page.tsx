"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCategoryById } from "@/lib/explore";
import AdminExploreForm from "@/components/AdminExploreForm";
import type { ExploreCategory } from "@/lib/types";

export default function EditExploreCategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const [category, setCategory] = useState<ExploreCategory | null | undefined>(undefined);

  useEffect(() => {
    getCategoryById(id).then(setCategory);
  }, [id]);

  if (category === undefined) {
    return <p className="text-sm text-ink/50">Loading...</p>;
  }

  if (category === null) {
    return <p className="text-sm text-terracotta">Category not found.</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Edit category</h1>
      <p className="mt-1 text-sm text-ink/60">{category.title}</p>

      <div className="mt-6">
        <AdminExploreForm initialCategory={category} />
      </div>
    </div>
  );
}
