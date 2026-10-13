import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p style={{ font: "400 20px/1.5 var(--body)", color: "var(--muted)", marginBottom: 28 }}>
        This page doesn&apos;t exist. Perhaps a chapter or chart you were looking for?
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
