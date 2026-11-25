type HeadingTextProps = {
  title: string;
  description?: string;
};

export default function HeadingText({ title, description }: HeadingTextProps) {
  return (
    <div>
      <h2 className="sec">{title}</h2>
      {description ? <p className="sec-p">{description}</p> : null}
    </div>
  );
}
