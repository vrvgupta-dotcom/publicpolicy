import type { Metadata } from "next";
import Link from "next/link";
import { getSpecialPageDetail } from "@/lib/data";
import { bookData } from "@/lib/data";
import ProgressBar from "@/components/ProgressBar";
import FigureCard from "@/app/chapters/[slug]/FigureCard";

export const metadata: Metadata = {
  title: "Prologue",
  description: "India's growth from 2004 to 2036 — the premise of the book.",
  openGraph: {
    images: [{ url: "/assets/og/home.jpg", width: 1200, height: 630 }],
  },
};

export default function ProloguePage() {
  const detail = getSpecialPageDetail("prologue");
  const thumbs = bookData.ex.prologue;

  return (
    <>
      <ProgressBar />
      <div className="ch-headband part-8">
        <div className="inner">
          <div className="label">Prologue</div>
          <h1>The Promise</h1>
          <div className="hook">
            What India set out to do in 2004, and what it achieved — and left unfinished — by 2025.
          </div>
        </div>
      </div>

      <div className="ch-body">
        {detail?.leap && detail.leap.length > 0 && (
          <div className="leap-grid">
            {detail.leap.map((lp, i) => (
              <div key={i} className="leap-card">
                <div className="leap-key">{lp.k}</div>
                <div className="leap-val">{lp.v}</div>
                {lp.n && <div className="leap-note">{lp.n}</div>}
              </div>
            ))}
          </div>
        )}

        {detail?.secs && detail.secs.length > 0 ? (
          <div className="fig-col">
            {detail.secs.map((fig, i) => (
              <FigureCard key={fig.id || i} fig={fig} />
            ))}
          </div>
        ) : (
          <div className="ch-finding" style={{ marginTop: 40 }}>
            The prologue charts India&rsquo;s journey from 2004 to the present — a country that
            became the fifth-largest economy while still ranking 143rd per person. Every success has
            a shadow, and every problem has a cost.
          </div>
        )}

        {detail?.take && (
          <div className="ch-takeaway">
            <div className="take-label">The takeaway</div>
            <div className="take-body">{detail.take}</div>
          </div>
        )}

        <div className="ch-prevnext">
          <Link href="/" className="ch-prev">
            <span className="pn-label">← Home</span>
            <div className="pn-title">Rich Country, Poor Citizens</div>
          </Link>
          <Link href="/chapters/01-an-economy-five-times-larger" className="ch-next">
            <span className="pn-label">Next →</span>
            <div className="pn-title">An Economy Five Times Larger</div>
            <div className="pn-hook">Twelfth in 2004, fifth today.</div>
          </Link>
        </div>
      </div>
    </>
  );
}
