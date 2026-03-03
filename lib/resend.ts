import "server-only";

import { Resend } from "resend";

let cachedClient: Resend | null = null;
let cachedApiKey: string | null = null;

export type SendContactEmailInput = {
  from: string;
  to: string[];
  cc?: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  headers?: Record<string, string>;
};

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    cachedClient = null;
    cachedApiKey = null;
    return null;
  }

  if (cachedClient && cachedApiKey === apiKey) {
    return cachedClient;
  }

  cachedClient = new Resend(apiKey);
  cachedApiKey = apiKey;
  return cachedClient;
}

export async function sendContactEmail(input: SendContactEmailInput): Promise<{ id: string }> {
  const client = getResendClient();
  if (!client) {
    throw new Error("Resend client unavailable.");
  }

  const response = await client.emails.send({
    from: input.from,
    to: input.to,
    cc: input.cc,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
    headers: input.headers
  });

  if (response.error) {
    throw new Error(response.error.message || "Resend API returned an error.");
  }

  const emailId = response.data?.id;
  if (!emailId) {
    throw new Error("Resend API did not return an email id.");
  }

  return {
    id: emailId
  };
}
