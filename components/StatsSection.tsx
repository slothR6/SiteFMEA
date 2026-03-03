"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ClipboardCheck, MapPinned, Scale, Zap } from "lucide-react";
import { type ComponentType, useEffect, useRef, useState } from "react";

import { stats, type StatItem } from "@/lib/data";

const STATS_ANIMATION_SESSION_KEY = "fmea-stats-animated";

const iconMap: Record<StatItem["icon"], ComponentType<{ className?: string }>> = {
  diagnosticos: ClipboardCheck,
  judicial: Scale,
  energia: Zap,
  nacional: MapPinned
};

function Counter({
  value,
  suffix,
  shouldAnimate,
  showFinalValue
}: {
  value: number;
  suffix: string;
  shouldAnimate: boolean;
  showFinalValue: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString("pt-BR"));

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(count, value, { duration: 1.9, ease: "easeOut" });
      return () => controls.stop();
    }

    count.set(showFinalValue ? value : 0);

    return;
  }, [count, shouldAnimate, showFinalValue, value]);

  return (
    <p className="text-5xl font-semibold leading-none text-white md:text-6xl">
      <motion.span>{rounded}</motion.span>
      <span className="text-[#d5d88e]">{suffix}</span>
    </p>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasAnimatedPreviously, setHasAnimatedPreviously] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const wasAnimated = window.sessionStorage.getItem(STATS_ANIMATION_SESSION_KEY) === "true";
    setHasAnimatedPreviously(wasAnimated);

    if (wasAnimated) {
      setHasStarted(true);
    }
  }, []);

  useEffect(() => {
    if (hasAnimatedPreviously) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasStarted(true);
        window.sessionStorage.setItem(STATS_ANIMATION_SESSION_KEY, "true");
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasAnimatedPreviously]);

  const shouldAnimate = hasStarted && !hasAnimatedPreviously;
  const showFinalValue = hasStarted || hasAnimatedPreviously;

  return (
    <section ref={sectionRef} className="bg-[#013d23] py-20">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white md:text-4xl">
            Indicadores consolidados para decisões de engenharia com alto grau de responsabilidade.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/70">
            Histórico técnico construído em operações complexas, com consistência em diagnóstico, sustentação pericial
            e performance operacional.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 22 }}
                animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-[#d5d88e]/25 bg-[#0a4e32] p-6 shadow-[0_18px_35px_-30px_rgba(0,0,0,0.6)]"
              >
                <div className="mb-6 flex justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d5d88e]/95">Indicador</span>
                  <Icon className="h-4 w-4 text-[#d5d88e]/85" />
                </div>

                <Counter
                  value={item.value}
                  suffix={item.suffix}
                  shouldAnimate={shouldAnimate}
                  showFinalValue={showFinalValue}
                />
                <p className="mt-4 text-sm text-white/80">{item.label}</p>
                <span className="mt-5 block h-[2px] w-16 bg-[#d5d88e]" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
