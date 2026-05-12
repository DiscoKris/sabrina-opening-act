"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

export function Header({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo-mark" onClick={() => setOpen(false)}>
          SABRINA&apos;S OPENING ACT
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`site-nav ${open ? "site-nav-open" : ""}`}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
