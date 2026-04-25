"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Star, Zap, Shield, Clock,
  Building2, Timer, Percent, Banknote, ChevronRight, MapPin,
} from "lucide-react";
import { type LocationData } from "@/lib/data/locations";
import ActivityTicker from "@/components/shared/ActivityTicker";
import EligibilityWidget from "@/components/landing/EligibilityWidget";

export default function LocationPersonalLoanPage({ loc }: { loc: LocationData }) {
  const [heroPhone, setHeroPhone] = useState("");
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);

  const handleHeroSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!heroPhone) return;
    setHeroSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: heroPhone,
          source: `location_hero_${loc.slug}`,
        }),
      });
    } catch { /* fail silently */ }
    setHeroSubmitted(true);
    setHeroSubmitting(false);
  }, [heroPhone, loc.slug]);

  const stats = [
    { icon: Building2, value: "60+",          label: "Partner Lenders" },
    { icon: Timer,     value: loc.disbursalTime, label: "Avg. Disbursal" },
    { icon: Percent,   value: loc.avgRate,     label: "Avg. Rate" },
    { icon: Banknote,  value: loc.approvedCount, label: `Approved in ${loc.name}` },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#f0faf4", minHeight: "88vh", display: "flex", alignItems: "center" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #16a34a1a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Blobs */}
        <div
          className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.13) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%)" }}
        />
        {/* Top stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #16a34a, #22c55e, #16a34a)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-8" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors" style={{ color: "#9ca3af" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#16a34a"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#9ca3af"}>
              Home
            </Link>
            <ChevronRight size={12} style={{ color: "#d1d5db" }} />
            <Link href="/personal-loan" className="transition-colors" style={{ color: "#9ca3af" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#16a34a"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#9ca3af"}>
              Personal Loan
            </Link>
            <ChevronRight size={12} style={{ color: "#d1d5db" }} />
            <span style={{ color: "#374151", fontWeight: 600 }}>{loc.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left — Copy */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7"
                style={{ background: "rgba(22,163,74,0.10)", border: "1px solid rgba(22,163,74,0.22)" }}
              >
                <MapPin size={13} style={{ color: "#16a34a" }} />
                <span className="text-xs font-semibold" style={{ color: "#15803d" }}>
                  {loc.name} · {loc.area} · Instant Approval
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-extrabold leading-[1.08] tracking-tight mb-5"
                style={{ fontSize: "clamp(34px,5vw,58px)", color: "#0f1a0f" }}
              >
                Personal Loan in{" "}
                <span style={{ color: "#16a34a" }}>{loc.name}</span>
                <br />up to{" "}
                <span className="relative inline-block">
                  <span style={{ color: "#16a34a" }}>₹40 Lakhs</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6 Q100 1 198 6" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg mb-2 max-w-lg leading-relaxed" style={{ color: "#4b5563" }}>
                Minimal documentation. 100% online. Best rate from{" "}
                <strong style={{ color: "#16a34a" }}>10.25% p.a.</strong>{" "}
                with funds in your account within 24 hours.
              </p>
              <p className="text-xs mb-8" style={{ color: "#9ca3af" }}>
                Subject to credit assessment · Rates 10.25%–36% p.a. · Tenure 12–60 months
              </p>

              {/* Hero phone form */}
              <div className="mb-6">
                {!heroSubmitted ? (
                  <form onSubmit={handleHeroSubmit} className="flex gap-2 max-w-sm">
                    <input
                      type="tel"
                      required
                      placeholder="Enter mobile number"
                      value={heroPhone}
                      onChange={e => setHeroPhone(e.target.value)}
                      className="flex-1 min-w-0 px-4 py-3.5 rounded-xl text-sm outline-none"
                      style={{
                        border: "1.5px solid #d1d5db",
                        background: "#fff",
                        color: "#1a1a1a",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#16a34a")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#d1d5db")}
                    />
                    <button
                      type="submit"
                      disabled={heroSubmitting}
                      className="flex-shrink-0 flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-sm font-bold text-white"
                      style={{
                        background: heroSubmitting ? "#15803d" : "#16a34a",
                        boxShadow: "0 4px 16px rgba(22,163,74,0.32)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heroSubmitting ? "…" : <>Get Rate <ArrowRight size={14} /></>}
                    </button>
                  </form>
                ) : (
                  <div
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
                    style={{ background: "#f0fdf4", border: "1px solid rgba(22,163,74,0.25)" }}
                  >
                    <CheckCircle2 size={15} style={{ color: "#16a34a" }} />
                    <span className="text-sm font-semibold" style={{ color: "#15803d" }}>
                      Got it! An advisor will call you shortly.
                    </span>
                  </div>
                )}
                {!heroSubmitted && (
                  <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
                    Free · No credit impact · Advisor calls within 15 min
                  </p>
                )}
              </div>

              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-9">
                <Link href="/register">
                  <span
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white transition-all cursor-pointer"
                    style={{ background: "#1a1a1a" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#333"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1a1a1a"}
                  >
                    Apply Now — Free <ArrowRight size={15} />
                  </span>
                </Link>
                <Link href="/emi-calculator">
                  <span
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer"
                    style={{ background: "#fff", border: "1.5px solid #d1d5db", color: "#374151" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#16a34a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
                  >
                    <Zap size={15} /> Calculate EMI
                  </span>
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { emoji: "🏦", text: "60+ Banks" },
                  { emoji: "🔒", text: "RBI Compliant" },
                  { emoji: "⚡", text: "24-hr Disbursal" },
                ].map(item => (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#374151", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    {item.emoji} {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — local stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {/* Local social proof card */}
              <div
                className="col-span-2 rounded-3xl p-7 relative overflow-hidden"
                style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="absolute -right-8 -top-8 w-36 h-36 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)" }}
                />
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={18} style={{ color: "#16a34a" }} />
                  <p className="font-bold text-sm" style={{ color: "#1a1a1a" }}>
                    Trusted in {loc.name}
                  </p>
                </div>
                <p className="font-extrabold font-mono" style={{ fontSize: "clamp(36px,4vw,48px)", color: "#16a34a", lineHeight: 1 }}>
                  {loc.approvedCount}
                </p>
                <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                  loans approved for {loc.name} residents
                </p>
              </div>

              {/* Rate */}
              <div
                className="rounded-3xl p-6 flex flex-col justify-between"
                style={{ background: "linear-gradient(135deg, #15803d, #16a34a)", minHeight: "130px", boxShadow: "0 12px 32px rgba(22,163,74,0.28)" }}
              >
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">Avg. Rate in {loc.name}</p>
                <div>
                  <p className="text-white font-extrabold text-3xl font-mono leading-none">{loc.avgRate}</p>
                  <p className="text-white/70 text-xs mt-1">per annum</p>
                </div>
              </div>

              {/* Disbursal */}
              <div
                className="rounded-3xl p-6 flex flex-col justify-between"
                style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", minHeight: "130px" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9ca3af" }}>Avg. Disbursal</p>
                <div>
                  <p className="font-extrabold text-3xl font-mono leading-none" style={{ color: "#1a1a1a" }}>{loc.disbursalTime}</p>
                  <p className="text-xs mt-1" style={{ color: "#6b7280" }}>to bank account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stat bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14 lg:hidden">
            {stats.map(s => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                >
                  <p className="font-bold font-mono text-xl mb-1" style={{ color: "#16a34a" }}>{s.value}</p>
                  <p className="text-[11px]" style={{ color: "#6b7280" }}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Ticker */}
      <ActivityTicker />

      {/* ── FEATURES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: "#1a1a1a" }}>
              Why Residents Choose{" "}
              <span style={{ color: "#16a34a" }}>OpenCredit</span>
            </h2>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              Serving Bangalore since 2022 — one lender match at a time.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Zap,    title: "10 Offers in 5 Min",   desc: "From 60+ partners — receive pre-approved offers in minutes.", badge: "Fastest" },
              { icon: Shield, title: "Zero Hidden Fees",     desc: "Complete transparency. The EMI you calculate is what you pay.", badge: "Honest" },
              { icon: Clock,  title: "24-hr Disbursement",   desc: "Funds in your account within 24 hours of final approval.", badge: "Fast" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl p-7"
                  style={{
                    background: i === 0 ? "#1a1a1a" : "#fff",
                    border: i === 0 ? "none" : "1px solid #f0f0f0",
                    boxShadow: i === 0 ? "0 20px 60px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: i === 0 ? "rgba(22,163,74,0.2)" : "rgba(22,163,74,0.08)" }}
                    >
                      <Icon size={20} style={{ color: "#16a34a" }} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={i === 0 ? { background: "rgba(74,222,128,0.15)", color: "#4ade80" } : { background: "#f0fdf4", color: "#16a34a" }}
                    >
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: i === 0 ? "#fff" : "#1a1a1a" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: i === 0 ? "rgba(255,255,255,0.5)" : "#6b7280" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY WIDGET ── */}
      <EligibilityWidget />

      {/* ── LOCAL TESTIMONIALS ── */}
      <section className="py-20 md:py-24" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.15)", color: "#4ade80" }}
            >
              {loc.name} Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              What {loc.name} Residents Say
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Real borrowers, real results from your neighbourhood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {loc.testimonials.map((t, i) => (
              <div
                key={t.name}
                className="rounded-2xl p-6"
                style={{
                  background: i === 0 ? "#fff" : "rgba(255,255,255,0.04)",
                  border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: i === 0 ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
                }}
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} fill="#facc15" style={{ color: "#facc15" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: i === 0 ? "#374151" : "rgba(255,255,255,0.6)" }}>
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex gap-2 mb-5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full font-mono"
                    style={i === 0 ? { background: "#f0fdf4", color: "#16a34a" } : { background: "rgba(22,163,74,0.15)", color: "#4ade80" }}
                  >
                    {t.amount}
                  </span>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={i === 0 ? { background: "#f3f4f6", color: "#6b7280" } : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
                  >
                    @ {t.rate} p.a.
                  </span>
                </div>
                <div style={{ borderTop: i === 0 ? "1px solid #f3f4f6" : "1px solid rgba(255,255,255,0.07)" }} className="mb-4" />
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: i === 0 ? "#111827" : "#fff" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: i === 0 ? "#9ca3af" : "rgba(255,255,255,0.35)" }}>
                      {t.role} · {loc.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(22,163,74,0.15) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Ready for your{" "}
            <span style={{ color: "#4ade80" }}>{loc.name} loan?</span>
          </h2>
          <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            10 minutes online. No branch visit. No collateral.
          </p>
          <div
            className="rounded-2xl p-4 mb-8 text-xs text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
          >
            Interest rates: 10.25%–36% p.a. · Loan: ₹50,000–₹40,00,000 · Tenure: 12–60 months
            <br />Subject to credit approval and lender eligibility criteria.
          </div>
          <Link href="/register">
            <span
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white cursor-pointer transition-all"
              style={{ background: "#16a34a" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}
            >
              Apply for Personal Loan — Free
              <ArrowRight size={18} />
            </span>
          </Link>
          <p className="text-xs mt-5" style={{ color: "rgba(255,255,255,0.2)" }}>
            Open Credit is a loan marketplace/DSA. Loans disbursed by RBI registered partner banks/NBFCs.
          </p>
        </div>
      </section>
    </>
  );
}
