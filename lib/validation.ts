import { sanitizeText } from "@/lib/security";

type ValidationErrorMap = Record<string, string>;

export const CONTACT_MESSAGE_MIN_CHARS = 20;
export const CONTACT_MESSAGE_MAX_CHARS = 2000;

export type ContactSubmissionInput = {
  requesterName: string;
  company: string;
  cnpj: string;
  email: string;
  message: string;
  turnstileToken: string;
};

type ContactValidationResult =
  | {
      ok: true;
      data: ContactSubmissionInput;
    }
  | {
      ok: false;
      message: string;
      errors: ValidationErrorMap;
    };

export type CommentInput = {
  authorName: string;
  company: string;
  message: string;
};

type CommentValidationResult =
  | {
      ok: true;
      data: CommentInput;
    }
  | {
      ok: false;
      message: string;
      errors: ValidationErrorMap;
    };

function toSafeString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function isValidEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(normalized) && normalized.length <= 160;
}

export function normalizeDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCnpj(value: string): string {
  const digits = normalizeDigits(value).slice(0, 14);

  if (!digits) {
    return "";
  }

  const blockA = digits.slice(0, 2);
  const blockB = digits.slice(2, 5);
  const blockC = digits.slice(5, 8);
  const blockD = digits.slice(8, 12);
  const blockE = digits.slice(12, 14);

  let masked = blockA;
  if (blockB) {
    masked += `.${blockB}`;
  }
  if (blockC) {
    masked += `.${blockC}`;
  }
  if (blockD) {
    masked += `/${blockD}`;
  }
  if (blockE) {
    masked += `-${blockE}`;
  }

  return masked;
}

function calculateCnpjCheckDigit(baseDigits: string, multipliers: number[]): number {
  const total = baseDigits.split("").reduce((sum, digit, index) => {
    return sum + Number(digit) * multipliers[index]!;
  }, 0);

  const remainder = total % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function isValidCnpj(value: string): boolean {
  const digits = normalizeDigits(value);
  if (digits.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(digits)) {
    return false;
  }

  const firstCheckDigit = calculateCnpjCheckDigit(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const secondCheckDigit = calculateCnpjCheckDigit(`${digits.slice(0, 12)}${firstCheckDigit}`, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return digits.endsWith(`${firstCheckDigit}${secondCheckDigit}`);
}

export function validateContactPayload(payload: unknown): ContactValidationResult {
  const data = (payload ?? {}) as Record<string, unknown>;
  const errors: ValidationErrorMap = {};

  const honeypot = sanitizeText(toSafeString(data.website) || toSafeString(data.companyWebsite), { maxLength: 64 });
  if (honeypot) {
    errors.website = "Falha na protecao antispam.";
  }

  const requesterName = sanitizeText(toSafeString(data.requesterName), { maxLength: 120 });
  if (requesterName.length < 3) {
    errors.requesterName = "Informe o nome completo do solicitante.";
  }

  const company = sanitizeText(toSafeString(data.company), { maxLength: 160 });
  if (company.length < 2) {
    errors.company = "Informe a empresa.";
  }

  const cnpjInput = toSafeString(data.cnpj);
  if (!isValidCnpj(cnpjInput)) {
    errors.cnpj = "Informe um CNPJ valido.";
  }
  const cnpj = formatCnpj(cnpjInput);

  const email = sanitizeText(toSafeString(data.email).toLowerCase(), { maxLength: 160 });
  if (!isValidEmail(email)) {
    errors.email = "Informe um e-mail valido.";
  }

  const message = sanitizeText(toSafeString(data.message), {
    maxLength: CONTACT_MESSAGE_MAX_CHARS + 1,
    allowLineBreaks: true
  });
  if (message.length < CONTACT_MESSAGE_MIN_CHARS) {
    errors.message = "A mensagem deve ter no minimo 20 caracteres.";
  }
  if (message.length > CONTACT_MESSAGE_MAX_CHARS) {
    errors.message = "A mensagem deve ter no maximo 2000 caracteres.";
  }

  const turnstileToken = sanitizeText(toSafeString(data.turnstileToken), { maxLength: 2048 });
  if (turnstileToken.length < 10) {
    errors.turnstileToken = "Resolva o CAPTCHA antes de enviar.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Nao foi possivel enviar o formulario. Revise os campos obrigatorios.",
      errors
    };
  }

  return {
    ok: true,
    data: {
      requesterName,
      company,
      cnpj,
      email,
      message,
      turnstileToken
    }
  };
}

export function validateCommentPayload(payload: unknown): CommentValidationResult {
  const data = (payload ?? {}) as Record<string, unknown>;
  const errors: ValidationErrorMap = {};

  const honeypot = sanitizeText(toSafeString(data.website), { maxLength: 64 });
  if (honeypot) {
    errors.website = "Falha na protecao antispam.";
  }

  const authorName = sanitizeText(toSafeString(data.authorName), { maxLength: 80 });
  if (authorName.length < 2) {
    errors.authorName = "Informe seu nome.";
  }

  const company = sanitizeText(toSafeString(data.company), { maxLength: 120 });
  if (company.length > 0 && company.length < 2) {
    errors.company = "Informe uma empresa valida ou deixe em branco.";
  }

  const message = sanitizeText(toSafeString(data.message), {
    maxLength: 1200,
    allowLineBreaks: true
  });
  if (message.length < 8) {
    errors.message = "O comentario deve ter no minimo 8 caracteres.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Nao foi possivel publicar o comentario. Revise os campos obrigatorios.",
      errors
    };
  }

  return {
    ok: true,
    data: {
      authorName,
      company,
      message
    }
  };
}
