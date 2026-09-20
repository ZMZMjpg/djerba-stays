export type PropertyType = "villa" | "house" | "apartment" | "traditional" | "guesthouse";

export type PropertyStatus = "draft" | "published";

export type Amenity =
  | "pool"
  | "air-conditioning"
  | "wifi"
  | "parking"
  | "bbq"
  | "garden"
  | "kitchen"
  | "washing-machine"
  | "sea-view"
  | "beach-nearby";

export interface PropertyMedia {
  coverImage: string;
  images: string[];
  videos: string[];
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  shortDescription: string;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyType;
  amenities: Amenity[];
  media: PropertyMedia;
  featured: boolean;
  status: PropertyStatus;
  available: boolean;
  createdAt: number;
  updatedAt: number;
}

export type InquiryStatus = "new" | "read" | "replied" | "archived";

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  status: InquiryStatus;
  createdAt: number;
}

export interface HomepagePromoCard {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  image: string;
}

export interface HomepageSettings {
  promoCards: HomepagePromoCard[];
  bannerImages: string[];
  bannerHeadline: string;
  bannerSubtext: string;
}

export interface ExploreCategory {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  gallery: string[];
  order: number;
  published: boolean;
  createdAt: number;
  updatedAt: number;
}