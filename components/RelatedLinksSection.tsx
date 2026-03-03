import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import type { RelatedLink } from "@/lib/seo";
import { cn } from "@/lib/utils";

type RelatedLinksSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  links: RelatedLink[];
};

export function RelatedLinksSection({
  eyebrow = "Links relacionados",
  title,
  description,
  links
}: RelatedLinksSectionProps) {
  return (
    <section className="rounded-3xl border border-[#013d23]/16 bg-white p-6 md:p-8">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/60">{eyebrow}</p>
        <h2 className="text-2xl font-semibold text-[#013d23] md:text-3xl">{title}</h2>
        <p className="text-sm leading-relaxed text-[#013d23]/78 md:text-base">{description}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {links.map((link) => (
          <article key={link.href} className="rounded-2xl border border-[#013d23]/12 bg-[#f8faf9] p-5">
            <h3 className="text-lg font-semibold text-[#013d23]">{link.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#013d23]/80">{link.description}</p>
            <div className="mt-5">
              <Link
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-[#013d23]/16 bg-white text-[#013d23] hover:bg-[#013d23] hover:text-white"
                )}
              >
                Acessar serviço
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
