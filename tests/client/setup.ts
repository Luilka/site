import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = {
    pathname: "/fr",
    search: "",
    hash: "",
    params: {},
  };
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

export function setReducedMotion(matches: boolean): void {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? matches : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}
