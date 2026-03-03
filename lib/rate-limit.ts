type Bucket = number[];
type RateLimitStore = Map<string, Bucket>;

type CheckRateLimitArgs = {
  key: string;
  windowMs: number;
  maxRequests: number;
};

export type RateLimitResult =
  | {
      allowed: true;
      retryAfterSeconds: 0;
    }
  | {
      allowed: false;
      retryAfterSeconds: number;
    };

declare global {
  // eslint-disable-next-line no-var
  var __FMEA_RATE_LIMIT_STORE: RateLimitStore | undefined;
}

const rateLimitStore = globalThis.__FMEA_RATE_LIMIT_STORE ?? new Map<string, Bucket>();

if (!globalThis.__FMEA_RATE_LIMIT_STORE) {
  globalThis.__FMEA_RATE_LIMIT_STORE = rateLimitStore;
}

export function checkRateLimit({ key, windowMs, maxRequests }: CheckRateLimitArgs): RateLimitResult {
  const now = Date.now();
  const bucket = rateLimitStore.get(key) ?? [];
  const activeWindow = bucket.filter((timestamp) => now - timestamp < windowMs);

  if (activeWindow.length >= maxRequests) {
    rateLimitStore.set(key, activeWindow);
    const oldestRequestTimestamp = activeWindow[0] ?? now;
    const retryAfterSeconds = Math.ceil((windowMs - (now - oldestRequestTimestamp)) / 1000);

    return {
      allowed: false,
      retryAfterSeconds
    };
  }

  activeWindow.push(now);
  rateLimitStore.set(key, activeWindow);

  return {
    allowed: true,
    retryAfterSeconds: 0
  };
}
