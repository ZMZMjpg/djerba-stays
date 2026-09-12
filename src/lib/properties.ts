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

export async function getPublishedProperties(): Promise<Property[]> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where("status", "==", "published"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as Property);
}

export async function getFeaturedProperties(count = 6): Promise<Property[]> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where("status", "==", "published"),
    where("featured", "==", true),
    orderBy("createdAt", "desc"),
    fsLimit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as Property);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where("slug", "==", slug),
    where("status", "==", "published"),
    fsLimit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Property;
}

export async function getAllPropertiesForAdmin(): Promise<Property[]> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as Property);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const ref = doc(db, PROPERTIES_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as Property;
}