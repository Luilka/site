type StepTextProps = {
  title: string;
  description: string;
};

export default function StepText({ title, description }: StepTextProps) {
  return (
    <div className="t p-8">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
