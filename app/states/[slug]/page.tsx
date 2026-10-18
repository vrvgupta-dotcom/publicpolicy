import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATES, INDICATORS, SD, getState, fmtVal, fmtPopM, fmtINR, relText, ord, SOURCES, type IndKey, type StateRow } from "@/lib/states";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return STATES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getState(slug);
  if (!s) return {};
  const d = `Income per person ${relText(s.rel)}; ${ord(s.scoreRank)} of 30 on ten basics from poverty to clean cooking fuel.`;
  return {
    title: `${s.name} · One Country, Many Economies`,
    description: d,
    openGraph: { title: `${s.name}: a state profile`, description: d, images: [{ url: `/assets/og/states/${s.slug}.jpg`, width: 1200, height: 630 }] },
  };
}

const N = SD.n;

function Strip({ k, s }: { k: IndKey; s: StateRow }) {
  const vals = STATES.map((x) => x.ind[k][1]).filter((v): v is number => v !== null);
  const iv = SD.india.ind[k][1];
  const lo = Math.min(...vals, iv ?? Infinity), hi = Math.max(...vals, iv ?? -Infinity);
  const pos = (v: number) => ((v - lo) / (hi - lo || 1)) * 100;
  const dir = INDICATORS.find((i) => i.k === k)!.dir;
  const mine = s.ind[k][1];
  return (
    <div className="st-strip" role="img" aria-label={`${s.name}: ${fmtVal(k, mine)}; India ${fmtVal(k, iv)}; range ${fmtVal(k, lo)} to ${fmtVal(k, hi)}`}>
      <span className="st-end l">{dir === -1 ? "better" : "worse"}</span>
      <div className="st-line">
        {STATES.filter((x) => x.slug !== s.slug && x.ind[k][1] !== null).map((x) => (
          <i key={x.slug} className="st-dot" style={{ left: `${pos(x.ind[k][1] as number)}%` }} title={`${x.name}: ${fmtVal(k, x.ind[k][1])}`} />
        ))}
        {iv !== null && <i className="st-india" style={{ left: `${pos(iv)}%` }} title={`India: ${fmtVal(k, iv)}`} />}
        {mine !== null && <b className="st-me" style={{ left: `${pos(mine)}%` }}><em>{fmtVal(k, mine)}</em></b>}
      </div>
      <span className="st-end r">{dir === -1 ? "worse" : "better"}</span>
    </div>
  );
}

function change(k: IndKey, s: StateRow, dir: number) {
  const [a, b] = s.ind[k];
  if (a === null || b === null) return { t: "–", c: "na" };
  const d = b - a;
  const good = d * dir > 0;
  const small = Math.abs(d) < (k === "imr" ? 2 : 1.5);
  if (small) return { t: "≈ little change", c: "flat" };
  return { t: `${good ? "▲" : "▼"} ${d > 0 ? "+" : "−"}${Math.abs(d).toFixed(k === "imr" ? 0 : 1)}${k === "imr" ? "" : " pts"}`, c: good ? "up" : "dn" };
}

export default async function StatePage({ params }: Props) {
  const { slug } = await params;
  const s = getState(slug);
  if (!s) notFound();

  const sorted = INDICATORS.slice().sort((a, b) => s.rank[a.k] - s.rank[b.k]);
  const best2 = sorted.slice(0, 2), worst2 = sorted.slice(-2).reverse();
  const relMove = s.rel - s.rel11;
  const moveText = relMove > 0.05 ? "pulled further ahead of the national average" : relMove < -0.05 ? "fell back against the national average" : "held its place against the national average";
  const moveText2 = s.rel < 1 ? (relMove > 0.05 ? "closed some of the gap with the national average" : relMove < -0.05 ? "fell further behind the national average" : "stayed about as far behind the national average") : moveText;
  const gap = s.incRank - s.scoreRank;
  const verdict =
    gap >= 6 ? `Its people live better than its income would predict: ${ord(s.incRank)} of 30 on income, ${ord(s.scoreRank)} on the ten basics.`
    : gap <= -6 ? `Its people live worse than its income would predict: ${ord(s.incRank)} of 30 on income, but ${ord(s.scoreRank)} on the ten basics.`
    : `Its basics roughly match its income: ${ord(s.incRank)} of 30 on income, ${ord(s.scoreRank)} on the ten basics.`;
  const idx = STATES.slice().sort((a, b) => a.name.localeCompare(b.name));
  const i = idx.findIndex((x) => x.slug === s.slug);
  const prev = idx[(i - 1 + idx.length) % idx.length], next = idx[(i + 1) % idx.length];

  return (
    <article className="mon st">
      <header className="mon-hero">
        <div className="mon-inner">
          <div className="kick"><Link href="/states">One Country, Many Economies</Link> · {s.type === "UT" ? "Union territory" : "State"} profile</div>
          <h1>{s.name}</h1>
          <p className="mon-lead">{verdict}</p>
          <div className="st-twins">
            <div><span>As many people as</span><b>{s.pop_twin.name}</b><small>{fmtPopM(s.pop)} people, {ord(s.popRank)} of 30</small></div>
            <div><span>Income per person like</span><b>{s.inc_twin.name}</b><small>about ${s.usd_equiv.toLocaleString("en-US")} a year in GDP terms</small></div>
          </div>
        </div>
      </header>

      <div className="mon-inner">
        <section className="mon-tiles" aria-label="Headline numbers">
          <div className="mon-tile"><b>{fmtINR(s.inc)}</b><span>income per person, 2023-24: {relText(s.rel)}, {ord(s.incRank)} of 30</span></div>
          <div className="mon-tile"><b className={s.scoreRank <= 10 ? "ok" : s.scoreRank > 20 ? "bad" : ""}>{ord(s.scoreRank)}</b><span>of 30 on the ten basics below (score {s.score} of 100; {ord(s.scoreRank4)} in 2015-16)</span></div>
          <div className="mon-tile"><b>{fmtVal("mpi", s.ind.mpi[1])}</b><span>of people multidimensionally poor in 2019-21, down from {fmtVal("mpi", s.ind.mpi[0])} in 2015-16</span></div>
        </section>

        <section className="mon-sec">
          <div className="kick">Income since 2011</div>
          <h2>Since 2011-12, {s.name} has {moveText2}</h2>
          <p className="mon-sub">Income per person relative to the all-India average (1.0 = India).</p>
          <div className="mon-chart st-rel">
            {[["2011-12", s.rel11, s.incRank11], ["2023-24", s.rel, s.incRank]].map(([y, r, rk]) => (
              <div className="mon-crow" key={y as string}>
                <span className="cl">{y as string} <small>· {ord(rk as number)} of 30</small></span>
                <div className="mb-track">
                  <i className="mb-tick" style={{ left: `${(1 / 3.2) * 100}%` }} />
                  <div className="mb-bar" style={{ width: `${Math.min(r as number, 3.2) / 3.2 * 100}%`, background: "var(--india)" }} />
                  <b className="mb-val" style={{ left: `min(${Math.min(r as number, 3.2) / 3.2 * 100}%, calc(100% - 4em))` }}>{(r as number).toFixed(2)}×</b>
                </div>
              </div>
            ))}
          </div>
          <p className="mon-src">The dashed line marks the national average. Source: RBI, per capita net state domestic product at current prices.</p>
        </section>

        <section className="mon-sec">
          <div className="kick">The ten basics</div>
          <h2>{s.rank[best2[0].k] <= 5 ? "Among the best" : "Strongest"} on {best2[0].label.toLowerCase()} ({ord(s.rank[best2[0].k])}); weakest on {worst2[0].label.toLowerCase()} ({ord(s.rank[worst2[0].k])})</h2>
          <p className="mon-sub">Where {s.name} sits among the 28 states, Delhi and Jammu &amp; Kashmir, 2019-21. Grey dots are the other 29; the outlined mark is India.</p>
          <div className="mon-chart st-strips">
            {sorted.map((d) => (
              <div className="st-srow" key={d.k}>
                <div className="st-shead"><b>{d.label}</b><span>{ord(s.rank[d.k])} of {N}</span></div>
                <Strip k={d.k} s={s} />
              </div>
            ))}
          </div>
          <p className="mon-src">Ranks run from 1 (best) to 30. Sources listed below.</p>
        </section>

        <section className="mon-sec" id="scorecard">
          <div className="kick">Scorecard</div>
          <h2>What changed between the last two family health surveys</h2>
          <p className="mon-sub">2015-16 (NFHS-4) and 2019-21 (NFHS-5), with India and the best performer for comparison.</p>
          <div className="mon-group">
            <div className="mon-row st-row mon-row-h" aria-hidden="true"><span>Indicator</span><span>2015-16</span><span>2019-21</span><span>Change</span><span>India · best</span></div>
            {INDICATORS.map((d) => {
              const c = change(d.k, s, d.dir);
              const b = SD.best[d.k];
              return (
                <div className="mon-row st-row" key={d.k}>
                  <span className="lab">{d.label}<small>{d.unit}</small></span>
                  <span className="mid" data-l="2015-16">{fmtVal(d.k, s.ind[d.k][0])}</span>
                  <span className="now" data-l="2019-21">{fmtVal(d.k, s.ind[d.k][1])} <small>{ord(s.rank[d.k])}</small></span>
                  <span className={`dir ${c.c === "up" ? "better" : c.c === "dn" ? "worse" : c.c}`} data-l="Change">{c.t}</span>
                  <span className="st-cmp" data-l="India · best">{fmtVal(d.k, SD.india.ind[d.k][1])} · {fmtVal(d.k, b.v)} <small>{b.name}</small></span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mon-sec">
          <div className="kick">Strongest and weakest</div>
          <div className="st-bw">
            <div className="st-bwcard ok">
              <h3>Strongest</h3>
              {best2.map((d) => <p key={d.k}><b>{d.label}</b>: {fmtVal(d.k, s.ind[d.k][1])}, {ord(s.rank[d.k])} of {N}</p>)}
            </div>
            <div className="st-bwcard bad">
              <h3>Weakest</h3>
              {worst2.map((d) => <p key={d.k}><b>{d.label}</b>: {fmtVal(d.k, s.ind[d.k][1])}, {ord(s.rank[d.k])} of {N}. Best: {SD.best[d.k].name}, {fmtVal(d.k, SD.best[d.k].v)}</p>)}
            </div>
          </div>
        </section>

        <section className="mon-sec mon-sources">
          <div className="kick">Sources and method</div>
          <ol>{SOURCES.map((t) => <li key={t}>{t}</li>)}</ol>
          <p className="mon-note">The score averages {s.name}’s rank on the ten indicators, scaled so that ranking first on all ten gives 100 and last on all ten gives 0. Family health survey estimates for small states carry wide margins of error, so small differences in rank should not be over-read.</p>
          <p className="mon-by">Published by the Public Policy Foundation.</p>
        </section>

        <nav className="mon-next" aria-label="Other profiles">
          <Link href={`/states/${prev.slug}`} className="mon-nextcard"><span>← Previous profile</span><b>{prev.name}</b></Link>
          <Link href="/states" className="mon-nextcard alt"><span>All profiles</span><b>One Country, Many Economies</b></Link>
          <Link href={`/states/${next.slug}`} className="mon-nextcard"><span>Next profile →</span><b>{next.name}</b></Link>
        </nav>
      </div>
    </article>
  );
}
