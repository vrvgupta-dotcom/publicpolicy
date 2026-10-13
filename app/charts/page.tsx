import type { Metadata } from "next";
import { getAllChapters, chaptersData } from "@/lib/data";
import { PARTS, chapterSlug, chapterDataKey } from "@/lib/types";
import ChartsClient from "./ChartsClient";

export const metadata: Metadata = {
  title: "Charts",
  description: "All 353 charts from Rich Country, Poor Citizens in one grid.",
};

export default function ChartsPage() {
  const chapters = getAllChapters();

  const figures = chapters.flatMap((ch) => {
    const detail = chaptersData[chapterDataKey(ch.n)];
    const part = PARTS[ch.p];
    if (!detail?.secs) {
      return ch.figs.map((thumb) => ({
        thumb,
        title: thumbToTitle(thumb),
        chapterNum: ch.n,
        partNum: ch.p,
        partName: part?.name ?? "",
        chSlug: chapterSlug(ch),
      }));
    }
    return detail.secs.map((sec) => ({
      thumb: sec.th,
      title: sec.t || thumbToTitle(sec.th),
      chapterNum: ch.n,
      partNum: ch.p,
      partName: part?.name ?? "",
      chSlug: chapterSlug(ch),
    }));
  });

  return <ChartsClient figures={figures} />;
}

function thumbToTitle(thumb: string): string {
  return thumb
    .replace(/^ch\d+--fig-/, "")
    .replace(/^ch\d+--/, "")
    .replace(/\.webp$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
