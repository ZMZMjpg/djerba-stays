import AdminPropertyForm from "@/components/AdminPropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Add house</h1>
      <p className="mt-1 text-sm text-ink/60">
        New properties are saved as drafts until you publish them.
      </p>

      <div className="mt-6">
        <AdminPropertyForm />
      </div>
    </div>
  );
}