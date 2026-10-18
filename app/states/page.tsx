import type { Metadata } from "next";
import Link from "next/link";
import { STATES, SD, relText, ord, fmtPopM } from "@/lib/states";

export const metadata: Metadata = {
  title: "One Country, Many Economies · State profiles",
  description:
    "Profiles of India’s 28 states, Delhi and Jammu & Kashmir: income, twin countries, and ten basics from poverty and child health to clean cooking fuel.",
  openGraph: {
    title: "One Country, Many Economies",
    description: "Thirty state profiles: how far growth has reached people, state by state.",
    images: [{ url: "/assets/og/states/index.jpg", width: 1200, height: 630 }],
  },
};

const LABEL = new Set(["Bihar", "Uttar Pradesh", "Kerala", "Goa", "Sikkim", "Gujarat", "Delhi", "Tamil Nadu", "Mizoram", "Jharkhand", "Telangana", "Manipur", "Maharashtra"]);
const PHONE = new Set(["Bihar", "Goa", "Kerala", "Gujarat", "Jharkhand", "Delhi", "Manipur"]);

export default function StatesIndex() {
  const lo = Math.log(0.28), hi = Math.log(3.4);
  const x = (r: number) => ((Math.log(r) - lo) / (hi - lo)) * 100;
  const byIncome = STATES.slice().sort((a, b) => b.inc - a.inc);
  const gaps = STATES.map((s) => ({ s, g: s.incRank - s.scoreRank })).sort((a, b) => a.g - b.g);
  const under = gaps.slice(0, 3).map((g) => g.s.name), over = gaps.slice(-3).reverse().map((g) => g.s.name);

  return (
    <article className="mon st">
      <header className="mon-hero">
        <div className="mon-inner">
          <div className="kick">Public Policy Foundation · State profiles</div>
          <h1>One Country, Many Economies</h1>
          <p className="mon-lead">
            Bihar has as many people as Ethiopia and an income like Liberia’s; Goa earns like Belarus. Thirty profiles,
            one for each of the 28 states, Delhi and Jammu &amp; Kashmir, test the same question state by state: has
            growth reached people?
          </p>
          <div className="mon-meta"><span className="mon-badge">Profiles</span><span>Part of a forthcoming state edition</span></div>
        </div>
      </header>

      <div className="mon-inner">
        <section className="mon-sec">
          <div className="kick">Income and the basics</div>
          <h2>Richer states mostly live better, but not always</h2>
          <p className="mon-sub">Income per person relative to India (log scale) against the score on ten basics, 2019-21. Tap a dot to open its profile.</p>
          <div className="mon-chart st-scatter">
            <div className="st-plot">
              {[0.5, 1, 2].map((t) => (
                <span key={t} className="st-vline" style={{ left: `${x(t)}%` }}><em>{t === 1 ? "India average" : `${t}×`}</em></span>
              ))}
              {[25, 50, 75].map((t) => (
                <span key={t} className="st-hline" style={{ bottom: `${t}%` }}><em>{t}</em></span>
              ))}
              {STATES.map((s) => (
                <Link key={s.slug} href={`/states/${s.slug}`} className={`st-pt${PHONE.has(s.name) ? " m" : ""}${x(s.rel) > 86 ? " left" : ""}`} style={{ left: `${x(s.rel)}%`, bottom: `${s.score}%` }} title={`${s.name}: ${relText(s.rel)}; score ${s.score}`}>
                  <i />{LABEL.has(s.name) && <span>{s.name}</span>}
                </Link>
              ))}
            </div>
            <div className="st-axes"><span>Poorer</span><span>Income per person relative to India →</span><span>Richer</span></div>
          </div>
          <p className="mon-prose">
            Income explains much of the pattern, but not all of it. {over.join(", ")} do far better on the basics than their
            income rank would predict. {under.join(", ")} do far worse: their incomes rank well above their record on
            health, schooling, women’s work and household amenities.
          </p>
          <p className="mon-src">Score: average rank on the ten indicators, scaled 0 to 100. Sources on each profile.</p>
        </section>

        <section className="mon-sec">
          <div className="kick">The profiles</div>
          <h2>Thirty profiles, ordered by income per person</h2>
          <div className="st-grid">
            {byIncome.map((s) => (
              <Link key={s.slug} href={`/states/${s.slug}`} className="st-card">
                <span className="st-cr">{ord(s.incRank)} by income · {ord(s.scoreRank)} on basics</span>
                <b>{s.name}</b>
                <span className="st-ct">People like {s.pop_twin.name} · income like {s.inc_twin.name}</span>
                <span className="st-cm">{fmtPopM(s.pop)} · {relText(s.rel)}</span>
                <span className="st-bar"><i style={{ width: `${s.score}%` }} /></span>
              </Link>
            ))}
          </div>
          <p className="mon-note">Ladakh and the smaller union territories are not profiled. Figures are for 2023-24 (income) and 2019-21 (the ten basics), the latest years with comparable data for every state. India’s GDP per person in {SD.india_gdp_year} was ${SD.india_gdp_usd.toLocaleString("en-US")}.</p>
          <p className="mon-by">Published by the Public Policy Foundation.</p>
        </section>
      </div>
    </article>
  );
}
