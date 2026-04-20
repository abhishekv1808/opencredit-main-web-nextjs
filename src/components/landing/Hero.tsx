"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Star, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format";

function CountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Loans Sanctioned", value: 4200, suffix: "+", prefix: "" },
  { label: "Crore Disbursed", value: 280, suffix: " Cr+", prefix: "₹" },
  { label: "Happy Customers", value: 98, suffix: "%", prefix: "" },
  { label: "Partner Banks", value: 25, suffix: "+", prefix: "" },
];

export default function Hero() {
  const [loanAmount, setLoanAmount] = useState(500000);

  // Calculate slider fill percentage
  const fillPercentage = ((loanAmount - 50000) / (4000000 - 50000)) * 100;

  return (
    <section className="relative min-h-screen flex flex-col hero-bg-light overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[15%] w-[500px] h-[500px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.03] blur-[80px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-brand-green/[0.04] blur-[60px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-green-light border border-brand-green/10 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <Shield size={14} className="text-brand-blue" />
              <span className="text-xs text-heading font-medium">
                RBI Compliant · 25+ Partner Banks
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-extrabold text-heading leading-[1.05] mb-6 animate-fade-up animation-delay-100">
              Personal Loans{" "}
              <span className="text-accent-gradient">Made Simple.</span>
              <br />
              <span className="text-gray-400">In Bangalore.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg animate-fade-up animation-delay-200">
              Get approved for ₹50,000 – ₹40 Lakh in 24 hours.
              Interest rates starting at{" "}
              <strong className="text-heading font-semibold">10.25% p.a.</strong>{" "}
              Expert CIBIL correction services included.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
              <Link href="/register">
                <Button
                  variant="accent"
                  size="lg"
                  className="group w-full sm:w-auto text-base"
                >
                  Apply Now — Free
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/emi-calculator">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base"
                >
                  <Zap size={18} />
                  Calculate EMI
                </Button>
              </Link>
            </div>

            {/* Trust Row */}
            <div className="flex items-center gap-5 mt-10 animate-fade-up animation-delay-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center text-xs font-bold text-white border-2 border-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-brand-green text-brand-green"
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1 font-medium">4.8</span>
                </div>
                <p className="text-gray-400 text-xs">
                  from 2,400+ verified reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right: Loan Calculator Card */}
          <div className="animate-fade-up animation-delay-300">
            <div className="card-modern p-8 relative overflow-hidden">
              {/* Card accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />

              <h3 className="font-display text-xl font-bold text-heading mb-1">
                Quick Loan Estimate
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Slide to see your monthly EMI
              </p>

              {/* Amount Display */}
              <div className="flex items-end justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">
                  Loan Amount
                </span>
                <span className="font-mono text-brand-green font-bold text-2xl">
                  {formatCurrency(loanAmount)}
                </span>
              </div>

              {/* Slider */}
              <div className="relative mb-4">
                <input
                  type="range"
                  min={50000}
                  max={4000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:shadow-blue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10"
                  style={{
                    background: `linear-gradient(to right, #2563EB ${fillPercentage}%, #e5e7eb ${fillPercentage}%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-6">
                <span>₹50K</span>
                <span>₹40L</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
                    Min Rate
                  </p>
                  <p className="text-brand-green font-mono text-lg font-bold">
                    10.25%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
                    Est. EMI
                  </p>
                  <p className="text-heading font-mono text-lg font-bold">
                    {formatCurrency(
                      Math.round(
                        (loanAmount *
                          10.25 /
                          12 /
                          100 *
                          Math.pow(1 + 10.25 / 12 / 100, 36)) /
                          (Math.pow(1 + 10.25 / 12 / 100, 36) - 1)
                      )
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
                    Tenure
                  </p>
                  <p className="text-heading font-mono text-lg font-bold">
                    60 mo
                  </p>
                </div>
              </div>

              {/* Card CTA */}
              <Link href="/register" className="block mt-6">
                <Button variant="accent" className="w-full group" size="lg">
                  Check Eligibility
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">
                Free · No impact on credit score
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-up animation-delay-500">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center md:text-left"
            >
              <div className="text-3xl md:text-4xl font-display font-extrabold text-heading mb-1">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
