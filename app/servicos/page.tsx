import Image from "next/image";

import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ServiceCard } from "@/components/ServiceCard";
import { Tag } from "@/components/Tag";
import { serviceCards, serviceCategories } from "@/lib/services-data";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Inspeção Técnica e Serviços | FMEA Engineering",
  description:
    "Portfólio técnico da FMEA com análise de falha, inspeção técnica, perícia técnica e desenvolvimento de projetos para ativos críticos.",
  path: "/servicos",
  keywords: ["inspeção técnica", "análise de falha", "perícia técnica", "engenharia aplicada"],
  image: "/images/field-engineer-report.jpg",
  imageAlt: "Portfólio técnico de inspeção técnica e análise de falha da FMEA"
});

export default function ServicosPage() {
  const categoryLabelMap = Object.fromEntries(serviceCategories.map((category) => [category.id, category.title])) as Record<
    (typeof serviceCategories)[number]["id"],
    string
  >;

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" }
        ])}
      />

      <PageIntro
        eyebrow="Serviços"
        title="Atuação técnica orientada por risco, evidências e resultado"
        description="Nossos serviços estão organizados em três frentes para apoiar decisões executivas e performance operacional em ativos críticos."
      />

      <main className="bg-[#f4f7f5] py-14 md:py-16">
        <div className="container space-y-10">
          <section className="overflow-hidden rounded-3xl border border-[#013d23]/18 bg-white shadow-[0_20px_44px_-30px_rgba(1,61,35,0.9)]">
            <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-5 p-7 md:p-9">
                <Tag tone="accent">Três frentes de atuação</Tag>
                <h2 className="max-w-2xl text-3xl font-semibold text-[#013d23] md:text-4xl">
                  Estrutura técnica segmentada para cada contexto de risco e decisão.
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-[#013d23]/82 md:text-base">
                  Organizamos os serviços por categoria para facilitar navegação, comparação e contratação da frente
                  técnica mais adequada para o seu desafio.
                </p>
              </div>
              <div className="relative min-h-[250px] overflow-hidden border-t border-[#013d23]/12 lg:min-h-[300px] lg:border-l lg:border-t-0">
                <Image
                  src="/images/field-engineer-report.jpg"
                  alt="Painel de engenharia com dados técnicos e monitoramento de ativos para inspeção técnica"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#013d23]/70 via-[#013d23]/28 to-transparent" />
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <ServiceCard
                key={service.href}
                service={service}
                categoryLabel={categoryLabelMap[service.categoryId] ?? service.title}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
