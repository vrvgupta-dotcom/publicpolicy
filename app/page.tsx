import Link from "next/link";
import type { Metadata } from "next";
import { BASE_PATH } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Public Policy Foundation",
  description:
    "Public Policy Foundation examines India's economic and social challenges through rigorous research, evidence-based analysis and practical policy recommendations.",
  openGraph: {
    title: "Public Policy Foundation",
    description: "Research for a stronger, more inclusive tomorrow.",
    images: [{ url: "/assets/og/home.jpg", width: 1200, height: 630 }],
  },
};

export default function FoundationHomePage() {
  return (
    <div className="ppf-home">
      {/* Hero */}
      <section className="ppf-hero rise">
        <div className="kick">Policy research · Economic and social development</div>
        <h1 className="ppf-h1">
          Research for a stronger,{" "}
          <span>more inclusive tomorrow</span>
        </h1>
        <p className="ppf-lead">
          Public Policy Foundation examines India&apos;s economic and social challenges
          through rigorous research, evidence-based analysis and practical policy
          recommendations.
        </p>
        <Link href="/book" className="btn-primary" style={{ alignSelf: "flex-start" }}>
          Read our latest publication →
        </Link>
      </section>

      {/* Publications */}
      <section className="ppf-section">
        <div className="kick">Reports and publications</div>
        <h2 className="ppf-sh">Our publications</h2>
        <Link href="/book" className="pub-card">
          <div className="pub-card-left">
            <div className="pub-card-type">Book · Interactive edition</div>
            <div className="pub-card-title">
              Rich Country,<br />
              <span>Poor Citizens</span>
            </div>
            <div className="pub-card-sub">India&apos;s Unfinished Growth, 2004–2036</div>
            <p className="pub-card-desc">
              India is the fifth-largest economy, yet 143rd in income per person.
              Forty-three chapters and 353 sourced charts on what growth built and what
              it left behind.
            </p>
            <div className="pub-card-meta">
              <span>43 chapters</span>
              <span>353 charts</span>
            </div>
            <span className="pub-card-cta">Read the book →</span>
          </div>
          <div className="pub-card-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/assets/thumbs/ch11--fig-two-rankings-two-different-countries.webp`}
              alt="Dumbbell chart: India ranks 5th by total GDP but 143rd by GDP per person"
            />
          </div>
        </Link>
        <Link href="/monitor" className="pub-card pub-card-monitor">
          <div className="pub-card-left">
            <div className="pub-card-type">Tracker · Twice a year</div>
            <div className="pub-card-title">
              The 2036<br />
              <span>Monitor</span>
            </div>
            <div className="pub-card-sub">Issue 0 · Baseline, October 2026</div>
            <p className="pub-card-desc">
              Sixteen numbers that show whether growth is reaching citizens: where each stands,
              the 2031 halfway mark and the 2036 target. Updated every April and October.
            </p>
            <div className="pub-card-meta">
              <span>16 indicators</span>
              <span>Next update April 2027</span>
            </div>
            <span className="pub-card-cta">Read Issue 0 →</span>
          </div>
          <div className="pub-card-right mon-cardart" aria-hidden="true">
            <b>16</b>
            <span><i className="up">▲ 5 better</i><i>≈ 1 flat</i><i className="dn">▼ 3 worse</i><i>since 2004</i></span>
          </div>
        </Link>
        <p className="ppf-more-note">
          More reports and publications will be added here as they are released.
        </p>
      </section>

      {/* About */}
      <section className="ppf-section ppf-about-section">
        <div className="kick">About the Foundation</div>
        <p className="ppf-about-lead">
          Our work focuses on two interconnected pillars of development:{" "}
          <strong>Economic Development and Social Development</strong>. Through research,
          data analysis and policy publications, we aim to generate insights that support
          inclusive growth, expand opportunities, and strengthen the foundations of a
          prosperous and equitable society.
        </p>
      </section>

      {/* Our story */}
      <section className="ppf-section ppf-story-section">
        <div className="kick">Our story</div>
        <h2 className="ppf-sh">Better policy starts with credible evidence</h2>
        <p className="ppf-body">
          Public Policy Foundation is founded on the belief that sound public policy must
          be informed by credible research, reliable evidence, and a clear understanding
          of real-world challenges.
        </p>
        <p className="ppf-body">
          Economic progress and social well-being are deeply interconnected. Sustainable
          economic growth requires productive employment, strong institutions, and
          broad-based opportunities, while social development depends on access to
          education, healthcare, essential services, and meaningful participation in
          economic and civic life.
        </p>
        <p className="ppf-body">
          We examine these relationships to understand policy challenges, evaluate
          potential solutions, and contribute to constructive discussions on India&apos;s
          development priorities. Our approach seeks to bridge the gap between research,
          policymaking, and implementation.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="ppf-mv-grid">
        <div className="ppf-mission">
          <div className="kick" style={{ color: "#f5a15a" }}>Our mission</div>
          <p className="ppf-mv-text">
            To undertake and disseminate rigorous policy research that generates
            actionable insights, informs public decision-making, and contributes to
            inclusive, sustainable, and equitable development.
          </p>
        </div>
        <div className="ppf-vision">
          <div className="kick">Our vision</div>
          <p className="ppf-mv-text">
            A prosperous, inclusive, and equitable society in which public policies are
            informed by evidence, institutions work effectively, and development
            opportunities are accessible to all.
          </p>
        </div>
      </section>

      {/* Two pillars */}
      <section className="ppf-section ppf-pillars-section">
        <div className="kick">Our research areas</div>
        <h2 className="ppf-sh">Two pillars of development</h2>
        <div className="ppf-pillars-grid">
          <div className="ppf-pillar">
            <div className="ppf-pillar-num">1</div>
            <h3 className="ppf-pillar-title">Economic Development</h3>
            <p className="ppf-pillar-desc">
              We study the policies, institutions, and economic conditions that influence
              growth, productivity, employment, investment, and economic opportunity.
            </p>
            <div className="ppf-pillar-areas-label">Our research examines areas such as</div>
            <ul className="ppf-pillar-list">
              <li>→ Economic growth and macroeconomic policy</li>
              <li>→ Employment, labour markets, and livelihoods</li>
              <li>→ Industrial development, manufacturing, and entrepreneurship</li>
              <li>→ Trade, investment, and business competitiveness</li>
              <li>→ Agriculture and rural development</li>
              <li>→ Infrastructure and urban development</li>
              <li>→ Public finance, taxation, and government expenditure</li>
              <li>→ Small businesses, enterprise development, and economic inclusion</li>
            </ul>
            <p className="ppf-pillar-note">
              Our objective is to contribute to a better understanding of the factors
              that drive economic progress and the policies that can make growth more
              productive, resilient, and inclusive.
            </p>
          </div>
          <div className="ppf-pillar">
            <div className="ppf-pillar-num">2</div>
            <h3 className="ppf-pillar-title">Social Development</h3>
            <p className="ppf-pillar-desc">
              We examine the policies and public systems that shape human development,
              social well-being, equality of opportunity, and quality of life.
            </p>
            <div className="ppf-pillar-areas-label">Our research covers areas such as</div>
            <ul className="ppf-pillar-list">
              <li>→ Education and skill development</li>
              <li>→ Public health and nutrition</li>
              <li>→ Poverty, inequality, and social protection</li>
              <li>→ Gender equality and women&apos;s empowerment</li>
              <li>→ Child development and youth welfare</li>
              <li>→ Housing, sanitation, and access to essential services</li>
              <li>→ Social inclusion and vulnerable communities</li>
              <li>→ Human development and quality of life</li>
            </ul>
            <p className="ppf-pillar-note">
              Our objective is to generate insights that can help improve access to
              essential services, address persistent development gaps, and strengthen the
              social foundations of long-term prosperity.
            </p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="ppf-section ppf-approach-section">
        <div className="kick">Our approach</div>
        <h2 className="ppf-sh">How we work</h2>
        <div className="ppf-approach-grid">
          {[
            { title: "Evidence-Based Research", desc: "We emphasise systematic inquiry, reliable data, relevant literature, and analytical rigour to understand policy issues and assess possible solutions." },
            { title: "Policy-Relevant Analysis", desc: "We focus on research questions that matter to policymakers, institutions, development practitioners, researchers, and the wider public." },
            { title: "Interdisciplinary Perspectives", desc: "We recognise that complex development challenges often span economics, governance, public administration, social sciences, and institutional design." },
            { title: "Practical Recommendations", desc: "We seek to translate research findings into clear, relevant insights that can inform policy formulation, programme design, implementation, and evaluation." },
            { title: "Transparency and Intellectual Integrity", desc: "We value clarity in methodology, responsible interpretation of evidence, and the distinction between established findings, analytical judgments, and policy recommendations." },
          ].map(({ title, desc }) => (
            <div key={title} className="ppf-approach-card">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="ppf-section ppf-wwd-section">
        <div className="kick">What we do</div>
        <h2 className="ppf-sh">Research, published</h2>
        <p className="ppf-body">
          Public Policy Foundation undertakes and publishes research designed to improve
          understanding of public policy and development issues. Our work may include:
        </p>
        <div className="ppf-wwd-grid">
          {[
            { title: "Research Reports", desc: "In-depth examination of economic and social development challenges." },
            { title: "Policy Briefs", desc: "Concise analysis of policy issues, evidence, and potential interventions." },
            { title: "Working Papers", desc: "Analytical contributions to ongoing policy debates and research." },
            { title: "Data Analysis and Insights", desc: "Interpretation of relevant economic, social, and development indicators." },
            { title: "Policy Commentaries", desc: "Research-informed perspectives on emerging policy questions." },
            { title: "Development Studies", desc: "Examination of public programmes, institutional performance, and development outcomes." },
          ].map(({ title, desc }) => (
            <div key={title} className="ppf-wwd-item">
              <strong>{title}</strong>
              <div className="ppf-wwd-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="ppf-section ppf-commitment-section">
        <div className="kick">Our commitment</div>
        <h2 className="ppf-sh">Better policy begins with better understanding</h2>
        <p className="ppf-body">
          By examining evidence, questioning assumptions, and exploring practical
          alternatives, Public Policy Foundation seeks to contribute to a more informed
          and constructive public policy discourse.
        </p>
        <p className="ppf-body">
          Our work is guided by the conviction that economic progress and social
          development should reinforce one another, creating opportunities for
          individuals, strengthening institutions, and supporting long-term societal
          well-being.
        </p>
      </section>

      {/* CTA */}
      <section className="ppf-section ppf-cta-section">
        <div className="kick">Advancing better policy through research</div>
        <p className="ppf-body">
          Public Policy Foundation welcomes engagement with researchers, academics,
          policymakers, public institutions, civil society organisations, and others
          interested in evidence-based approaches to development.
        </p>
        <p className="ppf-body ppf-body-muted">
          Through research and knowledge sharing, we aim to contribute to meaningful
          policy discussions and a stronger understanding of the choices that shape our
          collective future.
        </p>
        <Link href="/book" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: 8 }}>
          Read the book: Rich Country, Poor Citizens →
        </Link>
      </section>
    </div>
  );
}
