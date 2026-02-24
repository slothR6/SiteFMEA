"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { timeline } from "@/lib/data";

export function Timeline() {
  const [activeYear, setActiveYear] = useState(timeline[0].year);
  const selected = timeline.find((item) => item.year === activeYear) ?? timeline[0];

  return (
    <section className="bg-slate-50 py-20">
      <div className="container space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Linha do Tempo Estratégica</h2>
          <p className="text-slate-600">Evolução técnica da FMEA em decisões de engenharia de alto impacto.</p>
        </div>

        <div className="relative mx-auto max-w-5xl px-2">
          <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-300" />
          <div className="relative grid gap-8 md:grid-cols-4">
            {timeline.map((item) => {
              const isActive = item.year === activeYear;
              return (
                <button key={item.year} className="relative text-center" onClick={() => setActiveYear(item.year)}>
                  <span className={`mx-auto block h-8 w-8 rounded-full border-4 ${isActive ? "border-[#0E7C66] bg-white" : "border-slate-300 bg-white"}`} />
                  <span className={`mt-3 block text-sm font-medium ${isActive ? "text-[#0E7C66]" : "text-slate-500"}`}>{item.year}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={selected.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <p className="text-sm uppercase tracking-wide text-[#0E7C66]">{selected.year}</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{selected.title}</h3>
          <p className="mt-4 text-slate-600">{selected.description}</p>
        </motion.div>
      </div>
    </section>
  );
}
