"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SiteLogo } from "./SiteLogo";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Responsabilidade Técnica", href: "/responsabilidade-tecnica" },
  { label: "Serviços", href: "/servicos" },
  { label: "Cases", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" }
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(pathname === "/");

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 12);

      if (pathname !== "/") {
        setIsOverHero(false);
        return;
      }

      const heroSection = document.getElementById("hero-section");
      if (!heroSection) {
        setIsOverHero(window.scrollY < window.innerHeight * 0.55);
        return;
      }

      const { bottom } = heroSection.getBoundingClientRect();
      setIsOverHero(bottom > 112);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, [pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const darkMode = pathname === "/" && isOverHero;

  return (
    <header className="fixed inset-x-0 top-5 z-[120] flex justify-center px-2 sm:px-4">
      <div
        className={cn(
          "w-[94vw] max-w-[1440px] overflow-hidden rounded-[1.3rem] border backdrop-blur-[24px] transition-all duration-300",
          darkMode
            ? isScrolled
              ? "border-white/45 bg-[rgba(246,251,248,0.58)] backdrop-blur-[30px] shadow-[0_24px_48px_-28px_rgba(0,0,0,0.56),0_10px_24px_-16px_rgba(1,61,35,0.56)]"
              : "border-white/36 bg-[rgba(246,251,248,0.5)] shadow-[0_18px_38px_-24px_rgba(0,0,0,0.5),0_8px_20px_-16px_rgba(1,61,35,0.46)]"
            : isScrolled
              ? "border-white/74 bg-[rgba(252,255,252,0.84)] backdrop-blur-[30px] shadow-[0_24px_48px_-30px_rgba(1,61,35,0.64),0_10px_26px_-20px_rgba(0,0,0,0.28)]"
              : "border-white/68 bg-[rgba(252,255,252,0.78)] shadow-[0_18px_38px_-26px_rgba(1,61,35,0.56),0_8px_22px_-18px_rgba(0,0,0,0.22)]"
        )}
      >
        <div className="flex h-[4.45rem] items-center justify-between gap-4 px-4 sm:px-6">
          <SiteLogo tone="dark" className="shrink-0" />

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-[0.96rem] font-semibold transition-all duration-300",
                    active
                      ? "bg-[#013d23] text-white shadow-[0_14px_22px_-18px_rgba(1,61,35,0.82)]"
                      : "text-[#013d23]/90 hover:bg-white/70 hover:text-[#013d23]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex">
            <Link
              href="/contato"
              className={cn(
                buttonVariants({ size: "default" }),
                "h-11 rounded-full border border-[#013d23]/16 bg-[#013d23] px-6 text-[0.95rem] font-semibold text-white shadow-[0_14px_24px_-18px_rgba(1,61,35,0.86)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#022f1d] hover:shadow-[0_20px_30px_-18px_rgba(1,61,35,0.88)]"
              )}
            >
              Fale com um Especialista
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#013d23]/20 text-[#013d23] transition-all duration-300 lg:hidden",
              isOpen ? "bg-[#013d23]/10" : "hover:bg-[#013d23]/8"
            )}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "mx-3 mb-3 max-h-[calc(100svh-7.5rem)] overflow-y-auto rounded-[1.05rem] border border-white/65 bg-[rgba(252,255,252,0.9)] p-3 backdrop-blur-[18px] shadow-[0_22px_34px_-24px_rgba(1,61,35,0.66)] lg:hidden"
              )}
            >
              <nav className="grid gap-1">
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-full px-3.5 py-2.5 text-[0.95rem] font-medium transition-all duration-300",
                        active ? "bg-[#013d23] text-white" : "text-[#013d23]/90 hover:bg-white/72"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-3">
                <Link
                  href="/contato"
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full rounded-full border border-[#013d23]/16 bg-[#013d23] text-white hover:bg-[#022f1d] hover:text-white"
                  )}
                >
                  Fale com um Especialista
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
