import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllChapters, getChapterDetail } from "@/lib/data";
import { PARTS, chapterSlug, chapterDataKey } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";
import FigureCard from "./FigureCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((ch) => ({ slug: chapterSlug(ch) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = parseInt(slug.split("-")[0], 10);
  const chapter = getAllChapters().find((c) => c.n === n);
  if (!chapter) return {};
  return {
    title: `Chapter ${chapter.n}: ${chapter.t}`,
    description: chapter.f,
    openGraph: {
      images: [{ url: `/assets/og/${String(chapter.n).padStart(2, "0")}-${chapter.t
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const n = parseInt(slug.split("-")[0], 10);
  const chapters = getAllChapters();
  const chapter = chapters.find((c) => c.n === n);
  if (!chapter) notFound();

  const detail = getChapterDetail(chapterDataKey(chapter.n));
  const part = PARTS[chapter.p];

  const prevCh = chapters.find((c) => c.n === chapter.n - 1);
  const nextCh = chapters.find((c) => c.n === chapter.n + 1);

  return (
    <>
      <ProgressBar />

      {/* Head band */}
      <div className={`ch-headband ${part?.cssClass ?? ""}`}>
        <div className="inner">
          <div className="label">
            <Link href={`/contents?part=${chapter.p}`}>
              Chapter {chapter.n} · {part?.name ?? `Part ${chapter.p}`}
            </Link>
          </div>
          <h1>{chapter.t}</h1>
          <div className="hook">{chapter.h}</div>
        </div>
      </div>

      <div className="ch-body">
        {/* Key numbers */}
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

        {/* Opening finding */}
        <div className="ch-finding">{chapter.f}</div>

        {/* Figures */}
        {detail?.secs && detail.secs.length > 0 && (
          <div className="fig-col">
            {detail.secs.map((fig, i) => (
              <FigureCard key={fig.id || i} fig={fig} />
            ))}
          </div>
        )}

        {/* Takeaway */}
        {detail?.take && (
          <div className="ch-takeaway">
            <div className="take-label">The takeaway</div>
            <div className="take-body">{detail.take}</div>
          </div>
        )}

        {/* Prev / Next */}
        <div className="ch-prevnext">
          {prevCh ? (
            <Link href={`/chapters/${chapterSlug(prevCh)}`} className="ch-prev">
              <span className="pn-label">← Before</span>
              <div className="pn-title">{prevCh.t}</div>
              <div className="pn-hook">{prevCh.h}</div>
            </Link>
          ) : (
            <Link href="/prologue" className="ch-prev">
              <span className="pn-label">← Before</span>
              <div className="pn-title">Prologue</div>
            </Link>
          )}
          {nextCh ? (
            <Link href={`/chapters/${chapterSlug(nextCh)}`} className="ch-next">
              <span className="pn-label">Next →</span>
              <div className="pn-title">{nextCh.t}</div>
              <div className="pn-hook">{nextCh.h}</div>
            </Link>
          ) : (
            <Link href="/epilogue" className="ch-next">
              <span className="pn-label">Next →</span>
              <div className="pn-title">Epilogue</div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
