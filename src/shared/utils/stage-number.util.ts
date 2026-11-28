/** The bracketed number of a process stage, counted from one: [01], [02]. */
export function stageNumber(index: number): string {
  return `[${String(index + 1).padStart(2, "0")}]`;
}
