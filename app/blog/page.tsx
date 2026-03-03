import { JsonLd } from "@/components/JsonLd";
import { BlogCard } from "@/components/BlogCard";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllBlogPosts } from "@/lib/blog";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog de Análise de Falha | FMEA Engineering",
  description:
    "Artigos técnicos sobre análise de falha, inspeção técnica, perícia técnica e engenharia aplicada para ativos críticos.",
  path: "/blog",
  keywords: ["análise de falha", "inspeção técnica", "perícia técnica", "engenharia aplicada"],
  image: "/hero-energia.png",
  imageAlt: "Blog técnico da FMEA Engineering sobre análise de falha e inspeção técnica"
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" }
        ])}
      />

      <PageIntro
        eyebrow="Conteúdo técnico"
        title="Blog institucional"
        description="Análises e referências técnicas para lideranças industriais com foco em risco, confiabilidade e execução de engenharia."
      />

      <main className="bg-[#f4f7f5] py-14 md:py-16">
        <div className="container space-y-8">
          <SectionHeader
            eyebrow="Publicações"
            title="Artigos com leitura direta por tema"
            description="Cada card possui capa, tags e acesso ao conteúdo completo em rota própria por slug."
            titleClassName="text-2xl md:text-3xl"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
