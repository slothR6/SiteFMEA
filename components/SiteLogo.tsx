import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function SiteLogo({ className, tone = "dark" }: SiteLogoProps) {
  return (
    <Link href="/" aria-label="FMEA Engineering" className={cn("inline-flex items-center gap-3", className)}>
      <span className="overflow-hidden">
        <Image
          src="/logomenor.png"
          alt="FMEA Engineering"
          width={160}
          height={40}
          sizes="160px"
          className="h-10 w-[160px] object-cover object-center"
        />
      </span>
    </Link>
  );
}
