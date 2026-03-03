import { NextResponse } from "next/server";

import { addContactSubmission } from "@/lib/contact-submissions";
import { getAdminDb } from "@/lib/firebase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { getResendClient, sendContactEmail } from "@/lib/resend";
import { getClientIp, getTrustedOriginAllowlist, isTrustedOrigin, sanitizeText } from "@/lib/security";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { isValidEmail, validateContactPayload } from "@/lib/validation";

const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RATE_MAX_REQUESTS = 5;
const CONTACT_MAIL_LOGS_COLLECTION = "mailLogs";
const CONTACT_EMAIL_SUBJECT = "Novo contato t\u00e9cnico - FMEA";
const CONTACT_DEV_FALLBACK_FROM = "FMEA <contato@fmea.net.br>";
const CONTACT_FROM_ALLOWED_DOMAIN = "fmea.net.br";
const CONTACT_SUCCESS_MESSAGE = "Solicita\u00e7\u00e3o enviada com sucesso. Nossa equipe t\u00e9cnica retornar\u00e1 em breve.";
const CONTACT_FAILURE_MESSAGE = "N\u00e3o foi poss\u00edvel enviar agora. Tente novamente em instantes.";
const SERVICE_UNAVAILABLE_MESSAGE = "Servi\u00e7o temporariamente indispon\u00edvel. Tente novamente em instantes.";
const DEBUG_CONTACT = process.env.DEBUG_CONTACT?.trim().toLowerCase() === "true";

type MailLogStatus = "sent" | "failed";

type PersistMailLogInput = {
  submissionId: string;
  createdAt: string;
  to: string[];
  cc: string[];
  replyTo: string;
  subject: string;
  status: MailLogStatus;
  resendId?: string;
  errorMessage?: string;
};

function jsonResponse(status: number, body: Record<string, unknown>, extraHeaders: HeadersInit = {}) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders
    }
  });
}

function debugContactLog(message: string, details: Record<string, unknown> = {}): void {
  if (!DEBUG_CONTACT) {
    return;
  }

  console.info(`[contact-debug] ${message}`, details);
}

function logRequestContext(request: Request): void {
  debugContactLog("request-context", {
    origin: request.headers.get("origin"),
    referer: request.headers.get("referer"),
    host: request.headers.get("host"),
    "x-forwarded-host": request.headers.get("x-forwarded-host"),
    "x-forwarded-proto": request.headers.get("x-forwarded-proto"),
    NODE_ENV: process.env.NODE_ENV ?? null,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    trustedOrigins: getTrustedOriginAllowlist()
  });
}

function parseRecipients(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return [];
  }

  let recipients: string[] = [];

  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        recipients = parsed.map((item) => String(item).trim());
      }
    } catch {
      recipients = [];
    }
  }

  if (recipients.length === 0) {
    recipients = trimmed.split(/[;,]/u).map((item) => item.trim());
  }

  return Array.from(new Set(recipients.filter((item) => isValidEmail(item))));
}

function extractEmailFromFromHeader(value: string): string {
  const bracketMatch = value.match(/<([^>]+)>/u);
  return (bracketMatch?.[1] ?? value).trim().toLowerCase();
}

function resolveContactFrom(raw: string | undefined): string | null {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) {
    return null;
  }

  const fromEmail = extractEmailFromFromHeader(trimmed);
  if (!isValidEmail(fromEmail)) {
    return null;
  }

  return trimmed;
}

function isAllowedFromDomain(fromValue: string): boolean {
  const fromEmail = extractEmailFromFromHeader(fromValue);
  return fromEmail.endsWith(`@${CONTACT_FROM_ALLOWED_DOMAIN}`);
}

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error && typeof error.message === "string") {
    return sanitizeText(error.message, { maxLength: 300 }) || "Unknown error";
  }

  return "Unknown error";
}

async function persistMailLog(input: PersistMailLogInput): Promise<void> {
  try {
    const db = getAdminDb();
    const mailLogDoc: Record<string, unknown> = {
      submissionId: input.submissionId,
      createdAt: input.createdAt,
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject,
      status: input.status
    };

    if (input.cc.length > 0) {
      mailLogDoc.cc = input.cc;
    }
    if (input.resendId) {
      mailLogDoc.resendId = input.resendId;
    }
    if (input.errorMessage) {
      mailLogDoc.errorMessage = input.errorMessage;
    }

    await db.collection(CONTACT_MAIL_LOGS_COLLECTION).add(mailLogDoc);
  } catch (error) {
    console.error("Failed to persist mail log", error);
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailText(input: {
  requesterName: string;
  company: string;
  cnpj: string;
  email: string;
  message: string;
  ip: string;
  createdAt: string;
  submissionId: string;
}): string {
  return [
    "Novo contato t\u00e9cnico - FMEA",
    "",
    `ID: ${input.submissionId}`,
    `Data (UTC): ${input.createdAt}`,
    `IP: ${input.ip}`,
    "",
    `Solicitante: ${input.requesterName}`,
    `Empresa: ${input.company}`,
    `CNPJ: ${input.cnpj}`,
    `Email: ${input.email}`,
    "",
    "Mensagem:",
    input.message
  ].join("\n");
}

function buildEmailHtml(input: {
  requesterName: string;
  company: string;
  cnpj: string;
  email: string;
  message: string;
  ip: string;
  createdAt: string;
  submissionId: string;
}): string {
  const messageHtml = escapeHtml(input.message).replaceAll("\n", "<br />");

  return [
    "<h2>Novo contato t\u00e9cnico - FMEA</h2>",
    `<p><strong>ID:</strong> ${escapeHtml(input.submissionId)}</p>`,
    `<p><strong>Data (UTC):</strong> ${escapeHtml(input.createdAt)}</p>`,
    `<p><strong>IP:</strong> ${escapeHtml(input.ip)}</p>`,
    "<hr />",
    `<p><strong>Solicitante:</strong> ${escapeHtml(input.requesterName)}</p>`,
    `<p><strong>Empresa:</strong> ${escapeHtml(input.company)}</p>`,
    `<p><strong>CNPJ:</strong> ${escapeHtml(input.cnpj)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>`,
    "<p><strong>Mensagem:</strong></p>",
    `<p>${messageHtml}</p>`
  ].join("");
}

export async function POST(request: Request) {
  logRequestContext(request);

  if (!isTrustedOrigin(request)) {
    debugContactLog("blocked-by-origin", {
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer")
    });

    return jsonResponse(403, {
      ok: false,
      message: CONTACT_FAILURE_MESSAGE
    });
  }

  const ip = getClientIp(request);
  const rateLimitResult = checkRateLimit({
    key: `contact:${ip}`,
    windowMs: CONTACT_RATE_WINDOW_MS,
    maxRequests: CONTACT_RATE_MAX_REQUESTS
  });

  if (!rateLimitResult.allowed) {
    return jsonResponse(
      429,
      {
        ok: false,
        message: "Muitas tentativas. Aguarde alguns minutos e tente novamente."
      },
      {
        "Retry-After": String(rateLimitResult.retryAfterSeconds)
      }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, {
      ok: false,
      message: CONTACT_FAILURE_MESSAGE
    });
  }

  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return jsonResponse(400, {
      ok: false,
      message: CONTACT_FAILURE_MESSAGE
    });
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is missing.");
    return jsonResponse(503, {
      ok: false,
      message: SERVICE_UNAVAILABLE_MESSAGE
    });
  }

  const captchaCheck = await verifyTurnstileToken({
    token: validation.data.turnstileToken,
    ip
  });

  if (!captchaCheck.success) {
    debugContactLog("turnstile-failed", { errors: captchaCheck.errors });
    return jsonResponse(400, {
      ok: false,
      message: CONTACT_FAILURE_MESSAGE
    });
  }

  const mailTo = parseRecipients(process.env.CONTACT_NOTIFY_TO);
  if (mailTo.length === 0) {
    console.error("CONTACT_NOTIFY_TO is missing or invalid. Contact email notification disabled.");
    return jsonResponse(503, {
      ok: false,
      message: SERVICE_UNAVAILABLE_MESSAGE
    });
  }

  const mailCc = parseRecipients(process.env.CONTACT_NOTIFY_CC);
  const isProduction = process.env.NODE_ENV === "production";

  let contactFrom = resolveContactFrom(process.env.CONTACT_FROM_EMAIL);
  if (!contactFrom) {
    if (isProduction) {
      console.error("CONTACT_FROM_EMAIL is missing or invalid in production.");
      return jsonResponse(503, {
        ok: false,
        message: SERVICE_UNAVAILABLE_MESSAGE
      });
    }

    contactFrom = CONTACT_DEV_FALLBACK_FROM;
    console.warn("CONTACT_FROM_EMAIL is missing or invalid. Using development fallback sender.");
  }

  if (!isAllowedFromDomain(contactFrom)) {
    if (isProduction) {
      console.error("CONTACT_FROM_EMAIL must use the verified domain in production.");
      return jsonResponse(503, {
        ok: false,
        message: SERVICE_UNAVAILABLE_MESSAGE
      });
    }

    console.warn(`CONTACT_FROM_EMAIL is outside ${CONTACT_FROM_ALLOWED_DOMAIN}; continuing only in development.`);
  }

  if (!getResendClient()) {
    console.error("RESEND_API_KEY is missing or invalid.");
    return jsonResponse(503, {
      ok: false,
      message: SERVICE_UNAVAILABLE_MESSAGE
    });
  }

  const createdAtIso = new Date().toISOString();
  const userAgent = sanitizeText(request.headers.get("user-agent") ?? "", { maxLength: 512 }) || undefined;
  const replyTo = validation.data.email;

  let submission: { id: string };
  try {
    submission = await addContactSubmission({
      requesterName: validation.data.requesterName,
      company: validation.data.company,
      cnpj: validation.data.cnpj,
      email: validation.data.email,
      message: validation.data.message,
      ip,
      userAgent
    });
  } catch (error) {
    console.error("Failed to save technical contact submission.", error);
    return jsonResponse(503, {
      ok: false,
      message: SERVICE_UNAVAILABLE_MESSAGE
    });
  }

  const subject = CONTACT_EMAIL_SUBJECT;
  const text = buildEmailText({
    ...validation.data,
    ip,
    createdAt: createdAtIso,
    submissionId: submission.id
  });
  const html = buildEmailHtml({
    ...validation.data,
    ip,
    createdAt: createdAtIso,
    submissionId: submission.id
  });

  debugContactLog("mail-dispatch", {
    from: contactFrom,
    toCount: mailTo.length,
    ccCount: mailCc.length,
    replyTo,
    submissionId: submission.id
  });

  try {
    const sendResult = await sendContactEmail({
      from: contactFrom,
      to: mailTo,
      cc: mailCc.length > 0 ? mailCc : undefined,
      replyTo,
      subject,
      text,
      html,
      headers: {
        "X-Contact-Submission-Id": submission.id
      }
    });

    await persistMailLog({
      submissionId: submission.id,
      createdAt: createdAtIso,
      to: mailTo,
      cc: mailCc,
      replyTo,
      subject,
      status: "sent",
      resendId: sendResult.id
    });
  } catch (error) {
    await persistMailLog({
      submissionId: submission.id,
      createdAt: createdAtIso,
      to: mailTo,
      cc: mailCc,
      replyTo,
      subject,
      status: "failed",
      errorMessage: extractErrorMessage(error)
    });

    console.error("Resend send failed", error);
    return jsonResponse(503, {
      ok: false,
      message: SERVICE_UNAVAILABLE_MESSAGE
    });
  }

  return jsonResponse(200, {
    ok: true,
    message: CONTACT_SUCCESS_MESSAGE
  });
}
