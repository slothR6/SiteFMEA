"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero-section" className="relative -mt-24 h-[100svh] overflow-hidden border-b border-[#013d23]/10">
      <video
        className="absolute inset-0 h-auto min-h-full w-full object-cover md:h-full"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-energia.png"
        aria-hidden="true"
      >
        <source src="/novovideo.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(128deg,rgba(1,61,35,0.45)_0%,rgba(1,61,35,0.30)_45%,rgba(1,61,35,0.50)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_48%,rgba(0,0,0,0)_100%)]" />
      <div className="relative mx-auto flex h-full w-[94vw] max-w-[1440px] items-center px-4 sm:px-6">
        <div className="w-full max-w-6xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[11ch] text-left text-[2.55rem] font-extrabold leading-[1.04] tracking-tight text-white drop-shadow-[0_14px_26px_rgba(0,0,0,0.35)] sm:text-[4.1rem] sm:leading-[1.01] md:text-[5.3rem] lg:text-[6.05rem]"
          >
            <span className="block">Engenharia aplicada</span>
            <span className="mt-2 block sm:mt-3">e estratégia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="max-w-2xl text-left text-lg leading-relaxed text-white/90 md:text-xl"
          >
            Soluções integradas de inspeção, projeto e diagnóstico para potencializar o seu negócio. A excelência da
            engenharia brasileira aliada ao rigor técnico global.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="pt-2"
          >
            <Link
              href="/contato"
              className="group inline-flex w-full max-w-full items-center justify-between gap-4 rounded-[1rem] border border-white/38 bg-[#f6f8f2] px-6 py-3.5 text-base font-semibold text-[#013d23] shadow-[0_18px_36px_-22px_rgba(0,0,0,0.65)] transition-[transform,background-color,color,box-shadow,border-color] duration-[360ms] ease-in-out hover:-translate-y-[2px] hover:border-[#013d23]/65 hover:bg-[#013d23] hover:text-white hover:shadow-[0_26px_42px_-22px_rgba(0,0,0,0.74)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5d88e] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto sm:justify-center sm:px-7"
            >
              <span>Fale com um Especialista</span>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#013d23] shadow-[inset_0_0_0_1px_rgba(1,61,35,0.24)] transition-[background-color,color,transform] duration-[360ms] ease-in-out group-hover:bg-[#d5d88e]">
                <ArrowRight
                  aria-hidden="true"
                  className="h-[18px] w-[18px] transition-transform duration-[360ms] ease-in-out group-hover:translate-x-[2px]"
                  strokeWidth={2.2}
                />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
