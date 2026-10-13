import type { Metadata } from "next";
import Link from "next/link";
import { getSpecialPageDetail } from "@/lib/data";
import ProgressBar from "@/components/ProgressBar";
import FigureCard from "@/app/chapters/[slug]/FigureCard";

export const metadata: Metadata = {
  title: "A Note on Numbers",
  description: "How to read the charts and data in this book.",
};

export default function NotePage() {
  const detail = getSpecialPageDetail("note");

  return (
    <>
      <ProgressBar />
      <div className="ch-headband part-8">
        <div className="inner">
          <div className="label">A Note on Numbers</div>
          <h1>How to Read the Data</h1>
          <div className="hook">
            Every number in this book has a source. Here is how to read the charts and understand
            the data behind them.
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
            The charts in this book follow consistent conventions: India is always shown in saffron
            and drawn heavier. Peer countries are neutral grey. Every figure has a headline that
            states the finding, a subtitle naming the measure and years, and a source.
          </div>
        )}

        {detail?.take && (
          <div className="ch-takeaway">
            <div className="take-label">The takeaway</div>
            <div className="take-body">{detail.take}</div>
          </div>
        )}

        <div className="ch-prevnext">
          <Link href="/prologue" className="ch-prev">
            <span className="pn-label">← Before</span>
            <div className="pn-title">Prologue</div>
          </Link>
          <Link href="/contents" className="ch-next">
            <span className="pn-label">Next →</span>
            <div className="pn-title">Contents</div>
          </Link>
        </div>
      </div>
    </>
  );
}
