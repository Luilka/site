import socialData from "@/content/social.json";
import { useContent } from "@/shared/i18n";
import type { SocialLink } from "@/shared/types";
import { socialProfiles } from "@/shared/utils/social-profiles.util.ts";

/** Gives the social links of the studio, each named in the language of the page. */
export function useSocialLinks(): readonly SocialLink[] {
  const { footer } = useContent();
  return socialProfiles(socialData).map((profile) => ({ ...profile, label: footer.social[profile.network] }));
}
