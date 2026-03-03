import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { CaseStudy } from "@/lib/cases-data";

import { CardImage } from "./CardImage";
import { Tag } from "./Tag";

type CaseCardProps = {
  item: CaseStudy;
  typeLabel: string;
};

function DetailBlock({ title, text, tone }: { title: string; text: string; tone: "default" | "accent" }) {
  const toneClass =
    tone === "accent"
      ? "border-[#d5d88e]/80 bg-[#d5d88e]/18 text-[#013d23]"
      : "border-[#013d23]/12 bg-[#f8faf9] text-[#013d23]/84";

  return (
    <section className={`rounded-xl border p-4 ${toneClass}`}>
      <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#013d23]/70">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
    </section>
  );
}

export function CaseCard({ item, typeLabel }: CaseCardProps) {
  return (
    <article className="h-full overflow-hidden rounded-3xl border border-[#013d23]/18 bg-white shadow-[0_14px_34px_-26px_rgba(1,61,35,0.9)] transition duration-300 hover:-translate-y-1 hover:border-[#013d23]/34 hover:shadow-[0_24px_42px_-28px_rgba(1,61,35,0.95)]">
      <CardImage
        src={item.image}
        alt={item.imageAlt}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        objectPosition={item.imageObjectPosition}
        containerClassName="border-b border-[#013d23]/12"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/74 via-[#013d23]/24 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
          <Tag tone="accent">{typeLabel}</Tag>
          <Tag tone="outline">{item.sector}</Tag>
        </div>
      </CardImage>

      <div className="space-y-5 p-6">
        <h3 className="text-2xl font-semibold text-[#013d23]">{item.title}</h3>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="grid gap-3">
          <DetailBlock title="Desafio" text={item.challenge} tone="default" />
          <DetailBlock title="Abordagem" text={item.approach} tone="default" />
          <DetailBlock title="Resultado" text={item.result} tone="accent" />
        </div>

        {item.href ? (
          <Link
            href={item.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#013d23] transition hover:text-[#013d23]/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d23] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
