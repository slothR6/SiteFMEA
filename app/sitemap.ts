import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/seo";
import { keywordServicePages } from "@/lib/service-pages";

const staticRoutes = [
  "/",
  "/servicos",
  "/servicos/analise-de-falhas",
  "/servicos/inspecoes",
  "/servicos/desenvolvimento-de-projetos",
  "/cases",
  "/blog",
  "/contato",
  "/responsabilidade-tecnica",
  ...Object.keys(keywordServicePages)
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts();
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/blog/") ? 0.7 : 0.8
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticEntries, ...blogEntries];
}
