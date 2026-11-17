// Gera as páginas do blog a partir dos arquivos em content/blog/*.md
// (editados pelo painel Pages CMS). Saída: blog.html e blog/<slug>.html
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const contentDir = path.join(root, "content/blog");
const outDir = path.join(root, "blog");
const SITE_URL = "https://www.fmeaengineering.com.br";

const postTpl = fs.readFileSync(path.join(root, "templates/blog-post.html"), "utf8");
const indexTpl = fs.readFileSync(path.join(root, "templates/blog-index.html"), "utf8");

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fill = (tpl, data) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in data ? data[k] : ""));

function toIso(date) {
  if (date instanceof Date) return date.toISOString().slice(0, 10);
  const s = String(date || "").trim();
  const br = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  return s.slice(0, 10);
}
const toBr = (iso) => iso.split("-").reverse().join("/");

function readingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min de leitura`;
}

const posts = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".md"))
  .map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data, content } = matter(fs.readFileSync(path.join(contentDir, file), "utf8"));
    if (!data.title) throw new Error(`Post sem título: ${file}`);
    const dateIso = toIso(data.date);
    return {
      slug,
      draft: data.draft === true,
      title: data.title,
      excerpt: data.excerpt || "",
      // encodeURI: nomes de foto enviados pelo painel podem ter espaços e parênteses
      cover: encodeURI(decodeURI(data.cover || "/assets/images/hero-energia.png")),
      coverAlt: data.coverAlt || data.title,
      tags: Array.isArray(data.tags) ? data.tags : [],
      metaTitle: data.metaTitle || `${data.title} | FMEA Engineering`,
      metaDescription: data.metaDescription || data.excerpt || "",
      ctaText: data.ctaText || "Precisa de apoio técnico? Fale com a nossa equipe.",
      dateIso,
      dateBr: toBr(dateIso),
      readingTime: readingTime(content),
      html: marked.parse(content)
    };
  })
  .filter((p) => !p.draft)
  .sort((a, b) => b.dateIso.localeCompare(a.dateIso));

fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) if (f.endsWith(".html")) fs.unlinkSync(path.join(outDir, f));

for (const p of posts) {
  const tagsHtml = p.tags.map((t) => `        <span class="tag tag-default">${esc(t)}</span>`).join("\n");
  const page = fill(postTpl, {
    title: esc(p.title),
    excerpt: esc(p.excerpt),
    cover: esc(p.cover),
    coverAbs: esc(p.cover.startsWith("http") ? p.cover : SITE_URL + p.cover),
    coverAlt: esc(p.coverAlt),
    metaTitle: esc(p.metaTitle),
    metaDescription: esc(p.metaDescription),
    ctaText: esc(p.ctaText),
    dateIso: p.dateIso,
    dateBr: p.dateBr,
    readingTime: p.readingTime,
    tagsHtml,
    content: p.html
  });
  fs.writeFileSync(path.join(outDir, `${p.slug}.html`), page);
}

const cards = posts
  .map(
    (p) => `      <article class="blog-card reveal">
        <a href="/blog/${p.slug}">
          <div class="blog-card-img">
            <img src="${esc(p.cover)}" alt="${esc(p.coverAlt)}" loading="lazy" />
          </div>
        </a>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <time datetime="${p.dateIso}">${p.dateBr}</time>
            <span>${p.readingTime}</span>
          </div>
          <h3><a href="/blog/${p.slug}">${esc(p.title)}</a></h3>
          <p>${esc(p.excerpt)}</p>
          <div class="blog-card-tags">
${p.tags.map((t) => `            <span class="tag tag-default">${esc(t)}</span>`).join("\n")}
          </div>
        </div>
      </article>`
  )
  .join("\n");

fs.writeFileSync(path.join(root, "blog.html"), fill(indexTpl, { cards }));
console.log(`Blog gerado: ${posts.length} post(s).`);
