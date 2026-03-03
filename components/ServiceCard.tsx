import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ServiceCardItem } from "@/lib/services-data";

import { CardImage } from "./CardImage";
import { Tag } from "./Tag";

type ServiceCardProps = {
  service: ServiceCardItem;
  categoryLabel: string;
};

export function ServiceCard({ service, categoryLabel }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d23] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f7f5]"
    >
      <article className="h-full overflow-hidden rounded-3xl border border-[#013d23]/20 bg-white shadow-[0_12px_30px_-24px_rgba(1,61,35,0.95)] transition duration-300 group-hover:-translate-y-1.5 group-hover:border-[#013d23]/35 group-hover:shadow-[0_24px_42px_-28px_rgba(1,61,35,0.95)]">
        <CardImage
          src={service.image}
          alt={service.imageAlt}
          sizes="(max-width: 768px) 100vw, 33vw"
          objectPosition={service.imageObjectPosition}
          containerClassName="border-b border-[#013d23]/12"
          imageClassName="transition duration-500 group-hover:scale-[1.04]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#013d23]/72 via-[#013d23]/24 to-transparent" />
          <div className="absolute left-4 top-4">
            <Tag tone="accent">{categoryLabel}</Tag>
          </div>
          <div className="absolute bottom-4 right-4 rounded-xl border border-white/25 bg-white/15 p-2 backdrop-blur">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </CardImage>

        <div className="space-y-5 p-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#013d23]">{service.title}</h3>
            <p className="text-sm leading-relaxed text-[#013d23]/84">{service.description}</p>
          </div>

          <ul className="space-y-2.5">
            {service.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 text-sm text-[#013d23]/80">
                <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#d5d88e]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#013d23]">
            Ver detalhes
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </p>
        </div>
      </article>
    </Link>
  );
}
