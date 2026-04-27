import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Clock,
  Shield,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { loanProductSchema, breadcrumbSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = generatePageMetadata({
  title: "CIBIL Score Correction",
  description:
    "Expert CIBIL credit report correction service in Bangalore. Fix errors in your credit report, dispute inaccurate entries and improve your CIBIL score to get better loan rates.",
  path: "/credit-report-correction",
  keywords: [
    "CIBIL correction",
    "credit score improvement",
    "CIBIL report correction Bangalore",
    "credit report dispute",
    "improve CIBIL score",
  ],
});

const commonIssues = [
  "Incorrect personal details (name, DOB, address)",
  "Loans/accounts not belonging to you",
  "Settled accounts still showing as active",
  "Duplicate loan accounts",
  "Wrong loan outstanding amounts",
  "Closed accounts still showing as open",
  "Missed EMI entries that were actually paid",
  "Written-off accounts despite full repayment",
];

const processSteps = [
  {
    step: "01",
    title: "Credit Report Analysis",
    description:
      "We pull and analyze your full CIBIL report to identify all errors, negative entries, and dispute opportunities.",
    time: "Day 1–2",
    color: "text-blue-400",
    bg: "bg-blue-400/15",
    borderColor: "border-blue-400/20",
  },
  {
    step: "02",
    title: "Dispute Letter Preparation",
    description:
      "Our experts draft detailed, legally sound dispute letters for each inaccurate entry in your report.",
    time: "Day 3–5",
    color: "text-purple-400",
    bg: "bg-purple-400/15",
    borderColor: "border-purple-400/20",
  },
  {
    step: "03",
    title: "Submission to CIBIL",
    description:
      "We submit disputes directly to CIBIL and the concerned credit institutions on your behalf.",
    time: "Day 5–7",
    color: "text-brand-green",
    bg: "bg-brand-green/15",
    borderColor: "border-brand-green/20",
  },
  {
    step: "04",
    title: "Follow-up & Resolution",
    description:
      "We track resolution, follow up with CIBIL and lenders, and keep you updated throughout.",
    time: "Day 30–90",
    color: "text-brand-green",
    bg: "bg-brand-green/15",
    borderColor: "border-brand-green/20",
  },
];

export default function CreditReportCorrectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loanProductSchema("credit")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "https://opencredit.money" },
            { name: "CIBIL Score Correction", url: "https://opencredit.money/credit-report-correction" },
          ])),
        }}
      />

      {/* Hero — Light with green accent */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-bg-light overflow-hidden">
        <div className="absolute top-20 right-[15%] w-[500px] h-[500px] rounded-full bg-brand-green/[0.05] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-[10%] w-[350px] h-[350px] rounded-full bg-brand-green/[0.03] blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-2 mb-6">
                <TrendingUp size={14} className="text-brand-green" />
                <span className="text-xs text-brand-green font-medium">
                  CIBIL Score Improvement
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-extrabold text-heading mb-6 leading-tight">
                Fix Your{" "}
                <span className="text-accent-gradient">CIBIL Score</span>
              </h1>
              <p className="text-lg text-gray-500 mb-4">
                Expert credit report correction. Dispute inaccurate entries.
                Unlock better loan rates.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                Results typically in 30–90 days. Score improvement not
                guaranteed.
              </p>

              <div className="flex gap-4">
                <Link href="/register">
                  <Button
                    className="bg-brand-green hover:bg-emerald-600 text-white font-bold group"
                    size="lg"
                  >
                    Start Correction
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Free Consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative flex items-center justify-center">
              {/* Decorative glow behind image */}
              <div className="absolute w-[80%] h-[80%] rounded-full blur-[60px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(91,200,63,0.12) 0%, transparent 70%)" }} />

              <div className="relative">
                <Image
                  src="/images/cibil-hero-image.png"
                  alt="Person celebrating improved CIBIL score of 780"
                  width={480}
                  height={480}
                  className="w-full max-w-[420px] mx-auto drop-shadow-2xl"
                  priority
                />

                {/* Floating stats cards */}
                <div className="absolute -bottom-2 -left-4 md:left-0 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 animate-float" style={{ animationDuration: "3.5s" }}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg. Improvement</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-extrabold text-brand-green">+73</span>
                    <span className="text-xs font-semibold text-gray-400">points</span>
                  </div>
                </div>

                <div className="absolute -top-2 -right-4 md:right-0 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 animate-float" style={{ animationDuration: "4.1s", animationDelay: "0.8s" }}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Success Rate</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-extrabold text-brand-green">92%</span>
                    <span className="text-xs font-semibold text-gray-400">cases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-2 mb-6">
                <AlertCircle size={14} className="text-red-500" />
                <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                  Common Issues We Fix
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-heading mb-6">
                Is Your Credit Report{" "}
                <span className="text-accent-gradient">Holding You Back?</span>
              </h2>

              {/* Feature image */}
              <div className="relative mb-8 flex justify-center">
                <div className="absolute inset-0 rounded-3xl blur-[40px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(91,200,63,0.08) 0%, transparent 70%)" }} />
                <Image
                  src="/images/cibil-feature-image.png"
                  alt="Credit score analysis with sentiment indicators"
                  width={400}
                  height={400}
                  className="relative w-full max-w-[340px] mx-auto"
                />
              </div>

              <ul className="space-y-3">
                {commonIssues.map((issue) => (
                  <li
                    key={issue}
                    className="flex items-center gap-3 text-sm text-gray-700 py-2 border-b border-gray-100 last:border-0"
                  >
                    <AlertCircle
                      size={14}
                      className="text-red-400 flex-shrink-0"
                    />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="card-modern p-8 border-brand-green/10">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 size={24} className="text-brand-green" />
                  <h3 className="font-display text-2xl font-bold text-heading">
                    Why It Matters
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      score: "750+",
                      rate: "10.25% – 13%",
                      label: "Excellent — Best rates",
                      bg: "bg-brand-green/10",
                      text: "text-brand-green",
                    },
                    {
                      score: "700–749",
                      rate: "13% – 18%",
                      label: "Good — Fair rates",
                      bg: "bg-brand-green/10",
                      text: "text-brand-green",
                    },
                    {
                      score: "650–699",
                      rate: "18% – 30%",
                      label: "Average — Higher rates",
                      bg: "bg-amber-50",
                      text: "text-amber-600",
                    },
                    {
                      score: "Below 650",
                      rate: "Often rejected",
                      label: "Poor — Limited options",
                      bg: "bg-red-50",
                      text: "text-red-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.score}
                      className={`${item.bg} rounded-xl p-4 flex items-center justify-between`}
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">{item.score}</p>
                        <p className={`${item.text} text-xs`}>
                          {item.label}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm font-bold text-gray-800">
                          {item.rate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  * Indicative rates. Actual rates depend on lender assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process — Dark */}
      <section className="section-padding dark-section-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
              Our Process
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              How We Fix Your{" "}
              <span className="text-accent-gradient">Credit Report</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className={`rounded-2xl p-6 border ${step.borderColor} bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1`}>
                <span className="font-mono text-4xl font-bold text-white/[0.06] block mb-4">
                  {step.step}
                </span>
                <div
                  className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center mb-4`}
                >
                  <TrendingUp size={22} className={step.color} />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className={step.color} />
                  <span className={`text-xs font-medium ${step.color}`}>
                    {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-2 mb-6">
            <Shield size={14} className="text-brand-green" />
            <span className="text-xs font-semibold text-brand-green">
              No improvement, no hidden fees
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-heading mb-4">
            Start Your CIBIL Correction <span className="text-accent-gradient">Today</span>
          </h2>
          <p className="text-gray-500 mb-8">
            Free initial consultation. Our experts will analyze your credit
            report and tell you exactly what can be improved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                className="bg-brand-green hover:bg-emerald-600 text-white group"
                size="lg"
              >
                Get Started — Free Consultation
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Call Us First
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            Credit score improvement is not guaranteed. Results depend on
            validity of disputes and lender responses. Typically 30–90 days.
          </p>
        </div>
      </section>
    </>
  );
}
