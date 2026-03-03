"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { timeline } from "@/lib/data";
import { cn } from "@/lib/utils";

const PLAYBACK_DURATION_MS = 12000;
const RESTART_DELAY_MS = 1500;
const LOOP_DURATION_MS = PLAYBACK_DURATION_MS + RESTART_DELAY_MS;

export function Timeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const cycleStartRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const progressMotion = useMotionValue(0);
  const progressScaleX = useTransform(progressMotion, (value) => value);
  const progressScaleY = useTransform(progressMotion, (value) => value);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  const lastIndex = timeline.length - 1;
  const activeItem = timeline[activeIndex];

  const stopLoop = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const getActiveIndexByProgress = useCallback(
    (progress: number) => {
      if (lastIndex <= 0) {
        return 0;
      }

      if (progress >= 1) {
        return lastIndex;
      }

      return Math.min(lastIndex, Math.floor(progress * timeline.length));
    },
    [lastIndex]
  );

  const syncProgress = useCallback(
    (nextProgress: number) => {
      const clampedProgress = Math.min(1, Math.max(0, nextProgress));
      progressMotion.set(clampedProgress);

      const nextIndex = getActiveIndexByProgress(clampedProgress);
      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    },
    [getActiveIndexByProgress, progressMotion]
  );

  useEffect(() => {
    if (!isInView || lastIndex <= 0) {
      stopLoop();
      cycleStartRef.current = null;
      activeIndexRef.current = 0;
      setActiveIndex(0);
      progressMotion.set(0);
      return;
    }

    stopLoop();
    cycleStartRef.current = null;

    const tick = (timestamp: number) => {
      if (cycleStartRef.current === null) {
        cycleStartRef.current = timestamp;
      }

      const elapsed = timestamp - cycleStartRef.current;
      const elapsedInLoop = elapsed % LOOP_DURATION_MS;
      const nextProgress = elapsedInLoop <= PLAYBACK_DURATION_MS ? elapsedInLoop / PLAYBACK_DURATION_MS : 1;

      syncProgress(nextProgress);
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      stopLoop();
      cycleStartRef.current = null;
    };
  }, [isInView, lastIndex, progressMotion, stopLoop, syncProgress]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateLayout = (matches: boolean) => {
      setIsMobileLayout(matches);
    };

    updateLayout(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updateLayout(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    mediaQuery.addListener(handleChange);
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  const handlePointClick = (index: number) => {
    if (lastIndex <= 0 || !isInView) {
      return;
    }

    const selectedProgress = index / lastIndex;
    syncProgress(selectedProgress);
    cycleStartRef.current = performance.now() - selectedProgress * PLAYBACK_DURATION_MS;
  };

  return (
    <section ref={sectionRef} className="home-section relative isolate overflow-hidden bg-[#edf3ef]">
      <div className="pointer-events-none absolute inset-0">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/hero-energia.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.12]"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(213,216,142,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(158deg,rgba(242,247,243,0.95)_0%,rgba(242,247,243,0.97)_42%,rgba(242,247,243,0.99)_100%)]" />
      </div>

      <div className="container relative space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">Trajetória institucional</p>
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-[#013d23] md:text-4xl">
            Evolução técnica da FMEA em engenharia aplicada para cenários de alta criticidade.
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[#013d23]/75 md:text-base">
            Linha do tempo institucional com foco em ciência, tecnologia, eficiência operacional e geração de valor técnico mensurável.
          </p>
        </header>

        <div className="rounded-2xl border border-[#013d23]/12 bg-white/90 p-6 shadow-sm md:p-8">
          <div className="relative mx-auto w-full md:min-w-[720px]">
            {isMobileLayout ? (
              <>
                <div className="absolute bottom-[22px] left-[20px] top-[22px] w-[5px] rounded-full bg-[#013d23]/12" />
                <div className="absolute bottom-[22px] left-[20px] top-[22px] w-[5px] rounded-full bg-gradient-to-b from-[#013d23]/35 via-[#2f7a57]/30 to-[#d5d88e]/30" />
                <motion.div
                  className="absolute bottom-[22px] left-[20px] top-[22px] w-[5px] rounded-full bg-gradient-to-b from-[#013d23] via-[#2f7a57] to-[#d5d88e]"
                  initial={false}
                  style={{ scaleY: progressScaleY, transformOrigin: "center top" }}
                />
              </>
            ) : (
              <>
                <div className="absolute left-0 right-0 top-[18px] h-[5px] rounded-full bg-[#013d23]/12" />
                <div className="absolute left-0 right-0 top-[18px] h-[5px] rounded-full bg-gradient-to-r from-[#013d23]/35 via-[#2f7a57]/30 to-[#d5d88e]/30" />
                <motion.div
                  className="absolute left-0 right-0 top-[18px] h-[5px] rounded-full bg-gradient-to-r from-[#013d23] via-[#2f7a57] to-[#d5d88e]"
                  initial={false}
                  style={{ scaleX: progressScaleX, transformOrigin: "left center" }}
                />
              </>
            )}

            <div className="relative grid gap-4 md:grid-cols-4 md:gap-7 md:pt-1">
              {timeline.map((item, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={item.period}
                    type="button"
                    onClick={() => handlePointClick(index)}
                    className="group flex w-full items-center gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center"
                    aria-pressed={active}
                  >
                    <span className="relative grid h-11 w-11 place-items-center">
                      {active ? (
                        <motion.span
                          className="absolute inset-0 rounded-full border border-[#d5d88e]/65"
                          animate={{ scale: [1, 1.18, 1], opacity: [0.75, 0.22, 0.75] }}
                          transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                      ) : null}

                      <span
                        className={`relative grid h-9 w-9 place-items-center rounded-full border text-xs font-semibold transition duration-300 ${
                          active
                            ? "border-[#013d23] bg-[#013d23] text-white"
                            : "border-[#013d23]/18 bg-white text-neutral-700 group-hover:border-[#013d23]/35 group-hover:text-neutral-900"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </span>

                    <span
                      className={`w-full text-sm font-semibold transition md:mt-4 md:w-auto ${
                        active ? "text-neutral-900" : "text-neutral-700 group-hover:text-neutral-900"
                      }`}
                    >
                      {item.period}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeItem.period}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="grid overflow-hidden rounded-2xl border border-[#013d23]/12 bg-white shadow-sm lg:grid-cols-[1.06fr_0.94fr]"
          >
            <div className="space-y-5 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#013d23]/70">{activeItem.period}</p>
              <h3 className="text-2xl font-semibold leading-tight text-brand-primary md:text-3xl">{activeItem.title}</h3>
              <p className="w-full max-w-2xl text-lg leading-relaxed text-neutral-700">{activeItem.description}</p>

              <div className="flex flex-wrap gap-2">
                <p className="inline-flex rounded-full bg-[#d5d88e]/45 px-4 py-1 text-xs font-semibold text-[#013d23]">{activeItem.focus}</p>
                <p className="inline-flex rounded-full border border-[#013d23]/14 bg-[#f4f7f5] px-4 py-1 text-xs font-semibold text-neutral-700">
                  {activeItem.milestone}
                </p>
              </div>
            </div>

            <motion.div
              key={activeItem.image}
              initial={{ scale: 1.05, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="relative min-h-[240px] overflow-hidden border-t border-[#013d23]/12 lg:min-h-[310px] lg:border-l lg:border-t-0"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className={cn("object-cover object-center", activeItem.imageObjectPosition)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/72 via-[#013d23]/20 to-transparent" />
            </motion.div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
