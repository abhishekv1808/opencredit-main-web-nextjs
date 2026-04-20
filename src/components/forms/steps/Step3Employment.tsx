import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplicationData } from "../LoanApplicationForm";
import { formatCurrency } from "@/lib/utils/format";

interface StepProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
}

export default function Step3Employment({ data, updateData }: StepProps) {
  const netIncome = data.monthly_income - data.existing_emi;
  const foir = data.monthly_income > 0
    ? Math.round((data.existing_emi / data.monthly_income) * 100)
    : 0;

  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-1.5 block">Employment Type *</Label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "salaried", label: "Salaried" },
            { value: "self_employed", label: "Self-Employed" },
            { value: "business", label: "Business Owner" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ employment_type: opt.value })}
              className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                data.employment_type === opt.value
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-gray-200 hover:border-brand-blue/50 text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block">Company / Business Name *</Label>
        <Input
          required
          placeholder="Where you work or your business name"
          value={data.company_name}
          onChange={(e) => updateData({ company_name: e.target.value })}
        />
      </div>

      <div>
        <Label className="mb-1.5 block">Designation / Role *</Label>
        <Input
          required
          placeholder="Your job title"
          value={data.designation}
          onChange={(e) => updateData({ designation: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">Monthly Income (₹) *</Label>
          <Input
            required
            type="number"
            placeholder="25000"
            value={data.monthly_income || ""}
            onChange={(e) =>
              updateData({ monthly_income: Number(e.target.value) })
            }
            className="font-mono"
          />
          <p className="text-xs text-text-muted mt-1">Net take-home salary</p>
        </div>
        <div>
          <Label className="mb-1.5 block">Work Experience (years) *</Label>
          <Input
            required
            type="number"
            min={0}
            max={50}
            placeholder="3"
            value={data.work_experience_years || ""}
            onChange={(e) =>
              updateData({ work_experience_years: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block">
          Existing EMI obligations (₹/month)
        </Label>
        <Input
          type="number"
          placeholder="0 (if no existing loans)"
          value={data.existing_emi || ""}
          onChange={(e) =>
            updateData({ existing_emi: Number(e.target.value) })
          }
          className="font-mono"
        />
      </div>

      {/* FOIR Calculator */}
      {data.monthly_income > 0 && (
        <div className="bg-brand-blue-light rounded-xl p-4">
          <p className="text-xs font-semibold text-heading mb-2">
            Fixed Obligation to Income Ratio (FOIR)
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Current FOIR</span>
            <span
              className={`font-mono font-bold text-sm ${
                foir > 50 ? "text-red-600" : "text-green-600"
              }`}
            >
              {foir}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                foir > 50 ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(foir, 100)}%` }}
            />
          </div>
          <p className="text-xs text-text-muted mt-2">
            {foir > 50
              ? "⚠️ High FOIR may reduce loan eligibility. Lenders prefer FOIR below 50%."
              : "✓ Good FOIR. You are eligible for higher loan amounts."}
          </p>
          <div className="mt-2 flex justify-between text-xs">
            <span>Net income after EMIs:</span>
            <span className="font-mono font-bold text-heading">
              {formatCurrency(Math.max(0, netIncome))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
