/** Writes the name of a person in a label template, in place of {name}. */
export function profileLabel(template: string, name: string): string {
  return template.replace("{name}", name);
}
