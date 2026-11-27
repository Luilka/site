import { describe, expect, it } from "vitest";

import { findDetail, isKnownDetailSlug } from "@/content/detail-models.content.ts";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import { infoHref } from "@/shared/utils/info-href.util.ts";
import { copyrightText } from "@/shared/utils/copyright-text.util.ts";
import { newsletterState } from "@/shared/utils/newsletter-state.util.ts";
import { pageKey } from "@/shared/utils/page-key.util.ts";
import { socialProfiles } from "@/shared/utils/social-profiles.util.ts";
import { isValidEmail } from "@/shared/utils/validate-email.util.ts";

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

  it("writes the year of the date in the copyright template", () => {
    expect(copyrightText("Copyright {year} Luilka", new Date("2027-01-15"))).toBe("Copyright 2027 Luilka");
  });

  it("lists only the social profiles that have an address, in a fixed order", () => {
    const addresses = { youtube: "https://www.youtube.com/@a", tiktok: "", linkedin: "https://www.linkedin.com/company/a" };
    expect(socialProfiles(addresses)).toEqual([
      { network: "linkedin", href: "https://www.linkedin.com/company/a" },
      { network: "youtube", href: "https://www.youtube.com/@a" },
    ]);
    expect(socialProfiles({ linkedin: "", tiktok: "", youtube: "" })).toEqual([]);
  });

  it("turns a page address into the key of its dictionary entry", () => {
    expect(pageKey("/about")).toBe("about");
    expect(pageKey("/contact")).toBe("contact");
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
