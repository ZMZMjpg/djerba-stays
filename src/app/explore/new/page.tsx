import AdminExploreForm from "@/components/AdminExploreForm";

export default function NewExploreCategoryPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Add category</h1>
      <p className="mt-1 text-sm text-ink/60">New categories are saved unpublished until you check "Published."</p>

      <div className="mt-6">
        <AdminExploreForm />
      </div>
    </div>
  );
}