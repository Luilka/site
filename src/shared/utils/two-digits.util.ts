/** Writes a position counted from zero as two digits counted from one: 01, 02. */
export function twoDigits(index: number): string {
  return String(index + 1).padStart(2, "0");
}
