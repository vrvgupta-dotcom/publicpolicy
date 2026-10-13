import type { Metadata } from "next";
import { getAllChapters } from "@/lib/data";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all 43 chapters of Rich Country, Poor Citizens.",
};

export default function SearchPage() {
  const chapters = getAllChapters();
  return <SearchClient chapters={chapters} />;
}
