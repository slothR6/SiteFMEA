import { NextResponse } from "next/server";

import { addCommentToSlug, getCommentsBySlug } from "@/lib/comments-store";
import { getBlogPostBySlug } from "@/lib/blog";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp, isTrustedOrigin } from "@/lib/security";
import { validateCommentPayload } from "@/lib/validation";

const COMMENT_RATE_WINDOW_MS = 5 * 60 * 1000;
const COMMENT_RATE_MAX_REQUESTS = 3;

type RouteContext = {
  params: Promise<{ slug: string }>;
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

export async function GET(_: Request, { params }: RouteContext) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return jsonResponse(404, {
      ok: false,
      message: "Post não encontrado."
    });
  }

  return jsonResponse(200, {
    ok: true,
    comments: getCommentsBySlug(slug)
  });
}

export async function POST(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return jsonResponse(404, {
      ok: false,
      message: "Post não encontrado."
    });
  }

  if (!isTrustedOrigin(request)) {
    return jsonResponse(403, {
      ok: false,
      message: "Origem não permitida para comentários."
    });
  }

  const ip = getClientIp(request);
  const rateLimitResult = checkRateLimit({
    key: `comment:${slug}:${ip}`,
    windowMs: COMMENT_RATE_WINDOW_MS,
    maxRequests: COMMENT_RATE_MAX_REQUESTS
  });

  if (!rateLimitResult.allowed) {
    return jsonResponse(
      429,
      {
        ok: false,
        message: "Você atingiu o limite de comentários. Aguarde alguns minutos."
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
      message: "Corpo da requisição inválido."
    });
  }

  const validation = validateCommentPayload(payload);
  if (!validation.ok) {
    return jsonResponse(400, {
      ok: false,
      message: validation.message,
      errors: validation.errors
    });
  }

  const createdComment = addCommentToSlug(slug, {
    authorName: validation.data.authorName,
    company: validation.data.company,
    message: validation.data.message
  });

  return jsonResponse(201, {
    ok: true,
    comment: createdComment
  });
}
