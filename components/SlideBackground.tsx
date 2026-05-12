export function SlideBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="slide-shell">
      <div className="deck-page">{children}</div>
    </div>
  );
}
