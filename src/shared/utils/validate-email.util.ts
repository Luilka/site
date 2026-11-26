const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tells whether the text looks like an email address. */
export function isValidEmail(value: string): boolean {
  return EMAIL.test(value.trim());
}
