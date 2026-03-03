import { trlLevels } from "@/lib/data";

type TRLSectionProps = {
  title?: string;
  description?: string;
};

export function TRLSection({
  title = "Atuação no ciclo completo TRL 1 a 9",
  description = "Acompanhamos a maturidade tecnológica da solução desde validação conceitual até operação plena em campo."
}: TRLSectionProps) {
  return (
    <section className="rounded-3xl border border-[#013d23]/16 bg-white p-6 shadow-[0_14px_34px_-26px_rgba(1,61,35,0.9)] md:p-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#013d23] md:text-3xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[#013d23]/82 md:text-base">{description}</p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {trlLevels.map((item) => (
          <article
            key={item.level}
            className="rounded-xl border border-[#013d23]/12 bg-[#f8faf9] p-4 transition hover:border-[#d5d88e] hover:bg-[#d5d88e]/24"
          >
            <p className="text-sm font-semibold text-[#013d23]">TRL {item.level}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#013d23]/78">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
