export function Chapter({
  id,
  numeral,
  title,
  note,
  children,
}: {
  id: string;
  numeral: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="chapter" id={id} aria-labelledby={`${id}-title`}>
      <div className="chapter-head">
        <span className="numeral" aria-hidden="true">
          {numeral}
        </span>
        <h2 id={`${id}-title`}>{title}</h2>
        {note && (
          <span className="note" aria-hidden="true">
            {note}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
