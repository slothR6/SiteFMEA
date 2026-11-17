import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Sector = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
};

const sectors: Sector[] = [
  {
    title: "Eólico",
    description: "Aerogeradores, parques eólicos e sistemas de transmissão.",
    image: "/images/setor-eolico.jpg",
    imageAlt: "Setor eólico: parques e aerogeradores"
  },
  {
    title: "Solar",
    description: "Usinas fotovoltaicas, estruturas e sistemas de geração.",
    image: "/images/setor-solar.jpg",
    imageAlt: "Setor solar: usinas fotovoltaicas"
  },
  {
    title: "Hídrico",
    description: "Usinas hidrelétricas, turbinas e sistemas de geração hídrica.",
    image: "/images/setor-hidrico.jpg",
    imageAlt: "Setor hídrico: usinas hidrelétricas"
  },
  {
    title: "Portuário",
    description: "Guindastes, cabos de aço, ensaios e inspeção de estruturas.",
    image: "/images/setor-portuario.jpg",
    imageAlt: "Setor portuário: guindastes e inspeção",
    href: "/setores/portuario"
  }
];

function SectorCardContent({ sector }: { sector: Sector }) {
  return (
    <>
      <Image
        src={sector.image}
        alt={sector.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/95 via-[#013d23]/55 via-45% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d5d88e]">Setor</p>
        <h3 className="text-xl font-semibold">{sector.title}</h3>
        <p className="text-sm leading-relaxed text-white/86">{sector.description}</p>
      </div>
      {sector.href ? (
        <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#013d23]">
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </span>
      ) : null}
    </>
  );
}

export function SectorCards() {
  return (
    <section>
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#013d23]/72">Segmentos de atuação</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sectors.map((sector) =>
          sector.href ? (
            <Link
              key={sector.title}
              href={sector.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-[#013d23]/18"
            >
              <SectorCardContent sector={sector} />
            </Link>
          ) : (
            <div
              key={sector.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#013d23]/18"
            >
              <SectorCardContent sector={sector} />
            </div>
          )
        )}
      </div>
    </section>
  );
}
