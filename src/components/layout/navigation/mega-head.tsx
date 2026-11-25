type MegaHeadProps = {
  eyebrow: string;
  title: string;
};

export default function MegaHead({ eyebrow, title }: MegaHeadProps) {
  return (
    <div className="mega-head">
      <span className="mega-eyebrow">{eyebrow}</span>
      <h2 className="mega-title">{title}</h2>
    </div>
  );
}
