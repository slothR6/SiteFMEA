type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-[#013d23]/10 bg-institutional-pattern py-14 md:py-16">
      <div className="container space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013d23]/65">{eyebrow}</p>
        <h1 className="max-w-4xl text-[2.1rem] font-semibold leading-tight text-[#013d23] md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#013d23]/75 md:text-base">{description}</p>
      </div>
    </section>
  );
}
