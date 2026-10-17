import type { Metadata } from "next";
import Link from "next/link";
import issue from "@/data/monitor-issue-0.json";
import { getChapterByNumber } from "@/lib/data";
import { chapterSlug } from "@/lib/types";

const chHref = (n: number) => { const c = getChapterByNumber(n); return c ? `/chapters/${chapterSlug(c)}` : "/contents"; };

export const metadata: Metadata = {
  title: "The 2036 Monitor · Issue 0",
  description:
    "Sixteen numbers that show whether India’s growth is reaching its citizens. Issue 0 sets the baseline for 2036.",
  openGraph: {
    title: "The 2036 Monitor · Issue 0",
    description:
      "Sixteen numbers that show whether India’s growth is reaching its citizens: where each stands, the 2031 halfway mark and the 2036 target.",
    images: [{ url: "/assets/og/monitor-0.jpg", width: 1200, height: 630 }],
  },
};

type Row = {
  group: string; ch: number; label: string; unit: string; v2004: number | null; now: number; year: number;
  target: number; mid: number; anchor: string; dir: number; src: string; age: number;
  done?: number; need?: number; wrong?: boolean; ratio?: number | null; since2004?: string; share_gone?: number;
};
const rows = issue.rows as Row[];

function fmt(u: string, v: number): string {
  switch (u) {
    case "usd": return "$" + Math.round(v).toLocaleString("en-US");
    case "rank": return (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(Math.round(v));
    case "pct1": return v.toFixed(1) + "%";
    case "pct": return Math.round(v) + "%";
    case "num": return Math.round(v).toLocaleString("en-IN");
    case "int": return String(Math.round(v));
    case "flag": return v >= 1 ? "Every time" : v > 0 ? "Most" : "Late";
    default: return String(v);
  }
}

const GROUPS = Array.from(new Set(rows.map((r) => r.group)));
const withBase = rows.filter((r) => r.v2004 !== null);
const flat = withBase.filter((r) => r.since2004 === "better" && (r.share_gone ?? 0) < 0.1);
const better = withBase.filter((r) => r.since2004 === "better" && (r.share_gone ?? 0) >= 0.1);
const worse = withBase.filter((r) => r.since2004 === "worse");

/* ---------- small chart pieces (static SVG, sharp at any size) ---------- */

function PaceBar({ r }: { r: Row }) {
  if (r.wrong) return <div className="mb-track"><div className="mb-wrong">Moving the wrong way: must reverse</div></div>;
  const v = r.ratio ?? 0;
  const pct = (Math.min(v, 4) / 4) * 100;
  const col = v <= 1 ? "var(--teal)" : v <= 2 ? "var(--gold)" : "var(--india)";
  return (
    <div className="mb-track" role="img" aria-label={`${r.label}: needs ${v.toFixed(1)} times the pace achieved since 2004`}>
      <i className="mb-tick" style={{ left: "25%" }} />
      <div className="mb-bar" style={{ width: `${pct}%`, background: col }} />
      <b className="mb-val" style={{ left: `min(${pct}%, calc(100% - 4em))` }}>{v > 4 ? "▶ " : ""}{v.toFixed(1)}×</b>
    </div>
  );
}

function Travelled({ r }: { r: Row }) {
  const s = r.share_gone ?? 0;
  const c = Math.max(-1, Math.min(1, s));
  const neg = c < 0;
  const lab = s < -1 ? "moved far away" : Math.round(s * 100) + "%";
  return (
    <div className="mb-track mb-mid" role="img" aria-label={`${r.label}: ${lab} of the distance from 2004 to the 2036 target`}>
      <i className="mb-zero" />
      <div className="mb-bar" style={neg ? { right: "50%", width: `${-c * 50}%`, background: "var(--red)" } : { left: "50%", width: `${c * 50}%`, background: "var(--teal)" }} />
      <b className="mb-val" style={neg ? { right: `calc(50% + ${-c * 50}% + 6px)`, left: "auto", color: "var(--red)", ...(c <= -0.8 ? { right: "auto", left: "4px", color: "#fff" } : {}) } : { left: `calc(50% + ${c * 50}% + 6px)` }}>{lab}</b>
    </div>
  );
}

function Dumbbell({ r }: { r: Row }) {
  const W = 560, H = 36, x0 = 16, x1 = W - 16;
  const vals = [r.v2004 as number, r.now, r.target];
  const lo = Math.min(...vals) * 0.85, hi = Math.max(...vals) * 1.08;
  const x = (v: number) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mon-svg" role="img" aria-label={`${r.label}: ${fmt(r.unit, r.v2004 as number)} in 2004, ${fmt(r.unit, r.now)} in ${r.year}, target ${fmt(r.unit, r.target)} by 2036`}>
        <line x1={x(r.v2004 as number)} x2={x(r.now)} y1={18} y2={18} stroke="var(--red)" strokeWidth={5} />
        <line x1={x(r.now)} x2={x(r.target)} y1={18} y2={18} stroke="var(--neutral)" strokeWidth={2} strokeDasharray="5 4" />
        <rect x={x(r.target) - 8} y={10} width={16} height={16} rx={3} fill="var(--teal)" />
        <circle cx={x(r.v2004 as number)} cy={18} r={8} fill="var(--neutral)" />
        <circle cx={x(r.now)} cy={18} r={9} fill="var(--india)" />
      </svg>
      <div className="mb-legend">
        <span><i style={{ background: "var(--neutral)" }} />2004 · {fmt(r.unit, r.v2004 as number)}</span>
        <span><i style={{ background: "var(--india)" }} />{r.year} · <b>{fmt(r.unit, r.now)}</b></span>
        <span><i className="sq" style={{ background: "var(--teal)" }} />2036 · {fmt(r.unit, r.target)}</span>
      </div>
    </>
  );
}

function AgeBar({ r }: { r: Row }) {
  const col = r.age >= 4 ? "var(--red)" : r.age >= 2 ? "var(--gold)" : "var(--teal)";
  const pct = Math.max(2, (r.age / 10) * 100);
  return (
    <div className="mb-track" role="img" aria-label={`${r.label}: latest figure is from ${r.year}`}>
      <div className="mb-bar" style={{ width: `${pct}%`, background: col }} />
      <b className="mb-val" style={{ left: `min(calc(${pct}% + 8px), calc(100% - 8.5em))` }}>{r.year}{r.age > 0 ? ` · ${r.age} yr old` : " · current"}</b>
    </div>
  );
}

export default function MonitorIssue0() {
  const pace = withBase.slice().sort((a, b) => Number(b.wrong) - Number(a.wrong) || (b.ratio ?? 0) - (a.ratio ?? 0));
  const travelled = withBase.slice().sort((a, b) => (b.share_gone ?? 0) - (a.share_gone ?? 0));
  const reversals = withBase.filter((r) => r.wrong);
  const ages = rows.filter((r) => r.unit !== "flag").slice().sort((a, b) => b.age - a.age);

  return (
    <article className="mon">
      <header className="mon-hero">
        <div className="mon-inner">
          <div className="kick">Public Policy Foundation · The 2036 Monitor</div>
          <h1>Sixteen numbers to 2036</h1>
          <p className="mon-lead">
            Whether India’s growth reaches its citizens can be read in sixteen numbers: income, health, nutrition,
            learning, work, safe roads, clean air, working cities and honest statistics. Each April and October the
            Monitor records where they stand.
          </p>
          <div className="mon-meta">
            <span className="mon-badge">Issue 0</span>
            <span>Baseline · {issue.date}</span>
            <span>Next update · April 2027</span>
          </div>
        </div>
      </header>

      <div className="mon-inner">
        <section className="mon-tiles" aria-label="Summary">
          <div className="mon-tile"><b>16</b><span>numbers, each with a 2036 target already reached somewhere at India’s income, or promised by India itself</span></div>
          <div className="mon-tile"><b className="ok">{better.length} of {withBase.length}</b><span>with a 2004 baseline have improved since then; {flat.length === 1 ? "one, child wasting, has barely moved" : `${flat.length} have barely moved`}</span></div>
          <div className="mon-tile"><b className="bad">{worse.length}</b><span>moved the wrong way for twenty years: factories, women at work, road deaths</span></div>
          <div className="mon-tile"><b>2031</b><span>the halfway check, two years after the 2029 general election</span></div>
        </section>

        {/* ---------- the card ---------- */}
        <section className="mon-sec" id="card">
          <div className="kick">The card</div>
          <h2>Where each number stands, and where it should be</h2>
          <p className="mon-sub">Latest value, the 2031 halfway mark on a straight path, the 2036 target, and the change since 2004 where a comparable figure exists.</p>
          {GROUPS.map((g) => {
            const gr = rows.filter((r) => r.group === g);
            return (
              <div className="mon-group" key={g}>
                <div className="mon-gh"><h3>{g}</h3><Link href={chHref(gr[0].ch)} className="mon-chlink" prefetch={false}>Chapter {gr[0].ch}</Link></div>
                <div className="mon-row mon-row-h" aria-hidden="true">
                  <span>Measure</span><span>Now</span><span>2031</span><span>2036</span><span>Since 2004</span>
                </div>
                {gr.map((r) => (
                  <div className="mon-row" key={r.label}>
                    <span className="lab">{r.label}<small>{r.anchor}</small></span>
                    <span className="now" data-l="Now">{fmt(r.unit, r.now)} <small>({r.year})</small></span>
                    <span className="mid" data-l="2031">{r.unit === "flag" ? "Census done" : fmt(r.unit, r.mid)}</span>
                    <span className="tg" data-l="2036">{fmt(r.unit, r.target)}</span>
                    <span className={`dir ${r.since2004 === "better" && (r.share_gone ?? 0) < 0.1 ? "flat" : r.since2004 ?? "na"}`} data-l="Since 2004">
                      {r.since2004 === "worse" ? "▼ Worse" : r.since2004 === "better" && (r.share_gone ?? 0) < 0.1 ? "≈ Barely moved" : r.since2004 === "better" ? "▲ Better" : "No 2004 figure"}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
          <p className="mon-note">Halfway marks assume steady progress from the latest value to the 2036 target. Targets and anchors as set out in Part VII of <Link href="/book">Rich Country, Poor Citizens</Link>.</p>
        </section>

        {/* ---------- distance travelled ---------- */}
        <section className="mon-sec" id="distance">
          <div className="kick">Distance travelled</div>
          <h2>Out-of-pocket costs, farm exit and stunting are past halfway; three numbers went backwards</h2>
          <p className="mon-sub">Share of the distance from the 2004 value to the 2036 target already covered.</p>
          <div className="mon-chart">
            <div className="mon-axis"><span /><span className="ax"><i>Moved away</i><i>2004</i><i>2036 target</i></span></div>
            {travelled.map((r) => (
              <div className="mon-crow" key={r.label}><span className="cl">{r.label}</span><Travelled r={r} /></div>
            ))}
          </div>
          <p className="mon-prose">The share of health bills paid from household pockets has covered two-thirds of the way to its target. Farm employment and child stunting are about halfway. Child wasting has barely moved since 2004, and manufacturing, women’s labour-force participation and road deaths are further from their targets than twenty years ago.</p>
          <p className="mon-src">Calculated from the baselines and targets on the card. Sources listed below.</p>
        </section>

        {/* ---------- pace ---------- */}
        <section className="mon-sec" id="pace">
          <div className="kick">On track or off</div>
          <h2>Most targets need India to move faster than it did in the last twenty years</h2>
          <p className="mon-sub">Progress per year needed to reach the 2036 target, as a multiple of progress per year achieved since 2004. Below 1×: already fast enough.</p>
          <div className="mon-chart">
            <div className="mon-axis"><span /><span className="ax"><i>0×</i><i>1×: same pace</i><i>4× and more</i></span></div>
            {pace.map((r) => (
              <div className="mon-crow" key={r.label}><span className="cl">{r.label}</span><PaceBar r={r} /></div>
            ))}
          </div>
          <p className="mon-prose">Out-of-pocket health costs are already falling fast enough. The farm exit, stunting and income per person need about one and a half to two times their past pace. Public health spending must rise three times as fast as it did, and child wasting, which barely moved, needs a change of a different order: about twenty times the past pace.</p>
          <p className="mon-src">Pace achieved = (latest − 2004) ÷ years since 2004; pace needed = (target − latest) ÷ years to 2036.</p>
        </section>

        {/* ---------- reversals ---------- */}
        <section className="mon-sec" id="reversals">
          <div className="kick">The three reversals</div>
          <h2>Factories, women at work and road deaths need a change of direction, not more speed</h2>
          <p className="mon-sub">2004 value, latest value and the 2036 target.</p>
          <div className="mon-rev">
            {reversals.map((r) => (
              <div className="mon-revcard" key={r.label}>
                <h3>{r.label}</h3>
                <Dumbbell r={r} />
                <p>{r.anchor}</p>
              </div>
            ))}
          </div>
          <p className="mon-prose">Manufacturing is a smaller share of the economy than in 2004, a smaller share of women are in the labour force, and nearly twice as many people die on the roads each year. These are the hardest promises on the card, and the ones to watch most closely in each update.</p>
        </section>

        {/* ---------- data watch ---------- */}
        <section className="mon-sec" id="data">
          <div className="kick">Data watch</div>
          <h2>Four of the sixteen numbers rest on figures four or more years old</h2>
          <p className="mon-sub">Year of the latest available figure for each number on the card, as of {issue.date}.</p>
          <div className="mon-chart">
            {ages.map((r) => (
              <div className="mon-crow" key={r.label}><span className="cl">{r.label}</span><AgeBar r={r} /></div>
            ))}
          </div>
          <p className="mon-prose">Learning poverty still rests on a 2017 estimate, child wasting on a survey fielded in 2019–21, and sewage treatment on a 2021 inventory. The Census, due on the Registrar General’s 2027 schedule, is the sixteenth number: until it and the regular household surveys arrive on time, parts of the card cannot be refreshed.</p>
        </section>

        {/* ---------- sources ---------- */}
        <section className="mon-sec mon-sources" id="sources">
          <div className="kick">Sources and method</div>
          <h2>Where every number comes from</h2>
          <ol>
            {rows.map((r) => (
              <li key={r.label}><b>{r.label}</b> ({r.year}): {r.src}.</li>
            ))}
          </ol>
          <p className="mon-note">Baselines, targets and anchors follow Part VII and the Epilogue of <Link href="/book">Rich Country, Poor Citizens</Link>, where full source links are given. Issue 0 records the position in {issue.date}; later issues will mark each number as improved, flat or worse since the previous issue.</p>
          <p className="mon-by">Published by the Public Policy Foundation.</p>
        </section>

        <nav className="mon-next" aria-label="Related">
          <Link href="/epilogue" className="mon-nextcard">
            <span>The report card in full</span>
            <b>The Epilogue</b>
          </Link>
          <Link href="/book" className="mon-nextcard alt">
            <span>The evidence behind every target</span>
            <b>Rich Country, Poor Citizens</b>
          </Link>
        </nav>
      </div>
    </article>
  );
}
