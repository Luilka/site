import type { NavigationItem } from "@/shared/types";
import { pageKey } from "@/shared/utils/page-key.util.ts";

import { navigation } from "./dictionaries.i18n.ts";
import { useContent } from "./use-content.i18n.ts";

/** Gives the navigation items labelled in the language of the page. */
export function useNavigation(): readonly NavigationItem[] {
  const { pages } = useContent();
  return navigation.map((item) => ({ ...item, label: pages[pageKey(item.href)].eyebrow }));
}
