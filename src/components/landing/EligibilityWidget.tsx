"use client";

import { useState, useCallback } from "react";
import { ArrowRight, CheckCircle2, User, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";

const EMP_TYPES = [
  {
    key: "salaried",
    label: "Salaried",
    desc: "Working for a company or government",
    icon: User,
    rates: "10.25%–18%",
    rateMin: 10.25,
    rateMax: 18,
    ltv: 60,
    minIncome: 25000,
  },
  {
    key: "self_employed",
    label: "Self-Employed",
    desc: "Freelancer, consultant, or professional",
    icon: Briefcase,
    rates: "12%–24%",
    rateMin: 12,
    rateMax: 24,
    ltv: 50,
    minIncome: 20000,
  },
  {
    key: "business",
    label: "Business Owner",
    desc: "Running your own business or firm",
    icon: Building2,
    rates: "13%–26%",
    rateMin: 13,
    rateMax: 26,
    ltv: 48,
    minIncome: 20000,
  },
] as const;

type EmpKey = (typeof EMP_TYPES)[number]["key"];

function fmt(val: number) {
  if (val >= 100000) return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
  return `₹${Math.round(val / 1000)}K`;
}

function SliderTrack({
  min, max, step, value, onChange, color = "#16a34a",
}: {
  min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; color?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, ${color} ${pct}%, #e5e7eb ${pct}%)`,
      }}
    />
  );
}

export default function EligibilityWidget() {
  const [step, setStep] = useState(1);
  const [empKey, setEmpKey] = useState<EmpKey | "">("");
  const [income, setIncome] = useState(50000);
  const [loanAmt, setLoanAmt] = useState(500000);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selected = EMP_TYPES.find(e => e.key === empKey);
  const maxEligible = Math.min((selected?.ltv ?? 60) * income, 4000000);
  const meetsIncome = income >= (selected?.minIncome ?? 25000);
  const meetsLtv = loanAmt <= maxEligible;
  const isEligible = meetsIncome && meetsLtv;

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          phone,
          source: "eligibility_widget",
          loan_amount: loanAmt,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  }, [name, phone, loanAmt]);

  return (
    <section className="py-20 md:py-28" style={{ background: "#f0faf4" }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(22,163,74,0.12)", color: "#16a34a" }}
          >
            Quick Check
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2"
            style={{ color: "#0f1a0f" }}
          >
            Check Your{" "}
            <span style={{ color: "#16a34a" }}>Eligibility</span>
          </h2>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            3 quick steps · No credit score impact · Free
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          {/* Progress bar */}
          {!submitted && (
            <div className="h-1.5" style={{ background: "#f3f4f6" }}>
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(step / 3) * 100}%`,
                  background: "linear-gradient(to right, #15803d, #22c55e)",
                }}
              />
            </div>
          )}

          <div className="p-8 md:p-10">
            {!submitted ? (
              <>
                {/* Step dots */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3].map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                        style={
                          step > s
                            ? { background: "#16a34a", color: "#fff" }
                            : step === s
                            ? { background: "#1a1a1a", color: "#fff" }
                            : { background: "#f3f4f6", color: "#9ca3af" }
                        }
                      >
                        {step > s ? "✓" : s}
                      </div>
                      {s < 3 && (
                        <div
                          className="h-px w-8 transition-all duration-300"
                          style={{ background: step > s ? "#16a34a" : "#e5e7eb" }}
                        />
                      )}
                    </div>
                  ))}
                  <span className="ml-2 text-xs" style={{ color: "#9ca3af" }}>
                    Step {step} of 3
                  </span>
                </div>

                {/* ── Step 1: Employment type ── */}
                {step === 1 && (
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: "#1a1a1a" }}>
                      What's your employment type?
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
                      This helps us find lenders best suited to your profile.
                    </p>
                    <div className="grid gap-3">
                      {EMP_TYPES.map(type => {
                        const Icon = type.icon;
                        const active = empKey === type.key;
                        return (
                          <button
                            key={type.key}
                            onClick={() => { setEmpKey(type.key); setStep(2); }}
                            className="flex items-center gap-4 p-4 rounded-2xl text-left w-full transition-all duration-200"
                            style={{
                              border: active ? "2px solid #16a34a" : "1.5px solid #e5e7eb",
                              background: active ? "#f0fdf4" : "#fff",
                            }}
                          >
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: active ? "rgba(22,163,74,0.12)" : "#f9fafb" }}
                            >
                              <Icon size={20} style={{ color: active ? "#16a34a" : "#6b7280" }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>
                                {type.label}
                              </p>
                              <p className="text-xs" style={{ color: "#9ca3af" }}>
                                {type.desc}
                              </p>
                            </div>
                            <span
                              className="text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                              style={{ background: "#f0fdf4", color: "#16a34a" }}
                            >
                              {type.rates}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Step 2: Financial profile ── */}
                {step === 2 && (
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: "#1a1a1a" }}>
                      Your financial profile
                    </h3>
                    <p className="text-sm mb-7" style={{ color: "#6b7280" }}>
                      Move the sliders to match your situation.
                    </p>

                    {/* Income slider */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                          Monthly Income
                        </label>
                        <span className="font-mono font-bold text-sm" style={{ color: "#16a34a" }}>
                          {income >= 200000 ? "₹2L+" : fmt(income)}
                        </span>
                      </div>
                      <SliderTrack
                        min={10000} max={200000} step={5000}
                        value={income} onChange={setIncome}
                      />
                      <div className="flex justify-between text-xs mt-1" style={{ color: "#9ca3af" }}>
                        <span>₹10K</span><span>₹2L+</span>
                      </div>
                    </div>

                    {/* Loan amount slider */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                          Loan Amount Needed
                        </label>
                        <span className="font-mono font-bold text-sm" style={{ color: "#1a1a1a" }}>
                          {fmt(loanAmt)}
                        </span>
                      </div>
                      <SliderTrack
                        min={50000} max={4000000} step={50000}
                        value={loanAmt} onChange={setLoanAmt}
                        color="#1a1a1a"
                      />
                      <div className="flex justify-between text-xs mt-1" style={{ color: "#9ca3af" }}>
                        <span>₹50K</span><span>₹40L</span>
                      </div>
                    </div>

                    {/* Live eligibility preview */}
                    <div
                      className="rounded-2xl p-4 mb-7"
                      style={{
                        background: isEligible ? "#f0fdf4" : "#fffbeb",
                        border: `1px solid ${isEligible ? "rgba(22,163,74,0.22)" : "rgba(234,179,8,0.35)"}`,
                      }}
                    >
                      {isEligible ? (
                        <div className="flex items-start gap-3">
                          <CheckCircle2 size={17} style={{ color: "#16a34a", flexShrink: 0, marginTop: 1 }} />
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
                              You appear to be eligible!
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                              Expected rate: {selected?.rates} p.a. · Max loan: {fmt(maxEligible)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3">
                          <span
                            className="text-amber-500 font-bold text-sm flex-shrink-0"
                            style={{ marginTop: 1 }}
                          >
                            !
                          </span>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "#92400e" }}>
                              {!meetsIncome
                                ? "Income below minimum requirement"
                                : "Loan amount may be high for your income"}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                              {!meetsIncome
                                ? `Most lenders require ₹${(selected?.minIncome ?? 25000) / 1000}K+ monthly income.`
                                : `With your income, you typically qualify for up to ${fmt(maxEligible)}.`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{ border: "1.5px solid #e5e7eb", color: "#374151", background: "#fff" }}
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
                        style={{ background: "#16a34a" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}
                      >
                        Continue <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Contact ── */}
                {step === 3 && (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-bold mb-1" style={{ color: "#1a1a1a" }}>
                      Get your personalised offer
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
                      An advisor will call with your best rate — no obligation.
                    </p>

                    {/* Summary strip */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {[
                        { label: "Type", value: selected?.label ?? "" },
                        { label: "Income", value: income >= 200000 ? "₹2L+/mo" : `${fmt(income)}/mo` },
                        { label: "Loan", value: fmt(loanAmt) },
                      ].map(item => (
                        <div
                          key={item.label}
                          className="rounded-xl p-3 text-center"
                          style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}
                        >
                          <p
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: "#9ca3af" }}
                          >
                            {item.label}
                          </p>
                          <p className="text-sm font-bold mt-0.5" style={{ color: "#1a1a1a" }}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 mb-4">
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #e5e7eb", color: "#1a1a1a" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#16a34a")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile number *"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #e5e7eb", color: "#1a1a1a" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#16a34a")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                      />
                    </div>

                    {error && (
                      <p className="text-xs mb-3" style={{ color: "#dc2626" }}>{error}</p>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-3 rounded-xl text-sm font-semibold"
                        style={{ border: "1.5px solid #e5e7eb", color: "#374151", background: "#fff" }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
                        style={{ background: submitting ? "#15803d" : "#16a34a" }}
                      >
                        {submitting ? "Checking…" : (
                          <>Check My Eligibility <ArrowRight size={15} /></>
                        )}
                      </button>
                    </div>

                    <p className="text-center text-[11px] mt-4" style={{ color: "#9ca3af" }}>
                      Free · No credit score impact · Your data is protected
                    </p>
                  </form>
                )}
              </>
            ) : (
              /* ── Success state ── */
              <div className="text-center py-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(22,163,74,0.1)" }}
                >
                  <CheckCircle2 size={32} style={{ color: "#16a34a" }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1a1a1a" }}>
                  {isEligible ? "Great News — You're Eligible!" : "We'll Review Your Profile"}
                </h3>
                <p className="text-sm mb-7" style={{ color: "#6b7280" }}>
                  An advisor will call within 15 minutes (Mon–Sat, 9 AM–6 PM) with personalised options.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-7">
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: "#f0fdf4", border: "1px solid rgba(22,163,74,0.18)" }}
                  >
                    <p className="text-xs font-medium" style={{ color: "#6b7280" }}>
                      Expected Rate
                    </p>
                    <p className="font-bold text-sm mt-1" style={{ color: "#16a34a" }}>
                      {selected?.rates} p.a.
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}
                  >
                    <p className="text-xs font-medium" style={{ color: "#6b7280" }}>
                      Max Eligible
                    </p>
                    <p className="font-bold text-sm mt-1" style={{ color: "#1a1a1a" }}>
                      {fmt(maxEligible)}
                    </p>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white"
                  style={{ background: "#16a34a" }}
                >
                  Complete My Application
                  <ArrowRight size={15} />
                </Link>

                <p className="text-[11px] mt-3" style={{ color: "#9ca3af" }}>
                  Results are indicative. Actual offer subject to lender credit assessment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
