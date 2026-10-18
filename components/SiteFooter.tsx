import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <div>
          <div className="ft-brand">Public Policy Foundation</div>
          <div className="ft-sub">Policy research for economic and social development</div>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/book">Rich Country, Poor Citizens</Link>
          <Link href="/contents">Contents</Link>
          <Link href="/charts">Charts</Link>
          <Link href="/">Public Policy Foundation</Link>
        </nav>
      </div>
    </footer>
  );
}
