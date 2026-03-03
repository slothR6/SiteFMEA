import { JsonLd } from "@/components/JsonLd";
import { AvatarPhoto } from "@/components/AvatarPhoto";
import { PageIntro } from "@/components/PageIntro";
import { responsibleTechnical, technicalTeam } from "@/lib/data";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Responsável Técnica | FMEA Engineering",
  description:
    "Conheça a responsável técnica e a equipe multidisciplinar que sustenta inspeção técnica, perícia técnica e análise de falha na FMEA.",
  path: "/responsabilidade-tecnica",
  keywords: ["perícia técnica", "inspeção técnica", "análise de falha", "responsável técnica"],
  image: "/responsavel-tecnica.png",
  imageAlt: "Responsável técnica da FMEA Engineering"
});

export default function ResponsabilidadeTecnicaPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Responsabilidade técnica", path: "/responsabilidade-tecnica" }
        ])}
      />

      <PageIntro
        eyebrow="Responsabilidade Técnica"
        title="Autoridade técnica institucional para decisões de engenharia em alta complexidade"
        description="Equipe liderada por responsável técnica com governança de método, rastreabilidade de evidências e padrão de excelência para suportar operações críticas."
      />

      <main className="bg-[#f7f9f8] py-16">
        <div className="container space-y-14">
          <section className="rounded-2xl border border-[#013d23]/12 bg-white p-7 shadow-[0_24px_45px_-45px_rgba(1,61,35,0.95)] md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <AvatarPhoto
                src={responsibleTechnical.image}
                alt={`Retrato institucional de ${responsibleTechnical.fullName}`}
                sizes="(max-width: 1024px) 100vw, 42vw"
                objectPosition={responsibleTechnical.imageObjectPosition}
                priority
                containerClassName="h-[320px] w-full rounded-xl border border-[#013d23]/10 bg-[#f1f4f2] md:h-[420px]"
              />

              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#013d23]/60">Responsável técnica</p>
                <h2 className="text-3xl font-semibold leading-tight text-[#013d23] md:text-4xl">{responsibleTechnical.fullName}</h2>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#013d23]/72">{responsibleTechnical.title}</p>
                <p className="text-sm leading-relaxed text-[#013d23]/80 md:text-base">{responsibleTechnical.institutionalText}</p>

                <ul className="space-y-3 rounded-xl border border-[#013d23]/10 bg-[#f7f9f8] p-5">
                  {responsibleTechnical.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#013d23]/80">
                      <span className="mt-[7px] h-2 w-2 rounded-full bg-[#d5d88e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">Corpo técnico</p>
              <h3 className="text-3xl font-semibold text-[#013d23] md:text-4xl">Equipe multidisciplinar de engenharia aplicada</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {technicalTeam.map((member) => (
                <article
                  key={member.name}
                  className="group rounded-2xl border border-[#013d23]/12 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d5d88e] hover:shadow-[0_18px_40px_-32px_rgba(1,61,35,0.9)]"
                >
                  <div className="grid gap-5 md:grid-cols-[180px_1fr] md:items-start">
                    <AvatarPhoto
                      src={member.image}
                      alt={`Foto institucional de ${member.name}`}
                      sizes="(max-width: 768px) 100vw, 180px"
                      objectPosition={member.imageObjectPosition}
                      containerClassName="h-[220px] w-full rounded-xl border border-[#013d23]/10 bg-[#eef3f0]"
                    />

                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-[#013d23]">{member.name}</h4>
                      <p className="text-sm text-[#013d23]/75">
                        <span className="font-semibold text-[#013d23]">Formação:</span> {member.education}
                      </p>
                      <p className="text-sm text-[#013d23]/75">
                        <span className="font-semibold text-[#013d23]">Especialidade:</span> {member.specialty}
                      </p>
                      <p className="text-sm text-[#013d23]/75">
                        <span className="font-semibold text-[#013d23]">Certificações:</span>{" "}
                        {member.certifications.join(" | ")}
                      </p>
                      <p className="text-sm leading-relaxed text-[#013d23]/78">
                        <span className="font-semibold text-[#013d23]">Mini currículo:</span> {member.miniResume}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
