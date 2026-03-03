import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { genericServiceRelatedLinks } from "@/lib/service-pages";
import { serviceDetails } from "@/lib/services-data";
import { createBreadcrumbJsonLd, createMetadata, createServiceJsonLd } from "@/lib/seo";

const detail = serviceDetails["/servicos/analise-de-falhas"];

export const metadata = createMetadata({
  title: "Análise de Falha e Laudos | FMEA Engineering",
  description:
    "Frente técnica para análise de falha, laudos, ensaios e investigação de causa raiz em ativos industriais e energéticos.",
  path: "/servicos/analise-de-falhas",
  keywords: ["análise de falha", "perícia técnica", "caracterização de materiais", "microscopia eletrônica de varredura (MEV)"],
  image: detail.heroImage,
  imageAlt: detail.heroImageAlt
});

export default function AnaliseDeFalhasPage() {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
            { name: "Análise de falhas", path: "/servicos/analise-de-falhas" }
          ]),
          createServiceJsonLd({
            name: "Análise de falhas",
            description: "Frente técnica para investigação de causa raiz, ensaios e suporte a laudos e pareceres.",
            path: "/servicos/analise-de-falhas",
            serviceType: "Análise de falhas",
            keywords: ["análise de falha", "perícia técnica", "caracterização de materiais"],
            image: detail.heroImage
          })
        ]}
      />
      <PageIntro eyebrow="Serviço" title={detail.pageTitle} description={detail.pageDescription} />
      <ServiceDetailTemplate route="/servicos/analise-de-falhas" relatedLinks={genericServiceRelatedLinks["/servicos/analise-de-falhas"]} />
    </>
  );
}
