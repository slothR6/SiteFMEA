import Image from "next/image";
import Link from "next/link";

import { strategicPillars } from "@/lib/data";

export function InstitutionalOverview() {
  return (
    <section className="bg-white py-20">
      <div className="container space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">Responsabilidade Técnica</p>
            <h2 className="text-3xl font-semibold leading-tight text-[#013d23] md:text-4xl">
              Estrutura corporativa para engenharia aplicada com governança, método e confiabilidade.
            </h2>
            <p className="text-sm leading-relaxed text-[#013d23]/75 md:text-base">
              A FMEA Engineering atua como parceira técnica de longo prazo para empresas que precisam reduzir
              incerteza operacional e elevar a qualidade de decisão em ambientes complexos.
            </p>
            <Link
              href="/responsabilidade-tecnica"
              className="inline-flex rounded-md border border-[#013d23]/20 px-4 py-2 text-sm font-semibold text-[#013d23] transition hover:border-[#d5d88e] hover:bg-[#d5d88e]/35"
            >
              Conhecer estrutura técnica
            </Link>
          </div>

          <article className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#013d23]/12 bg-white shadow-[0_20px_45px_-45px_rgba(1,61,35,0.9)]">
            <Image
              src="/images/patriciaaero.jpg"
              alt="Ambiente industrial com monitoramento de ativos críticos"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/80 via-[#013d23]/30 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d5d88e]">Destaque Nacional</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/90">
                Presença técnica em projetos de energia, infraestrutura e indústria com foco em performance e
                integridade operacional.
              </p>
            </div>
          </article>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {strategicPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-2xl border border-[#013d23]/10 bg-[#f6f8f7] p-6">
              <h3 className="text-lg font-semibold text-[#013d23]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#013d23]/75">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
