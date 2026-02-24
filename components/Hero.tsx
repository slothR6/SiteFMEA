import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="bg-hero-gradient py-24 text-white md:py-32">
      <div className="container space-y-8">
        <p className="max-w-fit rounded-full border border-white/30 px-4 py-1 text-sm">FMEA Engineering • Engenharia Aplicada</p>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Engenharia Aplicada. Decisão Estratégica. Performance Comprovada.
          </h1>
          <p className="max-w-2xl text-lg text-white/85 md:text-xl">
            Atuamos em inspeções técnicas, análise de falhas e desenvolvimento de projetos para elevar a confiabilidade de
            ativos críticos no setor de energia renovável.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/contato" className={cn(buttonVariants({ size: "lg" }), "bg-white text-[#0E7C66] hover:bg-white/90")}>
            Solicitar diagnóstico
          </Link>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-white/60 bg-transparent text-white hover:bg-white/10"
            )}
          >
            Conheça nossos insights
          </Link>
        </div>
      </div>
    </section>
  );
}
