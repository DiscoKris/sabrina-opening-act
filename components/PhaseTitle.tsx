export function PhaseTitle({
  label,
  number,
  accent,
}: {
  label: string;
  number: string;
  accent: "pink" | "red" | "blue";
}) {
  return (
    <div className="phase-title">
      <span>{label}</span>
      <strong className={`phase-number accent-text-${accent}`}>{number}</strong>
    </div>
  );
}
