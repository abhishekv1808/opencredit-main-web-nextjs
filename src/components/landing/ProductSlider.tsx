"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    title: "Personal Loan",
    tagline: "From 10.25% p.a.",
    desc: "Instant funds for any need — medical, travel, wedding, or renovation. 100% online, no collateral, approval in 24 hours.",
    href: "/personal-loan",
    image: "/images/personal_loan.jpg",
    icon: null,
    iconColor: "#0284c7",
    iconBg: "#e0f2fe",
    comingSoon: false,
  },
  {
    title: "Home Loan",
    tagline: "From 8.40% p.a.",
    desc: "Finance your dream home with the lowest available rates from 60+ lenders. Up to ₹10 Crore, tenure up to 30 years.",
    href: "/home-loan",
    image: "/images/home_loan.jpg",
    icon: null,
    iconColor: "#1B3A6B",
    iconBg: "#EBF0FA",
    comingSoon: false,
  },
  {
    title: "Business Loan",
    tagline: "From 10% p.a.",
    desc: "Fuel your business ambitions with working capital, equipment finance, or expansion loans from 60+ lenders.",
    href: "/business-loan",
    image: "/images/business_loan.jpg",
    icon: null,
    iconColor: "#b45309",
    iconBg: "#fef3c7",
    comingSoon: false,
  },
  {
    title: "Car Loan",
    tagline: "Apply Now",
    desc: "New and used car loans at the best rates — doorstep documentation, fast approval, and up to 100% on-road funding.",
    href: "/car-loan",
    image: "/images/car_loan.jpg",
    icon: null,
    iconColor: "#16a34a",
    iconBg: "#f0fdf4",
    comingSoon: false,
  },
  {
    title: "Mortgage Loan",
    tagline: "Coming Soon",
    desc: "Unlock the value of your property with a Loan Against Property — up to 70% LTV, all property types accepted.",
    href: "/mortgage-loan",
    image: "/images/mortgage_loan.jpg",
    icon: null,
    iconColor: "#ea580c",
    iconBg: "#fff7ed",
    comingSoon: true,
  },
  {
    title: "Education Loan",
    tagline: "Apply Now",
    desc: "Fund your higher education in India or abroad. Collateral-free options, moratorium during course, Section 80E tax benefit.",
    href: "/education-loan",
    image: "/images/education_loan.jpg",
    icon: null,
    iconColor: "#0369a1",
    iconBg: "#e0f2fe",
    comingSoon: false,
  },
  {
    title: "Credit Cards",
    tagline: "Compare Now",
    desc: "Compare India's best credit cards — cashback, travel rewards, lounge access, and zero annual fee options.",
    href: "/credit-cards",
    image: "/images/credit_card.jpg",
    icon: null,
    iconColor: "#db2777",
    iconBg: "#fdf2f8",
    comingSoon: false,
  },
  {
    title: "CIBIL Correction",
    tagline: "30–90 Day Results",
    desc: "Fix inaccurate entries on your credit report. Expert dispute handling to boost your score in 30–90 days.",
    href: "/credit-report-correction",
    image: "/images/credit_score_correction.jpg",
    icon: null,
    iconColor: "#059669",
    iconBg: "#ecfdf5",
    comingSoon: false,
  },
];

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  const [cardPx, setCardPx] = useState(0);
  const [maxIdx, setMaxIdx] = useState(products.length - 1);

  const trackRef  = useRef<HTMLDivElement>(null);
  const card0Ref  = useRef<HTMLDivElement>(null);

  // Measure first card + compute maxIdx whenever viewport resizes
  const measure = useCallback(() => {
    if (!card0Ref.current || !trackRef.current) return;
    const cw = card0Ref.current.offsetWidth;
    const tw = trackRef.current.offsetWidth;
    const visible = Math.round(tw / cw);
    setCardPx(cw);
    setMaxIdx(Math.max(0, products.length - visible));
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (card0Ref.current) ro.observe(card0Ref.current);
    return () => ro.disconnect();
  }, [measure]);

  // Clamp current when window shrinks (more cards visible → fewer steps)
  useEffect(() => {
    setCurrent(c => Math.min(c, maxIdx));
  }, [maxIdx]);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => (c >= maxIdx ? 0 : c + 1)), [maxIdx]);

  useEffect(() => {
    const t = setInterval(next, 2500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-12">
        <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#16a34a" }}>
          Our Products
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight" style={{ color: "#1a1a1a" }}>
          Finding the right loan can be overwhelming.{" "}
          <span style={{ color: "#16a34a" }}>We make it simple.</span>
        </h2>
      </div>

      {/* Slider */}
      <div className="relative">

        {/* ← Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous"
          className="absolute z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          style={{ left: "12px", top: "120px", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", color: "#1a1a1a" }}
          onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.color = "#fff"; } }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#1a1a1a"; }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* → Next */}
        <button
          onClick={next}
          disabled={current >= maxIdx}
          aria-label="Next"
          className="absolute z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          style={{ right: "12px", top: "120px", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", color: "#1a1a1a" }}
          onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.color = "#fff"; } }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#1a1a1a"; }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Clip + track */}
        <div ref={trackRef} className="overflow-hidden px-4">
          <div
            className="flex"
            style={{
              transform: `translateX(${cardPx ? -(current * cardPx) : 0}px)`,
              transition: cardPx ? "transform 0.52s cubic-bezier(0.25,0.46,0.45,0.94)" : "none",
              willChange: "transform",
            }}
          >
            {products.map((p, i) => {
              const Icon = p.icon as React.ComponentType<{ size?: number; style?: React.CSSProperties }> | null;
              return (
                /* Responsive card widths:
                   mobile  → 83vw  (1 card + peek)
                   sm 640  → 47%   (2 cards + peek)
                   lg 1024 → 31%   (3 cards + peek)
                   xl 1280 → 24%   (4 cards)         */
                <div
                  key={p.title}
                  ref={i === 0 ? card0Ref : undefined}
                  className="flex-shrink-0 px-2 w-[83vw] sm:w-[47%] lg:w-[31%] xl:w-[24%]"
                >
                  <div
                    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                    style={{ background: "#fff", border: "1px solid #e8e8e8", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
                  >
                    {/* Card image area */}
                    <div
                      className="relative flex-shrink-0 flex items-center justify-center overflow-hidden"
                      style={{ height: "240px", background: p.image ? undefined : `linear-gradient(135deg, ${p.iconBg} 0%, #f9fafb 100%)` }}
                    >
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 83vw, (max-width: 1024px) 47vw, (max-width: 1280px) 31vw, 24vw"
                        />
                      ) : Icon ? (
                        <div
                          className="w-24 h-24 rounded-3xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                          style={{ background: "#fff", boxShadow: `0 12px 40px ${p.iconColor}22` }}
                        >
                          <Icon size={44} style={{ color: p.iconColor }} />
                        </div>
                      ) : null}

                      {/* Tagline / Coming Soon pill */}
                      <span
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold z-10"
                        style={
                          p.comingSoon
                            ? { background: "#f1f5f9", color: "#64748b", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                            : { background: "#fff", color: p.iconColor, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }
                        }
                      >
                        {p.tagline}
                      </span>

                      {/* Coming Soon overlay strip */}
                      {p.comingSoon && (
                        <div
                          className="absolute bottom-0 inset-x-0 flex items-center justify-center py-1.5 z-10"
                          style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(6px)", borderTop: "1px solid rgba(0,0,0,0.05)" }}
                        >
                          <span className="flex items-center gap-1.5 text-[9px] lg:text-[11px] font-bold uppercase tracking-wider" style={{ color: "#64748b" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
                      <h3 className="text-sm lg:text-[15px] font-extrabold mb-2" style={{ color: "#1a1a1a" }}>
                        {p.title}
                      </h3>
                      <p className="text-[10px] lg:text-sm leading-relaxed flex-1" style={{ color: "#6b7280" }}>
                        {p.desc}
                      </p>
                      <div className="mt-5 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
                        <Link
                          href={p.href}
                          className="inline-flex items-center gap-1.5 text-[10px] lg:text-sm font-semibold group/cta"
                          style={{ color: p.iconColor }}
                        >
                          Learn More
                          <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-10">
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background: i === current ? "#16a34a" : "#d1d5db",
            }}
          />
        ))}
      </div>
    </section>
  );
}
