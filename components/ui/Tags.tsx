export function Tags({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
