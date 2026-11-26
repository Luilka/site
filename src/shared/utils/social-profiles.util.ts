import type { SocialNetwork, SocialProfile } from "@/shared/types";

const ORDER: readonly SocialNetwork[] = ["linkedin", "tiktok", "youtube"];

/** Lists the social profiles that have an address, always in the same order. */
export function socialProfiles(addresses: Record<SocialNetwork, string>): readonly SocialProfile[] {
  return ORDER.filter((network) => addresses[network] !== "").map((network) => ({ network, href: addresses[network] }));
}
