import { JsonLd } from "@/components/JsonLd";
import { KeywordServiceTemplate } from "@/components/KeywordServiceTemplate";
import { getKeywordServicePage } from "@/lib/service-pages";
import { createBreadcrumbJsonLd, createFaqJsonLd, createMetadata, createServiceJsonLd } from "@/lib/seo";

const pageData = getKeywordServicePage("/analise-de-falha-industrial");

export const metadata = createMetadata({
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  path: pageData.path,
  keywords: pageData.keywords,
  image: pageData.heroImage,
  imageAlt: pageData.heroImageAlt
});

export default function AnaliseDeFalhaIndustrialPage() {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Análise de falha industrial", path: pageData.path }
          ]),
          createServiceJsonLd({
            name: pageData.schemaName,
            description: pageData.schemaDescription,
            path: pageData.path,
            serviceType: pageData.serviceType,
            keywords: pageData.keywords,
            image: pageData.heroImage
          }),
          createFaqJsonLd(pageData.faq)
        ]}
      />
      <KeywordServiceTemplate page={pageData} />
    </>
  );
}
