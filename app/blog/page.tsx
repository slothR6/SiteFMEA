import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <main className="py-20">
      <div className="container space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">Blog FMEA Engineering</h1>
          <p className="text-slate-600">Conteúdos técnicos para líderes de engenharia e operação.</p>
        </div>
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <article key={post.title} className="rounded-xl border border-slate-200 p-6 transition hover:shadow-md">
              <p className="text-sm text-[#0E7C66]">{post.date}</p>
              <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-slate-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
