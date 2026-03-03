import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCards } from "@/lib/services-data";

export function Services() {
  return (
    <section className="bg-[#f5f8f6] py-20">
      <div className="container space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">Serviços de engenharia</p>
            <h2 className="max-w-3xl text-3xl font-semibold text-[#013d23] md:text-4xl">
              Estrutura de serviços orientada por profundidade técnica e execução consistente.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#013d23]/75 md:text-base">
              Atuação multidisciplinar com metodologia rigorosa para diagnóstico, inspeção e desenvolvimento de
              projetos em ativos de alta exigência operacional.
            </p>
          </div>

          <article className="relative aspect-[20/13] overflow-hidden rounded-2xl border border-[#013d23]/10 bg-white">
            <Image
              src="/images/tecnicosimg.jpg" 
              alt="Engenheira em ambiente industrial com checklist técnico de inspeção"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/70 to-transparent" />
          </article>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {serviceCards.map((service) => {
            const Icon = service.icon;

            return (
              <Link key={service.href} href={service.href} className="group block h-full">
                <Card className="h-full border-[#013d23]/12 bg-[#f6f8f7] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#d5d88e] group-hover:shadow-[0_16px_40px_-35px_rgba(1,61,35,0.95)]">
                  <CardHeader className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#013d23]/6 p-2.5">
                        <Icon className="h-5 w-5 text-[#013d23]" />
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#013d23]/40 transition group-hover:translate-x-1 group-hover:text-[#013d23]" />
                    </div>
                    <CardTitle className="text-xl text-[#013d23]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-[#013d23]/75">{service.description}</p>
                    <ul className="space-y-2">
                      {service.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-xs text-[#013d23]/70">
                          <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[#d5d88e]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div>
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#013d23] transition hover:text-[#013d23]/75"
          >
            Ver portfólio completo de serviços
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
