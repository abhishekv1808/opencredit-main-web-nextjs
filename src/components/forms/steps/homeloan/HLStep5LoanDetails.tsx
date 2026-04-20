import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HomeLoanApplicationData } from "../../HomeLoanApplicationForm";
import { calculateEMI } from "@/lib/utils/emi";
import { formatCurrency } from "@/lib/utils/format";

interface StepProps {
  data: HomeLoanApplicationData;
  updateData: (updates: Partial<HomeLoanApplicationData>) => void;
}

const tenurePresets = [
  { label: "5 yr",  months: 60 },
  { label: "10 yr", months: 120 },
  { label: "15 yr", months: 180 },
  { label: "20 yr", months: 240 },
  { label: "30 yr", months: 360 },
];

const lenders = [
  "SBI Home Loans",
  "HDFC Ltd.",
  "ICICI Bank",
  "Kotak Mahindra Bank",
  "Axis Bank",
  "PNB Housing Finance",
  "Canara Bank",
  "Bank of Baroda",
  "LIC Housing Finance",
  "Bajaj Housing Finance",
];

export default function HLStep5LoanDetails({ data, updateData }: StepProps) {
  const indicativeRate = 8.5;
  const { emi, totalAmount, totalInterest } = calculateEMI(
    data.loan_amount_requested,
    indicativeRate,
    data.loan_tenure_months
  );

  const tenureYears = Math.round(data.loan_tenure_months / 12);

  return (
    <div className="space-y-5">
      {/* Loan Amount */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Loan Amount Required (₹) *</Label>
          <span className="font-mono font-bold text-heading text-xl">
            {formatCurrency(data.loan_amount_requested)}
          </span>
        </div>
        <input
          type="range"
          min={500000}
          max={100000000}
          step={500000}
          value={data.loan_amount_requested}
          onChange={(e) => updateData({ loan_amount_requested: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-blue [&::-webkit-slider-thumb]:shadow-blue mb-1"
        />
        <div className="flex justify-between text-xs text-text-muted">
          <span>₹5 Lakh</span>
          <span>₹10 Crore</span>
        </div>
      </div>

      {/* Tenure */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Loan Tenure *</Label>
          <span className="font-mono font-bold text-heading">
            {tenureYears} year{tenureYears !== 1 ? "s" : ""} ({data.loan_tenure_months} months)
          </span>
        </div>
        <input
          type="range"
          min={12}
          max={360}
          step={12}
          value={data.loan_tenure_months}
          onChange={(e) => updateData({ loan_tenure_months: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:shadow-gold mb-1"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {tenurePresets.map((t) => (
            <button
              key={t.months}
              type="button"
              onClick={() => updateData({ loan_tenure_months: t.months })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                data.loan_tenure_months === t.months
                  ? "bg-brand-green text-heading"
                  : "bg-gray-100 text-text-muted hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* EMI Preview */}
      <div className="bg-brand-blue rounded-xl p-4 text-white">
        <p className="text-white/60 text-xs mb-1">
          Estimated Monthly EMI (at ~{indicativeRate}% p.a.)
        </p>
        <p className="font-mono font-bold text-2xl text-brand-green">
          {formatCurrency(Math.round(emi))}
        </p>
        <div className="flex gap-4 mt-2">
          <div>
            <p className="text-white/40 text-[10px]">Total Repayment</p>
            <p className="font-mono text-sm text-white/80">{formatCurrency(Math.round(totalAmount))}</p>
          </div>
          <div>
            <p className="text-white/40 text-[10px]">Total Interest</p>
            <p className="font-mono text-sm text-white/80">{formatCurrency(Math.round(totalInterest))}</p>
          </div>
        </div>
        <p className="text-white/40 text-[10px] mt-2">
          Indicative only · Actual EMI depends on lender · Rates: 8.40%–9.50% p.a.
        </p>
      </div>

      {/* CIBIL & Lender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">CIBIL Score *</Label>
          <Input
            type="number"
            min={300}
            max={900}
            placeholder="750"
            value={data.cibil_score || ""}
            onChange={(e) => updateData({ cibil_score: Number(e.target.value) })}
            className="font-mono"
          />
          <p className="text-[10px] mt-1" style={{ color: "#9ca3af" }}>
            Min. 730 recommended
          </p>
        </div>
        <div>
          <Label className="mb-1.5 block">Preferred Lender (optional)</Label>
          <select
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            value={data.preferred_bank}
            onChange={(e) => updateData({ preferred_bank: e.target.value })}
          >
            <option value="">No preference</option>
            {lenders.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* Tax benefit note */}
      <div
        className="rounded-xl p-3.5"
        style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: "#16a34a" }}>
          💰 Tax Benefits Available
        </p>
        <ul className="text-xs space-y-0.5" style={{ color: "#15803d" }}>
          <li>• Section 80C: Up to ₹1.5L/yr on principal</li>
          <li>• Section 24(b): Up to ₹2L/yr on interest</li>
          <li>• Section 80EEA: Additional ₹1.5L for first-time buyers</li>
        </ul>
      </div>
    </div>
  );
}
