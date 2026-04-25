"use client";

import { useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Download, Calculator, Info, ChevronRight, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { calculateEMI, generateAmortizationSchedule } from "@/lib/utils/emi";
import { formatCurrency } from "@/lib/utils/format";
import AmortizationTable from "./AmortizationTable";

// Green = principal, charcoal = interest
const COLORS = ["#16a34a", "#1a1a1a"];

export default function EMICalculator() {
  const [principal, setPrincipal]   = useState(500000);
  const [rate, setRate]             = useState(12);
  const [tenure, setTenure]         = useState(36);
  const [showTable, setShowTable]   = useState(false);

  /* Lead capture state */
  const [leadName,    setLeadName]    = useState("");
  const [leadPhone,   setLeadPhone]   = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleLeadSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leadPhone) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName || undefined,
          phone: leadPhone,
          source: "emi_calculator",
          loan_amount: principal,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  }, [leadName, leadPhone, principal]);

  const { emi, totalAmount, totalInterest } = calculateEMI(principal, rate, tenure);
  const schedule = generateAmortizationSchedule(principal, rate, tenure);

  const pieData = [
    { name: "Principal", value: principal },
    { name: "Interest",  value: Math.round(totalInterest) },
  ];

  const handleDownload = useCallback(() => {
    import("xlsx").then((XLSX) => {
      const ws = XLSX.utils.json_to_sheet(
        schedule.map((row) => ({
          Month: row.month,
          EMI: row.emi,
          Principal: row.principal,
          Interest: row.interest,
          "Outstanding Balance": row.balance,
        }))
      );
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Amortization");
      XLSX.writeFile(wb, `EMI_Schedule_${principal}_${rate}pct_${tenure}mo.xlsx`);
    });
  }, [schedule, principal, rate, tenure]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">

        {/* ── Input Panel ── */}
        <div className="bg-white rounded-3xl p-8"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#f0fdf4" }}>
              <Calculator size={20} style={{ color: "#16a34a" }} />
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: "#1a1a1a" }}>EMI Calculator</h2>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Indicative only — actual may vary</p>
            </div>
          </div>

          <div className="space-y-7">
            {/* Loan Amount */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>Loan Amount</label>
                <span className="font-mono font-bold text-lg" style={{ color: "#1a1a1a" }}>
                  {formatCurrency(principal)}
                </span>
              </div>
              <input type="range" min={50000} max={4000000} step={10000} value={principal}
                onChange={e => setPrincipal(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #16a34a ${((principal - 50000) / (4000000 - 50000)) * 100}%, #e5e7eb ${((principal - 50000) / (4000000 - 50000)) * 100}%)`,
                  // thumb via global css fallback
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#9ca3af" }}>
                <span>₹50K</span><span>₹40L</span>
              </div>
              <input type="number" value={principal}
                onChange={e => setPrincipal(Math.min(4000000, Math.max(50000, Number(e.target.value))))}
                className="mt-3 w-full px-4 py-2.5 rounded-xl text-sm font-mono font-semibold border outline-none transition-all"
                style={{ border: "1px solid #e5e7eb", color: "#1a1a1a" }}
                onFocus={e => (e.target.style.borderColor = "#16a34a")}
                onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>Interest Rate (p.a.)</label>
                <span className="font-mono font-bold text-lg" style={{ color: "#1a1a1a" }}>{rate}%</span>
              </div>
              <input type="range" min={8} max={36} step={0.25} value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #16a34a ${((rate - 8) / (36 - 8)) * 100}%, #e5e7eb ${((rate - 8) / (36 - 8)) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#9ca3af" }}>
                <span>8%</span><span>36%</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: "rgba(22,163,74,0.08)", color: "#16a34a" }}>
                <Info size={12} />
                Partner rates: 10.25% – 36%
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>Loan Tenure</label>
                <span className="font-mono font-bold text-lg" style={{ color: "#1a1a1a" }}>{tenure} months</span>
              </div>
              <input type="range" min={12} max={60} step={6} value={tenure}
                onChange={e => setTenure(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #16a34a ${((tenure - 12) / (60 - 12)) * 100}%, #e5e7eb ${((tenure - 12) / (60 - 12)) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#9ca3af" }}>
                <span>12 mo</span><span>60 mo</span>
              </div>
              {/* Tenure chips */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {[12, 24, 36, 48, 60].map(t => (
                  <button key={t} onClick={() => setTenure(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={tenure === t
                      ? { background: "#16a34a", color: "#fff" }
                      : { background: "#f4f5f7", color: "#6b7280" }
                    }>
                    {t} mo
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance notice */}
          <div className="mt-6 rounded-xl p-3.5" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
            <p className="text-xs" style={{ color: "#92400e" }}>
              <strong>Indicative only.</strong> Actual EMI may vary based on lender terms, processing fees, and credit assessment.
            </p>
          </div>
        </div>

        {/* ── Results Panel ── */}
        <div className="space-y-5">

          {/* EMI result card — dark charcoal */}
          <div className="rounded-3xl p-8" style={{ background: "#1a1a1a" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              Monthly EMI
            </p>
            <p className="font-mono font-extrabold text-5xl mb-6" style={{ color: "#4ade80" }}>
              {formatCurrency(Math.round(emi))}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Principal Amount</p>
                <p className="font-mono font-bold text-base text-white">{formatCurrency(principal)}</p>
              </div>
              <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Total Interest</p>
                <p className="font-mono font-bold text-base" style={{ color: "#4ade80" }}>
                  {formatCurrency(Math.round(totalInterest))}
                </p>
              </div>
              <div className="rounded-2xl p-4 col-span-2" style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.25)" }}>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Total Repayment</p>
                <p className="font-mono font-bold text-2xl text-white">
                  {formatCurrency(Math.round(totalAmount))}
                </p>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-3xl p-6"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
            <h3 className="font-bold text-base mb-4" style={{ color: "#1a1a1a" }}>Payment Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center gap-2.5 rounded-xl p-3"
                style={{ background: "rgba(22,163,74,0.07)" }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#16a34a" }} />
                <div>
                  <p className="text-xs" style={{ color: "#6b7280" }}>Principal</p>
                  <p className="text-sm font-bold font-mono" style={{ color: "#1a1a1a" }}>
                    {Math.round((principal / totalAmount) * 100)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl p-3"
                style={{ background: "rgba(26,26,26,0.05)" }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#1a1a1a" }} />
                <div>
                  <p className="text-xs" style={{ color: "#6b7280" }}>Interest</p>
                  <p className="text-sm font-bold font-mono" style={{ color: "#1a1a1a" }}>
                    {Math.round((totalInterest / totalAmount) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ border: "1px solid #e5e7eb", color: "#374151", background: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#16a34a"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}>
              <Download size={15} />
              Download Schedule
            </button>
            <button onClick={() => setShowTable(!showTable)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all text-white"
              style={{ background: showTable ? "#15803d" : "#16a34a" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = showTable ? "#15803d" : "#16a34a"}>
              <ChevronRight size={15} style={{ transform: showTable ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
              {showTable ? "Hide" : "View"} Amortization
            </button>
          </div>

          {/* ── Lead Capture Card ── */}
          {!submitted ? (
            <form
              onSubmit={handleLeadSubmit}
              className="rounded-3xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #15803d 0%, #16a34a 60%, #059669 100%)" }}
            >
              <div className="p-6">
                {/* Hook line */}
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Phone size={18} style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm leading-tight">
                      Your EMI is {formatCurrency(Math.round(emi))}/month
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>
                      Get this rate confirmed — speak to an advisor in 15 min
                    </p>
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-2.5 mb-3">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "#fff",
                      border: "1.5px solid rgba(255,255,255,0.6)",
                      color: "#1a1a1a",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#4ade80")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile number *"
                    value={leadPhone}
                    onChange={e => setLeadPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "#fff",
                      border: "1.5px solid rgba(255,255,255,0.6)",
                      color: "#1a1a1a",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#4ade80")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
                  />
                </div>

                {/* Error */}
                {submitError && (
                  <p className="text-xs mb-2" style={{ color: "#fca5a5" }}>{submitError}</p>
                )}

                {/* CTA */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: submitting ? "rgba(255,255,255,0.2)" : "#fff",
                    color: submitting ? "rgba(255,255,255,0.6)" : "#15803d",
                    boxShadow: submitting ? "none" : "0 4px 16px rgba(0,0,0,0.12)",
                  }}
                >
                  {submitting ? "Submitting…" : (
                    <>
                      Get My Personalised Rate
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                {/* Trust micro-copy */}
                <p className="text-center text-[11px] mt-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Free · No credit score impact · Advisor calls within 15 min
                </p>
              </div>
            </form>
          ) : (
            /* Success state */
            <div
              className="rounded-3xl p-6 flex flex-col items-center text-center"
              style={{ background: "#f0fdf4", border: "1.5px solid rgba(22,163,74,0.25)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ background: "rgba(22,163,74,0.12)" }}>
                <CheckCircle2 size={24} style={{ color: "#16a34a" }} />
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: "#15803d" }}>
                You&apos;re all set!
              </p>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                An advisor will call you within 15 minutes during business hours (Mon–Sat, 9 AM–6 PM).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Amortization Table */}
      {showTable && (
        <div className="mt-8">
          <AmortizationTable schedule={schedule} />
        </div>
      )}
    </div>
  );
}
