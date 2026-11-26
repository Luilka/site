/** Writes a copyright template with the year of the given date in place of {year}. */
export function copyrightText(template: string, date: Date): string {
  return template.replace("{year}", String(date.getFullYear()));
}
