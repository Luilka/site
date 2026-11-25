import CardIcon from "@/components/cards/card-icon.card.tsx";

type CardWatermarkProps = {
  name: string;
};

export default function CardWatermark({ name }: CardWatermarkProps) {
  return (
    <div className="ph2">
      <CardIcon name={name} size={70} strokeWidth={1.5} />
    </div>
  );
}
