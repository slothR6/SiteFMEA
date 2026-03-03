import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { RelatedLinksSection } from "@/components/RelatedLinksSection";
import { buttonVariants } from "@/components/ui/button";
import type { RelatedLink } from "@/lib/seo";
import type { ServiceRoute } from "@/lib/services-data";
import { serviceDetails } from "@/lib/services-data";
import { cn } from "@/lib/utils";

import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";

type ServiceDetailTemplateProps = {
  route: ServiceRoute;
  children?: ReactNode;
  relatedLinks?: RelatedLink[];
};

export function ServiceDetailTemplate({ route, children, relatedLinks }: ServiceDetailTemplateProps) {
  const detail = serviceDetails[route];
  const badgeSeparatorIndex = detail.heroBadge.indexOf(":");
  const heroBadgeLabel = badgeSeparatorIndex >= 0 ? detail.heroBadge.slice(badgeSeparatorIndex + 1).trim() : detail.heroBadge;

  return (
    <main className="bg-[#f4f7f5] py-14 md:py-16">
      <div className="container space-y-8">
        <section className="overflow-hidden rounded-3xl border border-[#013d23]/18 bg-white shadow-[0_20px_44px_-30px_rgba(1,61,35,0.9)]">
          <div className="grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="space-y-5 p-7 md:p-9">
              <Tag tone="accent">{heroBadgeLabel}</Tag>
              <h2 className="text-3xl font-semibold text-[#013d23] md:text-4xl">{detail.pageTitle}</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-[#013d23]/84 md:text-base">{detail.introDescription}</p>
            </div>

            <div className="relative min-h-[250px] overflow-hidden border-t border-[#013d23]/12 lg:min-h-[320px] lg:border-l lg:border-t-0">
              <Image
                src={detail.heroImage}
                alt={detail.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={cn("object-cover object-center", detail.heroImageObjectPosition)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/72 via-[#013d23]/20 to-transparent" />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#013d23]/16 bg-white p-6 md:p-8">
          <SectionHeader
            eyebrow="Escopo de atuação"
            title="Estrutura pronta para o conteúdo técnico"
            description={detail.scopeIntro}
            titleClassName="text-2xl md:text-3xl"
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detail.scopeTopics.map((topic) => (
              <article key={topic.title} className="rounded-2xl border border-[#013d23]/14 bg-[#f8faf9] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#013d23]/72">{topic.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {topic.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#013d23]/84">
                      <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#d5d88e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {children}

        {relatedLinks?.length ? (
          <RelatedLinksSection
            title="Páginas especializadas relacionadas"
            description="Esses links aprofundam técnicas correlatas e fortalecem a navegação semântica entre serviços complementares."
            links={relatedLinks}
          />
        ) : null}

        <section className="rounded-3xl border border-[#013d23]/16 bg-[#f8faf9] p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-[#013d23]">Próximo passo</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#013d23]/82 md:text-base">
            Consolidamos o escopo técnico com a sua equipe e priorizamos as ações para execução com rastreabilidade.
          </p>
          <div className="mt-6">
            <Link
              href="/contato"
              className={cn(
                buttonVariants(),
                "bg-[#013d23] text-white hover:bg-[#013d23]/90 focus-visible:ring-[#013d23] focus-visible:ring-offset-[#f8faf9]"
              )}
            >
              {detail.ctaLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
