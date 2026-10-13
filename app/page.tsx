import Link from "next/link";
import type { Metadata } from "next";
import { getAllChapters } from "@/lib/data";
import { PARTS, partDisplayOrder, chapterSlug } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rich Country, Poor Citizens — India's Unfinished Growth",
  description:
    "India built fast. It is the fifth-largest economy, with roads, digital rails, toilets and power for nearly everyone. It delivered slowly on what citizens feel.",
  openGraph: {
    title: "Rich Country, Poor Citizens",
    description: "India's Unfinished Growth, 2004–2036",
    images: [{ url: "/assets/og/home.jpg", width: 1200, height: 630 }],
  },
};

const REEL_THUMBS = [
  "ch01--rank.webp",
  "ch02--fig-both-decades-cut-poverty-fast.webp",
  "ch03--fig-india-cut-child-deaths-by-two.webp",
  "ch04--fig-from-one-in-fifty-online-to.webp",
  "ch05--fig-from-sixteenth-to-fourth-among-the.webp",
  "ch06--fig-india-makes-about-half-of-the.webp",
  "ch07--fig-highway-building-tripled-in-pace-then.webp",
  "ch08--fig-solar-went-from-almost-nothing-to.webp",
  "ch09--fig-from-most-of-the-population-to.webp",
  "ch10--fig-forty-crore-people-connected.webp",
  "ch11--fig-two-rankings-two-different-countries.webp",
  "ch12--fig-stunting-fell-wasting-barely-moved.webp",
  "ch13--fig-indias-health-share-fell-as-chinas.webp",
  "ch14--fig-fewer-than-one-in-four-can.webp",
  "ch15--fig-at-indias-income-most-countries-had.webp",
  "ch16--fig-only-twenty-countries-have-a-smaller.webp",
  "ch17--fig-road-deaths-almost-doubled-in-twenty.webp",
  "ch18--fig-only-five-countries-recorded-dirtier-air.webp",
  "ch19--fig-of-every-100-litres-of-urban.webp",
  "ch20--fig-nine-claims-nine-checks.webp",
  "ch21--fig-income-concentration-fell-for-thirty-years.webp",
  "ch22--fig-the-big-southern-states-are-pulling.webp",
  "ch23--fig-two-studies-opposite-answers-who-carries.webp",
  "ch24--fig-indias-corruption-score-has-hovered-around.webp",
  "ch25--fig-india-counts-one-in-forty-five.webp",
  "ch26--fig-weak-schooling-shows-up-later-as.webp",
  "ch27--fig-indias-share-of-adults-in-work.webp",
  "ch28--fig-long-days-thin-margins.webp",
  "ch29--fig-india-has-started-ageing-at-a.webp",
  "ch30--fig-water-per-person-crossed-the-stress.webp",
];

export default function HomePage() {
  const chapters = getAllChapters();
  const displayOrder = partDisplayOrder();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-grid">
          <div className="rise">
            <div className="hero-eyebrow">India's Unfinished Growth, 2004–2036</div>
            <h1 className="hero-h1">
              Rich Country,{" "}
              <br />
              <span>Poor Citizens</span>
            </h1>
            <p className="hero-body">
              India built fast. It is the fifth-largest economy, with roads, digital
              rails, toilets and power for nearly everyone.
            </p>
            <p className="hero-body-2">
              It delivered slowly on what citizens feel: nutrition, learning, jobs,
              clean air and water, safety, dignity.
            </p>
            <div className="hero-actions">
              <Link href="/prologue" className="btn-primary">
                Start reading →
              </Link>
              <Link href="/charts" className="btn-secondary">
                Browse 353 charts
              </Link>
            </div>
          </div>

          <div className="hero-card rise-2">
            <div className="hero-card-label">The argument in one picture</div>
            <div className="hero-stat">
              5th vs <span>143rd</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/thumbs/ch11--fig-two-rankings-two-different-countries.webp"
              alt="Two rankings, two different countries"
              className="hero-card-img"
            />
            <Link href="/chapters/11-fifth-by-size-143rd-per-person" className="hero-card-link">
              Read Chapter 11: Fifth by Size, 143rd per Person →
            </Link>
          </div>
        </div>
      </section>

      {/* Chart reel */}
      <div className="reel-wrap" aria-hidden="true">
        <div className="reel-track">
          {[...REEL_THUMBS, ...REEL_THUMBS].map((thumb, i) => (
            <div key={i} className="reel-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/thumbs/${thumb}`}
                alt=""
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Parts grid */}
      <section className="parts-section">
        <div className="section-eyebrow">Seven parts and an interlude</div>
        <h2 className="section-heading">
          What India built, what it left behind, the fault lines beneath, and what
          growth should buy next.
        </h2>
        <div className="parts-grid">
          {displayOrder.map((partNum) => {
            const part = PARTS[partNum];
            const partChapters = chapters.filter((c) => c.p === partNum);
            return (
              <Link
                key={partNum}
                href={`/contents?part=${partNum}`}
                className={`part-tile ${part.cssClass}`}
              >
                <div className="part-label">Part {romanNumeral(partNum)} · {part.range}</div>
                <div className="part-name">{part.name}</div>
                <div className="part-intro">{part.intro}</div>
                <div className="part-cta">
                  {partChapters.length} chapter{partChapters.length !== 1 ? "s" : ""} →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card teal">
            <div className="stat-num">5th</div>
            <div className="stat-label">Largest economy</div>
            <div className="stat-note">2024</div>
          </div>
          <div className="stat-card red">
            <div className="stat-num">143rd</div>
            <div className="stat-label">Of 191 countries in income per person</div>
          </div>
          <div className="stat-card violet">
            <div className="stat-num">130th</div>
            <div className="stat-label">Of 193 on the Human Development Index</div>
          </div>
          <div className="stat-card orange">
            <div className="stat-num">≈5×</div>
            <div className="stat-label">Growth of the economy, 2004–2024</div>
          </div>
        </div>
      </section>

      {/* Publisher */}
      <section className="publisher-section">
        <div className="publisher-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/ppf-logo.png" alt="Public Policy Foundation" />
          <div className="publisher-body">
            <div className="publisher-name">Public Policy Foundation</div>
            <p className="publisher-desc">
              A research foundation working on India's most pressing policy
              challenges, from public health and education to climate and
              inequality.
            </p>
            <Link href="/about" className="hero-card-link">
              About the Foundation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function romanNumeral(n: number): string {
  const map: Record<number, string> = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "",
  };
  return map[n] ?? String(n);
}
