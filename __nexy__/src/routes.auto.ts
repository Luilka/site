// @ts-nocheck
export type NexyRoute = {
  path: string;
  file: string;
  layout: string | null;
  layouts: string[];
  params: string[];
};

export const NEXY_ROUTES: NexyRoute[] = [
  { path: "/", file: "/src/routes/index.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: [] },
  { path: "/{lang}/about", file: "/src/routes/[lang]/about.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
  { path: "/{lang}/blog/{slug}", file: "/src/routes/[lang]/blog/[slug].tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang", "slug"] },
  { path: "/{lang}/blog", file: "/src/routes/[lang]/blog/index.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
  { path: "/{lang}/contact", file: "/src/routes/[lang]/contact.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
  { path: "/{lang}/dependencies", file: "/src/routes/[lang]/dependencies.py", layout: "/src/routes/layout.tsx", layouts: [], params: ["lang"] },
  { path: "/{lang}/job", file: "/src/routes/[lang]/job.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
  { path: "/{lang}/products/{slug}", file: "/src/routes/[lang]/products/[slug].tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang", "slug"] },
  { path: "/{lang}/products", file: "/src/routes/[lang]/products/index.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
  { path: "/{lang}/services/{slug}", file: "/src/routes/[lang]/services/[slug].tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang", "slug"] },
  { path: "/{lang}/services", file: "/src/routes/[lang]/services/index.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
  { path: "/{lang}/work/{slug}", file: "/src/routes/[lang]/work/[slug].tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang", "slug"] },
  { path: "/{lang}/works", file: "/src/routes/[lang]/works.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
  { path: "/{lang}", file: "/src/routes/[lang]/index.tsx", layout: "/src/routes/layout.tsx", layouts: ["/src/routes/layout.tsx"], params: ["lang"] },
];

export type Route = "/" | `/${string}/about` | `/${string}/blog/${string}` | `/${string}/blog` | `/${string}/contact` | `/${string}/dependencies` | `/${string}/job` | `/${string}/products/${string}` | `/${string}/products` | `/${string}/services/${string}` | `/${string}/services` | `/${string}/work/${string}` | `/${string}/works` | `/${string}`;
