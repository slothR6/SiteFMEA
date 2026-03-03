import type { ReactNode } from "react";

import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type CardImageProps = {
  src: ImageProps["src"];
  alt: string;
  sizes: string;
  priority?: boolean;
  objectPosition?: string;
  containerClassName?: string;
  imageClassName?: string;
  children?: ReactNode;
};

export function CardImage({
  src,
  alt,
  sizes,
  priority,
  objectPosition,
  containerClassName,
  imageClassName,
  children
}: CardImageProps) {
  return (
    <div className={cn("relative h-[180px] overflow-hidden md:h-[220px]", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-center", objectPosition, imageClassName)}
      />
      {children}
    </div>
  );
}
