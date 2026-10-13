import bookDataRaw from "@/data/book-data.json";
import chaptersDataRaw from "@/data/chapters-data.json";
import type { BookData, ChaptersData } from "./types";

export const bookData = bookDataRaw as BookData;
export const chaptersData = chaptersDataRaw as ChaptersData;

export function getAllChapters() {
  return bookData.ch;
}

export function getChapterByNumber(n: number) {
  return bookData.ch.find((c) => c.n === n);
}

export function getChapterDetail(key: string) {
  return chaptersData[key] ?? null;
}

export function getSpecialPageDetail(key: string) {
  return chaptersData[key] ?? null;
}

export function getAllFigures() {
  return bookData.ch.flatMap((ch) =>
    ch.figs.map((fig) => ({ ch, fig }))
  );
}
