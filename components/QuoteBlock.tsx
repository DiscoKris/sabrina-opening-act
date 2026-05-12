type QuoteBlockProps = {
  title?: string;
  quote: string;
  attribution?: string;
};

export function QuoteBlock({ title, quote, attribution }: QuoteBlockProps) {
  return (
    <article className="quote-block">
      {title ? <p className="quote-title">{title}</p> : null}
      <p className="quote-copy">{quote}</p>
      {attribution ? <p className="quote-attribution">{attribution}</p> : null}
    </article>
  );
}
