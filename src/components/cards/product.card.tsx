import { ArrowUpRight } from "lucide-react";
import CardWatermark from "@/components/cards/card-watermark.card.tsx";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import AppLink from "@/shared/ui/link.ui.tsx";
import CardIcon from "@/components/cards/card-icon.card.tsx";
import IconTile from "@/shared/ui/icon-tile.ui.tsx";

type ProductTitleProps = {
  name: string;
};

function ProductTitle({ name }: ProductTitleProps) {
  return (
    <div>
      <h3>{name}</h3>
      <small className="px-1 mt-2">Luilka</small>
    </div>
  );
}

type ProductHeaderProps = {
  name: string;
};

function ProductHeader({ name }: ProductHeaderProps) {
  return (
    <div className="top">
      <IconTile><CardIcon name={name} size={24} /></IconTile>
      <ProductTitle name={name} />
    </div>
  );
}

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
