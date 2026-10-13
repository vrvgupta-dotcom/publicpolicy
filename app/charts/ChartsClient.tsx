"use client";

import { useState } from "react";
import Link from "next/link";
import type { Chapter } from "@/lib/types";
import { PARTS, partDisplayOrder, chapterSlug } from "@/lib/types";
import Lightbox from "@/components/Lightbox";
import { BASE_PATH } from "@/lib/basePath";

interface FigItem {
  thumb: string;
  title: string;
  chapterNum: number;
  partNum: number;
  partName: string;
  chSlug: string;
}

interface Props {
  figures: FigItem[];
}

export default function ChartsClient({ figures }: Props) {
  const [activePart, setActivePart] = useState<number | null>(null);
  const [lb, setLb] = useState<{ src: string; title: string } | null>(null);
  const displayOrder = partDisplayOrder();

  const filtered = activePart
    ? figures.filter((f) => f.partNum === activePart)
    : figures;

  return (
    <div className="gallery-page">
      <div className="kick" style={{ marginBottom: 10 }}>Every chart</div>
      <h1 style={{ font: "800 clamp(36px,5vw,64px)/1 var(--display)", letterSpacing: "-0.03em", marginBottom: 32 }}>
        Every chart, one grid
      </h1>
      <p style={{ font: "400 18px/1.5 var(--body)", color: "var(--muted)", marginBottom: 32 }}>
        {filtered.length} charts. Click any chart to enlarge it.
      </p>

      {/* Filters */}
      <div className="filter-chips" role="group" aria-label="Filter by part">
        <button
          className="chip"
          data-active={!activePart ? "true" : undefined}
          onClick={() => setActivePart(null)}
        >
          All {figures.length}
        </button>
        {displayOrder.map((partNum) => {
          const count = figures.filter((f) => f.partNum === partNum).length;
          return (
            <button
              key={partNum}
              className="chip"
              data-active={activePart === partNum ? "true" : undefined}
              onClick={() => setActivePart(activePart === partNum ? null : partNum)}
            >
              {PARTS[partNum]?.name} ({count})
            </button>
          );
        })}
      </div>

      <div className="chart-grid">
        {filtered.map((fig, i) => (
          <div
            key={i}
            className="chart-thumb"
            role="button"
            tabIndex={0}
            aria-label={`Enlarge: ${fig.title}`}
            onClick={() => setLb({ src: `${BASE_PATH}/assets/thumbs/${fig.thumb}`, title: fig.title })}
            onKeyDown={(e) => e.key === "Enter" && setLb({ src: `${BASE_PATH}/assets/thumbs/${fig.thumb}`, title: fig.title })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/assets/thumbs/${fig.thumb}`}
              alt={fig.title}
              loading="lazy"
            />
            <div className="chart-meta">
              <div className="chart-tag">Ch. {fig.chapterNum} · {fig.partName}</div>
              <div className="chart-title">{fig.title}</div>
            </div>
          </div>
        ))}
      </div>

      {lb && (
        <Lightbox src={lb.src} title={lb.title} onClose={() => setLb(null)} />
      )}
    </div>
  );
}
