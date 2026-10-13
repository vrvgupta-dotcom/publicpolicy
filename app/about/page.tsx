import type { Metadata } from "next";
import Link from "next/link";
import { BASE_PATH } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "About",
  description: "Public Policy Foundation — research for a stronger, more inclusive tomorrow.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${BASE_PATH}/assets/ppf-logo.png`} alt="Public Policy Foundation" />

      <div className="kick" style={{ marginBottom: 14 }}>About Public Policy Foundation</div>
      <h1>Research for a stronger, more inclusive tomorrow</h1>

      <p>
        Public Policy Foundation is a policy research platform dedicated to examining critical
        economic and social challenges through rigorous research, evidence-based analysis, and
        practical policy recommendations. We seek to contribute to informed policymaking, effective
        public institutions, and development outcomes that improve people&apos;s lives.
      </p>
      <p>
        Our work focuses on two interconnected pillars of development:{" "}
        <strong>Economic Development and Social Development</strong>. Through research, data
        analysis, policy publications, and examination of development challenges, we aim to generate
        insights that support inclusive growth, expand opportunities, and strengthen the foundations
        of a prosperous and equitable society.
      </p>
      <p>
        Public Policy Foundation is founded on the belief that sound public policy must be informed
        by credible research, reliable evidence, and a clear understanding of real-world challenges.
      </p>

      <h2>Our Story</h2>
      <p>
        We examine relationships between policy, institutions, and outcomes to understand development
        challenges, evaluate potential solutions, and contribute to constructive discussions on
        India&apos;s development priorities. Our approach seeks to bridge the gap between research,
        policymaking, and implementation.
      </p>

      <div className="about-card ink" style={{ marginTop: 32 }}>
        <h3 className="kick" style={{ color: "#f5a15a", marginBottom: 14 }}>Our mission</h3>
        <p>
          To undertake and disseminate rigorous policy research that generates actionable insights,
          informs public decision-making, and contributes to inclusive, sustainable, and equitable
          development.
        </p>
      </div>
      <div className="about-card orange">
        <h3 className="kick" style={{ marginBottom: 14 }}>Our vision</h3>
        <p>
          A prosperous, inclusive, and equitable society in which public policies are informed by
          evidence, institutions work effectively, and development opportunities are accessible to
          all.
        </p>
      </div>

      <h2>Research Areas</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 14, marginBottom: 32 }}>
        <div
          style={{
            border: "1px solid var(--rule)",
            borderRadius: 18,
            padding: "22px 26px",
            background: "var(--stage)",
          }}
        >
          <div className="kick" style={{ marginBottom: 12 }}>1. Economic Development</div>
          <ul style={{ margin: 0, paddingLeft: 20, font: "400 16px/1.55 var(--body)", color: "var(--muted)" }}>
            <li>Growth, productivity and structural transformation</li>
            <li>Labour markets, employment and wages</li>
            <li>Public finance, taxation and fiscal policy</li>
            <li>Infrastructure and its returns</li>
            <li>Trade, investment and industrial policy</li>
          </ul>
          <p style={{ font: "400 italic 16px/1.55 var(--body)", color: "var(--muted)", marginTop: 12 }}>
            Our objective is to generate insights that support inclusive growth and strengthen the
            economic foundations of long-term prosperity.
          </p>
        </div>
        <div
          style={{
            border: "1px solid var(--rule)",
            borderRadius: 18,
            padding: "22px 26px",
            background: "var(--stage)",
          }}
        >
          <div className="kick" style={{ marginBottom: 12 }}>2. Social Development</div>
          <ul style={{ margin: 0, paddingLeft: 20, font: "400 16px/1.55 var(--body)", color: "var(--muted)" }}>
            <li>Health systems and outcomes</li>
            <li>Education quality and learning</li>
            <li>Nutrition and food security</li>
            <li>Gender equality and women&apos;s empowerment</li>
            <li>Inequality, poverty and social protection</li>
          </ul>
          <p style={{ font: "400 italic 16px/1.55 var(--body)", color: "var(--muted)", marginTop: 12 }}>
            Our objective is to improve access to essential services, address persistent development
            gaps, and strengthen the social foundations of prosperity.
          </p>
        </div>
      </div>

      <h2>Our Approach</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14, marginBottom: 32 }}>
        {[
          { title: "Evidence-Based Research", desc: "We emphasise systematic inquiry, reliable data, relevant literature, and analytical rigour to understand policy issues and assess possible solutions." },
          { title: "Policy-Relevant Analysis", desc: "We focus on research questions that matter to policymakers, institutions, development practitioners, researchers, and the wider public." },
          { title: "Practical Recommendations", desc: "We seek to translate research findings into clear, relevant insights that can inform policy formulation, programme design, implementation, and evaluation." },
          { title: "Accessible Communication", desc: "We present complex findings in ways that are readable and useful to a non-specialist audience, from policymakers to engaged citizens." },
          { title: "Independent Perspective", desc: "Our research is conducted without partisan affiliation, seeking to contribute to evidence-based policy regardless of which party or government is in office." },
        ].map(({ title, desc }) => (
          <div
            key={title}
            style={{
              background: "var(--stage)",
              border: "1px solid var(--rule)",
              borderRadius: 18,
              padding: 20,
            }}
          >
            <h3 style={{ font: "700 19px/1.2 var(--display)", margin: "0 0 8px" }}>{title}</h3>
            <p style={{ font: "400 16px/1.55 var(--body)", color: "var(--muted)", margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      <h2>What We Do</h2>
      <p>
        Public Policy Foundation undertakes and publishes research designed to improve understanding
        of public policy and development issues. Our work includes:
      </p>
      <ul>
        <li><strong>Research Reports</strong> — In-depth examination of economic and social development challenges.</li>
        <li><strong>Working Papers</strong> — Analytical contributions to ongoing policy debates and research.</li>
        <li><strong>Policy Commentaries</strong> — Research-informed perspectives on emerging policy questions.</li>
        <li><strong>Data and Charts</strong> — Publicly shared data visualisations, including the 353 charts in this book.</li>
        <li><strong>Policy Briefs</strong> — Concise summaries of research findings for decision-makers.</li>
        <li><strong>Books and Monographs</strong> — Longer-form research like <em>Rich Country, Poor Citizens</em>.</li>
      </ul>

      <h2>Our Commitment</h2>
      <p>
        By examining evidence, questioning assumptions, and exploring practical alternatives, Public
        Policy Foundation seeks to contribute to a more informed and constructive public policy
        discourse. Public Policy Foundation welcomes engagement with researchers, academics,
        policymakers, public institutions, civil society organisations, and others interested in
        evidence-based approaches to development.
      </p>
      <p style={{ color: "var(--muted)" }}>
        Through research and knowledge sharing, we aim to contribute to meaningful policy
        discussions and a stronger understanding of the choices that shape our collective future.
      </p>

      <div className="about-cta">
        <h3>Read the book</h3>
        <p style={{ font: "400 18px/1.5 var(--body)", color: "var(--muted)", marginBottom: 20 }}>
          India built fast. It delivered slowly on what citizens feel. Forty-three chapters, 353
          charts, 2004 to 2036.
        </p>
        <Link href="/prologue" className="btn-primary">
          Read Rich Country, Poor Citizens →
        </Link>
      </div>
    </div>
  );
}
