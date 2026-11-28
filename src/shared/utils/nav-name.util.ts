/** The page transition name of a header link: one name per link, made from its address. */
export function navName(href: string): string {
  return `nav-${href.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}`;
}
