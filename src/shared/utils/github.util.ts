import type { DetailImage } from "@/shared/types";

const AVATAR_SIZE = 480;

/** Gives the address of the GitHub profile of an account. */
export function githubProfile(handle: string): string {
  return `https://github.com/${encodeURIComponent(handle)}`;
}

/** Gives the GitHub avatar of an account as a square picture of 480 pixels. */
export function githubAvatar(handle: string): DetailImage {
  return { src: `${githubProfile(handle)}.png?size=${AVATAR_SIZE}`, width: AVATAR_SIZE, height: AVATAR_SIZE };
}
