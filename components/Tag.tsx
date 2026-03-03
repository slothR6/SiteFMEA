import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TagTone = "default" | "accent" | "outline";

type TagProps = {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
};

const toneClasses: Record<TagTone, string> = {
  default: "bg-[#013d23]/10 text-[#013d23]",
  accent: "bg-[#d5d88e]/40 text-[#013d23]",
  outline: "border border-[#013d23]/18 bg-white text-[#013d23]/85"
};

export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
