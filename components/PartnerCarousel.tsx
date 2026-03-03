import Image from "next/image";

import { partnerLogos } from "@/lib/data";

export function PartnerCarousel() {
  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="container space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">
            Ecossistema técnico
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[#013d23] md:text-4xl">
            Parceiros que contribuíram para nossa evolução
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#013d23]/12 bg-[#f6f8f6] py-5">
          <div className="flex w-max animate-partner-marquee">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                className="flex shrink-0 items-center gap-5 pr-5"
                aria-hidden={copyIndex === 1}
              >
                {partnerLogos.map((partner) => (
                  <article
                    key={`${copyIndex}-${partner.src}`}
                    className="group relative flex h-[86px] min-w-[190px] items-center justify-center overflow-hidden rounded-2xl border border-[#013d23]/12 bg-white px-5 py-4"
                    aria-label={`Parceiro ${partner.alt}`}
                  >
                    <div className="relative h-10 w-full max-w-[150px] overflow-hidden">
                      <Image
                        src={partner.src}
                        alt={partner.alt}
                        fill
                        sizes="150px"
                        className="object-contain object-center opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
