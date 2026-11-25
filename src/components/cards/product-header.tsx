import CardIcon from "@/components/cards/card-icon.tsx";
import ProductTitle from "@/components/cards/product-title.tsx";
import IconTile from "@/shared/ui/icon-tile.tsx";

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
