import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { BlogPostMeta } from "@/lib/blog";

import { CardImage } from "./CardImage";
import { Tag } from "./Tag";

type BlogCardProps = {
  post: BlogPostMeta;
};

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d23] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f7f5]"
    >
      <article className="h-full overflow-hidden rounded-3xl border border-[#013d23]/18 bg-white shadow-[0_14px_34px_-26px_rgba(1,61,35,0.9)] transition duration-300 group-hover:-translate-y-1.5 group-hover:border-[#013d23]/34 group-hover:shadow-[0_24px_42px_-28px_rgba(1,61,35,0.95)]">
        <CardImage
          src={post.coverImage}
          alt={post.coverImageAlt}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          objectPosition={post.coverImageObjectPosition}
          containerClassName="border-b border-[#013d23]/12"
          imageClassName="transition duration-500 group-hover:scale-[1.04]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/72 via-[#013d23]/24 to-transparent transition group-hover:from-[#013d23]/80" />
        </CardImage>

        <div className="space-y-5 p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#013d23]/62">
              {formatPostDate(post.date)}
              {post.readingTime ? ` • ${post.readingTime}` : ""}
            </p>
            <h2 className="text-2xl font-semibold text-[#013d23]">{post.title}</h2>
          </div>

          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : null}

          <p className="text-sm leading-relaxed text-[#013d23]/82">{post.excerpt}</p>

          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#013d23]">
            Ler artigo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </p>
        </div>
      </article>
    </Link>
  );
}
