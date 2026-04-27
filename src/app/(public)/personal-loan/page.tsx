import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle2, Shield, Clock, Zap, Star,
  ChevronRight, Home, GraduationCap, Heart,
  Plane, Car, Briefcase, Wrench, CreditCard, TrendingUp,
  Users, Building2, BadgeCheck, Timer, IndianRupee, Percent,
} from "lucide-react";
import ActivityTicker from "@/components/shared/ActivityTicker";
import EligibilityWidget from "@/components/landing/EligibilityWidget";
import PersonalLoanHeroForm from "@/components/landing/PersonalLoanHeroForm";
import PersonalLoanFAQ from "@/components/landing/PersonalLoanFAQ";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { loanProductSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = generatePageMetadata({
  title: "Personal Loan in Bangalore | From 10.25% p.a.",
  description:
    "Apply for personal loan in Bangalore from ₹50,000 to ₹40 Lakhs at 10.25% p.a. Instant approval, 24-hour disbursal, 60+ partner banks. No collateral. Free application.",
  path: "/personal-loan",
});

/* ─── Data ─────────────────────────────────────────── */
const stats = [
  { icon: Building2,  value: "60+",     label: "Partner Banks & NBFCs" },
  { icon: Timer,      value: "24hr",    label: "Disbursement Time" },
  { icon: Percent,    value: "10.25%",  label: "Starting Interest Rate" },
  { icon: IndianRupee,value: "₹40L",    label: "Maximum Loan Amount" },
];

const steps = [
  { num: "01", title: "Select Amount & Tenure", desc: "Choose your required loan amount (₹50K–₹40L) and repayment period (12–60 months) using our smart calculator." },
  { num: "02", title: "Fill Your Information",  desc: "Provide personal, employment, and income details. Completely digital — no branch visit needed." },
  { num: "03", title: "Review Offers",          desc: "Get up to 10 pre-approved offers from our 60+ partner lenders within minutes. Compare rates & terms." },
  { num: "04", title: "Confirm & Submit",       desc: "Choose your preferred lender, upload documents digitally, and submit your application with one click." },
  { num: "05", title: "Receive Funds",          desc: "Approved amount is disbursed directly to your bank account within 24 hours of final approval." },
];

const features = [
  { icon: Zap,        title: "10 Offers in 5 Minutes",      desc: "With 60+ partner institutions, receive up to 10 pre-approved credit offers almost instantly after applying.", badge: "Fastest" },
  { icon: Shield,     title: "Zero Hidden Fees",            desc: "Complete transparency — no surprise charges. The EMI you calculate is exactly what you pay. No processing surprises.", badge: "Transparent" },
  { icon: Clock,      title: "24-Hour Disbursement",        desc: "Money deposited to your account within 24 hours of approval. No delays, no waiting at counters.", badge: "Quick" },
  { icon: BadgeCheck, title: "No Collateral Needed",        desc: "100% unsecured loan. No property, gold, or guarantor required. Approval based purely on creditworthiness.", badge: "Unsecured" },
  { icon: TrendingUp, title: "Best Rate Matching",          desc: "We match you with lenders offering the lowest rates for your profile — salaried, self-employed, or business owner.", badge: "Smart" },
  { icon: Users,      title: "Dedicated Support",           desc: "A dedicated loan advisor guides you from application to disbursement, answering every question along the way.", badge: "Assisted" },
];

const purposes = [
  { icon: Home,          label: "Home Renovation",    color: "#3b82f6", image: "/images/usecase-home-renovation.jpg" },
  { icon: GraduationCap, label: "Education",          color: "#8b5cf6", image: "/images/usecase-education.jpg" },
  { icon: Heart,         label: "Medical",            color: "#ef4444", image: null },
  { icon: Plane,         label: "Travel",             color: "#16a34a", image: "/images/usecase-travel.jpg" },
  { icon: Car,           label: "Vehicle",            color: "#f97316", image: "/images/usecase-finance-control.jpeg" },
  { icon: Briefcase,     label: "Business",           color: "#0891b2", image: null },
  { icon: Wrench,        label: "Repairs",            color: "#d97706", image: null },
  { icon: CreditCard,    label: "Debt Consolidation", color: "#6366f1", image: "/images/usecase-finance-control.jpeg" },
];

const eligibility = [
  { label: "Age",             value: "21 – 60 years" },
  { label: "Employment",      value: "Salaried / Self-employed / Business" },
  { label: "Min. Income",     value: "₹25,000/month (salaried)" },
  { label: "CIBIL Score",     value: "650+ (higher = better rate)" },
  { label: "Work Experience", value: "1+ year current employer" },
  { label: "Location",        value: "Bangalore & Karnataka" },
];

const documents = [
  "PAN Card",
  "Aadhaar Card / Voter ID",
  "Last 3 months salary slips",
  "6 months bank statement",
  "Latest ITR (self-employed)",
  "Passport-size photograph",
];

const partners = [
  "HDFC Bank", "ICICI Bank", "Axis Bank", "Bajaj Finserv",
  "Kotak Mahindra", "IDFC First", "Tata Capital", "HDB Financial",
  "Fullerton India", "Piramal Finance", "L&T Finance", "Muthoot Finance",
  "Home Credit", "IIFL Finance",
];

const testimonials = [
  { name: "Priya Sharma",    role: "Software Engineer",    location: "Whitefield",      amount: "₹8L",  rate: "11.5%", review: "Applied Monday morning, funds in my account by Wednesday. Completely paperless. Team was super responsive.", avatar: "PS", color: "#8b5cf6" },
  { name: "Rakesh Nair",     role: "Business Owner",       location: "Koramangala",     amount: "₹15L", rate: "12.5%", review: "Worried my self-employed status would be a problem. OpenCredit matched me with 3 lenders who specialise in business loans.", avatar: "RN", color: "#3b82f6" },
  { name: "Deepa Menon",     role: "School Teacher",       location: "Jayanagar",       amount: "₹3L",  rate: "13.0%", review: "As a government school teacher I was sceptical. But they found a bank that considers my income type favourably. Amazing!", avatar: "DM", color: "#ec4899" },
  { name: "Vikram Reddy",    role: "Marketing Manager",    location: "HSR Layout",      amount: "₹5L",  rate: "11.0%", review: "Very transparent process. No hidden charges. The EMI I calculated online matched my actual EMI exactly.", avatar: "VR", color: "#f97316" },
  { name: "Ananya Krishnan", role: "Doctor",               location: "Indiranagar",     amount: "₹25L", rate: "10.5%", review: "Quick, professional, and the rates were better than what I expected. Disbursement in less than 24 hours. Highly recommend!", avatar: "AK", color: "#16a34a" },
  { name: "Suresh Pillai",   role: "IT Manager",           location: "Electronic City", amount: "₹12L", rate: "11.8%", review: "5 lender offers within 10 minutes of applying. Chose the best one. The entire experience was smooth and stress-free.", avatar: "SP", color: "#0891b2" },
];

/* ─── Page ──────────────────────────────────────────── */
export default function PersonalLoanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loanProductSchema("personal")) }}
      />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#f0faf4", minHeight: "100vh", display: "flex", alignItems: "center" }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #16a34a18 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.13) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #16a34a 0%, #22c55e 50%, #16a34a 100%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
                style={{ background: "rgba(22,163,74,0.10)", border: "1px solid rgba(22,163,74,0.22)" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: "#16a34a" }} />
                <span className="text-xs font-semibold" style={{ color: "#15803d" }}>
                  Personal Loan · Bangalore · Instant Approval
                </span>
              </div>

              <h1 className="font-extrabold leading-[1.08] tracking-tight mb-6" style={{ fontSize: "clamp(38px,5.5vw,64px)", color: "#0f1a0f" }}>
                Unsecured{" "}
                <span style={{ color: "#16a34a" }}>Personal Loan</span>
                <br />up to{" "}
                <span className="relative inline-block">
                  <span style={{ color: "#16a34a" }}>₹40 Lakhs</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6 Q100 1 198 6" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg mb-3 max-w-lg leading-relaxed" style={{ color: "#4b5563" }}>
                Minimal documentation. Completely digital. Lowest rate of interest from{" "}
                <span className="font-bold" style={{ color: "#16a34a" }}>10.25% p.a.</span>{" "}
                with disbursement in just 24 hours.
              </p>
              <p className="text-xs mb-10" style={{ color: "#9ca3af" }}>
                Subject to credit assessment · Rates 10.25%–36% p.a. · Tenure 12–60 months
              </p>

              {/* Interactive hero form + CTAs (client component) */}
              <PersonalLoanHeroForm />
            </div>

            {/* Right — Hero Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg" style={{ transform: "rotate(1.5deg)" }}>
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.18)" }}>
                  <Image
                    src="/images/hero-loan-approval.jpg"
                    alt="Personal loan approval on mobile"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Floating disbursal badge */}
                <div className="absolute -bottom-4 -left-6 rounded-2xl px-5 py-3.5 flex items-center gap-3"
                  style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                    <Zap size={16} style={{ color: "#16a34a" }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: "#9ca3af" }}>Disbursed in</p>
                    <p className="font-extrabold text-sm font-mono" style={{ color: "#1a1a1a" }}>24 hours</p>
                  </div>
                </div>
                {/* Floating rate badge */}
                <div className="absolute -top-4 -right-4 rounded-2xl px-5 py-3 text-center"
                  style={{ background: "#16a34a", boxShadow: "0 8px 32px rgba(22,163,74,0.35)" }}>
                  <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wide">From</p>
                  <p className="text-white font-extrabold text-xl font-mono leading-none">10.25%</p>
                  <p className="text-white/70 text-[10px] mt-0.5">p.a.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Mobile stat bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16 lg:hidden">
            {stats.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl p-4 text-center"
                  style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <Icon size={16} className="mx-auto mb-1" style={{ color: "#16a34a" }} />
                  <p className="font-bold font-mono text-xl mb-1" style={{ color: "#16a34a" }}>{s.value}</p>
                  <p className="text-[11px]" style={{ color: "#6b7280" }}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#ffffff" />
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
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Why OpenCredit
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              The Smarter Way to{" "}
              <span style={{ color: "#16a34a" }}>Borrow</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
              We have more than 60 partner financial institutions registered. Compare, choose, and get the best deal — all in one place.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Advisor image */}
            <div className="relative rounded-2xl overflow-hidden flex-shrink-0"
              style={{ aspectRatio: "4/3", maxWidth: "520px", boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}>
              <Image
                src="/images/features-advisor-customer.jpg"
                alt="OpenCredit loan advisor helping customer"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* Right — Feature cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: i === 0 ? "#1a1a1a" : "#fff",
                      border: i === 0 ? "none" : "1px solid #f0f0f0",
                      boxShadow: i === 0 ? "0 20px 60px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
                    }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: i === 0 ? "rgba(22,163,74,0.2)" : "rgba(22,163,74,0.08)" }}>
                        <Icon size={18} style={{ color: "#16a34a" }} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={i === 0
                          ? { background: "rgba(74,222,128,0.15)", color: "#4ade80" }
                          : { background: "#f0fdf4", color: "#16a34a" }}>
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm mb-1.5" style={{ color: i === 0 ? "#fff" : "#1a1a1a" }}>
                      {f.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: i === 0 ? "rgba(255,255,255,0.5)" : "#6b7280" }}>
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 3-step eligibility widget */}
      <EligibilityWidget />

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              Get Your Loan in{" "}
              <span style={{ color: "#16a34a" }}>5 Easy Steps</span>
            </h2>
            <p className="text-base" style={{ color: "#6b7280" }}>
              From application to disbursement — the entire journey is digital and takes under 10 minutes.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px mx-32"
              style={{ background: "linear-gradient(to right, transparent, #16a34a 20%, #16a34a 80%, transparent)" }} />

            <div className="grid md:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center">
                  <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 relative z-10"
                    style={{
                      background: i === 0 ? "#16a34a" : "#fff",
                      border: i === 0 ? "none" : "2px solid #e5e7eb",
                      boxShadow: i === 0 ? "0 10px 40px rgba(22,163,74,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                    }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: i === 0 ? "rgba(255,255,255,0.6)" : "#9ca3af" }}>{step.num}</span>
                    <ChevronRight size={16} style={{ color: i === 0 ? "#fff" : "#16a34a", marginTop: "2px" }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#1a1a1a" }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{step.desc}</p>
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
          LOAN PURPOSES
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
              Multipurpose
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              What Can You{" "}
              <span style={{ color: "#16a34a" }}>Use It For?</span>
            </h2>
            <p className="text-base" style={{ color: "#6b7280" }}>
              Personal loans are flexible — use them for any legitimate financial need.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {purposes.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.label}
                  className="group rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "#fff", border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

                  {p.image ? (
                    <div className="relative overflow-hidden rounded-t-2xl" style={{ height: "190px" }}>
                      <Image
                        src={p.image}
                        alt={`Personal loan for ${p.label}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }} />
                      <p className="absolute bottom-3 left-4 text-sm font-bold text-white drop-shadow">{p.label}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-t-2xl"
                      style={{ height: "190px", background: `${p.color}0f` }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                        style={{ background: `${p.color}18` }}>
                        <Icon size={26} style={{ color: p.color }} />
                      </div>
                      <p className="text-sm font-bold" style={{ color: "#374151" }}>{p.label}</p>
                    </div>
                  )}

                  {p.image && (
                    <div className="flex items-center gap-2 px-4 py-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${p.color}15` }}>
                        <Icon size={12} style={{ color: p.color }} />
                      </div>
                      <p className="text-xs font-semibold" style={{ color: "#374151" }}>{p.label}</p>
                    </div>
                  )}
                </div>
              );
            })}
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
              Are You{" "}
              <span style={{ color: "#16a34a" }}>Eligible?</span>
            </h2>
            <p className="text-base" style={{ color: "#6b7280" }}>Check the basic criteria and documents needed to apply.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Eligibility */}
            <div className="bg-white rounded-3xl p-8"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                  <Star size={18} style={{ color: "#16a34a" }} />
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
              <div className="mt-6 rounded-xl p-4" style={{ background: "#f0fdf4", border: "1px solid rgba(22,163,74,0.15)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  <strong style={{ color: "#1a1a1a" }}>Note:</strong> Exact eligibility depends on the specific lender&apos;s credit assessment. Subject to credit approval and lender terms.
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
                <Clock size={14} style={{ color: "#16a34a", flexShrink: 0, marginTop: "1px" }} />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  Upload all documents digitally — no physical submission. Max 5MB per file (PDF, JPG, PNG).
                </p>
              </div>
              <Link href="/register">
                <span className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer bg-green-600 hover:bg-green-700 transition-colors">
                  Start Application
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
              Trusted by Bangalore&apos;s top lenders
            </p>
            <h2 className="text-2xl font-extrabold" style={{ color: "#1a1a1a" }}>
              60+ Partner Banks & NBFCs
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
              + 46 more
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#0d0d0d" }}>

        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/testimonials-bangalore-team.jpg"
            alt="Happy OpenCredit customers in Bangalore"
            fill
            className="object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.78)" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.15)", color: "#4ade80" }}>
              Customer Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              Real People.{" "}
              <span style={{ color: "#4ade80" }}>Real Results.</span>
            </h2>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
              Over 4,200 Bangalore residents have trusted OpenCredit.
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

      {/* FAQ — client component (accordion state) */}
      <PersonalLoanFAQ />

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(22,163,74,0.15) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(22,163,74,0.15)", color: "#4ade80" }}>
            Apply Today
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Get Your{" "}
            <span style={{ color: "#4ade80" }}>Loan?</span>
          </h2>
          <p className="text-base mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            It takes just 10 minutes. No branch visit. No collateral.
          </p>

          <div className="rounded-2xl p-4 mb-10 text-xs text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>
            Interest rates: 10.25%–36% p.a. &nbsp;·&nbsp; Loan amount: ₹50,000–₹40,00,000 &nbsp;·&nbsp; Tenure: 12–60 months
            <br />Subject to credit approval and lender eligibility criteria.
          </div>

          <Link href="/register">
            <span className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white cursor-pointer bg-green-600 hover:bg-green-700 transition-colors">
              Apply for Personal Loan — Free
              <ArrowRight size={18} />
            </span>
          </Link>

          <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
            Open Credit is a loan marketplace/DSA. Loans disbursed by RBI registered partner banks/NBFCs.
          </p>
        </div>
      </section>
    </>
  );
}
