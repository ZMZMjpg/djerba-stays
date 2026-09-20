import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { ExploreCategory } from "./types";

const COLLECTION = "exploreCategories";

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function getPublishedCategories(): Promise<ExploreCategory[]> {
  const q = query(collection(db, COLLECTION), where("published", "==", true), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ExploreCategory);
}

export async function getCategoryBySlug(slug: string): Promise<ExploreCategory | null> {
  const q = query(collection(db, COLLECTION), where("slug", "==", slug), where("published", "==", true));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as ExploreCategory;
}

export async function getAllCategoriesForAdmin(): Promise<ExploreCategory[]> {
  const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ExploreCategory);
}

export async function getCategoryById(id: string): Promise<ExploreCategory | null> {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ExploreCategory;
}

export type NewCategoryInput = Omit<ExploreCategory, "id" | "slug" | "createdAt" | "updatedAt"> & { slugSource: string };

export async function createCategory(input: NewCategoryInput): Promise<string> {
  const { slugSource, ...rest } = input;
  const ref = await addDoc(collection(db, COLLECTION), {
    ...rest,
    slug: slugify(slugSource),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCategory(id: string, input: Partial<NewCategoryInput>): Promise<void> {
  const { slugSource, ...rest } = input;
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    ...rest,
    ...(slugSource ? { slug: slugify(slugSource) } : {}),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}