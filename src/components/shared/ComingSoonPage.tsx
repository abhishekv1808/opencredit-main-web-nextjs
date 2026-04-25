"use client";

import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle2, Car, Building2, GraduationCap, CreditCard } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

/* ── All product configs live here (client-only) ─────────────────────── */
interface Particle {
  color: string;
  size: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
}

interface ProductConfig {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
  particles: Particle[];
}

const PRODUCTS: Record<string, ProductConfig> = {
  "car-loan": {
    title: "Car Loan",
    tagline: "Drive your dream car — at the best rate",
    description:
      "We're partnering with top banks and NBFCs to bring you the most competitive new & used car loan rates in Bangalore. Minimal paperwork, fast disbursal, and doorstep service.",
    icon: Car,
    iconColor: "#16a34a",
    iconBg: "#f0fdf4",
    gradientFrom: "#16a34a",
    gradientTo: "#0d9488",
    features: [
      "New & used car loans",
      "Rates from 7.5% p.a.",
      "Up to 100% on-road funding",
      "Tenure up to 7 years",
      "No prepayment penalty",
      "Doorstep documentation",
      "Approval in 48 hours",
    ],
    particles: [
      { color: "#16a34a", size: 10, top: "12%", left: "8%",  delay: "0s",   duration: "4.2s" },
      { color: "#0d9488", size: 7,  top: "22%", left: "88%", delay: "0.8s", duration: "5.1s" },
      { color: "#16a34a", size: 6,  top: "72%", left: "6%",  delay: "1.5s", duration: "3.8s" },
      { color: "#86efac", size: 9,  top: "80%", left: "90%", delay: "0.3s", duration: "4.7s" },
      { color: "#0d9488", size: 5,  top: "45%", left: "93%", delay: "2.1s", duration: "5.5s" },
      { color: "#16a34a", size: 8,  top: "55%", left: "4%",  delay: "1.1s", duration: "4.0s" },
      { color: "#6ee7b7", size: 6,  top: "33%", left: "82%", delay: "2.5s", duration: "3.6s" },
    ],
  },

  "mortgage-loan": {
    title: "Mortgage Loan",
    tagline: "Unlock the equity in your property",
    description:
      "Leverage your residential or commercial property to access high-value funds at low interest rates. Perfect for business expansion, debt consolidation, or major life events.",
    icon: Building2,
    iconColor: "#ea580c",
    iconBg: "#fff7ed",
    gradientFrom: "#ea580c",
    gradientTo: "#d97706",
    features: [
      "Loan Against Property (LAP)",
      "Up to 70% LTV ratio",
      "Residential & commercial properties",
      "Tenure up to 15 years",
      "Overdraft facility available",
      "Balance transfer option",
      "All property types accepted",
    ],
    particles: [
      { color: "#ea580c", size: 10, top: "10%", left: "7%",  delay: "0s",   duration: "4.5s" },
      { color: "#d97706", size: 7,  top: "20%", left: "90%", delay: "1.0s", duration: "5.2s" },
      { color: "#ea580c", size: 6,  top: "75%", left: "5%",  delay: "1.8s", duration: "3.9s" },
      { color: "#fb923c", size: 9,  top: "82%", left: "88%", delay: "0.4s", duration: "4.8s" },
      { color: "#d97706", size: 5,  top: "47%", left: "94%", delay: "2.2s", duration: "5.6s" },
      { color: "#ea580c", size: 8,  top: "57%", left: "3%",  delay: "1.3s", duration: "4.1s" },
      { color: "#fcd34d", size: 6,  top: "35%", left: "84%", delay: "2.7s", duration: "3.7s" },
    ],
  },

  "education-loan": {
    title: "Education Loan",
    tagline: "Invest in your most valuable asset — yourself",
    description:
      "Fund your higher education in India or abroad with flexible education loans from leading banks. Covering tuition, living expenses, and more — with a moratorium period so you repay after placement.",
    icon: GraduationCap,
    iconColor: "#0369a1",
    iconBg: "#e0f2fe",
    gradientFrom: "#0369a1",
    gradientTo: "#4f46e5",
    features: [
      "Study in India & abroad",
      "Up to ₹1.5 Cr coverage",
      "Collateral-free up to ₹7.5 L",
      "Moratorium during course",
      "Tax benefit under Section 80E",
      "Covers all expenses",
      "15 year repayment tenure",
    ],
    particles: [
      { color: "#0369a1", size: 10, top: "11%", left: "7%",  delay: "0s",   duration: "4.3s" },
      { color: "#4f46e5", size: 7,  top: "21%", left: "89%", delay: "0.9s", duration: "5.0s" },
      { color: "#0369a1", size: 6,  top: "73%", left: "5%",  delay: "1.6s", duration: "3.9s" },
      { color: "#818cf8", size: 9,  top: "81%", left: "91%", delay: "0.3s", duration: "4.9s" },
      { color: "#4f46e5", size: 5,  top: "46%", left: "93%", delay: "2.3s", duration: "5.4s" },
      { color: "#0369a1", size: 8,  top: "56%", left: "4%",  delay: "1.2s", duration: "4.0s" },
      { color: "#a5b4fc", size: 6,  top: "34%", left: "83%", delay: "2.6s", duration: "3.5s" },
    ],
  },

  "credit-cards": {
    title: "Credit Cards",
    tagline: "Smarter spending, bigger rewards",
    description:
      "Compare India's best credit cards — from premium travel cards to zero-fee cashback cards — all matched to your credit profile and spending habits. One application, instant shortlist.",
    icon: CreditCard,
    iconColor: "#db2777",
    iconBg: "#fdf2f8",
    gradientFrom: "#db2777",
    gradientTo: "#9333ea",
    features: [
      "Cashback & reward points",
      "Travel & lounge access cards",
      "Zero annual fee options",
      "Fuel surcharge waiver",
      "Movie & dining privileges",
      "Instant approval cards",
      "Lifetime-free cards",
    ],
    particles: [
      { color: "#db2777", size: 10, top: "10%", left: "8%",  delay: "0s",   duration: "4.1s" },
      { color: "#9333ea", size: 7,  top: "19%", left: "90%", delay: "0.7s", duration: "5.3s" },
      { color: "#db2777", size: 6,  top: "74%", left: "5%",  delay: "1.7s", duration: "3.8s" },
      { color: "#f0abfc", size: 9,  top: "83%", left: "89%", delay: "0.5s", duration: "4.6s" },
      { color: "#9333ea", size: 5,  top: "48%", left: "95%", delay: "2.0s", duration: "5.5s" },
      { color: "#db2777", size: 8,  top: "58%", left: "3%",  delay: "1.4s", duration: "4.2s" },
      { color: "#c4b5fd", size: 6,  top: "32%", left: "85%", delay: "2.8s", duration: "3.6s" },
    ],
  },
};

/* ── Component ────────────────────────────────────────────────────────── */
export type ComingSoonKey = keyof typeof PRODUCTS;

export default function ComingSoonPage({ productKey }: { productKey: ComingSoonKey }) {
  const product = PRODUCTS[productKey];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const Icon = product.icon;

  return (
    <>
      <style>{`
        @keyframes cs-orbit-cw   { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes cs-orbit-ccw  { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
        @keyframes cs-float      { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes cs-glow-pulse { 0%,100% { opacity:.4; transform:scale(1);    } 50% { opacity:.8; transform:scale(1.08); } }
        @keyframes cs-particle   { 0%,100% { transform:translateY(0) scale(1);    opacity:.45; } 50% { transform:translateY(-20px) scale(1.2); opacity:.85; } }
        @keyframes cs-blob       { 0%,100% { transform:translate(0,0) scale(1);       }
                                   33%     { transform:translate(28px,-18px) scale(1.05); }
                                   66%     { transform:translate(-18px,14px) scale(.96);  } }
        @keyframes cs-dot-ping   { 0% { transform:scale(1); opacity:.9; } 70%,100% { transform:scale(2.4); opacity:0; } }
        @keyframes cs-shimmer    { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes cs-spin-slow  { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      `}</style>

      <div className="min-h-[calc(100vh-80px)] bg-white relative overflow-hidden flex flex-col">

        {/* Background blobs + dot-grid */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div style={{
            position: "absolute", width: 640, height: 640, borderRadius: "50%",
            top: -220, right: -180,
            background: `radial-gradient(circle, ${product.gradientFrom}18 0%, transparent 68%)`,
            animation: "cs-blob 16s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 520, height: 520, borderRadius: "50%",
            bottom: -160, left: -120,
            background: `radial-gradient(circle, ${product.gradientTo}14 0%, transparent 68%)`,
            animation: "cs-blob 20s ease-in-out infinite reverse",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.35,
          }} />
        </div>

        {/* Floating particles */}
        {product.particles.map((p, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute",
            width: p.size, height: p.size, borderRadius: "50%",
            background: p.color,
            top: p.top, left: p.left,
            animation: `cs-particle ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
            pointerEvents: "none",
            boxShadow: `0 0 ${p.size * 2}px ${p.color}80`,
          }} />
        ))}

        {/* Back nav */}
        <div className="relative z-10 px-6 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>

        {/* Main */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-14 text-center">

          {/* ── Orbital icon ── */}
          <div className="relative mb-14" style={{ width: 228, height: 228 }}>

            {/* Outer ring — clockwise */}
            <div style={{
              position: "absolute", inset: 0,
              border: `2px dashed ${product.gradientFrom}40`,
              borderRadius: "50%",
              animation: "cs-orbit-cw 14s linear infinite",
            }}>
              <div style={{
                position: "absolute",
                width: 13, height: 13, borderRadius: "50%",
                background: product.gradientFrom,
                boxShadow: `0 0 16px 4px ${product.gradientFrom}70`,
                top: -6.5, left: "50%", transform: "translateX(-50%)",
              }} />
              <div style={{
                position: "absolute",
                width: 7, height: 7, borderRadius: "50%",
                background: `${product.gradientFrom}70`,
                bottom: -3.5, left: "50%", transform: "translateX(-50%)",
              }} />
            </div>

            {/* Middle ring — counter-clockwise */}
            <div style={{
              position: "absolute", inset: "30px",
              border: `1.5px solid ${product.gradientTo}35`,
              borderRadius: "50%",
              animation: "cs-orbit-ccw 9s linear infinite",
            }}>
              <div style={{
                position: "absolute",
                width: 10, height: 10, borderRadius: "50%",
                background: product.gradientTo,
                boxShadow: `0 0 12px 3px ${product.gradientTo}60`,
                top: -5, left: "50%", transform: "translateX(-50%)",
              }} />
            </div>

            {/* Inner decorative ring */}
            <div style={{
              position: "absolute", inset: "57px",
              border: `1px solid ${product.gradientFrom}20`,
              borderRadius: "50%",
              animation: "cs-spin-slow 20s linear infinite",
            }} />

            {/* Glow backdrop */}
            <div style={{
              position: "absolute", inset: "50px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${product.gradientFrom}28 0%, transparent 70%)`,
              animation: "cs-glow-pulse 3s ease-in-out infinite",
            }} />

            {/* Icon circle */}
            <div style={{
              position: "absolute", inset: "44px",
              background: product.iconBg,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 12px 40px ${product.gradientFrom}35, 0 2px 10px rgba(0,0,0,0.08)`,
              animation: "cs-float 4.5s ease-in-out infinite",
            }}>
              <Icon size={54} style={{ color: product.iconColor }} />
            </div>
          </div>

          {/* Coming Soon badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8"
            style={{
              background: "linear-gradient(90deg,#f0fdf4 0%,#e0f2fe 50%,#f0fdf4 100%)",
              backgroundSize: "200% auto",
              border: "1px solid #bbf7d0",
              animation: "cs-shimmer 3.5s linear infinite",
            }}
          >
            <span className="relative flex items-center justify-center" style={{ width: 10, height: 10 }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "#16a34a",
                animation: "cs-dot-ping 1.6s ease-out infinite",
              }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "block", position: "relative" }} />
            </span>
            <span className="text-sm font-bold text-green-700 tracking-wide">Coming Soon</span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-extrabold mb-3"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#1A1A1A", letterSpacing: "-0.025em", lineHeight: 1.1 }}
          >
            {product.title}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-semibold mb-5" style={{ color: product.iconColor }}>
            {product.tagline}
          </p>

          {/* Description */}
          <p className="text-gray-500 max-w-lg text-[15px] leading-relaxed mb-10">
            {product.description}
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 justify-center mb-12 max-w-xl">
            {product.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "#f9fafb", color: "#374151", border: "1px solid #e5e7eb" }}
              >
                <CheckCircle2 size={11} style={{ color: product.iconColor }} />
                {f}
              </span>
            ))}
          </div>

          {/* Notify Me form */}
          {!submitted ? (
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md w-full"
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-xl text-sm focus:outline-none"
                style={{ border: "1.5px solid #e5e7eb", color: "#1a1a1a", background: "#fff" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = product.gradientFrom)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
                  boxShadow: `0 4px 18px ${product.gradientFrom}40`,
                }}
              >
                <Bell size={14} />
                Notify Me
              </button>
            </form>
          ) : (
            <div
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold"
              style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
            >
              <CheckCircle2 size={17} />
              You&apos;re on the list! We&apos;ll notify you when {product.title} launches.
            </div>
          )}

          {/* Footer link */}
          <div className="mt-8">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-4"
            >
              Explore our available products →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
