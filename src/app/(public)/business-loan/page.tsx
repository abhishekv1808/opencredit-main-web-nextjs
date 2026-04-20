"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, Shield, Clock, Zap, Star,
  ChevronDown, ChevronRight, Briefcase, TrendingUp,
  Users, Building2, BadgeCheck, Banknote, Percent,
  Factory, ShoppingBag, Truck, Wrench, BarChart3,
  CreditCard, FileText, Layers, Target, Landmark,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────── */
const stats = [
  { icon: Building2,  value: "60+",   label: "Partner Banks & NBFCs" },
  { icon: Clock,      value: "48hr",  label: "Approval Time" },
  { icon: Percent,    value: "12%",   label: "Starting Interest Rate" },
  { icon: Banknote,   value: "₹2Cr",  label: "Maximum Loan Amount" },
];

const loanTypes = [
  {
    icon: BarChart3,
    title: "Working Capital Loan",
    desc: "Fund day-to-day operations — inventory, salaries, raw materials, and short-term expenses without disrupting cash flow.",
    amount: "₹5L – ₹1Cr",
    tenure: "12–36 months",
    color: "#3b82f6",
    badge: "Most Popular",
  },
  {
    icon: Factory,
    title: "Equipment & Machinery Finance",
    desc: "Purchase or upgrade plant, machinery, or equipment. The asset itself often serves as collateral for better rates.",
    amount: "₹10L – ₹2Cr",
    tenure: "24–84 months",
    color: "#f97316",
    badge: "Asset-Backed",
  },
  {
    icon: TrendingUp,
    title: "Business Expansion Loan",
    desc: "Scale your business — open new branches, hire staff, enter new markets, or upgrade infrastructure.",
    amount: "₹10L – ₹2Cr",
    tenure: "24–60 months",
    color: "#16a34a",
    badge: "Growth",
  },
  {
    icon: CreditCard,
    title: "Business Overdraft / Line of Credit",
    desc: "A revolving credit limit you draw from as needed and repay when cash flows in. Pay interest only on utilised amount.",
    amount: "₹5L – ₹75L",
    tenure: "12–24 months",
    color: "#8b5cf6",
    badge: "Flexible",
  },
  {
    icon: ShoppingBag,
    title: "MSME / SME Loan",
    desc: "Government-backed and private MSME loans for registered micro, small, and medium enterprises across Karnataka.",
    amount: "₹1L – ₹1Cr",
    tenure: "12–60 months",
    color: "#0891b2",
    badge: "MSME",
  },
  {
    icon: Truck,
    title: "Trade Finance / Invoice Discounting",
    desc: "Get immediate liquidity against outstanding invoices or purchase orders. Ideal for businesses with B2B payment cycles.",
    amount: "₹5L – ₹50L",
    tenure: "30–180 days",
    color: "#d97706",
    badge: "B2B",
  },
];

const features = [
  {
    icon: Zap,
    title: "Fast Approval in 48 Hours",
    desc: "Our streamlined digital process and 60+ lender network means business loan decisions arrive within 48 hours — not weeks.",
    badge: "Fastest",
  },
  {
    icon: Layers,
    title: "6 Loan Products Under One Roof",
    desc: "From working capital to equipment finance — we assess your business need and match you with the most suitable product.",
    badge: "Comprehensive",
  },
  {
    icon: Shield,
    title: "Secured & Unsecured Options",
    desc: "No assets? No problem. We have unsecured business loan options up to ₹75L based on your business revenue and creditworthiness.",
    badge: "Flexible",
  },
  {
    icon: BadgeCheck,
    title: "Dedicated Business Advisor",
    desc: "A relationship manager with business lending expertise guides you from document preparation to final disbursement.",
    badge: "Assisted",
  },
  {
    icon: Target,
    title: "MSME Government Schemes",
    desc: "We help eligible businesses access CGTMSE, Mudra, and other government-backed schemes for subsidised interest rates.",
    badge: "Subsidised",
  },
  {
    icon: Users,
    title: "All Business Structures Welcome",
    desc: "Sole proprietorship, partnership, LLP, private limited, or OPC — we have lender partners for every business type.",
    badge: "Inclusive",
  },
];

const steps = [
  { num: "01", title: "Share Business Details",    desc: "Tell us your business type, vintage, annual turnover, and required loan amount. Takes under 5 minutes." },
  { num: "02", title: "Select Loan Product",       desc: "Our advisor reviews your profile and recommends the best loan product — working capital, term loan, or OD facility." },
  { num: "03", title: "Upload Documents",          desc: "Submit documents digitally — business registration, ITR, bank statements, GST returns. No branch visit." },
  { num: "04", title: "Receive Lender Offers",     desc: "Get multiple pre-approved offers from our 60+ partner banks and NBFCs. Compare rates, terms, and processing fees." },
  { num: "05", title: "Funds Disbursed",           desc: "Accept the best offer, complete final KYC, and receive funds directly in your business account within 2–3 working days." },
];

const eligibility = [
  { label: "Business Vintage",    value: "Minimum 2 years in operation" },
  { label: "Annual Turnover",     value: "₹30 Lakhs+ (varies by product)" },
  { label: "Business Type",       value: "Proprietorship / Partnership / Pvt Ltd / LLP" },
  { label: "Applicant Age",       value: "25 – 65 years" },
  { label: "CIBIL / CRIF Score",  value: "680+ recommended" },
  { label: "GST Registration",    value: "Required for most lenders" },
  { label: "Location",            value: "Bangalore & Karnataka (primarily)" },
  { label: "Profitability",       value: "Profitable for last 1–2 years (ITR-based)" },
];

const documents = [
  "Business Registration / Certificate of Incorporation",
  "PAN Card (Business & Proprietor/Directors)",
  "Aadhaar Card of all promoters",
  "Last 2 years ITR with P&L and Balance Sheet",
  "12 months current account bank statements",
  "GST Returns (last 12 months)",
  "Latest audited financials (for loans above ₹50L)",
  "Office / shop address proof",
];

const partners = [
  "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra",
  "IDFC First Bank", "YES Bank", "Tata Capital", "Bajaj Finserv",
  "Piramal Finance", "L&T Finance", "IIFL Finance", "Lendingkart",
  "FlexiLoans", "NeoGrowth", "Indifi", "Capital Float",
];

const testimonials = [
  {
    name: "Arjun Shetty",      role: "Restaurant Owner",        location: "Koramangala",    amount: "₹25L",  rate: "14.5%", avatar: "AS", color: "#f97316",
    review: "Applied for a working capital loan on Monday, had the funds by Thursday. Our expansion into the second outlet finally happened!",
  },
  {
    name: "Meena Iyer",        role: "Garment Manufacturer",    location: "Peenya",         amount: "₹60L",  rate: "13.0%", avatar: "MI", color: "#8b5cf6",
    review: "Needed machinery finance urgently. OpenCredit matched us with an asset-backed loan at a rate I didn't expect. Complete professionals.",
  },
  {
    name: "Ravi Kumar",        role: "IT Services Firm",        location: "Whitefield",     amount: "₹40L",  rate: "15.5%", avatar: "RK", color: "#3b82f6",
    review: "As an LLP with 3 years of operation, getting a business loan was frustrating. OpenCredit found 4 lenders who actually understood our business.",
  },
  {
    name: "Sunita Reddy",      role: "Pharma Distributor",      location: "Rajajinagar",    amount: "₹80L",  rate: "12.5%", avatar: "SR", color: "#16a34a",
    review: "They helped us access CGTMSE-backed lending which reduced our processing fees significantly. Highly knowledgeable team.",
  },
  {
    name: "Farhan Khan",       role: "Construction Contractor", location: "Yeshwanthpur",   amount: "₹1.2Cr", rate: "13.5%", avatar: "FK", color: "#0891b2",
    review: "Large loan, complex profile. But OpenCredit's advisor sat with us for an hour, prepared our case, and we got approved in 5 days.",
  },
  {
    name: "Kavitha Nair",      role: "Bakery Chain Founder",    location: "HSR Layout",     amount: "₹18L",  rate: "15.0%", avatar: "KN", color: "#ec4899",
    review: "Used an OD facility to manage seasonal cash flow. It's been a game-changer — I draw what I need and only pay interest on that amount.",
  },
];

const faqs = [
  { q: "What types of business loans do you offer?",               a: "We offer 6 business loan products: Working Capital Loans, Equipment & Machinery Finance, Business Expansion Loans, Business Overdraft / Line of Credit, MSME/SME Loans, and Trade Finance / Invoice Discounting. Our advisors help you choose the best fit." },
  { q: "What is the minimum business vintage required?",            a: "Most lenders require a minimum of 2 years of business operation. However, some fintech lenders in our network extend loans to businesses as young as 1 year with strong bank statement cash flows." },
  { q: "Is GST registration mandatory?",                            a: "GST registration is required by most traditional banks, especially for loans above ₹20L. Some NBFC partners accept non-GST registered businesses for smaller loan amounts up to ₹15L." },
  { q: "Can I get a business loan without collateral?",             a: "Yes. Unsecured business loans up to ₹75L are available through our NBFC partners. For loans above ₹50L, collateral (property, machinery, or government-backed CGTMSE guarantee) is typically required." },
  { q: "What interest rates should I expect?",                      a: "Business loan rates start from 12% p.a. and can go up to 36% p.a. depending on your credit profile, business vintage, annual turnover, and lender. Secured loans typically get 12%–18% while unsecured loans are 18%–28%." },
  { q: "How does the overdraft facility work?",                     a: "An overdraft (OD) is a revolving credit limit against your current account or assets. You withdraw as needed up to your approved limit and interest accrues only on the amount utilised daily. Ideal for businesses with irregular cash flows." },
  { q: "Can proprietorships and partnerships apply?",               a: "Yes. We work with all business structures — sole proprietorships, partnerships, LLPs, private limited companies, and OPCs. Requirements vary slightly by structure but all are eligible to apply." },
  { q: "How long does it take to get the loan?",                    a: "Approval decisions typically come within 48 hours of complete document submission. Disbursement follows in 2–3 working days after agreement signing. Complex or large-ticket loans may take 5–7 working days for due diligence." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ border: open ? "1px solid rgba(22,163,74,0.3)" : "1px solid #f0f0f0", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-sm font-semibold pr-4" style={{ color: "#1a1a1a" }}>{q}</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ background: open ? "#16a34a" : "#f4f5f7" }}>
          <ChevronDown size={14}
            style={{ color: open ? "#fff" : "#6b7280", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export default function BusinessLoanPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — Light background
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#fffbf5" }}>

        {/* Top orange accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #f97316 0%, #f59e0b 50%, #f97316 100%)" }} />

        {/* Subtle dot texture */}
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

        {/* Soft orange glow top-right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">

          {/* Pill badge */}
          <div className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.20)" }}>
              <Briefcase size={13} style={{ color: "#f97316" }} />
              <span className="text-xs font-semibold" style={{ color: "#ea580c" }}>
                Business Loan · Bangalore · SME &amp; MSME Specialists
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h1 className="font-extrabold leading-[1.08] tracking-tight mb-5"
              style={{ fontSize: "clamp(36px, 5.5vw, 64px)", color: "#111827" }}>
              Fund Your Business.{" "}
              <span style={{ color: "#f97316" }}>Grow Without Limits.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-2" style={{ color: "#6b7280" }}>
              Working capital, machinery, expansion, or overdraft —{" "}
              <strong style={{ color: "#111827" }}>₹5L to ₹2 Crore</strong> from{" "}
              <strong style={{ color: "#f97316" }}>60+ lenders</strong> at rates from{" "}
              <strong style={{ color: "#16a34a" }}>12% p.a.</strong>
            </p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              Subject to credit &amp; business assessment · Rates 12%–36% p.a. · Tenure 12–84 months
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
                style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", boxShadow: "0 6px 24px rgba(249,115,22,0.28)" }}>
                Talk to Business Advisor — Free
                <ArrowRight size={15} />
              </span>
            </Link>
            <Link href="/emi-calculator">
              <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold cursor-pointer transition-all"
                style={{ background: "#fff", border: "1.5px solid #e5e7eb", color: "#374151", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <Zap size={15} style={{ color: "#f97316" }} />
                Calculate EMI
              </span>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-6 flex-wrap mb-12">
            {[
              { icon: CheckCircle2, text: "RBI Compliant Lenders",    color: "#16a34a" },
              { icon: Shield,       text: "No Hidden Charges",        color: "#f97316" },
              { icon: Users,        text: "All Business Structures",  color: "#3b82f6" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={14} style={{ color }} />
                <span className="text-xs font-medium" style={{ color: "#6b7280" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Product type strip */}
          <div className="mb-10">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "#9ca3af" }}>
              6 Business Loan Products
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { icon: BarChart3,   label: "Working Capital",    color: "#3b82f6", amount: "₹5L–₹1Cr" },
                { icon: Factory,     label: "Equipment Finance",  color: "#f97316", amount: "₹10L–₹2Cr" },
                { icon: TrendingUp,  label: "Business Expansion", color: "#16a34a", amount: "₹10L–₹2Cr" },
                { icon: CreditCard,  label: "Overdraft / LOC",    color: "#8b5cf6", amount: "₹5L–₹75L" },
                { icon: ShoppingBag, label: "MSME / SME Loan",    color: "#0891b2", amount: "₹1L–₹1Cr" },
                { icon: Truck,       label: "Invoice Discounting", color: "#d97706", amount: "₹5L–₹50L" },
              ].map(pt => {
                const Icon = pt.icon;
                return (
                  <div key={pt.label}
                    className="rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-200 cursor-default"
                    style={{ background: "#fff", border: "1.5px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5"
                      style={{ background: `${pt.color}12` }}>
                      <Icon size={18} style={{ color: pt.color }} />
                    </div>
                    <p className="text-[11px] font-semibold leading-tight mb-1" style={{ color: "#111827" }}>{pt.label}</p>
                    <p className="text-[10px] font-mono font-bold" style={{ color: pt.color }}>{pt.amount}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats bar */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1.5px solid #f0f0f0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: "60+",   label: "Partner Banks & NBFCs",  sub: "Incl. fintechs",          color: "#f97316" },
                { value: "48hr",  label: "Loan Approval Time",     sub: "From doc submission",     color: "#16a34a" },
                { value: "12%",   label: "Starting Interest Rate", sub: "Per annum (secured)",     color: "#f97316" },
                { value: "₹2 Cr", label: "Maximum Loan Amount",    sub: "For eligible businesses", color: "#3b82f6" },
              ].map((s, i) => (
                <div key={s.label} className="px-6 py-5 text-center"
                  style={{ borderRight: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                  <p className="font-extrabold font-mono text-2xl md:text-3xl leading-none mb-1"
                    style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "#111827" }}>{s.label}</p>
                  <p className="text-[10px]" style={{ color: "#9ca3af" }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Wave divider */}
        <div className="w-full" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "40px" }}>
            <path d="M0 40 L0 20 Q360 0 720 20 Q1080 40 1440 20 L1440 40 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LOAN TYPES — 6-card grid
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
              Products
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              Choose the Right{" "}
              <span style={{ color: "#16a34a" }}>Business Loan</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
              Different businesses need different capital solutions. We offer 6 products — our advisors help you choose the right one for your exact need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {loanTypes.map((lt, i) => {
              const Icon = lt.icon;
              return (
                <div key={lt.title}
                  className="group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  style={{
                    background: i === 0 ? "#1a1a1a" : "#fff",
                    border: i === 0 ? "none" : "1px solid #f0f0f0",
                    boxShadow: i === 0 ? "0 20px 60px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
                  }}>
                  {i === 0 && (
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${lt.color}30 0%, transparent 70%)` }} />
                  )}
                  <div className="flex items-start justify-between mb-5 relative">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: i === 0 ? `${lt.color}25` : `${lt.color}12` }}>
                      <Icon size={20} style={{ color: lt.color }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={i === 0
                        ? { background: `${lt.color}20`, color: lt.color }
                        : { background: `${lt.color}10`, color: lt.color }}>
                      {lt.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-2 relative" style={{ color: i === 0 ? "#fff" : "#1a1a1a" }}>
                    {lt.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 relative" style={{ color: i === 0 ? "rgba(255,255,255,0.5)" : "#6b7280" }}>
                    {lt.desc}
                  </p>
                  <div className="flex items-center gap-3 relative">
                    <div className="rounded-lg px-3 py-1.5" style={{ background: i === 0 ? "rgba(255,255,255,0.07)" : "#f9fafb" }}>
                      <p className="text-[10px] font-medium mb-0.5" style={{ color: i === 0 ? "rgba(255,255,255,0.35)" : "#9ca3af" }}>Amount</p>
                      <p className="text-xs font-bold font-mono" style={{ color: i === 0 ? "#fff" : "#1a1a1a" }}>{lt.amount}</p>
                    </div>
                    <div className="rounded-lg px-3 py-1.5" style={{ background: i === 0 ? "rgba(255,255,255,0.07)" : "#f9fafb" }}>
                      <p className="text-[10px] font-medium mb-0.5" style={{ color: i === 0 ? "rgba(255,255,255,0.35)" : "#9ca3af" }}>Tenure</p>
                      <p className="text-xs font-bold font-mono" style={{ color: i === 0 ? "#fff" : "#1a1a1a" }}>{lt.tenure}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY OPENCREDIT — Features
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Why OpenCredit
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              The Smarter Way to{" "}
              <span style={{ color: "#16a34a" }}>Fund Your Business</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
              We don't just connect you to one lender — we navigate 60+ options to find the best fit for your business profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#fff",
                    border: "1px solid #f0f0f0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(22,163,74,0.08)" }}>
                      <Icon size={20} style={{ color: "#16a34a" }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: "#f0fdf4", color: "#16a34a" }}>
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#1a1a1a" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS — 5 Steps
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              Get Your Business Loan in{" "}
              <span style={{ color: "#16a34a" }}>5 Steps</span>
            </h2>
            <p className="text-base" style={{ color: "#6b7280" }}>
              From sharing your business details to receiving funds — fully digital, advisor-assisted.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px mx-32"
              style={{ background: "linear-gradient(to right, transparent, #f97316 20%, #f97316 80%, transparent)" }} />

            <div className="grid md:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center">
                  <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 relative z-10"
                    style={{
                      background: i === 0 ? "#f97316" : "#fff",
                      border: i === 0 ? "none" : "2px solid #e5e7eb",
                      boxShadow: i === 0 ? "0 10px 40px rgba(249,115,22,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                    }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: i === 0 ? "rgba(255,255,255,0.7)" : "#9ca3af" }}>{step.num}</span>
                    <ChevronRight size={16} style={{ color: i === 0 ? "#fff" : "#f97316", marginTop: "2px" }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#1a1a1a" }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
                style={{ background: "#16a34a" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}>
                Talk to Our Business Advisor
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
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              Does Your Business{" "}
              <span style={{ color: "#16a34a" }}>Qualify?</span>
            </h2>
            <p className="text-base" style={{ color: "#6b7280" }}>Check eligibility criteria and documents needed to apply.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Eligibility */}
            <div className="bg-white rounded-3xl p-8"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff7ed" }}>
                  <Star size={18} style={{ color: "#f97316" }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#1a1a1a" }}>Eligibility Criteria</h3>
              </div>
              <div className="space-y-0">
                {eligibility.map((item, i) => (
                  <div key={item.label} className="flex items-center justify-between py-3.5"
                    style={{ borderBottom: i < eligibility.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                    <span className="text-sm" style={{ color: "#6b7280" }}>{item.label}</span>
                    <span className="text-sm font-semibold text-right" style={{ color: "#1a1a1a" }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl p-4" style={{ background: "#fff7ed", border: "1px solid rgba(249,115,22,0.15)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  <strong style={{ color: "#1a1a1a" }}>Note:</strong> Eligibility varies by lender and loan product. Final assessment is at the lender&apos;s discretion. Subject to credit and business due diligence.
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-3xl p-8"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                  <FileText size={18} style={{ color: "#16a34a" }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#1a1a1a" }}>Documents Required</h3>
              </div>
              <ul className="space-y-3 mb-6">
                {documents.map(doc => (
                  <li key={doc} className="flex items-center gap-3 text-sm" style={{ color: "#374151" }}>
                    <CheckCircle2 size={16} style={{ color: "#16a34a", flexShrink: 0 }} />
                    {doc}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl p-4 mb-6 flex items-start gap-3" style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                <Landmark size={14} style={{ color: "#16a34a", flexShrink: 0, marginTop: "1px" }} />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  Documents vary by loan product and amount. For secured loans above ₹50L, property documents and valuation report are also required.
                </p>
              </div>
              <Link href="/contact">
                <span className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
                  style={{ background: "#16a34a" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}>
                  Get Free Eligibility Check
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PARTNER BANKS
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>
              Our lending network
            </p>
            <h2 className="text-2xl font-extrabold" style={{ color: "#1a1a1a" }}>
              60+ Banks, NBFCs & Fintech Lenders
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map(p => (
              <div key={p} className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-sm"
                style={{ background: "#f9fafb", border: "1px solid #f0f0f0", color: "#374151" }}>
                {p}
              </div>
            ))}
            <div className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "#f0fdf4", border: "1px solid rgba(22,163,74,0.2)", color: "#16a34a" }}>
              + 44 more
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#0d0d0d" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>
              Customer Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              Businesses That{" "}
              <span style={{ color: "#4ade80" }}>Grew With Us.</span>
            </h2>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
              Real Bangalore business owners. Real capital. Real growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className="rounded-2xl p-6"
                style={{
                  background: i === 0 ? "#fff" : "rgba(255,255,255,0.04)",
                  border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: i === 0 ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
                }}>
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} fill="#facc15" style={{ color: "#facc15" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5"
                  style={{ color: i === 0 ? "#374151" : "rgba(255,255,255,0.6)" }}>
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex gap-2 mb-5">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full font-mono"
                    style={i === 0 ? { background: "#f0fdf4", color: "#16a34a" } : { background: "rgba(22,163,74,0.15)", color: "#4ade80" }}>
                    {t.amount}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full"
                    style={i === 0 ? { background: "#f3f4f6", color: "#6b7280" } : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
                    @ {t.rate} p.a.
                  </span>
                </div>
                <div style={{ borderTop: i === 0 ? "1px solid #f3f4f6" : "1px solid rgba(255,255,255,0.07)" }} className="mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: i === 0 ? "#111827" : "#fff" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: i === 0 ? "#9ca3af" : "rgba(255,255,255,0.35)" }}>
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a1a" }}>
              Common{" "}
              <span style={{ color: "#16a34a" }}>Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>
            Get Started Today
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Fuel Your{" "}
            <span style={{ color: "#4ade80" }}>Business Growth?</span>
          </h2>
          <p className="text-base mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            Talk to our business loan advisor — free consultation, no obligation.
          </p>

          <div className="rounded-2xl p-4 mb-10 text-xs text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
            Interest rates: 12%–36% p.a. &nbsp;·&nbsp; Loan amount: ₹5,00,000–₹2,00,00,000 &nbsp;·&nbsp; Tenure: 12–84 months
            <br />Subject to credit and business assessment. Loans disbursed by RBI-registered partner banks/NBFCs.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white cursor-pointer transition-all"
                style={{ background: "#16a34a" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}>
                Talk to Business Advisor — Free
                <ArrowRight size={18} />
              </span>
            </Link>
            <Link href="/emi-calculator">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold cursor-pointer transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}>
                <Zap size={16} />
                Calculate EMI
              </span>
            </Link>
          </div>

          <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
            Open Credit is a loan marketplace/DSA. Loans disbursed by RBI registered partner banks/NBFCs.
          </p>
        </div>
      </section>
    </>
  );
}
