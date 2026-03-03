import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { TechnicalContactForm } from "@/components/TechnicalContactForm";
import { contactInfo } from "@/lib/data";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contato Técnico | FMEA Engineering",
  description:
    "Fale com a FMEA para análise de falha, inspeção técnica, perícia técnica e avaliação inicial do seu desafio industrial.",
  path: "/contato",
  keywords: ["inspeção técnica", "análise de falha", "perícia técnica", "contato técnico"],
  image: "/images/field-engineer-report.jpg",
  imageAlt: "Contato técnico com a FMEA Engineering"
});

export default function ContatoPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" }
        ])}
      />

      <PageIntro
        eyebrow="Contato institucional"
        title="Converse com nossa equipe técnica"
        description="Compartilhe seu desafio com dados iniciais do ativo ou operação. Retornamos com orientação de escopo e próximo passo."
      />

      <main className="py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <aside className="space-y-5 rounded-2xl border border-[#013d23]/10 bg-[#f9fbf9] p-7">
            <h2 className="text-2xl font-semibold text-[#013d23]">Informações institucionais</h2>
            <div className="space-y-4 text-sm text-[#013d23]/75">
              <p>
                <span className="font-semibold text-[#013d23]">Email:</span> {contactInfo.email}
              </p>
              <p>
                <span className="font-semibold text-[#013d23]">Telefone:</span> {contactInfo.phone}
              </p>
              <p>
                <span className="font-semibold text-[#013d23]">WhatsApp:</span> {contactInfo.whatsapp}
              </p>
              <p>
                <span className="font-semibold text-[#013d23]">Escritório:</span> {contactInfo.office}
              </p>
              <p>
                <span className="font-semibold text-[#013d23]">Cobertura:</span> {contactInfo.coverage}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[#013d23]/75">
              Para demandas de alta criticidade, inclua contexto técnico, urgência e objetivo esperado da análise.
            </p>
          </aside>

          <TechnicalContactForm submitLabel="Enviar solicitação técnica" />
        </div>
      </main>
    </>
  );
}
