import raw from "@/data/states.json";

export type IndKey = "mpi" | "imr" | "stunt" | "anaemia" | "school" | "paidwork" | "childmar" | "sanit" | "cook" | "insure";

export interface Indicator { k: IndKey; label: string; unit: string; dir: number }

export interface StateRow {
  name: string; slug: string; type: string;
  pop: number; inc: number; inc11: number; rel: number; rel11: number;
  usd_equiv: number;
  pop_twin: { code: string; name: string; pop: number };
  inc_twin: { code: string; name: string; gdp: number };
  ind: Record<IndKey, [number | null, number | null]>;
  rank: Record<IndKey, number>;
  rank4: Record<IndKey, number | null>;
  score: number; score4: number; scoreRank: number; scoreRank4: number;
  incRank: number; incRank11: number; popRank: number;
}

interface StatesData {
  states: StateRow[];
  india: { ind: Record<IndKey, [number | null, number | null]>; inc: number; inc11: number };
  indicators: Indicator[];
  best: Record<IndKey, { name: string; v: number }>;
  n: number;
  india_gdp_usd: number;
  india_gdp_year: number;
}

export const SD = raw as unknown as StatesData;
export const STATES = SD.states;
export const INDICATORS = SD.indicators;

export const getState = (slug: string) => STATES.find((s) => s.slug === slug);

export const fmtVal = (k: IndKey, v: number | null | undefined): string => {
  if (v === null || v === undefined) return "–";
  if (k === "imr") return v.toFixed(0);
  return (k === "mpi" && v < 10 ? v.toFixed(1) : v.toFixed(0)) + "%";
};

export const fmtPop = (p: number) =>
  p >= 1e7 ? `${(p / 1e7).toFixed(p >= 1e8 ? 0 : 1)} crore` : `${(p / 1e5).toFixed(0)} lakh`;

export const fmtPopM = (p: number) => (p >= 1e6 ? `${(p / 1e6).toFixed(p >= 1e7 ? 0 : 1)} million` : `${Math.round(p / 1e3)} thousand`);

export const fmtINR = (v: number) => "₹" + v.toLocaleString("en-IN");

export const relText = (r: number) =>
  r >= 1.05 ? `${r.toFixed(1)}× the national average` : r <= 0.95 ? `${Math.round(r * 100)}% of the national average` : "about the national average";

export const ord = (n: number) => {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const SOURCES = [
  "Income per person: Reserve Bank of India, Handbook of Statistics on Indian States, Table 9, per capita net state domestic product at current prices (base 2011-12), 2011-12 and 2023-24.",
  "Population: implied by RBI net state domestic product (Table 5) divided by per capita NSDP, 2023-24.",
  "Multidimensional poverty: NITI Aayog, National Multidimensional Poverty Index: A Progress Review 2023, via RBI Handbook Table 18 (NFHS-4 2015-16 and NFHS-5 2019-21).",
  "All other indicators: National Family Health Survey, NFHS-4 (2015-16) and NFHS-5 (2019-21) state fact sheets, compiled as open data by Pratap Vardhan (CC BY 4.0) from rchiips.org.",
  "Twin countries: World Bank World Development Indicators, population and GDP per person (current US$), 2024. A state’s income equivalent is its per capita NSDP relative to India’s, applied to India’s GDP per person.",
  "Jammu & Kashmir in NFHS-4 includes Ladakh, then part of the state.",
];
