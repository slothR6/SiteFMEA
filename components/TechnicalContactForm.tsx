"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CONTACT_MESSAGE_MAX_CHARS, CONTACT_MESSAGE_MIN_CHARS, formatCnpj, isValidCnpj, isValidEmail } from "@/lib/validation";

type TechnicalContactFormProps = {
  className?: string;
  submitLabel?: string;
  surface?: "white" | "soft";
};

type FormDataState = {
  requesterName: string;
  company: string;
  cnpj: string;
  email: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormDataState | "turnstileToken" | "form", string>>;

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileInstance = {
  render: (element: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

const initialFormData: FormDataState = {
  requesterName: "",
  company: "",
  cnpj: "",
  email: "",
  message: "",
  website: ""
};

// Configure NEXT_PUBLIC_TURNSTILE_SITE_KEY em .env.local com a chave pública do Cloudflare Turnstile.
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function validateForm(data: FormDataState, turnstileToken: string): FormErrors {
  const errors: FormErrors = {};

  if (!data.requesterName.trim() || data.requesterName.trim().length < 3) {
    errors.requesterName = "Informe o nome completo do solicitante.";
  }

  if (!data.company.trim() || data.company.trim().length < 2) {
    errors.company = "Informe a empresa.";
  }

  if (!isValidCnpj(data.cnpj)) {
    errors.cnpj = "Informe um CNPJ válido.";
  }

  if (!isValidEmail(data.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!data.message.trim() || data.message.trim().length < CONTACT_MESSAGE_MIN_CHARS) {
    errors.message = "A mensagem deve ter no mínimo 20 caracteres.";
  }
  if (data.message.trim().length > CONTACT_MESSAGE_MAX_CHARS) {
    errors.message = "A mensagem deve ter no máximo 2000 caracteres.";
  }

  if (!turnstileSiteKey) {
    errors.form = "CAPTCHA indisponível. Configure NEXT_PUBLIC_TURNSTILE_SITE_KEY para habilitar o envio.";
  } else if (!turnstileToken) {
    errors.turnstileToken = "Resolva o CAPTCHA antes de enviar.";
  }

  return errors;
}

export function TechnicalContactForm({ className, submitLabel = "Enviar solicitação técnica", surface = "white" }: TechnicalContactFormProps) {
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!turnstileSiteKey) {
      return;
    }

    let cancelled = false;

    const mountTurnstile = () => {
      if (cancelled || !window.turnstile || !turnstileContainerRef.current || turnstileWidgetIdRef.current) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        theme: "light",
        callback: (token) => {
          setTurnstileToken(token);
          setErrors((current) => {
            if (!current.turnstileToken) {
              return current;
            }

            return {
              ...current,
              turnstileToken: undefined
            };
          });
        },
        "expired-callback": () => {
          setTurnstileToken("");
        },
        "error-callback": () => {
          setTurnstileToken("");
        }
      });
    };

    mountTurnstile();
    const intervalId = window.setInterval(mountTurnstile, 250);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);

      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  const handleChange = (field: keyof FormDataState, value: string) => {
    const normalizedValue = field === "cnpj" ? formatCnpj(value) : value;
    setFormData((current) => ({
      ...current,
      [field]: normalizedValue
    }));

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      return {
        ...current,
        [field]: undefined
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const validationErrors = validateForm(formData, turnstileToken);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          requesterName: formData.requesterName,
          company: formData.company,
          cnpj: formData.cnpj,
          email: formData.email,
          message: formData.message,
          website: formData.website,
          turnstileToken
        })
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setErrors({});
        setFeedback({
          type: "error",
          text: result.message ?? "Não foi possível enviar agora. Tente novamente em instantes."
        });
        return;
      }

      setFeedback({
        type: "success",
        text: result.message ?? "Solicitação enviada com sucesso."
      });
      setFormData(initialFormData);
      setTurnstileToken("");

      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Falha de conexão. Verifique sua rede e tente novamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn(
        "space-y-5 rounded-2xl border border-[#013d23]/12 p-6 shadow-sm md:p-8",
        surface === "white" ? "bg-white" : "bg-neutral-50",
        className
      )}
    >
      {turnstileSiteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="requesterName" className="text-sm font-semibold text-[#013d23]">
            Nome do solicitante
          </label>
          <Input
            id="requesterName"
            name="requesterName"
            value={formData.requesterName}
            onChange={(event) => handleChange("requesterName", event.target.value)}
            required
            aria-invalid={Boolean(errors.requesterName)}
          />
          {errors.requesterName ? <p className="text-xs text-red-700">{errors.requesterName}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="company" className="text-sm font-semibold text-[#013d23]">
            Empresa
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={(event) => handleChange("company", event.target.value)}
            required
            aria-invalid={Boolean(errors.company)}
          />
          {errors.company ? <p className="text-xs text-red-700">{errors.company}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="cnpj" className="text-sm font-semibold text-[#013d23]">
            CNPJ
          </label>
          <Input
            id="cnpj"
            name="cnpj"
            inputMode="numeric"
            maxLength={18}
            value={formData.cnpj}
            onChange={(event) => handleChange("cnpj", event.target.value)}
            required
            aria-invalid={Boolean(errors.cnpj)}
          />
          {errors.cnpj ? <p className="text-xs text-red-700">{errors.cnpj}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-[#013d23]">
            E-mail
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            required
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="text-xs text-red-700">{errors.email}</p> : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-[#013d23]">
          Mensagem
        </label>
        <Textarea
          id="message"
          name="message"
          className="min-h-[140px]"
          maxLength={CONTACT_MESSAGE_MAX_CHARS}
          value={formData.message}
          onChange={(event) => handleChange("message", event.target.value)}
          required
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <p className="text-xs text-red-700">{errors.message}</p> : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <Input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(event) => handleChange("website", event.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        {turnstileSiteKey ? (
          <div ref={turnstileContainerRef} className="min-h-[66px]" />
        ) : (
          <p className="rounded-md border border-amber-500/45 bg-amber-100/75 px-3 py-2 text-xs font-medium text-amber-900">
            CAPTCHA não configurado. Defina `NEXT_PUBLIC_TURNSTILE_SITE_KEY` no ambiente para liberar o envio.
          </p>
        )}

        {errors.turnstileToken ? <p className="text-xs text-red-700">{errors.turnstileToken}</p> : null}
        {errors.form ? <p className="text-xs text-red-700">{errors.form}</p> : null}
      </div>

      {feedback ? (
        <p
          className={cn(
            "rounded-md border px-3 py-2 text-sm",
            feedback.type === "success" ? "border-emerald-700/35 bg-emerald-100/65 text-emerald-900" : "border-red-700/35 bg-red-100/75 text-red-900"
          )}
        >
          {feedback.text}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="home-primary-cta h-auto w-full disabled:cursor-not-allowed disabled:opacity-75">
        {isSubmitting ? "Enviando..." : submitLabel}
      </Button>
    </form>
  );
}
