import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { createLocalBusinessJsonLd, createOrganizationJsonLd, getSiteUrl } from "@/lib/seo";

import "../styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Análise de Falha e Inspeção Técnica | FMEA Engineering",
  description:
    "Empresa brasileira de engenharia aplicada especializada em análise de falha, inspeção técnica, perícia técnica e engenharia para ativos críticos.",
  keywords: [
    "FMEA Engineering",
    "análise de falha",
    "inspeção técnica",
    "perícia técnica",
    "inspeção por ultrassom",
    "caracterização de materiais",
    "microscopia eletrônica de varredura",
    "engenharia de confiabilidade"
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "FMEA Engineering",
    title: "Análise de Falha e Inspeção Técnica | FMEA Engineering",
    description:
      "Decisões técnicas orientadas por evidências para indústria, energia e infraestrutura de alta responsabilidade.",
    url: getSiteUrl(),
    images: [
      {
        url: "/hero-energia.png",
        alt: "FMEA Engineering em engenharia aplicada para análise de falha e inspeção técnica"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: "/logomenor.png"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className={`${manrope.variable} font-sans text-[#013d23]`}>
        <JsonLd data={[createOrganizationJsonLd(), createLocalBusinessJsonLd()]} />
        <SiteHeader />
        <div className="flex min-h-screen flex-col pt-24">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
