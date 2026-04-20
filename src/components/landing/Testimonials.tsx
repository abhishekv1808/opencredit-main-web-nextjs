"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "Whitefield, Bangalore",
    amount: "₹8 Lakh",
    purpose: "Home Renovation",
    rating: 5,
    review:
      "Applied on Monday morning and had the amount in my account by Wednesday! The entire process was online — no branch visits. The team was super helpful when I had questions about documentation.",
    score: 742,
    avatar: "PS",
    color: "#8b5cf6",
  },
  {
    name: "Rakesh Nair",
    role: "Business Owner",
    location: "Koramangala, Bangalore",
    amount: "₹15 Lakh",
    purpose: "Business Expansion",
    rating: 5,
    review:
      "I was worried my self-employed status would be a problem, but OpenCredit matched me with 3 lenders who specialise in business owner loans. Got approval at 12.5% p.a. — better than I expected.",
    score: 698,
    avatar: "RN",
    color: "#3b82f6",
  },
  {
    name: "Ananya Krishnan",
    role: "Doctor",
    location: "Indiranagar, Bangalore",
    amount: "₹25 Lakh",
    purpose: "Medical Equipment",
    rating: 5,
    review:
      "The CIBIL correction service helped fix 2 inaccurate entries bringing my score down. Within 60 days my score went from 680 to 735, and I got a much better interest rate on my loan!",
    score: 735,
    avatar: "AK",
    color: "#16a34a",
  },
  {
    name: "Vikram Reddy",
    role: "Marketing Manager",
    location: "HSR Layout, Bangalore",
    amount: "₹5 Lakh",
    purpose: "Wedding Expenses",
    rating: 5,
    review:
      "Very transparent process. No hidden charges, no surprise fees. The EMI calculator on their website was spot-on — my actual EMI matches exactly what I calculated.",
    score: 761,
    avatar: "VR",
    color: "#f97316",
  },
  {
    name: "Deepa Menon",
    role: "School Teacher",
    location: "Jayanagar, Bangalore",
    amount: "₹3 Lakh",
    purpose: "Education",
    rating: 5,
    review:
      "As a government school teacher I was sceptical about getting approved. But OpenCredit found a bank that considers my income type favourably. Simple, fast, and completely professional!",
    score: 718,
    avatar: "DM",
    color: "#ec4899",
  },
];

const stats = [
  { value: "4.8", label: "Average Rating", suffix: "/5" },
  { value: "2,400+", label: "Verified Reviews", suffix: "" },
  { value: "4,200+", label: "Happy Customers", suffix: "" },
  { value: "98%", label: "Approval Rate", suffix: "" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 200);
  };

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => go((current + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [current]);

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#0d0d0d" }}>
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

      {/* Green glow top-left */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.15)", color: "#4ade80" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Customer Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Real People.{" "}
              <span style={{ color: "#4ade80" }}>Real Results.</span>
            </h2>
            <p className="text-base mt-3 max-w-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
              Over 4,200 Bangalore residents have trusted OpenCredit for their financial needs.
            </p>
          </div>

          {/* Nav arrows — desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button onClick={prev} aria-label="Previous"
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all"
              style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; (e.currentTarget as HTMLElement).style.borderColor = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} aria-label="Next"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all text-white"
              style={{ background: "#16a34a" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className={`grid md:grid-cols-3 gap-5 transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}>
          {visible.map((t, i) => (
            <div key={`${t.name}-${current}-${i}`}
              className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: i === 0 ? "#ffffff" : "rgba(255,255,255,0.05)",
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                transform: i === 0 ? "translateY(-6px)" : "none",
                boxShadow: i === 0 ? "0 20px 60px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full flex-shrink-0"
                style={{ background: i === 0 ? "#16a34a" : "transparent" }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote size={28}
                    style={{ color: i === 0 ? "#16a34a" : "rgba(255,255,255,0.15)", transform: "scaleX(-1)" }}
                    fill={i === 0 ? "rgba(22,163,74,0.12)" : "none"} />
                </div>

                {/* Review text */}
                <p className="text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: i === 0 ? "#374151" : "rgba(255,255,255,0.65)" }}>
                  {t.review}
                </p>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={13}
                      style={{ color: "#facc15" }}
                      className="fill-yellow-400" />
                  ))}
                </div>

                {/* Loan + purpose tags */}
                <div className="flex gap-2 mb-5">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full font-mono"
                    style={i === 0
                      ? { background: "#f0fdf4", color: "#16a34a" }
                      : { background: "rgba(22,163,74,0.15)", color: "#4ade80" }
                    }>
                    {t.amount}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full"
                    style={i === 0
                      ? { background: "#f3f4f6", color: "#6b7280" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }
                    }>
                    {t.purpose}
                  </span>
                </div>

                {/* Divider */}
                <div className="mb-4" style={{ borderTop: i === 0 ? "1px solid #f3f4f6" : "1px solid rgba(255,255,255,0.07)" }} />

                {/* Author row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight"
                      style={{ color: i === 0 ? "#111827" : "#fff" }}>
                      {t.name}
                    </p>
                    <p className="text-xs mt-0.5 truncate"
                      style={{ color: i === 0 ? "#9ca3af" : "rgba(255,255,255,0.35)" }}>
                      {t.role} · {t.location}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] font-medium"
                      style={{ color: i === 0 ? "#9ca3af" : "rgba(255,255,255,0.3)" }}>
                      CIBIL
                    </p>
                    <p className="text-base font-bold font-mono"
                      style={{ color: i === 0 ? "#16a34a" : "#4ade80" }}>
                      {t.score}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile nav + dots ── */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={prev} aria-label="Previous"
            className="md:hidden w-10 h-10 rounded-full border flex items-center justify-center"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Go to ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  background: i === current ? "#16a34a" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          <button onClick={next} aria-label="Next"
            className="md:hidden w-10 h-10 rounded-full border flex items-center justify-center"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-16 rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
          {stats.map((s, i) => (
            <div key={s.label}
              className="text-center"
              style={i < stats.length - 1 ? { borderRight: "1px solid rgba(255,255,255,0.07)" } : {}}>
              <div className="flex items-baseline justify-center gap-0.5 mb-1">
                <span className="text-3xl font-extrabold tracking-tight" style={{ color: "#4ade80" }}>
                  {s.value}
                </span>
                {s.suffix && (
                  <span className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Platform sources */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {["Google Reviews", "Trustpilot", "App Store"].map((src, i) => (
            <span key={src} className="flex items-center gap-2">
              {i > 0 && <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>}
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{src}</span>
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
