"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { createProperty, updateProperty } from "@/lib/admin-properties";
import { uploadPropertyMedia } from "@/lib/storage-upload";
import type { Amenity, Property, PropertyType } from "@/lib/types";

const propertyTypes: PropertyType[] = ["villa", "house", "apartment", "traditional", "guesthouse"];

const allAmenities: Amenity[] = [
  "pool",
  "air-conditioning",
  "wifi",
  "parking",
  "bbq",
  "garden",
  "kitchen",
  "washing-machine",
  "sea-view",
  "beach-nearby",
];

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface AdminPropertyFormProps {
  initialProperty?: Property;
}

export default function AdminPropertyForm({ initialProperty }: AdminPropertyFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProperty);

  const [name, setName] = useState(initialProperty?.name ?? "");
  const [location, setLocation] = useState(initialProperty?.location ?? "");
  const [latitude, setLatitude] = useState(initialProperty?.latitude?.toString() ?? "");
  const [longitude, setLongitude] = useState(initialProperty?.longitude?.toString() ?? "");
  const [shortDescription, setShortDescription] = useState(initialProperty?.shortDescription ?? "");
  const [description, setDescription] = useState(initialProperty?.description ?? "");
  const [price, setPrice] = useState(initialProperty?.price?.toString() ?? "");
  const [guests, setGuests] = useState(initialProperty?.guests?.toString() ?? "");
  const [bedrooms, setBedrooms] = useState(initialProperty?.bedrooms?.toString() ?? "");
  const [bathrooms, setBathrooms] = useState(initialProperty?.bathrooms?.toString() ?? "");
  const [propertyType, setPropertyType] = useState<PropertyType>(initialProperty?.propertyType ?? "villa");
  const [amenities, setAmenities] = useState<Amenity[]>(initialProperty?.amenities ?? []);
  const [coverImage, setCoverImage] = useState(initialProperty?.media.coverImage ?? "");
  const [images, setImages] = useState<string[]>(initialProperty?.media.images ?? []);
  const [videos, setVideos] = useState<string[]>(initialProperty?.media.videos ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const workingId = initialProperty?.id ?? "temp-" + Date.now();

  function toggleAmenity(amenity: Amenity) {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
  }

  async function handleCoverUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadPropertyMedia(workingId, "images", file);
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
      const url = await uploadPropertyMedia(workingId, "images", file);
      setImages((prev) => [...prev, url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleVideoUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadPropertyMedia(workingId, "videos", file);
      setVideos((prev) => [...prev, url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video upload failed. Please try again.");
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
      name,
      slug: slugify(name),
      location,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      description,
      shortDescription,
      price: Number(price) || 0,
      guests: Number(guests) || 1,
      bedrooms: Number(bedrooms) || 1,
      bathrooms: Number(bathrooms) || 1,
      propertyType,
      amenities,
      media: { coverImage, images, videos },
      featured: initialProperty?.featured ?? false,
      status: initialProperty?.status ?? ("draft" as const),
    };

    try {
      if (isEditing && initialProperty) {
        await updateProperty(initialProperty.id, payload);
      } else {
        await createProperty(payload);
      }
      router.push("/admin/properties");
    } catch {
      setError("Could not save this property. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{error}</p>}

      <div className="rounded-lg border border-black/10 bg-white p-6">
        <h2 className="font-medium text-ink">Basic information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Property name" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <input required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (e.g. Midoun, Djerba)" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude (for map search, optional)" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude (for map search, optional)" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price per night (TND)" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as PropertyType)} className="rounded-md border border-black/15 px-4 py-2.5 text-sm">
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input required type="number" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="Guests" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <input required type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="Bedrooms" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
          <input required type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="Bathrooms" className="rounded-md border border-black/15 px-4 py-2.5 text-sm" />
        </div>

        <input required value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Short description (used in listings & SEO)" className="mt-4 w-full rounded-md border border-black/15 px-4 py-2.5 text-sm" />
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Full description" rows={5} className="mt-4 w-full rounded-md border border-black/15 px-4 py-2.5 text-sm" />
      </div>

      <div className="rounded-lg border border-black/10 bg-white p-6">
        <h2 className="font-medium text-ink">Amenities</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {allAmenities.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm text-ink/80">
              <input type="checkbox" checked={amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
              {amenity.replace("-", " ")}
            </label>
          ))}
        </div>
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
          <p className="text-sm text-ink/60">Gallery images</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {images.map((src) => (
              <div key={src} className="relative h-24 w-24 overflow-hidden rounded-md bg-sand">
                <Image src={src} alt="Gallery" fill sizes="96px" className="object-cover" />
                <button type="button" onClick={() => setImages((prev) => prev.filter((i) => i !== src))} className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white">
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

        <div className="mt-6">
          <p className="text-sm text-ink/60">Video</p>
          <ul className="mt-2 space-y-1 text-xs text-ink/70">
            {videos.map((url) => (
              <li key={url} className="flex items-center gap-2">
                <span className="truncate">{url}</span>
                <button type="button" onClick={() => setVideos((prev) => prev.filter((v) => v !== url))} className="text-terracotta">
                  <X size={12} />
                </button>
              </li>
            ))}
          </ul>
          <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-black/15 px-4 py-2 text-xs font-medium text-ink/70 hover:bg-sand">
            <Upload size={14} />
            Upload video
            <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])} />
          </label>
        </div>

        {uploading && <p className="mt-3 text-xs text-ink/50">Uploading...</p>}
      </div>

      <button type="submit" disabled={saving || uploading} className="rounded-md bg-ocean px-6 py-3 text-sm font-medium text-cream hover:bg-ocean-dark disabled:opacity-50">
        {saving ? "Saving..." : isEditing ? "Save changes" : "Create property"}
      </button>
    </form>
  );
}