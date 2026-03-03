"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogComment } from "@/lib/comments-store";

type BlogCommentsProps = {
  slug: string;
  initialComments: BlogComment[];
};

type CommentFormState = {
  authorName: string;
  company: string;
  message: string;
  website: string;
};

type CommentFormErrors = Partial<Record<keyof CommentFormState | "form", string>>;

const initialCommentForm: CommentFormState = {
  authorName: "",
  company: "",
  message: "",
  website: ""
};

function formatCommentDate(date: string) {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Data indisponível";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(parsedDate);
}

function validateCommentForm(data: CommentFormState): CommentFormErrors {
  const errors: CommentFormErrors = {};

  if (!data.authorName.trim() || data.authorName.trim().length < 2) {
    errors.authorName = "Informe seu nome.";
  }

  if (!data.message.trim() || data.message.trim().length < 8) {
    errors.message = "O comentário deve ter no mínimo 8 caracteres.";
  }

  return errors;
}

export function BlogComments({ slug, initialComments }: BlogCommentsProps) {
  const [comments, setComments] = useState<BlogComment[]>(initialComments);
  const [formData, setFormData] = useState<CommentFormState>(initialCommentForm);
  const [errors, setErrors] = useState<CommentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const commentsCountLabel = useMemo(() => {
    return comments.length === 1 ? "1 comentário" : `${comments.length} comentários`;
  }, [comments.length]);

  const handleFieldChange = (field: keyof CommentFormState, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value
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

    const formErrors = validateCommentForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/blog/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          authorName: formData.authorName,
          company: formData.company,
          message: formData.message,
          website: formData.website
        })
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: CommentFormErrors;
        comment?: BlogComment;
      };

      if (!response.ok || !result.ok || !result.comment) {
        setErrors(result.errors ?? {});
        setFeedback({
          type: "error",
          text: result.message ?? "Não foi possível publicar o comentário agora."
        });
        return;
      }

      const createdComment = result.comment;
      setComments((current) => [createdComment, ...current]);
      setFormData(initialCommentForm);
      setFeedback({
        type: "success",
        text: "Comentário publicado com sucesso."
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Falha de conexão ao publicar o comentário."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-[#013d23]/16 bg-white p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#013d23]/62">Discussão técnica</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#013d23]">Comentários</h2>
        <p className="mt-2 text-sm text-[#013d23]/76">{commentsCountLabel}</p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#013d23]/12 bg-[#f7f9f8] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="comment-author" className="text-sm font-semibold text-[#013d23]">
              Nome
            </label>
            <Input
              id="comment-author"
              name="authorName"
              value={formData.authorName}
              onChange={(event) => handleFieldChange("authorName", event.target.value)}
              required
              aria-invalid={Boolean(errors.authorName)}
            />
            {errors.authorName ? <p className="text-xs text-red-700">{errors.authorName}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="comment-company" className="text-sm font-semibold text-[#013d23]">
              Empresa (opcional)
            </label>
            <Input
              id="comment-company"
              name="company"
              value={formData.company}
              onChange={(event) => handleFieldChange("company", event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="comment-message" className="text-sm font-semibold text-[#013d23]">
            Comentário
          </label>
          <Textarea
            id="comment-message"
            name="message"
            className="min-h-[120px]"
            value={formData.message}
            onChange={(event) => handleFieldChange("message", event.target.value)}
            required
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <p className="text-xs text-red-700">{errors.message}</p> : null}
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="comment-website">Website</label>
          <Input
            id="comment-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(event) => handleFieldChange("website", event.target.value)}
          />
        </div>

        {errors.form ? <p className="text-xs text-red-700">{errors.form}</p> : null}

        {feedback ? (
          <p
            className={`rounded-md border px-3 py-2 text-sm ${
              feedback.type === "success" ? "border-emerald-700/35 bg-emerald-100/65 text-emerald-900" : "border-red-700/35 bg-red-100/75 text-red-900"
            }`}
          >
            {feedback.text}
          </p>
        ) : null}

        <Button type="submit" disabled={isSubmitting} className="bg-[#013d23] text-white hover:bg-[#013d23]/90 disabled:cursor-not-allowed disabled:opacity-75">
          {isSubmitting ? "Publicando..." : "Publicar comentário"}
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#013d23]/22 bg-[#f8faf9] p-4 text-sm text-[#013d23]/72">
            Ainda não há comentários. Seja o primeiro a contribuir.
          </p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-xl border border-[#013d23]/12 bg-[#f8faf9] p-4">
              <p className="text-sm font-semibold text-[#013d23]">
                {comment.authorName}
                {comment.company ? <span className="font-normal text-[#013d23]/70"> · {comment.company}</span> : null}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-[#013d23]/56">{formatCommentDate(comment.createdAt)}</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#013d23]/82">{comment.message}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
