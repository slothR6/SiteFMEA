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
    <section className="home-section bg-[#edf3ef]">
      <div className="container space-y-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="home-panel flex h-full flex-col justify-center">
            <p className="home-eyebrow">Cases estratégicos</p>
            <h2 className="home-section-title max-w-3xl">
              Projetos com foco em risco técnico, previsibilidade operacional e resultado mensurável.
            </h2>
            <p className="home-section-subtitle">
              Casos organizados por tipo de atuação para facilitar leitura executiva de desafio, abordagem e resultado.
            </p>
          </div>

          <article className="relative aspect-[20/13] overflow-hidden rounded-2xl border border-[#013d23]/12 bg-white shadow-sm">
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
            <article
              key={item.slug}
              className="home-card transition duration-300 hover:-translate-y-1 hover:border-[#d5d88e] hover:shadow-[0_16px_40px_-35px_rgba(1,61,35,0.95)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#013d23]/70">{typeLabelMap[item.type]}</p>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900">{item.title}</h3>
              <p className="home-card-copy">{item.result}</p>
            </article>
          ))}
        </div>

        <div>
          <Link href="/cases" className="home-primary-cta">
            Ver página completa de cases
          </Link>
        </div>
      </div>
    </section>
  );
}
