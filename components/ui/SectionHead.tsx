/** Pixel eyebrow, h2 and optional intro. `id` goes on the h2, for the section's aria-labelledby. */
export function SectionHead({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
}) {
  return (
    <div className="sec-head">
      <p className="px">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="sec-intro">{intro}</p>}
    </div>
  );
}
