import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({ eyebrow, title, description, className, titleClassName }: SectionHeaderProps) {
  return (
    <header className={cn("space-y-3", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/70">{eyebrow}</p>
      <h2 className={cn("max-w-4xl text-3xl font-semibold text-[#013d23] md:text-4xl", titleClassName)}>{title}</h2>
      {description ? <p className="max-w-3xl text-sm leading-relaxed text-[#013d23]/82 md:text-base">{description}</p> : null}
    </header>
  );
}
