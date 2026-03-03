import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { JsonLd } from "@/components/JsonLd";
import { RelatedLinksSection } from "@/components/RelatedLinksSection";
import { Tag } from "@/components/Tag";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import { getCommentsBySlug } from "@/lib/comments-store";
import { blogRelatedLinksBySlug } from "@/lib/service-pages";
import { createBlogPostingJsonLd, createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const BlogComments = dynamic(() => import("@/components/BlogComments").then((module) => module.BlogComments));

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Conteúdo não encontrado | FMEA Engineering",
      description: "O conteúdo solicitado não está disponível.",
      path: `/blog/${slug}`,
      noIndex: true
    });
  }

  return createMetadata({
    title: post.seoTitle ?? `${post.title} | FMEA Engineering`,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags ?? ["análise de falha", "inspeção técnica", "perícia técnica"],
    image: post.coverImage,
    imageAlt: post.coverImageAlt,
    type: "article",
    publishedTime: `${post.date}T00:00:00-03:00`,
    modifiedTime: `${post.date}T00:00:00-03:00`
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const initialComments = getCommentsBySlug(slug);
  const relatedLinks = blogRelatedLinksBySlug[slug] ?? [];

  return (
    <main className="bg-[#f4f7f5] py-14 md:py-16">
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` }
          ]),
          createBlogPostingJsonLd({
            title: post.title,
            description: post.seoDescription ?? post.excerpt,
            path: `/blog/${post.slug}`,
            image: post.coverImage,
            datePublished: post.date
          })
        ]}
      />

      <article className="container max-w-4xl space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#013d23] transition hover:text-[#013d23]/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d23] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f7f5]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o blog
        </Link>

        <header className="overflow-hidden rounded-3xl border border-[#013d23]/18 bg-white shadow-[0_20px_44px_-30px_rgba(1,61,35,0.9)]">
          <div className="relative h-64 overflow-hidden border-b border-[#013d23]/12 md:h-80">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className={cn("object-cover object-center", post.coverImageObjectPosition)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/74 via-[#013d23]/22 to-transparent" />
          </div>

          <div className="space-y-4 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#013d23]/68">
              {formatPostDate(post.date)}
              {post.readingTime ? ` • ${post.readingTime}` : ""}
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-[#013d23] md:text-4xl">{post.title}</h1>
            {post.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            ) : null}
            <p className="text-sm leading-relaxed text-[#013d23]/82 md:text-base">{post.excerpt}</p>
          </div>
        </header>

        <section className="rounded-3xl border border-[#013d23]/16 bg-white p-6 md:p-8">
          <div className="blog-content text-[#013d23]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </section>

        {relatedLinks.length ? (
          <RelatedLinksSection
            eyebrow="Serviços relacionados"
            title="Páginas técnicas recomendadas para aprofundar o tema"
            description="Esses links conectam o conteúdo editorial às páginas de serviço com maior aderência técnica ao assunto do artigo."
            links={relatedLinks}
          />
        ) : null}

        <BlogComments slug={slug} initialComments={initialComments} />
      </article>
    </main>
  );
}
