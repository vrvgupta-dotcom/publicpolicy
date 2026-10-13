import type { Metadata } from "next";
import Link from "next/link";
import { getSpecialPageDetail } from "@/lib/data";
import ProgressBar from "@/components/ProgressBar";
import FigureCard from "@/app/chapters/[slug]/FigureCard";

export const metadata: Metadata = {
  title: "Epilogue",
  description: "What 2036 could look like for India.",
};

export default function EpiloguePage() {
  const detail = getSpecialPageDetail("epilogue");

  return (
    <>
      <ProgressBar />
      <div className="ch-headband part-8">
        <div className="inner">
          <div className="label">Epilogue</div>
          <h1>What 2036 Could Look Like</h1>
          <div className="hook">
            Sixteen numbers that voters can check — and what they will tell us about whether India
            turned its growth into development.
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
            By 2036, if India stays on its current trajectory, it will be the third-largest economy
            in the world. The question is whether its citizens will feel it. The sixteen numbers in
            this epilogue are the ones voters can check.
          </div>
        )}

        {detail?.take && (
          <div className="ch-takeaway">
            <div className="take-label">The takeaway</div>
            <div className="take-body">{detail.take}</div>
          </div>
        )}

        <div className="ch-prevnext">
          <Link href="/chapters/43-measure-what-citizens-feel" className="ch-prev">
            <span className="pn-label">← Before</span>
            <div className="pn-title">Measure What Citizens Feel</div>
          </Link>
          <Link href="/appendix" className="ch-next">
            <span className="pn-label">Next →</span>
            <div className="pn-title">Appendix</div>
          </Link>
        </div>
      </div>
    </>
  );
}
