import type { FaqItem } from "@/lib/seo";

type FAQSectionProps = {
  title?: string;
  description?: string;
  items: FaqItem[];
};

export function FAQSection({
  title = "Perguntas frequentes",
  description = "Respostas objetivas para acelerar a avaliação técnica e a definição do escopo.",
  items
}: FAQSectionProps) {
  return (
    <section className="rounded-3xl border border-[#013d23]/16 bg-white p-6 md:p-8">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">FAQ técnico</p>
        <h2 className="text-2xl font-semibold text-[#013d23] md:text-3xl">{title}</h2>
        <p className="text-sm leading-relaxed text-[#013d23]/78 md:text-base">{description}</p>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <article key={item.question} className="rounded-2xl border border-[#013d23]/12 bg-[#f8faf9] p-5">
            <h3 className="text-lg font-semibold text-[#013d23]">{item.question}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#013d23]/82 md:text-base">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
