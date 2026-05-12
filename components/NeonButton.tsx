import Link from "next/link";

export function NeonButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link href={href} className={className ? `neon-button ${className}` : "neon-button"}>
      <span>{children}</span>
    </Link>
  );
}
