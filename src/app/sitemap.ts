import type { MetadataRoute } from "next";
import { getPublishedProperties } from "@/lib/properties";

function toValidDate(value: unknown): Date | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;
  }
  if (value && typeof value === "object" && "toDate" in value && typeof (value as any).toDate === "function") {
    try {
      const date = (value as any).toDate();
      if (date instanceof Date && !isNaN(date.getTime())) return date;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://djerbastays.com";
  const properties = await getPublishedProperties();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: baseUrl + "/stays", changeFrequency: "daily", priority: 0.9 },
    { url: baseUrl + "/explore", changeFrequency: "monthly", priority: 0.6 },
    { url: baseUrl + "/about", changeFrequency: "monthly", priority: 0.4 },
    { url: baseUrl + "/contact", changeFrequency: "monthly", priority: 0.4 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => {
    const lastModified = toValidDate(property.updatedAt);
    return {
      url: baseUrl + "/stays/" + property.slug,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...propertyRoutes];
}