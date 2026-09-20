"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { createCategory, updateCategory } from "@/lib/explore";
import { uploadPropertyMedia } from "@/lib/storage-upload";
import type { ExploreCategory } from "@/lib/types";

interface AdminExploreFormProps {
  initialCategory?: ExploreCategory;
}

export default function AdminExploreForm({ initialCategory }: AdminExploreFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialCategory);

  const [title, setTitle] = useState(initialCategory?.title ?? "");
  const [summary, setSummary] = useState(initialCategory?.summary ?? "");
  const [content, setContent] = useState(initialCategory?.content ?? "");
  const [order, setOrder] = useState(initialCategory?.order?.toString() ?? "0");
  const [published, setPublished] = useState(initialCategory?.published ?? false);
  const [coverImage, setCoverImage] = useState(initialCategory?.coverImage ?? "");
  const [gallery, setGallery] = useState<string[]>(initialCategory?.gallery ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleCoverUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadPropertyMedia("explore", "images", file);
      setCoverImage(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadPropertyMedia("explore", "images", file);
      setGallery((prev) => [...prev, url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!coverImage) {
      setError("Please upload a cover image before saving.");
      return;
    }

    setSaving(true);

    const payload = {
      title,
      slugSource: title,
      summary,
      content,
      coverImage,
      gallery,
      order: Number(order) || 0,
      published,
    };

    try {
      if (isEditing && initialCategory) {
        await updateCategory(initialCategory.id, payload);
      } else {
        await createCategory(payload);
      }
      router.push("/admin/explore");
    } catch {
      setError("Could not save this category. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{error}</p>}

      <div className="rounded-lg border border-black/10 bg-white p-6">
        <h2 className="font-medium text-ink">Category information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g. Transportation, Cafés)" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <input required type="number" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Display order (0 first)" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
        </div>

        <input required value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Short summary (shown on the Explore hub card)" className="mt-4 w-full rounded-md border border-black/15 px-4 py-2.5 text-sm" />
        <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content for the category page" rows={8} className="mt-4 w-full rounded-md border border-black/15 px-4 py-2.5 text-sm" />

        <label className="mt-4 flex items-center gap-2 text-sm text-ink/80">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published (visible on the public site)
        </label>
      </div>

      <div className="rounded-lg border border-black/10 bg-white p-6">
        <h2 className="font-medium text-ink">Media</h2>

        <div className="mt-4">
          <p className="text-sm text-ink/60">Cover image</p>
          {coverImage && (
            <div className="relative mt-2 h-40 w-64 overflow-hidden rounded-md bg-sand">
              <Image src={coverImage} alt="Cover" fill sizes="256px" className="object-cover" />
            </div>
          )}
          <label className="mt-2 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-black/15 px-4 py-2 text-xs font-medium text-ink/70 hover:bg-sand">
            <Upload size={14} />
            {coverImage ? "Replace cover image" : "Upload cover image"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
          </label>
        </div>

        <div className="mt-6">
          <p className="text-sm text-ink/60">Gallery images (optional)</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {gallery.map((src) => (
              <div key={src} className="relative h-24 w-24 overflow-hidden rounded-md bg-sand">
                <Image src={src} alt="Gallery" fill sizes="96px" className="object-cover" />
                <button type="button" onClick={() => setGallery((prev) => prev.filter((i) => i !== src))} className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-black/15 px-4 py-2 text-xs font-medium text-ink/70 hover:bg-sand">
            <Upload size={14} />
            Add gallery image
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleGalleryUpload(e.target.files[0])} />
          </label>
        </div>

        {uploading && <p className="mt-3 text-xs text-ink/50">Uploading...</p>}
      </div>

      <button type="submit" disabled={saving || uploading} className="rounded-md bg-ocean px-6 py-3 text-sm font-medium text-cream hover:bg-ocean-dark disabled:opacity-50">
        {saving ? "Saving..." : isEditing ? "Save changes" : "Create category"}
      </button>
    </form>
  );
}