export interface Chapter {
  n: number;
  t: string;
  h: string;
  f: string;
  p: number;
  k: string;
  figs: string[];
}

export interface BookData {
  ch: Chapter[];
  ex: {
    prologue: string[];
    epilogue: string[];
    appendix: string[];
    note: string[];
  };
}

export interface LeapCard {
  k: string;
  v: string;
  n: string;
}

export interface FigSection {
  id: string;
  k: string;
  t: string;
  s: string;
  r: string;
  src: string;
  th: string;
}

export interface ChapterDetail {
  secs: FigSection[];
  take: string;
  leap: LeapCard[];
}

export type ChaptersData = Record<string, ChapterDetail>;

export const PARTS: Record<number, { name: string; range: string; intro: string; cssClass: string }> = {
  1: {
    name: "Built Fast",
    range: "Ch. 1–10",
    intro: "How India became the fifth-largest economy.",
    cssClass: "part-1",
  },
  2: {
    name: "Left Behind",
    range: "Ch. 11–20",
    intro: "What the boom did not deliver.",
    cssClass: "part-2",
  },
  3: {
    name: "Who Gets What",
    range: "Ch. 21–25",
    intro: "The fault lines beneath the growth.",
    cssClass: "part-3",
  },
  4: {
    name: "The Young and the Old",
    range: "Ch. 26–29",
    intro: "India's demographic moment — and its risks.",
    cssClass: "part-4",
  },
  5: {
    name: "The Land Pushes Back",
    range: "Ch. 30–34",
    intro: "Water, food and a warming planet.",
    cssClass: "part-5",
  },
  6: {
    name: "The World Outside",
    range: "Ch. 35–37",
    intro: "India's place in an unequal world.",
    cssClass: "part-6",
  },
  8: {
    name: "Interlude: The Bill",
    range: "Ch. 38",
    intro: "The cost of India's hardest problems.",
    cssClass: "part-8",
  },
  7: {
    name: "Growth into Development",
    range: "Ch. 39–43",
    intro: "What the next decade should buy.",
    cssClass: "part-7",
  },
};

export const SPECIAL_PAGES = [
  { key: "prologue", label: "Prologue", title: "The Promise" },
  { key: "note", label: "A Note on Numbers", title: "A Note on Numbers" },
  { key: "epilogue", label: "Epilogue", title: "What 2036 Could Look Like" },
  { key: "appendix", label: "Appendix", title: "Appendix" },
];

export function partDisplayOrder(): number[] {
  return [1, 2, 3, 4, 5, 6, 8, 7];
}

export function chapterSlug(ch: Chapter): string {
  return `${String(ch.n).padStart(2, "0")}-${ch.t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export function slugToChapter(slug: string, chapters: Chapter[]): Chapter | undefined {
  const n = parseInt(slug.split("-")[0], 10);
  return chapters.find((c) => c.n === n);
}

export function chapterDataKey(n: number): string {
  return String(n).padStart(2, "0");
}
