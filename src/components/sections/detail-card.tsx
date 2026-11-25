type DetailCardProps = {
  title: string;
  body: string;
};

export default function DetailCard({ title, body }: DetailCardProps) {
  return (
    <div className="info-grid">
      <article className="card info-card">
        <h3>{title}</h3>
        <p>{body}</p>
      </article>
    </div>
  );
}
