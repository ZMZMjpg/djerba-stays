import {
  collection,
  doc,
  getDocs,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Inquiry, InquiryStatus } from "./types";

const INQUIRIES_COLLECTION = "inquiries";

export async function getAllInquiries(): Promise<Inquiry[]> {
  const q = query(
    collection(db, INQUIRIES_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Inquiry);
}

export async function setInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<void> {
  const ref = doc(db, INQUIRIES_COLLECTION, id);
  await updateDoc(ref, { status });
}