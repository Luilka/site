import type { ImageProps } from "@/shared/types";

/** An image with its size, so the page does not move, loaded late and decoded off the main thread. */
export function Image(props: ImageProps) {
  return <img loading="lazy" decoding="async" {...props} />;
}
