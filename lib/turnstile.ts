type VerifyTurnstileArgs = {
  token: string;
  ip?: string;
};

type TurnstileResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken({ token, ip }: VerifyTurnstileArgs): Promise<{ success: boolean; errors: string[] }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return {
      success: false,
      errors: ["missing-secret"]
    };
  }

  const payload = new URLSearchParams({
    secret,
    response: token
  });

  if (ip && ip !== "unknown") {
    payload.set("remoteip", ip);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString(),
      cache: "no-store"
    });

    if (!response.ok) {
      return {
        success: false,
        errors: [`http-${response.status}`]
      };
    }

    const result = (await response.json()) as TurnstileResponse;

    return {
      success: Boolean(result.success),
      errors: result["error-codes"] ?? []
    };
  } catch {
    return {
      success: false,
      errors: ["network-error"]
    };
  }
}
