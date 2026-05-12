"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/sizzle") {
    return null;
  }

  return (
    <footer className="site-footer">
      <nav className="site-footer-nav" aria-label="Footer navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="site-nav-link"
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
