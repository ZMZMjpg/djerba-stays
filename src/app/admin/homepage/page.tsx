"use client";

import { useEffect, useState } from "react";
import { getHomepageSettings, updateHomepageSettings } from "@/lib/homepage-settings";
import { uploadPropertyMedia } from "@/lib/storage-upload";
import type { HomepageSettings } from "@/lib/types";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export default function AdminHomepagePage() {
  const [settings, setSettings] = useState<HomepageSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  useEffect(() => {
    getHomepageSettings().then(setSettings);
  }, []);

  if (!settings) {
    return <p className="text-sm text-ink/50">Loading...</p>;
  }

  function updateCard(index: number, field: keyof HomepageSettings["promoCards"][number], value: string) {
    setSettings((prev) => {
      if (!prev) return prev;
      const cards = [...prev.promoCards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, promoCards: cards };
    });
  }

  function updateSpot(index: number, field: keyof HomepageSettings["exploreSpots"][number], value: string) {
    setSettings((prev) => {
      if (!prev) return prev;
      const spots = [...prev.exploreSpots];
      spots[index] = { ...spots[index], [field]: value };
      return { ...prev, exploreSpots: spots };
    });
  }

  async function handleCardImageUpload(index: number, file: File) {
    const key = "card-" + index;
    setUploadingKey(key);
    try {
      const url = await uploadPropertyMedia("homepage", "images", file);
      updateCard(index, "image", url);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploadingKey(null);
    }
  }

  async function handleSpotImageUpload(index: number, file: File) {
    const key = "spot-" + index;
    setUploadingKey(key);
    try {
      const url = await uploadPropertyMedia("homepage", "images", file);
      updateSpot(index, "image", url);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploadingKey(null);
    }
  }

  async function handleAddBannerImage(file: File) {
    setUploadingKey("banner-new");
    try {
      const url = await uploadPropertyMedia("homepage", "images", file);
      setSettings((prev) => (prev ? { ...prev, bannerImages: [...prev.bannerImages, url] } : prev));
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploadingKey(null);
    }
  }

  function removeBannerImage(url: string) {
    setSettings((prev) => (prev ? { ...prev, bannerImages: prev.bannerImages.filter((img) => img !== url) } : prev));
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      await updateHomepageSettings(settings);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Homepage</h1>
      <p className="mt-1 text-sm text-ink/60">Edit the promo cards, photo slider, and Explore Djerba section shown on the public homepage.</p>

      <div className="mt-6 space-y-6">
        <div className="rounded-lg border border-black/10 bg-white p-6">
          <h2 className="font-medium text-ink">Promo cards</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {settings.promoCards.map((card, index) => (
              <div key={index} className="space-y-2 rounded-md border border-black/10 p-4">
                <div className="relative h-28 w-full overflow-hidden rounded-md bg-sand">
                  <Image src={card.image} alt={card.title} fill sizes="200px" className="object-cover" />
                </div>
                <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-sand">
                  <Upload size={12} />
                  {uploadingKey === "card-" + index ? "Uploading..." : "Replace image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleCardImageUpload(index, e.target.files[0])} />
                </label>
                <input value={card.title} onChange={(e) => updateCard(index, "title", e.target.value)} placeholder="Title" className="w-full rounded-md border border-black/15 px-3 py-2 text-sm" />
                <textarea value={card.description} onChange={(e) => updateCard(index, "description", e.target.value)} placeholder="Description" rows={2} className="w-full rounded-md border border-black/15 px-3 py-2 text-sm" />
                <input value={card.linkText} onChange={(e) => updateCard(index, "linkText", e.target.value)} placeholder="Link text" className="w-full rounded-md border border-black/15 px-3 py-2 text-sm" />
                <input value={card.linkHref} onChange={(e) => updateCard(index, "linkHref", e.target.value)} placeholder="Link URL (e.g. /stays?pool=yes)" className="w-full rounded-md border border-black/15 px-3 py-2 text-sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-6">
          <h2 className="font-medium text-ink">Photo slider</h2>
          <p className="mt-1 text-xs text-ink/50">Add as many photos as you like — they&apos;ll auto-rotate every 5 seconds on the homepage.</p>

          <div className="mt-4 flex flex-wrap gap-3">
            {settings.bannerImages.map((src) => (
              <div key={src} className="relative h-24 w-32 overflow-hidden rounded-md bg-sand">
                <Image src={src} alt="Banner slide" fill sizes="128px" className="object-cover" />
                <button type="button" onClick={() => removeBannerImage(src)} className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-black/15 px-4 py-2 text-xs font-medium text-ink/70 hover:bg-sand">
            <Upload size={14} />
            {uploadingKey === "banner-new" ? "Uploading..." : "Add photo"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleAddBannerImage(e.target.files[0])} />
          </label>

          <div className="mt-4 space-y-3">
            <input value={settings.bannerHeadline} onChange={(e) => setSettings((prev) => (prev ? { ...prev, bannerHeadline: e.target.value } : prev))} placeholder="Headline" className="w-full max-w-md rounded-md border border-black/15 px-3 py-2 text-sm" />
            <input value={settings.bannerSubtext} onChange={(e) => setSettings((prev) => (prev ? { ...prev, bannerSubtext: e.target.value } : prev))} placeholder="Subtext" className="w-full max-w-md rounded-md border border-black/15 px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-6">
          <h2 className="font-medium text-ink">Explore Djerba section</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {settings.exploreSpots.map((spot, index) => (
              <div key={index} className="space-y-2 rounded-md border border-black/10 p-4">
                <div className="relative h-28 w-full overflow-hidden rounded-md bg-sand">
                  <Image src={spot.image} alt={spot.title} fill sizes="200px" className="object-cover" />
                </div>
                <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-sand">
                  <Upload size={12} />
                  {uploadingKey === "spot-" + index ? "Uploading..." : "Replace image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleSpotImageUpload(index, e.target.files[0])} />
                </label>
                <input value={spot.title} onChange={(e) => updateSpot(index, "title", e.target.value)} placeholder="Title" className="w-full rounded-md border border-black/15 px-3 py-2 text-sm" />
                <textarea value={spot.description} onChange={(e) => updateSpot(index, "description", e.target.value)} placeholder="Description" rows={2} className="w-full rounded-md border border-black/15 px-3 py-2 text-sm" />
              </div>
            ))}
          </div>
        </div>

        <button type="button" onClick={handleSave} disabled={saving} className="rounded-md bg-ocean px-6 py-3 text-sm font-medium text-cream hover:bg-ocean-dark disabled:opacity-50">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}