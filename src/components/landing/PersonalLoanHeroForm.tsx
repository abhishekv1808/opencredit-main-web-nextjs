"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function PersonalLoanHeroForm() {
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
        body: JSON.stringify({ phone: heroPhone, source: "personal_loan_hero" }),
      });
      setHeroSubmitted(true);
    } catch {
      setHeroSubmitted(true);
    } finally {
      setHeroSubmitting(false);
    }
  }, [heroPhone]);

  return (
    <>
      {/* Hero phone form */}
      <div className="mb-6">
        {!heroSubmitted ? (
          <form onSubmit={handleHeroSubmit} className="flex gap-2 max-w-md">
            <input
              type="tel"
              required
              placeholder="Enter mobile number"
              value={heroPhone}
              onChange={e => setHeroPhone(e.target.value)}
              className="flex-1 min-w-0 px-5 py-3.5 rounded-xl text-sm outline-none transition-all placeholder-gray-400"
              style={{
                border: "1.5px solid #d1d5db",
                background: "#fff",
                color: "#111827",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(22,163,74,0.1)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            />
            <button
              type="submit"
              disabled={heroSubmitting}
              className="flex-shrink-0 flex items-center gap-1.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: heroSubmitting ? "#15803d" : "#16a34a",
                boxShadow: "0 8px 24px rgba(22,163,74,0.28)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { if(!heroSubmitting) { (e.currentTarget as HTMLElement).style.background = "#15803d"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(22,163,74,0.38)"; } }}
              onMouseLeave={e => { if(!heroSubmitting) { (e.currentTarget as HTMLElement).style.background = "#16a34a"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(22,163,74,0.28)"; } }}
            >
              {heroSubmitting ? "…" : <><span>Get Rate</span> <ArrowRight size={14} /></>}
            </button>
          </form>
        ) : (
          <div
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
          >
            <CheckCircle2 size={15} style={{ color: "#16a34a" }} />
            <span className="text-sm font-semibold" style={{ color: "#15803d" }}>
              Got it! An advisor will call you shortly.
            </span>
          </div>
        )}
        {!heroSubmitted && (
          <p className="text-xs mt-2.5 font-medium" style={{ color: "#6b7280" }}>
            Free · No credit impact · Advisor calls within 15 min
          </p>
        )}
      </div>

      {/* Secondary CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <Link href="/register">
          <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer text-white"
            style={{
              background: "#16a34a",
              boxShadow: "0 8px 24px rgba(22,163,74,0.28)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#15803d"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(22,163,74,0.38)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(22,163,74,0.28)"; }}
            >
            Apply Now — It&apos;s Free
            <ArrowRight size={15} />
          </span>
        </Link>
        <Link href="/emi-calculator">
          <span
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer"
            style={{
              background: "#fff",
              border: "1.5px solid #d1d5db",
              color: "#374151",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#16a34a"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
          >
            <Zap size={15} />
            Calculate EMI
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
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              color: "#374151",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <span>{item.emoji}</span>
            {item.text}
          </span>
        ))}
      </div>
    </>
  );
}
