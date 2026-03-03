"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

import { brazilMapViewBox, brazilStatePaths } from "@/lib/brazilMapData";
import { nationalCoverage } from "@/lib/data";

type SectorCard = {
  name: string;
  image: string;
  imageAlt: string;
};

const coveredStateChips = nationalCoverage
  .map((item) => ({
    id: item.id,
    uf: item.id.toUpperCase(),
    name: item.state
  }))
  .sort((a, b) => a.uf.localeCompare(b.uf, "pt-BR"));

const coveredStates = new Set(coveredStateChips.map((item) => item.id));

const sectors: SectorCard[] = [
  {
    name: "Energia",
    image: "/images/wind-farm-landscape.jpg",
    imageAlt: "Parque energético com operação em escala nacional"
  },
  {
    name: "Óleo e Gás",
    image: "/images/field-engineer-report.jpg",
    imageAlt: "Inspeção técnica em ambiente industrial"
  },
  {
    name: "Aeroespacial",
    image: "/hero-energia.png",
    imageAlt: "Simulação de engenharia para aplicações de alta criticidade"
  },
  {
    name: "Aviação",
    image: "/inspetion.png",
    imageAlt: "Infraestrutura técnica para operações de aviação"
  },
  {
    name: "Médico-Hospitalar",
    image: "/images/engineering-wind-team.jpg",
    imageAlt: "Equipe técnica para ambientes médico-hospitalares"
  },
  {
    name: "Agronegócio",
    image: "/images/wind-farm-landscape.jpg",
    imageAlt: "Engenharia aplicada para operações no agronegócio"
  },
  {
    name: "Mobilidade",
    image: "/images/field-engineer-report.jpg",
    imageAlt: "Equipe técnica em campo para projetos de mobilidade"
  },
  {
    name: "Industrial",
    image: "/images/tecnicosimg.jpg",
    imageAlt: "Atuação técnica industrial em operações críticas"
  }
];

export function BrazilCoverageMap() {
  return (
    <section className="home-section relative isolate overflow-hidden bg-[#f8faf8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#d5d88e]/20 blur-3xl" />
        <div className="absolute -right-12 bottom-8 h-52 w-52 rounded-full bg-[#013d23]/10 blur-3xl" />
      </div>

      <div className="container relative space-y-12">
        <div>
          <h2 className="home-section-title max-w-3xl">{"ATUAÇÃO NACIONAL CONSOLIDADA"}</h2>
          <p className="home-section-subtitle">{"Consolidação técnica com presença nacional em múltiplos setores estratégicos."}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#013d23]/12 bg-white shadow-sm"
          >
            <div className="relative p-6">
              <div className="relative overflow-hidden rounded-2xl border border-[#013d23]/10 bg-[#f7faf8] p-4">
                <svg
                  viewBox={brazilMapViewBox}
                  role="img"
                  aria-label={"Mapa do Brasil com estados de atuação consolidada"}
                  className="w-full"
                >
                  {brazilStatePaths.map((state) => {
                    const isCovered = coveredStates.has(state.id);
                    const fillColor = isCovered ? "rgba(95,165,114,0.72)" : "rgba(1,61,35,0.12)";
                    const strokeColor = isCovered ? "rgba(1,61,35,0.55)" : "rgba(1,61,35,0.2)";

                    return (
                      <path
                        key={state.id}
                        d={state.path}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={isCovered ? 1.2 : 1}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="mt-auto border-t border-[#013d23]/10 bg-neutral-50 px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#013d23]/10 text-[#013d23]">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm font-semibold tracking-[0.03em] text-[#013d23]">Estados atendidos</p>
                </div>

                <span className="rounded-full border border-[#013d23]/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700">
                  {coveredStateChips.length} UF
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
                {coveredStateChips.map((state) => (
                  <li key={state.id}>
                    <span
                      title={state.name}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-[#013d23]/14 bg-white px-3.5 py-1.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#2f7a57]/45"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#2f7a57] transition group-hover:text-[#013d23]" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-primary">{state.uf}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35 }}
            className="home-panel flex h-full flex-col border border-[#013d23]/12 shadow-sm"
          >
            <div>
              <h3 className="home-eyebrow">{"Setores de Atuação"}</h3>
              <p className="mt-4 text-base leading-relaxed text-neutral-700">
                {"Segmentos com exigência técnica elevada e abordagem institucional orientada por evidências."}
              </p>
            </div>

            <div className="mt-6 grid flex-1 auto-rows-max gap-4 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
              {sectors.map((sector) => (
                <article
                  key={sector.name}
                  className="group overflow-hidden rounded-2xl border border-[#013d23]/12 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative h-32 overflow-hidden sm:h-36">
                    <Image
                      src={sector.image}
                      alt={sector.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/24 to-transparent" />
                  </div>

                  <div className="px-4 py-4">
                    <h4 className="text-base font-semibold text-brand-primary">{sector.name}</h4>
                  </div>
                </article>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
