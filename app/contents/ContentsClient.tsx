"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Chapter } from "@/lib/types";
import { PARTS, partDisplayOrder, chapterSlug } from "@/lib/types";
import { SPECIAL_PAGES } from "@/lib/types";

const PART_GOLD_COLOR: Record<number, string> = {
  6: "#a87500",
};

function partNumColor(partNum: number) {
  if (PART_GOLD_COLOR[partNum]) return PART_GOLD_COLOR[partNum];
  return undefined;
}

interface Props {
  chapters: Chapter[];
}

export default function ContentsClient({ chapters }: Props) {
  const [activePart, setActivePart] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("part");
    if (p) setActivePart(parseInt(p, 10));
  }, []);
  const displayOrder = partDisplayOrder();

  const filtered = activePart
    ? chapters.filter((c) => c.p === activePart)
    : chapters;

  return (
    <div className="contents-page">
      <div className="kick contents-eyebrow">Contents</div>
      <h1 className="contents-h1">
        {activePart ? PARTS[activePart]?.name : "Forty-three chapters"}
      </h1>
      {activePart && PARTS[activePart] && (
        <p style={{ font: "400 italic 18px/1.5 var(--body)", color: "var(--muted)", marginBottom: 24 }}>
          {PARTS[activePart].intro}
        </p>
      )}

      {/* Filter chips */}
      <div className="filter-chips" role="group" aria-label="Filter by part">
        <button
          className="chip"
          data-active={!activePart ? "true" : undefined}
          onClick={() => setActivePart(null)}
        >
          All
        </button>
        {displayOrder.map((partNum) => (
          <button
            key={partNum}
            className="chip"
            data-active={activePart === partNum ? "true" : undefined}
            onClick={() => setActivePart(activePart === partNum ? null : partNum)}
          >
            {PARTS[partNum]?.name}
          </button>
        ))}
        {SPECIAL_PAGES.map(({ key, label }) => (
          <Link key={key} href={`/${key}`} className="chip">
            {label}
          </Link>
        ))}
      </div>

      {/* Chapter list */}
      <div className="chapter-list" role="list">
        {filtered.map((ch) => {
          const part = PARTS[ch.p];
          const numColor = partNumColor(ch.p);
          return (
            <Link
              key={ch.n}
              href={`/chapters/${chapterSlug(ch)}`}
              className={`chapter-row ${part?.cssClass ?? ""}`}
              role="listitem"
            >
              <div
                className="ch-num"
                style={numColor ? { color: numColor } : undefined}
              >
                {ch.n}
              </div>
              <div className="ch-body">
                <div className="ch-title">{ch.t}</div>
                <div className="ch-hook">{ch.h}</div>
              </div>
              <div className="ch-part">{part?.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
