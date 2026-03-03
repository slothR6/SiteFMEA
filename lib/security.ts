type SanitizeTextOptions = {
  maxLength: number;
  allowLineBreaks?: boolean;
};

const CONTROL_CHAR_REGEX = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;
const SCRIPT_OR_STYLE_TAG_REGEX = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const ANY_HTML_TAG_REGEX = /<\/?[^>]+>/g;

export function sanitizeText(input: string, options: SanitizeTextOptions): string {
  const { maxLength, allowLineBreaks = false } = options;
  const normalizedInput = input
    .normalize("NFKC")
    .replace(CONTROL_CHAR_REGEX, "")
    .replace(SCRIPT_OR_STYLE_TAG_REGEX, " ")
    .replace(ANY_HTML_TAG_REGEX, " ");

  const whitespaceNormalized = allowLineBreaks
    ? normalizedInput.replace(/\r\n?/g, "\n").replace(/[^\S\n]+/g, " ").replace(/\n{3,}/g, "\n\n")
    : normalizedInput.replace(/\s+/g, " ");

  return whitespaceNormalized.slice(0, maxLength).trim();
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, "").toLowerCase();
}

function parseOriginFromUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return normalizeOrigin(url.origin);
  } catch {
    return null;
  }
}

const PRODUCTION_ALLOWED_ORIGINS = [
  "https://fmeaengineering.com.br",
  "https://www.fmeaengineering.com.br",
  "https://fmeaengineering.vercel.app"
];

const DEV_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

function parseConfiguredSiteOrigin(raw: string | undefined): string | null {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//iu.test(trimmed)) {
    return parseOriginFromUrl(trimmed);
  }

  return parseOriginFromUrl(`https://${trimmed}`);
}

function getAllowedOrigins(): string[] {
  const allowedOrigins = new Set<string>(PRODUCTION_ALLOWED_ORIGINS.map(normalizeOrigin));
  const configuredOrigin = parseConfiguredSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);

  if (configuredOrigin) {
    allowedOrigins.add(configuredOrigin);
  }

  if (process.env.NODE_ENV !== "production") {
    for (const devOrigin of DEV_ALLOWED_ORIGINS) {
      allowedOrigins.add(normalizeOrigin(devOrigin));
    }
  }

  return Array.from(allowedOrigins);
}

function isAllowedReferer(refererHeader: string, allowedOrigins: string[]): boolean {
  const normalizedReferer = refererHeader.trim().toLowerCase();
  if (!normalizedReferer || !parseOriginFromUrl(normalizedReferer)) {
    return false;
  }

  return allowedOrigins.some((allowedOrigin) => {
    return (
      normalizedReferer === allowedOrigin ||
      normalizedReferer.startsWith(`${allowedOrigin}/`) ||
      normalizedReferer.startsWith(`${allowedOrigin}?`) ||
      normalizedReferer.startsWith(`${allowedOrigin}#`)
    );
  });
}

export function getTrustedOriginAllowlist(): string[] {
  return getAllowedOrigins();
}

export function isTrustedOrigin(request: Request): boolean {
  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.length === 0) {
    return false;
  }

  const originHeader = request.headers.get("origin");
  if (originHeader) {
    const origin = normalizeOrigin(originHeader);
    return allowedOrigins.includes(origin);
  }

  const refererHeader = request.headers.get("referer");
  if (!refererHeader) {
    return false;
  }

  return isAllowedReferer(refererHeader, allowedOrigins);
}
