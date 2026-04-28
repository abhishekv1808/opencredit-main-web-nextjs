import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Zap,
  Star,
  ChevronRight,
  TrendingUp,
  Users,
  Building2,
  BadgeCheck,
  Timer,
  IndianRupee,
  Percent,
} from "lucide-react";
import ActivityTicker from "@/components/shared/ActivityTicker";
import EligibilityWidget from "@/components/landing/EligibilityWidget";
import PersonalLoanHeroForm from "@/components/landing/PersonalLoanHeroForm";
import PurposeCarousel from "@/components/landing/PurposeCarousel";
import PartnerMarquee from "@/components/landing/PartnerMarquee";
import PersonalLoanFAQ from "@/components/landing/PersonalLoanFAQ";
import GoogleReviews from "@/components/landing/GoogleReviews";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { loanProductSchema, breadcrumbSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = generatePageMetadata({
  title: "Personal Loan in Bangalore | From 10.25% p.a.",
  description:
    "Apply for personal loan in Bangalore from ₹50,000 to ₹40 Lakhs at 10.25% p.a. Instant approval, 24-hour disbursal, 60+ partner banks. No collateral. Free application.",
  path: "/personal-loan",
});

/* ─── Data ─────────────────────────────────────────── */
const stats = [
  { icon: Building2, value: "60+", label: "Partner Banks & NBFCs" },
  { icon: Timer, value: "24hr", label: "Disbursement Time" },
  { icon: Percent, value: "10.25%", label: "Starting Interest Rate" },
  { icon: IndianRupee, value: "₹40L", label: "Maximum Loan Amount" },
];

const steps = [
  {
    num: "01",
    title: "Select Amount & Tenure",
    desc: "Choose your required loan amount (₹50K–₹40L) and repayment period (12–60 months) using our smart calculator.",
  },
  {
    num: "02",
    title: "Fill Your Information",
    desc: "Provide personal, employment, and income details. Completely digital — no branch visit needed.",
  },
  {
    num: "03",
    title: "Review Offers",
    desc: "Get up to 10 pre-approved offers from our 60+ partner lenders within minutes. Compare rates & terms.",
  },
  {
    num: "04",
    title: "Confirm & Submit",
    desc: "Choose your preferred lender, upload documents digitally, and submit your application with one click.",
  },
  {
    num: "05",
    title: "Receive Funds",
    desc: "Approved amount is disbursed directly to your bank account within 24 hours of final approval.",
  },
];

const features = [
  {
    icon: Zap,
    title: "10 Offers in 5 Minutes",
    desc: "With 60+ partner institutions, receive up to 10 pre-approved credit offers almost instantly after applying.",
    badge: "Fastest",
  },
  {
    icon: Shield,
    title: "Zero Hidden Fees",
    desc: "Complete transparency — no surprise charges. The EMI you calculate is exactly what you pay. No processing surprises.",
    badge: "Transparent",
  },
  {
    icon: Clock,
    title: "24-Hour Disbursement",
    desc: "Money deposited to your account within 24 hours of approval. No delays, no waiting at counters.",
    badge: "Quick",
  },
  {
    icon: BadgeCheck,
    title: "No Collateral Needed",
    desc: "100% unsecured loan. No property, gold, or guarantor required. Approval based purely on creditworthiness.",
    badge: "Unsecured",
  },
  {
    icon: TrendingUp,
    title: "Best Rate Matching",
    desc: "We match you with lenders offering the lowest rates for your profile — salaried, self-employed, or business owner.",
    badge: "Smart",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "A dedicated loan advisor guides you from application to disbursement, answering every question along the way.",
    badge: "Assisted",
  },
];

const eligibility = [
  { label: "Age", value: "21 – 60 years" },
  { label: "Employment", value: "Salaried / Self-employed / Business" },
  { label: "Min. Income", value: "₹25,000/month (salaried)" },
  { label: "CIBIL Score", value: "650+ (higher = better rate)" },
  { label: "Work Experience", value: "1+ year current employer" },
  { label: "Location", value: "Bangalore & Karnataka" },
];

const documents = [
  "PAN Card",
  "Aadhaar Card / Voter ID",
  "Last 3 months salary slips",
  "6 months bank statement",
  "Latest ITR (self-employed)",
  "Passport-size photograph",
];

/* ─── Page ─────────────────────────────────────────── */
export default function PersonalLoanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loanProductSchema("personal")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://opencredit.money" },
              {
                name: "Personal Loan",
                url: "https://opencredit.money/personal-loan",
              },
            ]),
          ),
        }}
      />

      {/* ══════════════════════════════════════════════
          HERO — Light Premium (Mirrors Home Loan)
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#f0faf4",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #16a34a18 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Animated glow orbs (Light theme) */}
        <div
          className="absolute top-20 right-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-20 left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-[60%] right-[5%] w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 60%)",
            filter: "blur(30px)",
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #16a34a 0%, #22c55e 50%, #16a34a 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28 md:pt-40 md:pb-36 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left — Copy (7 cols) */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
                style={{
                  background: "rgba(22,163,74,0.10)",
                  border: "1px solid rgba(22,163,74,0.22)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                  style={{ background: "#22c55e" }}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#15803d" }}
                >
                  Personal Loan · Bangalore · Instant Approval
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-extrabold leading-[1.08] tracking-tight mb-6"
                style={{ fontSize: "clamp(40px,5.8vw,68px)" }}
              >
                <span style={{ color: "#0f1a0f" }}>Unsecured </span>
                <span style={{ color: "#16a34a" }}>Personal&nbsp;Loan</span>
                <br />
                <span style={{ color: "#0f1a0f" }}>up to </span>
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #15803d 100%)",
                    }}
                  >
                    ₹40 Lakhs
                  </span>
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M2 6 Q100 1 198 6"
                      stroke="#16a34a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subheading */}
              <p
                className="text-base lg:text-lg mb-3 max-w-lg leading-relaxed"
                style={{ color: "#4b5563" }}
              >
                Minimal documentation. Completely digital. Lowest rate of
                interest from{" "}
                <span className="font-bold" style={{ color: "#16a34a" }}>
                  10.25% p.a.
                </span>{" "}
                with disbursement in just 24 hours.
              </p>
              <p className="text-[10px] lg:text-xs mb-10" style={{ color: "#9ca3af" }}>
                Subject to credit assessment · Rates 10.25%–36% p.a. · Tenure
                12–60 months
              </p>

              {/* Interactive hero form + CTAs (client component) */}
              <PersonalLoanHeroForm />
            </div>

            {/* Right — Hero Image (5 cols) */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative">
              <div className="relative w-full aspect-[4/5] lg:aspect-square flex justify-center items-center">
                <Image
                  src="/images/personal-loan-hero-image.png"
                  alt="Personal Loan Illustration"
                  fill
                  className="object-contain transform hover:scale-105 transition-transform duration-700 ease-in-out"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "60px" }}
          >
            <path
              d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* Social proof ticker */}
      <ActivityTicker />

      {/* ══════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span
              className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}
            >
              Why OpenCredit
            </span>
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: "#1a1a1a" }}
            >
              The Smarter Way to{" "}
              <span style={{ color: "#16a34a" }}>Borrow</span>
            </h2>
            <p
              className="text-sm lg:text-base max-w-2xl mx-auto"
              style={{ color: "#6b7280" }}
            >
              We have more than 60 partner financial institutions registered.
              Compare, choose, and get the best deal — all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: i === 0 ? "#1a1a1a" : "#fff",
                    border: i === 0 ? "none" : "1px solid #f0f0f0",
                    boxShadow:
                      i === 0
                        ? "0 20px 60px rgba(0,0,0,0.15)"
                        : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          i === 0
                            ? "rgba(22,163,74,0.2)"
                            : "rgba(22,163,74,0.08)",
                      }}
                    >
                      <Icon size={20} style={{ color: "#16a34a" }} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={
                        i === 0
                          ? {
                              background: "rgba(74,222,128,0.15)",
                              color: "#4ade80",
                            }
                          : { background: "#f0fdf4", color: "#16a34a" }
                      }
                    >
                      {f.badge}
                    </span>
                  </div>
                  <h3
                    className="font-bold text-sm lg:text-base mb-2"
                    style={{ color: i === 0 ? "#fff" : "#1a1a1a" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-xs lg:text-sm leading-relaxed"
                    style={{
                      color: i === 0 ? "rgba(255,255,255,0.5)" : "#6b7280",
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PARTNER BANKS — Auto-sliding logos
      ══════════════════════════════════════════════ */}
      <PartnerMarquee />

      {/* 3-step eligibility widget */}
      <EligibilityWidget />

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ background: "#f9fafb" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}
            >
              Simple Process
            </span>
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: "#1a1a1a" }}
            >
              Get Your Loan in{" "}
              <span style={{ color: "#16a34a" }}>5 Easy Steps</span>
            </h2>
            <p className="text-sm lg:text-base" style={{ color: "#6b7280" }}>
              From application to disbursement — the entire journey is digital
              and takes under 10 minutes.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute top-10 left-0 right-0 h-px mx-32"
              style={{
                background:
                  "linear-gradient(to right, transparent, #16a34a 20%, #16a34a 80%, transparent)",
              }}
            />

            <div className="grid md:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 relative z-10"
                    style={{
                      background: i === 0 ? "#16a34a" : "#fff",
                      border: i === 0 ? "none" : "2px solid #e5e7eb",
                      boxShadow:
                        i === 0
                          ? "0 10px 40px rgba(22,163,74,0.3)"
                          : "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span
                      className="text-[10px] lg:text-xs font-bold uppercase tracking-wider"
                      style={{
                        color: i === 0 ? "rgba(255,255,255,0.6)" : "#9ca3af",
                      }}
                    >
                      {step.num}
                    </span>
                    <ChevronRight
                      size={16}
                      style={{
                        color: i === 0 ? "#fff" : "#16a34a",
                        marginTop: "2px",
                      }}
                    />
                  </div>
                  <h3
                    className="font-bold text-xs lg:text-sm mb-2"
                    style={{ color: "#1a1a1a" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[10px] lg:text-xs leading-relaxed"
                    style={{ color: "#9ca3af" }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white cursor-pointer bg-green-600 hover:bg-green-700 transition-colors">
                Start My Application
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MULTIPURPOSE — Auto-sliding carousel
      ══════════════════════════════════════════════ */}
      <PurposeCarousel />

      {/* ══════════════════════════════════════════════
          ELIGIBILITY & DOCUMENTS — Premium Redesign
      ══════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ background: "#f9fafb" }}
        id="eligibility"
      >
        {/* Background accent */}
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header — left aligned */}
          <div className="mb-14">
            <span
              className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}
            >
              Quick Check
            </span>
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: "#1a1a1a" }}
            >
              Are You <span style={{ color: "#16a34a" }}>Eligible?</span>
            </h2>
            <p className="text-sm lg:text-base max-w-xl" style={{ color: "#6b7280" }}>
              Check if you meet the basic criteria. Most applicants with a
              stable income and decent credit score qualify.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* ── LEFT: Eligibility (3 cols) ── */}
            <div
              className="lg:col-span-3 rounded-3xl overflow-hidden"
              style={{
                background: "#111111",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              {/* Header bar */}
              <div className="px-8 pt-8 pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(22,163,74,0.15)" }}
                  >
                    <Star size={18} style={{ color: "#4ade80" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base lg:text-lg text-white">
                      Eligibility Criteria
                    </h3>
                    <p
                      className="text-[10px] lg:text-xs"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Minimum requirements to apply
                    </p>
                  </div>
                </div>
              </div>

              {/* Criteria rows */}
              <div className="px-8 pb-3">
                {eligibility.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-4 transition-colors"
                    style={{
                      borderBottom:
                        i < eligibility.length - 1
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(22,163,74,0.12)" }}
                      >
                        <CheckCircle2 size={13} style={{ color: "#4ade80" }} />
                      </div>
                      <span
                        className="text-xs lg:text-sm"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span
                      className="text-xs lg:text-sm font-semibold text-right"
                      style={{ color: "#fff" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CIBIL visual bar */}
              <div
                className="mx-8 mb-6 rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Credit Score Meter
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(74,222,128,0.15)",
                      color: "#4ade80",
                    }}
                  >
                    650+ Needed
                  </span>
                </div>
                <div
                  className="w-full h-2.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "72%",
                      background:
                        "linear-gradient(90deg, #ef4444 0%, #f97316 25%, #eab308 50%, #22c55e 75%, #16a34a 100%)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span
                    className="text-[10px]"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    300
                  </span>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "#4ade80" }}
                  >
                    650
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    900
                  </span>
                </div>
              </div>

              {/* Tip banner */}
              <div
                className="mx-8 mb-8 rounded-xl px-5 py-3.5 flex items-start gap-3"
                style={{
                  background: "rgba(22,163,74,0.08)",
                  border: "1px solid rgba(22,163,74,0.15)",
                }}
              >
                <Zap
                  size={14}
                  style={{ color: "#4ade80", flexShrink: 0, marginTop: "2px" }}
                />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <strong style={{ color: "#4ade80" }}>Pro tip:</strong> A CIBIL
                  score of 750+ gets you the best rates. Even 650+ qualifies you
                  with many of our 60+ partner lenders.
                </p>
              </div>
            </div>

            {/* ── RIGHT: Documents (2 cols) ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Documents card */}
              <div
                className="bg-white rounded-3xl p-8 flex-1 relative overflow-hidden"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  border: "1px solid #f0f0f0",
                }}
              >
                {/* Green accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: "linear-gradient(90deg, #16a34a, #22c55e)",
                  }}
                />

                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#f0fdf4" }}
                  >
                    <Shield size={18} style={{ color: "#16a34a" }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-base lg:text-lg"
                      style={{ color: "#1a1a1a" }}
                    >
                      Documents Required
                    </h3>
                    <p className="text-[10px] lg:text-xs" style={{ color: "#9ca3af" }}>
                      Keep these ready before applying
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 mb-6">
                  {documents.map((doc, i) => (
                    <li key={doc} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "#f0fdf4" }}
                      >
                        <CheckCircle2 size={13} style={{ color: "#16a34a" }} />
                      </div>
                      <span className="text-xs lg:text-sm" style={{ color: "#374151" }}>
                        {doc}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}
                >
                  <Clock
                    size={14}
                    style={{
                      color: "#16a34a",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  />
                  <p
                    className="text-[10px] lg:text-xs leading-relaxed"
                    style={{ color: "#6b7280" }}
                  >
                    Upload digitally — no physical submission. Max 5MB per file
                    (PDF, JPG, PNG).
                  </p>
                </div>
              </div>

              {/* CTA card */}
              <div
                className="rounded-3xl p-7 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)",
                  boxShadow: "0 12px 40px rgba(22,163,74,0.3)",
                }}
              >
                {/* Decorative circles */}
                <div
                  className="absolute -right-6 -top-6 w-28 h-28 rounded-full"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                <div
                  className="absolute right-8 bottom-2 w-16 h-16 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />

                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Ready to Apply?
                </p>
                <p className="text-white font-bold text-lg mb-5 leading-snug">
                  Get up to 10 loan offers
                  <br />
                  in just 5 minutes
                </p>
                <Link href="/register">
                  <span
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl"
                    style={{
                      background: "#fff",
                      color: "#15803d",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  >
                    Start Application — Free
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <GoogleReviews />

      {/* FAQ — client component (accordion state) */}
      <PersonalLoanFAQ />

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section
        className="py-14 md:py-24 relative overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(22,163,74,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span
            className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(22,163,74,0.15)", color: "#4ade80" }}
          >
            Apply Today
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Get Your <span style={{ color: "#4ade80" }}>Loan?</span>
          </h2>
          <p
            className="text-sm lg:text-base mb-3"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            It takes just 10 minutes. No branch visit. No collateral.
          </p>

          <div
            className="rounded-2xl p-4 mb-10 text-xs text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Interest rates: 10.25%–36% p.a. &nbsp;·&nbsp; Loan amount:
            ₹50,000–₹40,00,000 &nbsp;·&nbsp; Tenure: 12–60 months
            <br />
            Subject to credit approval and lender eligibility criteria.
          </div>

          <Link href="/register">
            <span className="inline-flex items-center gap-2 px-7 py-3 sm:px-10 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-white cursor-pointer bg-green-600 hover:bg-green-700 transition-colors">
              Apply for Personal Loan — Free
              <ArrowRight size={18} />
            </span>
          </Link>

          <p
            className="text-xs mt-6"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Open Credit is a loan marketplace/DSA. Loans disbursed by RBI
            registered partner banks/NBFCs.
          </p>
        </div>
      </section>
    </>
  );
}
