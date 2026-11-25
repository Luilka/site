import { describe, expect, it } from "vitest";

import { findDetail, isKnownDetailSlug } from "@/content/detail-models.ts";
import { detailHref } from "@/shared/lib/detail-href.ts";
import { infoHref } from "@/shared/lib/info-href.ts";
import { newsletterState } from "@/shared/lib/newsletter-state.ts";
import { isValidEmail } from "@/shared/lib/validate-email.ts";

const copy = { invalid: "Invalid", valid: "Valid" };

describe("shared lib", () => {
  it("accepts a plain email address", () => {
    expect(isValidEmail(" pixi@domaine.com ")).toBe(true);
  });

  it("refuses text without an at sign or a domain", () => {
    expect([isValidEmail("nope"), isValidEmail("a@b"), isValidEmail("")]).toEqual([false, false, false]);
  });

  it("reports the invalid message for a bad address", () => {
    expect(newsletterState("nope", copy)).toEqual({ message: "Invalid", valid: false });
  });

  it("reports the valid message for a good address", () => {
    expect(newsletterState("pixi@domaine.com", copy)).toEqual({ message: "Valid", valid: true });
  });

  it("builds the path of a detail page", () => {
    expect(detailHref("products", "tala")).toBe("/products/tala");
  });

  it("links an info card only when it has a slug and a kind", () => {
    expect(infoHref("blog", { slug: "a" })).toBe("/blog/a");
    expect(infoHref("blog", { title: "a" })).toBeUndefined();
    expect(infoHref(undefined, { slug: "a" })).toBeUndefined();
  });

  it("finds a known detail in each language", () => {
    expect(findDetail("fr", "products", "tala")?.backHref).toBe("/products");
    expect(findDetail("en", "work", "yano")?.backHref).toBe("/works");
  });

  it("returns nothing for an unknown detail", () => {
    expect(findDetail("fr", "blog", "inconnu")).toBeNull();
    expect(isKnownDetailSlug("blog", "inconnu")).toBe(false);
    expect(isKnownDetailSlug("blog", undefined)).toBe(false);
  });
});
