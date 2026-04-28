"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Home,
  GraduationCap,
  Heart,
  Plane,
  Car,
  Briefcase,
  Wrench,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const purposes = [
  {
    icon: Home,
    label: "Home Renovation",
    color: "#3b82f6",
    image: "/images/usecase-home-renovation.jpg",
    desc: "Upgrade your kitchen, add a floor, or give your home a complete makeover — fund it all with a personal loan at low EMIs.",
  },
  {
    icon: GraduationCap,
    label: "Education",
    color: "#8b5cf6",
    image: "/images/usecase-education.jpg",
    desc: "Cover tuition fees, certification courses, or overseas education costs. Invest in your future without financial stress.",
  },
  {
    icon: Heart,
    label: "Medical Emergency",
    color: "#ef4444",
    image: "/images/personal_loan.jpg",
    desc: "Handle unexpected hospital bills, surgeries, or treatments instantly. Quick disbursal when it matters the most.",
  },
  {
    icon: Plane,
    label: "Dream Vacation",
    color: "#16a34a",
    image: "/images/usecase-travel.jpg",
    desc: "Plan your dream holiday — international or domestic. Pay in easy EMIs instead of draining your savings.",
  },
  {
    icon: Car,
    label: "Vehicle Purchase",
    color: "#f97316",
    image: "/images/car_loan.jpg",
    desc: "Finance a new bike, car down-payment, or vehicle upgrade. Flexible tenure from 12 to 60 months.",
  },
  {
    icon: Briefcase,
    label: "Business Needs",
    color: "#0891b2",
    image: "/images/business_loan.jpg",
    desc: "Cover working capital, inventory purchases, or equipment upgrades. Grow your business without collateral.",
  },
  {
    icon: Wrench,
    label: "Repairs & Appliances",
    color: "#d97706",
    image: "/images/usecase-home-renovation.jpg",
    desc: "Replace appliances, fix plumbing, or handle unexpected home repairs. Get funds within 24 hours.",
  },
  {
    icon: CreditCard,
    label: "Debt Consolidation",
    color: "#6366f1",
    image: "/images/credit_score_correction.jpg",
    desc: "Merge multiple high-interest debts into one low-interest personal loan. Simplify payments and save on interest.",
  },
];

export default function PurposeCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = purposes.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  /* Auto-slide every 4s */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  /* Visible cards: show 3 on desktop, 1 on mobile */
  const getVisible = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(purposes[(current + i) % total]);
    }
    return cards;
  };
  const visible = getVisible();

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}
            >
              Multipurpose
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: "#1a1a1a" }}
            >
              What Can You <span style={{ color: "#16a34a" }}>Use It For?</span>
            </h2>
            <p className="text-base mt-3 max-w-lg" style={{ color: "#6b7280" }}>
              Personal loans are flexible — use them for any legitimate
              financial need. Here are the most popular uses.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#16a34a";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 16px rgba(22,163,74,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              <ChevronLeft size={20} style={{ color: "#374151" }} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: "#16a34a",
                border: "none",
                boxShadow: "0 4px 16px rgba(22,163,74,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#15803d";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#16a34a";
              }}
            >
              <ChevronRight size={20} style={{ color: "#fff" }} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: show 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {visible.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={`${p.label}-${current}-${i}`}
                  className="rounded-3xl overflow-hidden transition-all duration-500"
                  style={{
                    background: "#fff",
                    border: "1px solid #f0f0f0",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    animation: "cardSlideIn 0.5s ease-out",
                  }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: "220px" }}
                  >
                    <Image
                      src={p.image}
                      alt={`Personal loan for ${p.label}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                      }}
                    />
                    {/* Icon badge */}
                    <div
                      className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Icon size={18} style={{ color: p.color }} />
                    </div>
                    {/* Label on image */}
                    <p
                      className="absolute bottom-4 left-5 text-lg font-bold text-white drop-shadow-lg"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      {p.label}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#6b7280" }}
                    >
                      {p.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div
                        className="h-1 w-8 rounded-full"
                        style={{ background: p.color }}
                      />
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: p.color }}
                      >
                        Low EMI Available
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: show 1 card */}
          <div className="md:hidden">
            {(() => {
              const p = purposes[current];
              const Icon = p.icon;
              return (
                <div
                  key={`mobile-${current}`}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: "#fff",
                    border: "1px solid #f0f0f0",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    animation: "cardSlideIn 0.5s ease-out",
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: "240px" }}
                  >
                    <Image
                      src={p.image}
                      alt={`Personal loan for ${p.label}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                      }}
                    />
                    <div
                      className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.9)" }}
                    >
                      <Icon size={18} style={{ color: p.color }} />
                    </div>
                    <p className="absolute bottom-4 left-5 text-xl font-bold text-white drop-shadow-lg">
                      {p.label}
                    </p>
                  </div>
                  <div className="p-5">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#6b7280" }}
                    >
                      {p.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div
                        className="h-1 w-8 rounded-full"
                        style={{ background: p.color }}
                      />
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: p.color }}
                      >
                        Low EMI Available
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {purposes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: current === i ? "28px" : "8px",
                height: "8px",
                background: current === i ? "#16a34a" : "#d1d5db",
              }}
            />
          ))}
        </div>
      </div>

      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
