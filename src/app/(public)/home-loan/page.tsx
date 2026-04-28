"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, Shield, Clock, Zap, Star,
  ChevronDown, ChevronRight, Home, Building2, Wrench,
  RefreshCw, MapPin, Users, BadgeCheck, TrendingUp,
  Banknote, Percent, Timer, IndianRupee, FileText,
  Calculator, Landmark, TreePine, Repeat,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────── */
const heroStats = [
  { value: "8.5%*", label: "Starting Rate p.a.", icon: Percent },
  { value: "₹10 Cr", label: "Max Loan Amount", icon: Banknote },
  { value: "30 yrs", label: "Maximum Tenure", icon: Timer },
  { value: "90%", label: "LTV Ratio", icon: IndianRupee },
];

const lenderRates = [
  { bank: "SBI",            rate: "8.50%",  type: "Floating" },
  { bank: "HDFC Bank",      rate: "8.75%",  type: "Floating" },
  { bank: "ICICI Bank",     rate: "8.75%",  type: "Floating" },
  { bank: "Kotak Mahindra", rate: "8.75%",  type: "Floating" },
  { bank: "PNB",            rate: "8.45%",  type: "Floating" },
  { bank: "Canara Bank",    rate: "8.40%",  type: "Floating" },
  { bank: "Axis Bank",      rate: "8.75%",  type: "Floating" },
  { bank: "Bank of Baroda", rate: "8.40%",  type: "Floating" },
];

const loanTypes = [
  { icon: Home,      title: "New Home Purchase",      desc: "Buy a ready-to-move-in flat, apartment, or independent house from a developer or resale market.", color: "#16a34a" },
  { icon: Building2, title: "Under Construction",     desc: "Finance an under-construction property. Funds disbursed in tranches as construction progresses.", color: "#3b82f6" },
  { icon: MapPin,    title: "Plot + Construction",    desc: "Purchase a plot of land and build your dream home on it with a single composite loan.", color: "#8b5cf6" },
  { icon: Wrench,    title: "Home Renovation",        desc: "Renovate, extend, or upgrade your existing home with a dedicated top-up or renovation loan.", color: "#f97316" },
  { icon: RefreshCw, title: "Balance Transfer",       desc: "Shift your existing home loan to a lower-interest lender and save lakhs over the tenure.", color: "#0891b2" },
  { icon: TreePine,  title: "NRI Home Loan",          desc: "Special schemes for Non-Resident Indians to purchase or construct property back home.", color: "#d97706" },
];

const features = [
  { icon: Percent,    title: "Rates from 8.40% p.a.", desc: "Access the lowest available rates across 60+ partner banks and NBFCs — matched to your credit profile.", badge: "Best Rate" },
  { icon: Zap,        title: "Quick Pre-Approval",    desc: "Get a conditional in-principle approval within 48 hours. Know your eligibility before you finalise your property.", badge: "Fast" },
  { icon: Shield,     title: "Zero Surprise Fees",    desc: "Full transparency on processing charges (0.25%–2%), legal fees, and technical charges before you sign.", badge: "Transparent" },
  { icon: Calculator, title: "Tax Benefit Planning",  desc: "Save up to ₹3.5 lakh/year in income tax via Section 80C, 24(b), and 80EEA deductions on your home loan.", badge: "Tax Saving" },
  { icon: Repeat,     title: "Balance Transfer",      desc: "Already have a home loan? We help you switch to a lower-rate lender and reduce your EMI significantly.", badge: "Save More" },
  { icon: Users,      title: "Dedicated Advisor",     desc: "A dedicated home loan specialist guides you from eligibility check to property registration — step by step.", badge: "Assisted" },
];

const taxBenefits = [
  { section: "Section 80C",   benefit: "Principal repayment", limit: "₹1.5 Lakh/year",  note: "Combined with other 80C investments" },
  { section: "Section 24(b)", benefit: "Interest paid",        limit: "₹2 Lakh/year",   note: "Self-occupied property" },
  { section: "Section 80EEA", benefit: "Additional interest",  limit: "₹1.5 Lakh/year", note: "First-time buyers, affordable housing" },
];

const eligibility = [
  { label: "Age",               value: "21 – 70 years (at loan maturity)" },
  { label: "Employment",        value: "Salaried / Self-employed / Business" },
  { label: "Min. Net Income",   value: "₹25,000/month (salaried)" },
  { label: "CIBIL Score",       value: "730+ (higher = better rate)" },
  { label: "Work Experience",   value: "2+ years (salaried), 3+ years (self-employed)" },
  { label: "Loan-to-Value",     value: "Up to 90% of property value" },
  { label: "Co-applicant",      value: "Spouse or close family member (boosts eligibility)" },
  { label: "Location",          value: "Pan India (Bangalore focus)" },
];

const documents = [
  { category: "Identity & Address", items: ["PAN Card", "Aadhaar / Passport / Voter ID", "Utility bill (address proof)"] },
  { category: "Income Proof",       items: ["Last 3 months salary slips", "6 months bank statement", "Latest ITR + Form 16 (2 years)"] },
  { category: "Property Docs",      items: ["Sale agreement / Allotment letter", "Title deed / Encumbrance certificate", "Approved building plan & NOC"] },
  { category: "Others",             items: ["Passport-size photographs", "Existing loan statements (if any)", "Property tax receipts (resale)"] },
];

const steps = [
  { num: "01", title: "Check Eligibility",     desc: "Fill a quick form — takes 2 minutes. We instantly show your eligible loan amount and best available rates." },
  { num: "02", title: "Compare Lenders",       desc: "Get offers from 60+ banks & NBFCs. Compare rates, processing fees, and terms side-by-side." },
  { num: "03", title: "Upload Documents",      desc: "Submit all documents digitally. No branch visit. We verify and forward to your chosen lender." },
  { num: "04", title: "Property Valuation",    desc: "Lender conducts a legal and technical check of the property. Usually done in 3–5 working days." },
  { num: "05", title: "Approval & Disbursal",  desc: "Receive final sanction letter. Funds are disbursed directly to the builder or seller." },
];

const faqs = [
  { q: "What is the minimum CIBIL score needed for a home loan?", a: "Most lenders require a minimum CIBIL score of 700–750. A score of 750+ fetches the best rates. Scores below 700 may still get approval but at higher rates or with co-applicants." },
  { q: "How much home loan can I get on my salary?", a: "Typically, lenders allow EMI up to 40–50% of your net monthly income. So a ₹50,000/month salary can typically support an EMI of ₹20,000–₹25,000, which translates to a loan of ₹20–30 lakh at prevailing rates." },
  { q: "What is the maximum LTV ratio for home loans?", a: "For loans up to ₹30 lakh: up to 90% of property value. For ₹30L–₹75L: up to 80%. Above ₹75L: up to 75%. You pay the remaining amount as down payment." },
  { q: "Can I get a home loan on a plot purchase?", a: "Yes, but plot loans have different terms — generally higher rates, shorter tenure (up to 15 years), and lower LTV (60–70%). Composite loans covering plot + construction are available and often better." },
  { q: "What tax benefits can I claim on my home loan?", a: "You can claim up to ₹1.5L/year on principal repayment (Section 80C), ₹2L/year on interest (Section 24b), and an additional ₹1.5L/year on interest for first-time buyers under Section 80EEA (affordable housing)." },
  { q: "Should I choose a fixed or floating rate?", a: "Floating rates are currently lower and linked to RBI's repo rate — they benefit you when rates fall. Fixed rates offer predictability. In the current rate cycle, most experts recommend floating rates with an option to switch." },
  { q: "Can I prepay or foreclose my home loan?", a: "Yes. RBI guidelines prohibit prepayment penalties on floating-rate home loans from banks. NBFCs may charge 2–4%. Partial prepayments are an excellent way to reduce tenure and save interest." },
  { q: "What is PMAY (Pradhan Mantri Awas Yojana)?", a: "PMAY offers a credit-linked subsidy of up to ₹2.67 lakh for first-time home buyers with annual income up to ₹18 lakh. OpenCredit helps you check eligibility and apply for this subsidy as part of the loan process." },
];

/* ─── FAQ Accordion ─────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ border: open ? "1px solid rgba(22,163,74,0.3)" : "1px solid #f0f0f0", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-xs lg:text-sm font-semibold pr-4" style={{ color: "#1a1a1a" }}>{q}</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ background: open ? "#16a34a" : "#f4f5f7" }}>
          <ChevronDown size={14} style={{ color: open ? "#fff" : "#6b7280", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-[10px] lg:text-xs leading-relaxed" style={{ color: "#6b7280" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export default function HomeLoanPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — Light Premium
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#f0faf4", minHeight: "100vh", display: "flex", alignItems: "center" }}>

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #16a34a18 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Green blob — top right */}
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 65%)" }} />

        {/* Blue blob — bottom left */}
        <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)" }} />

        {/* Top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #16a34a 0%, #22c55e 50%, #16a34a 100%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
                style={{ background: "rgba(22,163,74,0.10)", border: "1px solid rgba(22,163,74,0.22)" }}>
                <Home size={13} style={{ color: "#16a34a" }} />
                <span className="text-xs font-semibold" style={{ color: "#15803d" }}>
                  Home Loan · Pan India · 60+ Lenders
                </span>
              </div>

              <h1 className="font-extrabold leading-[1.08] tracking-tight mb-6" style={{ fontSize: "clamp(34px,5.5vw,64px)", color: "#0f1a0f" }}>
                Your Dream Home,{" "}
                <span style={{ color: "#16a34a" }}>Financed</span>
                <br />
                <span className="relative inline-block">
                  <span style={{ color: "#16a34a" }}>Right</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 120 8" fill="none">
                    <path d="M2 6 Q60 1 118 6" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                </span>
                {" "}Now
              </h1>

              <p className="text-base lg:text-lg mb-3 max-w-lg leading-relaxed" style={{ color: "#4b5563" }}>
                Home loans starting at{" "}
                <span className="font-bold" style={{ color: "#16a34a" }}>8.40% p.a.</span>{" "}
                from 60+ banks & NBFCs. Up to ₹10 Crore. 30-year tenure. Claim up to{" "}
                <span className="font-bold" style={{ color: "#16a34a" }}>₹3.5 Lakh</span>{" "}
                in annual tax benefits.
              </p>
              <p className="text-[10px] lg:text-xs mb-10" style={{ color: "#9ca3af" }}>
                *Rates indicative and subject to lender credit assessment · LTV up to 90% · Tenure up to 30 years
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/register">
                  <span className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold text-white transition-all cursor-pointer group"
                    style={{ background: "#16a34a", boxShadow: "0 8px 24px rgba(22,163,74,0.28)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#15803d"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(22,163,74,0.38)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(22,163,74,0.28)"; }}>
                    Check My Eligibility — Free
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
                <Link href="/emi-calculator">
                  <span className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold transition-all cursor-pointer"
                    style={{ background: "#fff", border: "1.5px solid #d1d5db", color: "#374151", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#16a34a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}>
                    <Calculator size={16} />
                    Calculate EMI
                  </span>
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { emoji: "🏠", text: "Pan India" },
                  { emoji: "🔒", text: "RBI Compliant" },
                  { emoji: "💰", text: "Tax Benefits" },
                  { emoji: "⚡", text: "48-hr Pre-Approval" },
                ].map(t => (
                  <span key={t.text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#374151", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <span>{t.emoji}</span>
                    {t.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Stat cards (light style) */}
            <div className="hidden lg:grid grid-cols-2 gap-4">

              {/* Rate highlight — dark card for contrast */}
              <div className="col-span-2 rounded-3xl p-7 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)", boxShadow: "0 20px 60px rgba(22,163,74,0.30)" }}>
                <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="absolute right-10 bottom-4 w-20 h-20 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Lowest Rate Available</p>
                <div className="flex items-end gap-3 relative">
                  <span className="text-6xl font-extrabold font-mono text-white leading-none">8.40%</span>
                  <div className="mb-1.5">
                    <p className="text-white/90 text-sm font-semibold">per annum</p>
                    <p className="text-white/55 text-xs mt-0.5">Floating · Bank of Baroda / Canara</p>
                  </div>
                </div>
              </div>

              {/* Max Amount */}
              <div className="rounded-3xl p-6 flex flex-col justify-between"
                style={{ background: "#fff", border: "1.5px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", minHeight: "140px" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9ca3af" }}>Max Amount</p>
                <div>
                  <p className="font-extrabold text-4xl font-mono leading-none" style={{ color: "#111827" }}>₹10Cr</p>
                  <p className="text-xs mt-1.5 font-medium" style={{ color: "#6b7280" }}>Up to 90% of value</p>
                </div>
              </div>

              {/* Tax Saving */}
              <div className="rounded-3xl p-6 flex flex-col justify-between"
                style={{ background: "#fff", border: "1.5px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", minHeight: "140px" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9ca3af" }}>Annual Tax Saving</p>
                <div>
                  <p className="font-extrabold text-4xl font-mono leading-none" style={{ color: "#16a34a" }}>₹3.5L</p>
                  <p className="text-xs mt-1.5 font-medium" style={{ color: "#6b7280" }}>80C + 24b + 80EEA</p>
                </div>
              </div>

              {/* Tenure + Pre-approval */}
              <div className="col-span-2 rounded-3xl p-5"
                style={{ background: "#fff", border: "1.5px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#9ca3af" }}>Tenure</p>
                    <p className="font-bold text-lg font-mono" style={{ color: "#111827" }}>Up to 30 Years</p>
                  </div>
                  <div className="w-px h-10" style={{ background: "#e5e7eb" }} />
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#9ca3af" }}>Pre-Approval</p>
                    <p className="font-bold text-lg font-mono" style={{ color: "#111827" }}>48 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14 lg:hidden">
            {heroStats.map(s => (
              <div key={s.label} className="rounded-2xl p-4 text-center"
                style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <p className="font-bold font-mono text-xl mb-1" style={{ color: "#16a34a" }}>{s.value}</p>
                <p className="text-[11px] font-medium" style={{ color: "#6b7280" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CURRENT RATES TABLE
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Live Rates
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3" style={{ color: "#1a1a1a" }}>
              Current Home Loan{" "}
              <span style={{ color: "#16a34a" }}>Interest Rates</span>
            </h2>
            <p className="text-sm lg:text-base max-w-lg mx-auto" style={{ color: "#6b7280" }}>
              Indicative rates from major Indian lenders. Your actual rate depends on credit profile and property type.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl overflow-hidden"
              style={{ border: "1px solid #f0f0f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {/* Table header */}
              <div className="grid grid-cols-3 px-6 py-4" style={{ background: "#1a1a1a" }}>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Bank / NBFC</span>
                <span className="text-xs font-bold uppercase tracking-wider text-center" style={{ color: "rgba(255,255,255,0.5)" }}>Interest Rate</span>
                <span className="text-xs font-bold uppercase tracking-wider text-right" style={{ color: "rgba(255,255,255,0.5)" }}>Type</span>
              </div>
              {lenderRates.map((row, i) => (
                <div key={row.bank} className="grid grid-cols-3 px-6 py-4 items-center transition-colors hover:bg-green-50/50"
                  style={{ borderBottom: i < lenderRates.length - 1 ? "1px solid #f5f5f5" : "none", background: "#fff" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "#f0fdf4" }}>
                      <Landmark size={14} style={{ color: "#16a34a" }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>{row.bank}</span>
                  </div>
                  <span className="text-base font-extrabold font-mono text-center" style={{ color: "#16a34a" }}>{row.rate}</span>
                  <span className="text-xs font-medium text-right px-3 py-1 rounded-full justify-self-end"
                    style={{ background: "#f0fdf4", color: "#16a34a" }}>{row.type}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] lg:text-xs text-center mt-4" style={{ color: "#9ca3af" }}>
              *Rates updated periodically. Actual rate offered may vary based on CIBIL score, income, and property. Subject to lender terms.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LOAN TYPES
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-24" style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Loan Types
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3" style={{ color: "#1a1a1a" }}>
              Which Home Loan{" "}
              <span style={{ color: "#16a34a" }}>Suits You?</span>
            </h2>
            <p className="text-sm lg:text-base" style={{ color: "#6b7280" }}>
              From ready-to-move to under-construction — we have a loan type for every property scenario.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {loanTypes.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ border: "1px solid #f0f0f0" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${t.color}15` }}>
                    <Icon size={20} style={{ color: t.color }} />
                  </div>
                  <h3 className="font-bold text-sm lg:text-base mb-2" style={{ color: "#1a1a1a" }}>{t.title}</h3>
                  <p className="text-xs lg:text-sm leading-relaxed" style={{ color: "#6b7280" }}>{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY OPENCREDIT — 6 features
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Why OpenCredit
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3" style={{ color: "#1a1a1a" }}>
              The Smarter Way to{" "}
              <span style={{ color: "#16a34a" }}>Finance Your Home</span>
            </h2>
            <p className="text-sm lg:text-base max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
              We compare 60+ lenders to find you the best rate — and guide you through every step of the home loan process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="group rounded-2xl p-7 transition-all hover:-translate-y-1"
                  style={{
                    background: i === 0 ? "#1a1a1a" : "#fff",
                    border: i === 0 ? "none" : "1px solid #f0f0f0",
                    boxShadow: i === 0 ? "0 20px 60px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
                  }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: i === 0 ? "rgba(22,163,74,0.2)" : "rgba(22,163,74,0.08)" }}>
                      <Icon size={20} style={{ color: "#16a34a" }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={i === 0 ? { background: "rgba(74,222,128,0.15)", color: "#4ade80" } : { background: "#f0fdf4", color: "#16a34a" }}>
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm lg:text-base mb-2" style={{ color: i === 0 ? "#fff" : "#1a1a1a" }}>{f.title}</h3>
                  <p className="text-xs lg:text-sm leading-relaxed" style={{ color: i === 0 ? "rgba(255,255,255,0.5)" : "#6b7280" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TAX BENEFITS
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 relative overflow-hidden" style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
                Tax Benefits
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5" style={{ color: "#1a1a1a" }}>
                Save Up to{" "}
                <span style={{ color: "#16a34a" }}>₹3.5 Lakh</span>
                <br />on Tax Every Year
              </h2>
              <p className="text-sm lg:text-base leading-relaxed mb-8" style={{ color: "#6b7280" }}>
                A home loan is one of the biggest tax-saving instruments available to Indian taxpayers. Under the old tax regime, you can claim deductions on both principal and interest payments.
              </p>
              <Link href="/register">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
                  style={{ background: "#16a34a" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}>
                  Apply & Start Saving
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>

            <div className="space-y-4">
              {taxBenefits.map((tb, i) => (
                <div key={tb.section} className="bg-white rounded-2xl p-6 flex items-start gap-5"
                  style={{ border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: i === 0 ? "#16a34a" : "#f0fdf4" }}>
                    <FileText size={18} style={{ color: i === 0 ? "#fff" : "#16a34a" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wider" style={{ color: "#16a34a" }}>{tb.section}</span>
                        <p className="text-xs lg:text-sm font-bold mt-0.5" style={{ color: "#1a1a1a" }}>{tb.benefit}</p>
                      </div>
                      <span className="text-sm lg:text-base font-extrabold font-mono flex-shrink-0" style={{ color: "#16a34a" }}>{tb.limit}</span>
                    </div>
                    <p className="text-[10px] lg:text-xs" style={{ color: "#9ca3af" }}>{tb.note}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl p-4" style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.15)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>
                  <strong>Note:</strong> Tax benefits are under the old tax regime. Consult your CA for personal advice.
                  OpenCredit helps you factor in tax savings while choosing your loan structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5-STEP PROCESS
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Simple Process
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              Get Your Home Loan in{" "}
              <span style={{ color: "#16a34a" }}>5 Steps</span>
            </h2>
            <p className="text-sm lg:text-base" style={{ color: "#6b7280" }}>From eligibility check to disbursement — completely digital and assisted.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px mx-32"
              style={{ background: "linear-gradient(to right, transparent, #16a34a 20%, #16a34a 80%, transparent)" }} />
            <div className="grid md:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 relative z-10"
                    style={{ background: i === 0 ? "#16a34a" : "#fff", border: i === 0 ? "none" : "2px solid #e5e7eb", boxShadow: i === 0 ? "0 10px 40px rgba(22,163,74,0.3)" : "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider" style={{ color: i === 0 ? "rgba(255,255,255,0.6)" : "#9ca3af" }}>{step.num}</span>
                    <ChevronRight size={16} style={{ color: i === 0 ? "#fff" : "#16a34a", marginTop: "2px" }} />
                  </div>
                  <h3 className="font-bold text-xs lg:text-sm mb-2" style={{ color: "#1a1a1a" }}>{step.title}</h3>
                  <p className="text-[10px] lg:text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
                style={{ background: "#16a34a" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}>
                Start My Home Loan Journey
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ELIGIBILITY & DOCUMENTS
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "#f9fafb" }} id="eligibility">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3" style={{ color: "#1a1a1a" }}>
              Eligibility &{" "}
              <span style={{ color: "#16a34a" }}>Documents</span>
            </h2>
            <p className="text-sm lg:text-base" style={{ color: "#6b7280" }}>Check the basic requirements before applying.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Eligibility */}
            <div className="bg-white rounded-3xl p-8"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                  <Star size={18} style={{ color: "#16a34a" }} />
                </div>
                <h3 className="font-bold text-base lg:text-lg" style={{ color: "#1a1a1a" }}>Eligibility Criteria</h3>
              </div>
              {eligibility.map((item, i) => (
                <div key={item.label} className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < eligibility.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                  <span className="text-xs lg:text-sm" style={{ color: "#6b7280" }}>{item.label}</span>
                  <span className="text-xs lg:text-sm font-semibold text-right max-w-[55%]" style={{ color: "#1a1a1a" }}>{item.value}</span>
                </div>
              ))}
              <div className="mt-5 rounded-xl p-4" style={{ background: "#f0fdf4", border: "1px solid rgba(22,163,74,0.15)" }}>
                <p className="text-[10px] lg:text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  <strong style={{ color: "#1a1a1a" }}>Tip:</strong> Adding a co-applicant (spouse or parent) significantly boosts your eligible loan amount and may improve your interest rate.
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-3xl p-8"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                  <Shield size={18} style={{ color: "#16a34a" }} />
                </div>
                <h3 className="font-bold text-base lg:text-lg" style={{ color: "#1a1a1a" }}>Documents Required</h3>
              </div>
              <div className="space-y-5 mb-6">
                {documents.map(group => (
                  <div key={group.category}>
                    <p className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "#16a34a" }}>{group.category}</p>
                    <ul className="space-y-1.5">
                      {group.items.map(doc => (
                        <li key={doc} className="flex items-center gap-2.5 text-xs lg:text-sm" style={{ color: "#374151" }}>
                          <CheckCircle2 size={14} style={{ color: "#16a34a", flexShrink: 0 }} />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-3.5 mb-5 flex items-start gap-3" style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                <Clock size={13} style={{ color: "#16a34a", flexShrink: 0, marginTop: "1px" }} />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  Upload all documents digitally — no physical submission needed. Max 5MB per file (PDF, JPG, PNG).
                </p>
              </div>
              <Link href="/register">
                <span className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
                  style={{ background: "#16a34a" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}>
                  Start Application
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] lg:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              FAQ
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a1a" }}>
              Home Loan{" "}
              <span style={{ color: "#16a34a" }}>Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(22,163,74,0.14) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(22,163,74,0.15)" }}>
            <Home size={28} style={{ color: "#4ade80" }} />
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Own Your{" "}
            <span style={{ color: "#4ade80" }}>Dream Home?</span>
          </h2>
          <p className="text-sm lg:text-base mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            Check eligibility in 2 minutes. Compare 60+ lenders. Get the lowest rate for your profile.
          </p>

          <div className="rounded-2xl p-4 mb-10 text-[10px] lg:text-xs text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
            Interest rates from 8.40% p.a. &nbsp;·&nbsp; Loan up to ₹10 Crore &nbsp;·&nbsp; Tenure up to 30 years
            <br />Subject to credit approval · LTV up to 90% of property value
          </div>

          <Link href="/register">
            <span className="inline-flex items-center gap-2 px-7 py-3 sm:px-10 sm:py-4 rounded-xl sm:rounded-2xl text-sm lg:text-base font-bold text-white cursor-pointer transition-all"
              style={{ background: "#16a34a" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}>
              Check My Eligibility — Free
              <ArrowRight size={18} />
            </span>
          </Link>

          <p className="text-[10px] lg:text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
            OpenCredit is a loan marketplace/DSA. Loans disbursed by RBI-registered partner banks/NBFCs. Not a bank or NBFC.
          </p>
        </div>
      </section>
    </>
  );
}
