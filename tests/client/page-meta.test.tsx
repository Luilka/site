import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RootLayout from "@/routes/layout.tsx";
import site from "@/content/site.json";
import { buildPageMeta } from "@/shared/utils/page-meta.util.ts";
import type { PageMetaInput } from "@/shared/types";

const BASE: PageMetaInput = {
  language: "fr",
  path: "/about",
  title: "Un studio de design",
  description: "Une description.",
  siteName: "Luilka",
  siteUrl: "",
  indexable: false,
  home: false,
  sameAs: [],
};

function tag(meta: ReturnType<typeof buildPageMeta>, key: string): string | undefined {
  return meta.tags.find((item) => item.name === key || item.property === key)?.content;
}

function at(pathname: string): string {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname, search: "", hash: "", params: {} };
  return renderToStaticMarkup(<RootLayout>{null}</RootLayout>);
}

describe("page metadata", () => {
  it("puts the page title before the site name, and the site name first on the home page", () => {
    expect(buildPageMeta(BASE).title).toBe("Un studio de design | Luilka");
    expect(buildPageMeta({ ...BASE, path: "/", home: true }).title).toBe("Luilka | Un studio de design");
  });

  it("describes the page and its share preview in the page language", () => {
    const meta = buildPageMeta(BASE);
    expect(tag(meta, "description")).toBe("Une description.");
    expect(tag(meta, "og:title")).toBe("Un studio de design | Luilka");
    expect(tag(meta, "og:description")).toBe("Une description.");
    expect(tag(meta, "og:site_name")).toBe("Luilka");
    expect(tag(meta, "og:locale")).toBe("fr_FR");
    expect(tag(meta, "twitter:card")).toBe("summary_large_image");
    expect(tag(buildPageMeta({ ...BASE, language: "en" }), "og:locale")).toBe("en_US");
  });

  it("keeps the site out of search engines until it is declared indexable", () => {
    expect(tag(buildPageMeta(BASE), "robots")).toBe("noindex, nofollow");
    expect(tag(buildPageMeta({ ...BASE, indexable: true }), "robots")).toBe("index, follow");
  });

  it("writes no absolute address while the public address is empty", () => {
    const meta = buildPageMeta(BASE);
    expect(meta.links.filter((link) => link.rel === "canonical" || link.rel === "alternate")).toHaveLength(0);
    expect(tag(meta, "og:url")).toBeUndefined();
    expect(tag(meta, "og:image")).toBeUndefined();
    expect(meta.jsonLd).toBeNull();
  });

  it("writes the canonical address, both languages and the share image once the address is set", () => {
    const meta = buildPageMeta({ ...BASE, siteUrl: "https://luilka.example/" });
    const hrefs = Object.fromEntries(meta.links.map((link) => [link.hrefLang ?? link.rel, link.href]));
    expect(hrefs.canonical).toBe("https://luilka.example/fr/about");
    expect(hrefs.fr).toBe("https://luilka.example/fr/about");
    expect(hrefs.en).toBe("https://luilka.example/en/about");
    expect(hrefs["x-default"]).toBe("https://luilka.example/fr/about");
    expect(tag(meta, "og:url")).toBe("https://luilka.example/fr/about");
    expect(tag(meta, "og:image")).toBe("https://luilka.example/og-image.webp");
    expect(tag(meta, "twitter:image")).toBe("https://luilka.example/twitter-card.webp");
  });

  it("gives each network the image shape of its post: 1.91 to 1 for Facebook, LinkedIn and messengers, 2 to 1 for X", () => {
    const meta = buildPageMeta({ ...BASE, siteUrl: "https://luilka.example" });
    expect(tag(meta, "og:image")).toBe("https://luilka.example/og-image.webp");
    expect(tag(meta, "og:image:width")).toBe("1200");
    expect(tag(meta, "og:image:height")).toBe("630");
    expect(tag(meta, "og:image:type")).toBe("image/webp");
    expect(tag(meta, "twitter:card")).toBe("summary_large_image");
    expect(tag(meta, "twitter:image")).toBe("https://luilka.example/twitter-card.webp");
    expect(tag(meta, "twitter:image:alt")).toBe("Un studio de design | Luilka");
  });

  it("describes the organisation only on the home page, with its social profiles", () => {
    const home = buildPageMeta({ ...BASE, path: "/", home: true, siteUrl: "https://luilka.example", sameAs: ["https://www.linkedin.com/company/luilka-cg/"] });
    const data = JSON.parse(home.jsonLd ?? "{}");
    expect(data["@type"]).toBe("Organization");
    expect(data.name).toBe("Luilka");
    expect(data.sameAs).toEqual(["https://www.linkedin.com/company/luilka-cg/"]);
    expect(buildPageMeta({ ...BASE, siteUrl: "https://luilka.example" }).jsonLd).toBeNull();
  });
});

describe("document head", () => {
  it("localises the title of the home page in French and English", () => {
    expect(at("/fr")).toContain("<title>Luilka | Studio de design centré sur l&#x27;utilisateur</title>");
    expect(at("/en")).toContain("<title>Luilka | A user-centric design studio</title>");
  });

  it("varies the title and the description by page", () => {
    const about = at("/fr/about");
    expect(about).toContain("<title>Un studio de design centré sur l&#x27;utilisateur | Luilka</title>");
    expect(about).toContain('name="description"');
    expect(at("/fr/contact")).not.toContain("<title>Luilka | ");
  });

  it("uses the name of a case or a product as the title of its page", () => {
    expect(at("/fr/work/yano")).toContain("<title>Yano | Luilka</title>");
    expect(at("/fr/products/tala")).toContain("<title>Tala | Luilka</title>");
  });

  it("declares the icon, the theme colour, the robots rule and the share preview", () => {
    const head = at("/fr");
    expect(head).toContain('rel="icon"');
    expect(head).toContain('name="theme-color"');
    expect(head).toContain(site.indexable ? 'content="index, follow"' : 'content="noindex, nofollow"');
    expect(head).toContain('property="og:title"');
    expect(head).toContain('name="twitter:card"');
  });

  it("writes the canonical address, both languages and the share image from the public address", () => {
    const head = at("/fr/about");
    expect(head).toContain(`href="${site.url}/fr/about"`);
    expect(head).toContain(`hrefLang="en" href="${site.url}/en/about"`);
    expect(head).toContain(`content="${site.url}/og-image.webp"`);
    expect(head).toContain(`content="${site.url}/twitter-card.webp"`);
    expect(at("/fr")).toContain("application/ld+json");
  });
});
