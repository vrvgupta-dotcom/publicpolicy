import type { Metadata } from "next";
import { getAllChapters } from "@/lib/data";
import ContentsClient from "./ContentsClient";

export const metadata: Metadata = {
  title: "Contents",
  description: "All forty-three chapters across seven parts and an interlude.",
};

export default function ContentsPage() {
  const chapters = getAllChapters();
  return <ContentsClient chapters={chapters} />;
}
