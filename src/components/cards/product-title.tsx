type ProductTitleProps = {
  name: string;
};

export default function ProductTitle({ name }: ProductTitleProps) {
  return (
    <div>
      <h3>{name}</h3>
      <small className="px-1 mt-2">Luilka</small>
    </div>
  );
}
