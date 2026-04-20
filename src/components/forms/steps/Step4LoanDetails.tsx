import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ApplicationData } from "../LoanApplicationForm";
import { calculateEMI } from "@/lib/utils/emi";
import { formatCurrency } from "@/lib/utils/format";

interface StepProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
}

const purposes = [
  "Home Renovation",
  "Medical Emergency",
  "Education",
  "Wedding",
  "Travel",
  "Debt Consolidation",
  "Business",
  "Vehicle",
  "Consumer Durables",
  "Other",
];

export default function Step4LoanDetails({ data, updateData }: StepProps) {
  const { emi } = calculateEMI(
    data.loan_amount_requested,
    12, // indicative 12% for preview
    data.loan_tenure_months
  );

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Loan Amount Required (₹) *</Label>
          <span className="font-mono font-bold text-heading text-xl">
            {formatCurrency(data.loan_amount_requested)}
          </span>
        </div>
        <input
          type="range"
          min={50000}
          max={4000000}
          step={50000}
          value={data.loan_amount_requested}
          onChange={(e) =>
            updateData({ loan_amount_requested: Number(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-blue [&::-webkit-slider-thumb]:shadow-blue mb-1"
        />
        <div className="flex justify-between text-xs text-text-muted">
          <span>₹50K</span>
          <span>₹40L</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Loan Tenure *</Label>
          <span className="font-mono font-bold text-heading">
            {data.loan_tenure_months} months
          </span>
        </div>
        <input
          type="range"
          min={12}
          max={60}
          step={6}
          value={data.loan_tenure_months}
          onChange={(e) =>
            updateData({ loan_tenure_months: Number(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:shadow-gold mb-1"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {[12, 24, 36, 48, 60].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateData({ loan_tenure_months: t })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                data.loan_tenure_months === t
                  ? "bg-brand-green text-heading"
                  : "bg-gray-100 text-text-muted hover:bg-gray-200"
              }`}
            >
              {t} mo
            </button>
          ))}
        </div>
      </div>

      {/* EMI Preview */}
      <div className="bg-brand-blue rounded-xl p-4 text-white">
        <p className="text-white/60 text-xs mb-1">
          Estimated Monthly EMI (at ~12% p.a.)
        </p>
        <p className="font-mono font-bold text-2xl text-brand-green">
          {formatCurrency(Math.round(emi))}
        </p>
        <p className="text-white/40 text-xs mt-1">
          Indicative only. Actual EMI depends on lender rate.
          Rates: 10.25%–36% p.a.
        </p>
      </div>

      <div>
        <Label className="mb-2 block">Purpose of Loan *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {purposes.map((purpose) => (
            <button
              key={purpose}
              type="button"
              onClick={() => updateData({ purpose })}
              className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                data.purpose === purpose
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-gray-200 hover:border-brand-blue/40 text-text-primary"
              }`}
            >
              {purpose}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">CIBIL Score (approx.)</Label>
          <Input
            type="number"
            min={300}
            max={900}
            placeholder="750"
            value={data.cibil_score || ""}
            onChange={(e) =>
              updateData({ cibil_score: Number(e.target.value) })
            }
            className="font-mono"
          />
        </div>
        <div>
          <Label className="mb-1.5 block">Preferred Bank (optional)</Label>
          <select
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            value={data.preferred_bank}
            onChange={(e) => updateData({ preferred_bank: e.target.value })}
          >
            <option value="">No preference</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
            <option>Kotak Bank</option>
            <option>Bajaj Finance</option>
            <option>IndusInd Bank</option>
          </select>
        </div>
      </div>
    </div>
  );
}
