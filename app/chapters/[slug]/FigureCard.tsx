"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import type { FigSection } from "@/lib/types";
import { BASE_PATH } from "@/lib/basePath";

interface Props {
  fig: FigSection;
}

export default function FigureCard({ fig }: Props) {
  const [lb, setLb] = useState(false);
  const src = `${BASE_PATH}/assets/thumbs/${fig.th}`;

  return (
    <article className="fig-article" id={fig.id}>
      {fig.k && <div className="fig-kicker kick">{fig.k}</div>}
      <h2 className="fig-h2">{fig.t}</h2>
      {fig.s && <div className="fig-subtitle">{fig.s}</div>}

      <div
        className="fig-chart-card"
        role="button"
        tabIndex={0}
        aria-label={`Enlarge chart: ${fig.t}`}
        onClick={() => setLb(true)}
        onKeyDown={(e) => e.key === "Enter" && setLb(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={fig.t} loading="lazy" />
      </div>

      {fig.r && <p className="fig-reading">{fig.r}</p>}
      {fig.src && <div className="fig-source">Source: {fig.src}</div>}

      {lb && <Lightbox src={src} title={fig.t} onClose={() => setLb(false)} />}
    </article>
  );
}
