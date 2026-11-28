import { useContent } from "@/shared/i18n";
import { copyrightText } from "@/shared/utils/copyright-text.util.ts";

/** Gives the copyright line of the footer, with the current year. */
export function useCopyright(): string {
  const { footer } = useContent();
  return copyrightText(footer.copyright, new Date());
}
