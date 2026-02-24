const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function TRLSection() {
  return (
    <section className="py-20">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Atuação em todo ciclo TRL 1-9</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Da pesquisa aplicada à operação em escala industrial, conduzimos decisões técnicas com precisão ao longo de
            toda a maturidade tecnológica.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-9">
          {levels.map((level) => (
            <div
              key={level}
              className={`rounded-lg border p-4 text-center text-sm font-semibold ${
                level >= 1 && level <= 9 ? "border-[#0E7C66]/20 bg-[#0E7C66]/10 text-[#0b5c4c]" : ""
              }`}
            >
              TRL {level}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
