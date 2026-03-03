import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type AvatarPhotoProps = {
  src: ImageProps["src"];
  alt: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  containerClassName?: string;
  imageClassName?: string;
};

export function AvatarPhoto({
  src,
  alt,
  sizes = "96px",
  priority,
  objectPosition,
  containerClassName,
  imageClassName
}: AvatarPhotoProps) {
  return (
    <div className={cn("relative h-24 w-24 overflow-hidden", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-center", objectPosition, imageClassName)}
      />
    </div>
  );
}
