import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

import { SiteLogo } from "@/components/SiteLogo";

const links = [
  { label: "Responsabilidade Técnica", href: "/responsabilidade-tecnica" },
  { label: "Serviços", href: "/servicos" },
  { label: "Cases", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" }
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/fmeaengineering/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fmea-engineering/", icon: Linkedin }
];

export function Footer() {
  return (
    <footer className="border-t border-[#013d23]/10 bg-white">
      <div className="container grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <SiteLogo className="w-fit" />
          <p className="max-w-sm text-sm leading-relaxed text-[#013d23]/70">
            Consultoria de engenharia aplicada para ativos críticos, confiabilidade operacional e decisão técnica
            baseada em evidências.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013d23]">Navegação</h3>
          <nav className="mt-4 grid gap-2">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit text-sm text-[#013d23]/75 transition hover:text-[#013d23]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-2 text-sm text-[#013d23]/75">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013d23]">Contato</h3>
          <p>contato@fmea.net.br</p>
          <p>+55 48 9 8850-2403</p>
          <p>Florianópolis - SC | Atuação nacional</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013d23]">Redes Sociais</h3>
          <nav className="mt-4 grid gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex w-fit items-center gap-2.5 text-sm text-[#013d23]/75 transition-colors duration-200 hover:text-[#013d23]"
                >
                  <Icon
                    className="h-4 w-4 text-[#013d23]/65 transition-colors duration-200 group-hover:text-[#013d23]"
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="border-t border-[#013d23]/10">
        <div className="container flex flex-col items-start justify-between gap-2 py-4 text-xs text-[#013d23]/65 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} FMEA Engineering. Todos os direitos reservados.</p>
          <p>
            Site desenvolvido por{" "}
            <Link
              href="https://wa.me/+5548991639508"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#013d23]/72 underline decoration-[#013d23]/25 underline-offset-2 transition hover:text-[#013d23] hover:decoration-[#013d23]/55"
            >
              jpsd.net
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
