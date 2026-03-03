import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { genericServiceRelatedLinks } from "@/lib/service-pages";
import { serviceDetails } from "@/lib/services-data";
import { createBreadcrumbJsonLd, createMetadata, createServiceJsonLd } from "@/lib/seo";

const detail = serviceDetails["/servicos/inspecoes"];

export const metadata = createMetadata({
  title: "Inspeção Técnica e Perícia | FMEA Engineering",
  description:
    "Frente técnica para inspeção técnica, perícia técnica, auditorias e ensaios não destrutivos em ativos de alta criticidade.",
  path: "/servicos/inspecoes",
  keywords: ["inspeção técnica", "perícia técnica", "inspeção por ultrassom", "análise de falha"],
  image: detail.heroImage,
  imageAlt: detail.heroImageAlt
});

export default function InspecoesPage() {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
            { name: "Inspeções técnicas", path: "/servicos/inspecoes" }
          ]),
          createServiceJsonLd({
            name: "Inspeções técnicas",
            description: "Frente técnica para inspeção técnica, perícia, auditorias e ensaios não destrutivos.",
            path: "/servicos/inspecoes",
            serviceType: "Inspeção técnica",
            keywords: ["inspeção técnica", "perícia técnica", "inspeção por ultrassom"],
            image: detail.heroImage
          })
        ]}
      />
      <PageIntro eyebrow="Serviço" title={detail.pageTitle} description={detail.pageDescription} />
      <ServiceDetailTemplate route="/servicos/inspecoes" relatedLinks={genericServiceRelatedLinks["/servicos/inspecoes"]} />
    </>
  );
}
