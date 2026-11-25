import { ArrowUpRight } from "lucide-react";

import CardWatermark from "@/components/cards/card-watermark.tsx";
import ProductHeader from "@/components/cards/product-header.tsx";
import { detailHref } from "@/shared/lib/detail-href.ts";
import AppLink from "@/shared/ui/link.tsx";

type ProductCardProps = {
  slug: string;
  name: string;
  description: string;
};

export default function ProductCard({ slug, name, description }: ProductCardProps) {
  return (
    <AppLink className="card prod" href={detailHref("products", slug)}>
      <ArrowUpRight className="arrow absolute right-3" size={24} strokeWidth={1.5} aria-hidden="true" />
      <ProductHeader name={name} />
      <p>{description}</p>
      <CardWatermark name={name} />
    </AppLink>
  );
}
