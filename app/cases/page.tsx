import Image from "next/image";

import { JsonLd } from "@/components/JsonLd";
import { CaseCard } from "@/components/CaseCard";
import { PageIntro } from "@/components/PageIntro";
import { Tag } from "@/components/Tag";
import { caseStudies, caseTypeLabels } from "@/lib/cases-data";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Perícia Técnica e Cases | FMEA Engineering",
  description:
    "Cases técnicos com análise de falha, inspeção técnica, perícia técnica e projetos aplicados a operações de alta exigência.",
  path: "/cases",
  keywords: ["perícia técnica", "análise de falha", "inspeção técnica", "cases industriais"],
  image: "/images/wind-farm-landscape.jpg",
  imageAlt: "Cases técnicos de análise de falha e perícia técnica da FMEA"
});

export default function CasesPage() {
  const typeLabelMap = Object.fromEntries(caseTypeLabels.map((type) => [type.id, type.label])) as Record<
    (typeof caseTypeLabels)[number]["id"],
    string
  >;

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Cases", path: "/cases" }
        ])}
      />

      <PageIntro
        eyebrow="Cases"
        title="Resultados técnicos aplicados a operações de alta exigência"
        description="Projetos estruturados com metodologia clara e foco em impacto mensurável em confiabilidade, risco e continuidade operacional."
      />

      <main className="bg-[#f4f7f5] py-14 md:py-16">
        <div className="container space-y-10">
          <section className="overflow-hidden rounded-3xl border border-[#013d23]/18 bg-white shadow-[0_20px_44px_-30px_rgba(1,61,35,0.9)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5 p-7 md:p-9">
                <Tag tone="accent">Estrutura padronizada</Tag>
                <h2 className="max-w-2xl text-3xl font-semibold text-[#013d23] md:text-4xl">
                  Cada case apresenta Desafio, Abordagem e Resultado com leitura objetiva.
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[#013d23]/82 md:text-base">
                  Reorganizamos os casos em três tipos para facilitar comparação entre contextos de análise de falha,
                  inspeção ou perícia técnica e desenvolvimento de projeto.
                </p>
              </div>

              <div className="relative min-h-[260px] overflow-hidden border-t border-[#013d23]/12 lg:min-h-[300px] lg:border-l lg:border-t-0">
                <Image
                  src="/images/wind-farm-landscape.jpg"
                  alt="Visão de infraestrutura industrial para cases de análise de falha e inspeção técnica"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#013d23]/72 via-[#013d23]/20 to-transparent" />
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((item) => (
              <CaseCard key={item.slug} item={item} typeLabel={typeLabelMap[item.type]} />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
