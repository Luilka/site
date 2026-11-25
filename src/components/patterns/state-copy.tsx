type StateCopyProps = {
  title: string;
  description: string;
};

export default function StateCopy({ title, description }: StateCopyProps) {
  return (
    <>
      <h1>{title}</h1>
      <p className="state-text">{description}</p>
    </>
  );
}
