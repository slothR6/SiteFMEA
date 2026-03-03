import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { TRLSection } from "@/components/TRLSection";
import { genericServiceRelatedLinks } from "@/lib/service-pages";
import { serviceDetails } from "@/lib/services-data";
import { createBreadcrumbJsonLd, createMetadata, createServiceJsonLd } from "@/lib/seo";

const detail = serviceDetails["/servicos/desenvolvimento-de-projetos"];

export const metadata = createMetadata({
  title: "Projetos Industriais e TRL | FMEA Engineering",
  description:
    "Desenvolvimento de projetos industriais com documentação técnica, TRL, testes e integração com inspeção técnica e análise de falha.",
  path: "/servicos/desenvolvimento-de-projetos",
  keywords: ["inspeção técnica", "análise de falha", "caracterização de materiais", "engenharia aplicada"],
  image: detail.heroImage,
  imageAlt: detail.heroImageAlt
});

export default function DesenvolvimentoProjetosPage() {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
            { name: "Desenvolvimento de projetos", path: "/servicos/desenvolvimento-de-projetos" }
          ]),
          createServiceJsonLd({
            name: "Desenvolvimento de projetos",
            description: "Frente técnica para projetos industriais, documentação, testes piloto e implementação.",
            path: "/servicos/desenvolvimento-de-projetos",
            serviceType: "Desenvolvimento de projetos",
            keywords: ["inspeção técnica", "análise de falha", "desenvolvimento de projetos"],
            image: detail.heroImage
          })
        ]}
      />

      <PageIntro eyebrow="Serviço" title={detail.pageTitle} description={detail.pageDescription} />

      <ServiceDetailTemplate
        route="/servicos/desenvolvimento-de-projetos"
        relatedLinks={genericServiceRelatedLinks["/servicos/desenvolvimento-de-projetos"]}
      >
        <TRLSection
          title="Etapas do desenvolvimento (TRL 1 a 9)"
          description="Atuamos em todo o ciclo de inovação (TRL 1 a 9), com metodologias específicas por nível de maturidade, integrando prototipagem, ensaios laboratoriais e validações industriais para assegurar viabilidade técnica e escala de mercado."
        />
      </ServiceDetailTemplate>
    </>
  );
}
