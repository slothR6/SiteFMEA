import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

type BlogFrontmatter = {
  title: string;
  slug?: string;
  date: string;
  coverImage?: string;
  coverImageAlt?: string;
  coverImageObjectPosition?: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: string;
  tags?: string[];
};

export type BlogPostMeta = {
  title: string;
  slug: string;
  date: string;
  coverImage: string;
  coverImageAlt: string;
  coverImageObjectPosition?: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: string;
  tags?: string[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function normalizeDate(date: string) {
  const normalized = new Date(`${date}T00:00:00`);
  return Number.isNaN(normalized.getTime()) ? "1970-01-01" : date;
}

function mapFileToBlogPost(fileName: string, fileContent: string): BlogPost {
  const { data, content } = matter(fileContent);
  const frontmatter = data as BlogFrontmatter;

  const slug = frontmatter.slug ?? fileName.replace(path.extname(fileName), "");

  return {
    title: frontmatter.title,
    slug,
    date: normalizeDate(frontmatter.date),
    coverImage: frontmatter.coverImage ?? "/hero-energia.png",
    coverImageAlt: frontmatter.coverImageAlt ?? `Imagem de capa do post ${frontmatter.title}`,
    coverImageObjectPosition: frontmatter.coverImageObjectPosition,
    excerpt: frontmatter.excerpt,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
    readingTime: frontmatter.readingTime,
    tags: frontmatter.tags,
    content: content.trim()
  };
}

async function readAllPostFiles() {
  const files = await fs.readdir(BLOG_CONTENT_DIR);
  const markdownFiles = files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const posts = await Promise.all(
    markdownFiles.map(async (file) => {
      const fullPath = path.join(BLOG_CONTENT_DIR, file);
      const raw = await fs.readFile(fullPath, "utf8");
      return mapFileToBlogPost(file, raw);
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const posts = await readAllPostFiles();
  return posts.map(({ content, ...meta }) => meta);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await readAllPostFiles();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await readAllPostFiles();
  return posts.map((post) => post.slug);
}
