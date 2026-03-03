import dynamic from "next/dynamic";

import { JsonLd } from "@/components/JsonLd";
import { BrazilCoverageMap } from "@/components/BrazilCoverageMap";
import { Cases } from "@/components/Cases";
import { Hero } from "@/components/Hero";
import { HomeContactSection } from "@/components/HomeContactSection";
import { InstitutionalOverview } from "@/components/InstitutionalOverview";
import { PartnerCarousel } from "@/components/PartnerCarousel";
import { Services } from "@/components/Services";
import { StatsSection } from "@/components/StatsSection";
import { createMetadata, createWebsiteJsonLd } from "@/lib/seo";

const Timeline = dynamic(() => import("@/components/Timeline").then((module) => module.Timeline));

export const metadata = createMetadata({
  title: "Análise de Falha e Inspeção Técnica | FMEA Engineering",
  description:
    "Análise de falha, inspeção técnica, perícia técnica e engenharia aplicada para ativos críticos em energia, indústria e infraestrutura.",
  path: "/",
  keywords: [
    "análise de falha",
    "inspeção técnica",
    "perícia técnica",
    "inspeção por ultrassom",
    "caracterização de materiais",
    "microscopia eletrônica de varredura (MEV)"
  ],
  image: "/hero-energia.png",
  imageAlt: "Engenharia aplicada da FMEA para análise de falha e inspeção técnica"
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={createWebsiteJsonLd()} />
      <main>
        <Hero />
        <InstitutionalOverview />
        <Services />
        <StatsSection />
        <Timeline />
        <BrazilCoverageMap />
        <PartnerCarousel />
        <Cases />
        <HomeContactSection />
      </main>
    </>
  );
}
