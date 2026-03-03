import Image from "next/image";
import Link from "next/link";

import { caseStudies, caseTypeLabels } from "@/lib/cases-data";

const typeLabelMap = Object.fromEntries(caseTypeLabels.map((item) => [item.id, item.label])) as Record<
  (typeof caseTypeLabels)[number]["id"],
  string
>;

export function Cases() {
  const featuredCases = caseStudies.slice(0, 3);

  return (
    <section className="bg-[#edf3ef] py-20">
      <div className="container space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">Cases estratégicos</p>
            <h2 className="max-w-3xl text-3xl font-semibold text-[#013d23] md:text-4xl">
              Projetos com foco em risco técnico, previsibilidade operacional e resultado mensurável.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#013d23]/75 md:text-base">
              Casos organizados por tipo de atuação para facilitar leitura executiva de desafio, abordagem e resultado.
            </p>
          </div>

          <article className="relative aspect-[20/13] overflow-hidden rounded-2xl border border-[#013d23]/12 bg-white">
            <Image
              src="/images/wind-farm-landscape.jpg"
              alt="Infraestrutura industrial monitorada para ganho de confiabilidade operacional"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/65 via-[#013d23]/20 to-transparent" />
          </article>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredCases.map((item) => (
            <article key={item.slug} className="rounded-2xl border border-[#013d23]/12 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#013d23]/60">{typeLabelMap[item.type]}</p>
              <h3 className="mt-3 text-xl font-semibold text-[#013d23]">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#013d23]/78">{item.result}</p>
              <span className="mt-5 block h-[2px] w-14 bg-[#d5d88e]" />
            </article>
          ))}
        </div>

        <div>
          <Link href="/cases" className="text-sm font-semibold text-[#013d23] transition hover:text-[#013d23]/75">
            Ver página completa de cases
          </Link>
        </div>
      </div>
    </section>
  );
}
