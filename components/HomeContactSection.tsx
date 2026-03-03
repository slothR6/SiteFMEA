import dynamic from "next/dynamic";

const TechnicalContactForm = dynamic(() =>
  import("@/components/TechnicalContactForm").then((module) => module.TechnicalContactForm)
);

export function HomeContactSection() {
  return (
    <section className="home-section border-t border-[#013d23]/10 bg-white">
      <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="home-panel h-full">
          <p className="home-eyebrow">Contato institucional</p>
          <h2 className="home-section-title max-w-xl">
            Estruture sua demanda técnica com uma equipe de alta performance.
          </h2>
          <p className="home-section-subtitle max-w-xl">
            Compartilhe contexto operacional, criticidade do ativo e objetivo esperado. Nosso time técnico retorna com
            direcionamento inicial e escopo recomendado.
          </p>
        </div>

        <TechnicalContactForm submitLabel="Solicitar contato técnico" className="shadow-sm" />
      </div>
    </section>
  );
}
