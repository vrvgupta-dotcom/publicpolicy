"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Chapter } from "@/lib/types";
import { chapterSlug } from "@/lib/types";

interface SearchItem {
  type: "chapter";
  title: string;
  hook: string;
  finding: string;
  href: string;
  where: string;
}

interface Props {
  chapters: Chapter[];
}

function highlight(text: string, q: string): string {
  if (!q.trim()) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    "<mark>$1</mark>"
  );
}

export default function SearchClient({ chapters }: Props) {
  const [q, setQ] = useState("");

  const items: SearchItem[] = useMemo(
    () =>
      chapters.map((ch) => ({
        type: "chapter" as const,
        title: ch.t,
        hook: ch.h,
        finding: ch.f,
        href: `/chapters/${chapterSlug(ch)}`,
        where: `Chapter ${ch.n}`,
      })),
    [chapters]
  );

  const results = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return [];
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.hook.toLowerCase().includes(query) ||
        item.finding.toLowerCase().includes(query)
    );
  }, [q, items]);

  return (
    <div className="search-page">
      <div className="kick" style={{ marginBottom: 10 }}>Search</div>
      <h1 style={{ font: "800 clamp(36px,5vw,64px)/1 var(--display)", letterSpacing: "-0.03em", marginBottom: 28 }}>
        Search the book
      </h1>

      <div className="search-input-wrap">
        <input
          type="search"
          className="search-input"
          placeholder="Chapter titles, hooks, findings…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
          aria-label="Search"
        />
      </div>

      {q.trim() && results.length === 0 && (
        <p style={{ color: "var(--muted)", font: "400 16px/1.5 var(--body)" }}>
          No results for &ldquo;{q}&rdquo;.
        </p>
      )}

      <div className="search-results" role="list">
        {results.map((r, i) => {
          const snippet = r.finding.length > 170
            ? r.finding.slice(0, 170) + "…"
            : r.finding;
          return (
            <Link key={i} href={r.href} className="search-result" role="listitem">
              <div className="result-where">{r.where}</div>
              <div
                className="result-title"
                dangerouslySetInnerHTML={{ __html: highlight(r.title, q) }}
              />
              <div
                className="result-snippet"
                dangerouslySetInnerHTML={{ __html: highlight(snippet, q) }}
              />
            </Link>
          );
        })}
      </div>

      {!q.trim() && (
        <div style={{ color: "var(--muted)", font: "400 16px/1.5 var(--body)", marginTop: 32 }}>
          <p>Search across all 43 chapter titles, hooks, and opening findings.</p>
        </div>
      )}
    </div>
  );
}
