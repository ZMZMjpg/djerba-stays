import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Property, PropertyStatus } from "./types";

const PROPERTIES_COLLECTION = "properties";

export type NewPropertyInput = Omit
  Property,
  "id" | "createdAt" | "updatedAt"
>;

export async function createProperty(input: NewPropertyInput): Promise<string> {
  const ref = await addDoc(collection(db, PROPERTIES_COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProperty(
  id: string,
  input: Partial<NewPropertyInput>
): Promise<void> {
  const ref = doc(db, PROPERTIES_COLLECTION, id);
  await updateDoc(ref, {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function setPropertyStatus(
  id: string,
  status: PropertyStatus
): Promise<void> {
  const ref = doc(db, PROPERTIES_COLLECTION, id);
  await updateDoc(ref, {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProperty(id: string): Promise<void> {
  const ref = doc(db, PROPERTIES_COLLECTION, id);
  await deleteDoc(ref);
}