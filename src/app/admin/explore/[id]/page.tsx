import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/explore";
import AdminExploreForm from "@/components/AdminExploreForm";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExploreCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
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