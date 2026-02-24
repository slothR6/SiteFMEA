"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

import { stats } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString("pt-BR"));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
    return () => controls.stop();
  }, [count, value]);

  return (
    <motion.p className="text-3xl font-semibold text-[#0E7C66] md:text-4xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.p>
  );
}

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <Counter value={item.value} suffix={item.suffix} />
            <p className="mt-3 text-slate-600">{item.label}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
