import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as fsLimit,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Property } from "./types";

const PROPERTIES_COLLECTION = "properties";

function isVisible(property: Property): boolean {
  return property.available !== false;
}

export async function getPublishedProperties(): Promise<Property[]> {
  const q = query(collection(db, PROPERTIES_COLLECTION), where("status", "==", "published"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Property).filter(isVisible);
}

export async function getFeaturedProperties(count = 6): Promise<Property[]> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where("status", "==", "published"),
    where("featured", "==", true),
    orderBy("createdAt", "desc"),
    fsLimit(count + 5)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }) as Property)
    .filter(isVisible)
    .slice(0, count);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const q = query(collection(db, PROPERTIES_COLLECTION), where("slug", "==", slug), where("status", "==", "published"), fsLimit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  const property = { id: docSnap.id, ...docSnap.data() } as Property;
  return isVisible(property) ? property : null;
}

export async function getAllPropertiesForAdmin(): Promise<Property[]> {
  const q = query(collection(db, PROPERTIES_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Property);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const ref = doc(db, PROPERTIES_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Property;
}