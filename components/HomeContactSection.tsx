import dynamic from "next/dynamic";

const TechnicalContactForm = dynamic(() =>
  import("@/components/TechnicalContactForm").then((module) => module.TechnicalContactForm)
);

export function HomeContactSection() {
  return (
    <section className="border-t border-[#013d23]/10 bg-white py-20">
      <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">Contato institucional</p>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight text-[#013d23] md:text-4xl">
            Estruture sua demanda técnica com uma equipe de alta performance.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#013d23]/75 md:text-base">
            Compartilhe contexto operacional, criticidade do ativo e objetivo esperado. Nosso time técnico retorna com
            direcionamento inicial e escopo recomendado.
          </p>
        </div>

        <TechnicalContactForm submitLabel="Solicitar contato técnico" surface="soft" className="shadow-none" />
      </div>
    </section>
  );
}
