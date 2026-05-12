"use client";

import Link from "next/link";

type NextSlideButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  fixed?: boolean;
  className?: string;
};

export function NextSlideButton({
  children,
  href,
  onClick,
  fixed = true,
  className,
}: NextSlideButtonProps) {
  const classes = [
    "next-slide-button",
    fixed ? "next-slide-button-fixed" : "next-slide-button-inline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      <span className="next-slide-button-arrow" aria-hidden="true">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
