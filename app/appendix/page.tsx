import type { Metadata } from "next";
import Link from "next/link";
import { getSpecialPageDetail } from "@/lib/data";
import ProgressBar from "@/components/ProgressBar";
import FigureCard from "@/app/chapters/[slug]/FigureCard";

export const metadata: Metadata = {
  title: "Appendix",
  description: "Methodology, sources and the development score across 156 countries.",
};

export default function AppendixPage() {
  const detail = getSpecialPageDetail("appendix");

  return (
    <>
      <ProgressBar />
      <div className="ch-headband part-8">
        <div className="inner">
          <div className="label">Appendix</div>
          <h1>Data and Methodology</h1>
          <div className="hook">
            The development score across 156 countries, the seven indicators, and every
            chapter with its sources.
          </div>
        </div>
      </div>

      <div className="ch-body">
        {detail?.secs && detail.secs.length > 0 ? (
          <div className="fig-col">
            {detail.secs.map((fig, i) => (
              <FigureCard key={fig.id || i} fig={fig} />
            ))}
          </div>
        ) : (
          <div className="ch-finding" style={{ marginTop: 40 }}>
            The appendix documents the development score used throughout the book — a composite of
            seven indicators measured with fixed goalposts and equal weights across 156 countries in
            2004 and today.
          </div>
        )}

        <div className="ch-prevnext">
          <Link href="/epilogue" className="ch-prev">
            <span className="pn-label">← Before</span>
            <div className="pn-title">Epilogue</div>
          </Link>
          <Link href="/" className="ch-next">
            <span className="pn-label">Home →</span>
            <div className="pn-title">Rich Country, Poor Citizens</div>
          </Link>
        </div>
      </div>
    </>
  );
}
