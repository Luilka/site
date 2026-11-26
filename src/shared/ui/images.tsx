import { cn } from "@/shared/utils/cn.util.ts";
import type { ImageProps, PictureProps } from "@/shared/types";

/** An image with its size, so the page does not move, loaded late and decoded off the main thread. */
export function Image(props: ImageProps) {
  return <img loading="lazy" decoding="async" {...props} />;
}

/** A decorative picture from the content registry, as wide as its box and cropped to fill it. */
export function Picture({ image, className, ...props }: PictureProps) {
  return <Image className={cn("w-full object-cover", className)} src={image.src} width={image.width} height={image.height} alt="" {...props} />;
}
