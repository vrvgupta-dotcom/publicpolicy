import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <div>
          <div className="ft-brand">Rich Country, Poor Citizens</div>
          <div className="ft-sub">Public Policy Foundation</div>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/contents">Contents</Link>
          <Link href="/charts">Charts</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
}
