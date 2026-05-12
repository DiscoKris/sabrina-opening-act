type PageHeroProps = {
  title: string;
  subtitle?: string;
  accent?: "pink" | "red" | "blue";
  pageNumber?: string;
  pageLabel?: string;
};

export function PageHero({
  title,
  subtitle,
  accent = "pink",
  pageNumber,
  pageLabel,
}: PageHeroProps) {
  return (
    <section className={`page-hero accent-${accent}`}>
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      </div>
      {pageNumber ? (
        <div className="page-detail">
          <span>{pageLabel}</span>
          <strong>{pageNumber}</strong>
        </div>
      ) : null}
    </section>
  );
}
