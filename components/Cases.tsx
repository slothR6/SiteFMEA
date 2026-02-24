import { cases } from "@/lib/data";

export function Cases() {
  return (
    <section className="bg-[#0d1f2f] py-20 text-white">
      <div className="container space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Cases Estratégicos</h2>
          <p className="text-slate-300">Projetos com forte impacto técnico e ganhos mensuráveis para operações críticas.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-slate-200">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
