import CardIcon from "@/components/cards/card-icon.card.tsx";
import ProductTitle from "@/components/cards/product-title.card.tsx";
import IconTile from "@/shared/ui/icon-tile.ui.tsx";

type ProductHeaderProps = {
  name: string;
};

export default function ProductHeader({ name }: ProductHeaderProps) {
  return (
    <div className="top">
      <IconTile><CardIcon name={name} size={24} /></IconTile>
      <ProductTitle name={name} />
    </div>
  );
}
