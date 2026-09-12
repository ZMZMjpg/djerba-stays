import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface InquiryInput {
  propertyId: string;
  propertyName: string;
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
}

export async function submitInquiry(input: InquiryInput): Promise<void> {
  const inquiriesRef = collection(db, "inquiries");

  await addDoc(inquiriesRef, {
    ...input,
    email: input.email ?? "",
    status: "new",
    createdAt: serverTimestamp(),
  });
}