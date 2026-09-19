import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { HomepageSettings } from "./types";

const defaultSettings: HomepageSettings = {
  promoCards: [
    {
      title: "Villas with a pool",
      description: "Private pools, quiet gardens, and full villas for families or groups.",
      linkText: "Browse pool villas",
      linkHref: "/stays?pool=yes",
      image: "/photo2.jpg",
    },
    {
      title: "Family stays",
      description: "Spacious houses with room to spread out — S+2 and up.",
      linkText: "Find family stays",
      linkHref: "/stays?bedrooms=2",
      image: "/photo2.jpg",
    },
    {
      title: "Near the beach",
      description: "Wake up minutes from the sand and a short walk to the sea.",
      linkText: "See beachside stays",
      linkHref: "/stays?beach=yes",
      image: "/photo2.jpg",
    },
  ],
  bannerImages: ["/photo2.jpg"],
  bannerHeadline: "Somewhere in Djerba",
  bannerSubtext: "A closer look at island life, one photo at a time.",
  exploreSpots: [
    { title: "Beaches", description: "From lively Sidi Mahres to quiet stretches near Aghir.", image: "/photo2.jpg" },
    { title: "Food", description: "Grilled fish, ojja, and long lunches under the vines.", image: "/photo2.jpg" },
    { title: "Houmt Souk & the old souks", description: "Whitewashed alleys, pottery, and the pace of island life.", image: "/photo2.jpg" },
  ],
};

export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const ref = doc(db, "settings", "homepage");
    const snap = await getDoc(ref);
    if (!snap.exists()) return defaultSettings;

    const data = snap.data() as Partial<HomepageSettings> & { bannerImage?: string };

    let bannerImages = data.bannerImages;
    if (!Array.isArray(bannerImages) || bannerImages.length === 0) {
      bannerImages = data.bannerImage ? [data.bannerImage] : defaultSettings.bannerImages;
    }

    return {
      promoCards: Array.isArray(data.promoCards) && data.promoCards.length ? data.promoCards : defaultSettings.promoCards,
      bannerImages,
      bannerHeadline: data.bannerHeadline || defaultSettings.bannerHeadline,
      bannerSubtext: data.bannerSubtext || defaultSettings.bannerSubtext,
      exploreSpots: Array.isArray(data.exploreSpots) && data.exploreSpots.length ? data.exploreSpots : defaultSettings.exploreSpots,
    };
  } catch {
    return defaultSettings;
  }
}

export async function updateHomepageSettings(settings: HomepageSettings): Promise<void> {
  const ref = doc(db, "settings", "homepage");
  await setDoc(ref, settings);
}