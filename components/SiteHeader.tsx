"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_PATH } from "@/lib/basePath";

const BOOK_NAV = [
  { href: "/book", label: "Book home" },
  { href: "/contents", label: "Contents" },
  { href: "/charts", label: "Charts" },
  { href: "/search", label: "Search" },
];

const FOUNDATION_NAV = [
  { href: "/book", label: "Publications" },
];

function isBookPath(pathname: string): boolean {
  return (
    pathname.startsWith("/book") ||
    pathname.startsWith("/chapters") ||
    pathname.startsWith("/contents") ||
    pathname.startsWith("/charts") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/prologue") ||
    pathname.startsWith("/epilogue") ||
    pathname.startsWith("/appendix") ||
    pathname.startsWith("/note")
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [dark, setDark] = useState<boolean | null>(null);
  const inBook = isBookPath(pathname);

  useEffect(() => {
    const saved = localStorage.getItem("rcpc.site.dark");
    if (saved !== null) {
      setDark(saved === "true");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (dark === null) return;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("rcpc.site.dark", String(dark));
  }, [dark]);

  const nav = inBook ? BOOK_NAV : FOUNDATION_NAV;

  return (
    <header className="site-header">
      <div className="inner">
        {inBook ? (
          <>
            <Link href="/" className="site-back-link">
              ← Public Policy Foundation
            </Link>
            <Link href="/book" className="site-brand">
              <div className="brand-mark">R</div>
              <span className="brand-name">Rich Country, Poor Citizens</span>
            </Link>
          </>
        ) : (
          <Link href="/" className="site-brand site-brand-ppf">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/assets/ppf-logo.png`}
              alt=""
              className="ppf-logo-img"
            />
            <span className="brand-name">Public Policy Foundation</span>
          </Link>
        )}
        <div className="spacer" />
        <nav className="site-nav" aria-label="Main navigation">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              data-active={
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "true"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          className="theme-toggle"
          aria-label="Toggle dark mode"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile tab bar — only inside the book */}
      {inBook && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {BOOK_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              data-active={
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "true"
                  : undefined
              }
            >
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
