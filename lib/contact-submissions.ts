import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";

const CONTACT_SUBMISSIONS_COLLECTION = "contactSubmissions";

export type AddContactSubmissionInput = {
  requesterName: string;
  company: string;
  cnpj: string;
  email: string;
  message: string;
  ip: string;
  userAgent?: string;
};

export async function addContactSubmission(payload: AddContactSubmissionInput): Promise<{ id: string }> {
  const db = getAdminDb();

  const contactSubmissionDoc: Record<string, unknown> = {
    requesterName: payload.requesterName,
    company: payload.company,
    cnpj: payload.cnpj,
    email: payload.email,
    message: payload.message,
    ip: payload.ip,
    status: "new",
    createdAt: FieldValue.serverTimestamp()
  };

  if (payload.userAgent) {
    contactSubmissionDoc.userAgent = payload.userAgent;
  }

  const docRef = await db.collection(CONTACT_SUBMISSIONS_COLLECTION).add(contactSubmissionDoc);

  return {
    id: docRef.id
  };
}
