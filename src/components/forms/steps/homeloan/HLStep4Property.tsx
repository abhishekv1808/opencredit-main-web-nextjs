import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils/format";
import { HomeLoanApplicationData } from "../../HomeLoanApplicationForm";
import { Home, Users } from "lucide-react";

interface StepProps {
  data: HomeLoanApplicationData;
  updateData: (updates: Partial<HomeLoanApplicationData>) => void;
}

const propertyTypes = [
  { value: "new_purchase",       label: "New Purchase",          desc: "Ready-to-move home" },
  { value: "under_construction", label: "Under Construction",    desc: "Booking/builder payment" },
  { value: "plot_construction",  label: "Plot + Construction",   desc: "Buy plot & build" },
  { value: "renovation",         label: "Home Renovation",       desc: "Improve existing home" },
  { value: "balance_transfer",   label: "Balance Transfer",      desc: "Transfer existing loan" },
];

const relations = ["Spouse", "Parent", "Child", "Sibling", "Other"];

export default function HLStep4Property({ data, updateData }: StepProps) {
  const loanAmount = Math.max(0, (data.property_value || 0) - (data.down_payment || 0));
  const ltv = data.property_value ? Math.round((loanAmount / data.property_value) * 100) : 0;
  const showBuilder = ["under_construction", "plot_construction"].includes(data.property_type);

  return (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <Label className="mb-3 block text-sm font-semibold">Property Type *</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {propertyTypes.map((pt) => (
            <button
              key={pt.value}
              type="button"
              onClick={() => updateData({ property_type: pt.value })}
              className="text-left px-4 py-3 rounded-xl border-2 transition-all"
              style={{
                borderColor: data.property_type === pt.value ? "#1B3A6B" : "#e5e7eb",
                background: data.property_type === pt.value ? "#EBF0FA" : "#fff",
              }}
            >
              <p className="font-semibold text-sm" style={{ color: data.property_type === pt.value ? "#1B3A6B" : "#1a1a1a" }}>
                {pt.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{pt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Property Value & Down Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">Property Value (₹) *</Label>
          <Input
            type="number"
            placeholder="e.g. 5000000"
            value={data.property_value || ""}
            onChange={(e) => updateData({ property_value: Number(e.target.value) })}
            className="font-mono"
          />
          {data.property_value > 0 && (
            <p className="text-[11px] mt-1" style={{ color: "#6b7280" }}>
              {formatCurrency(data.property_value)}
            </p>
          )}
        </div>
        <div>
          <Label className="mb-1.5 block">Down Payment (₹) *</Label>
          <Input
            type="number"
            placeholder="e.g. 500000"
            value={data.down_payment || ""}
            onChange={(e) => updateData({ down_payment: Number(e.target.value) })}
            className="font-mono"
          />
          {data.down_payment > 0 && (
            <p className="text-[11px] mt-1" style={{ color: "#6b7280" }}>
              {formatCurrency(data.down_payment)}
            </p>
          )}
        </div>
      </div>

      {/* LTV Indicator */}
      {data.property_value > 0 && data.down_payment >= 0 && (
        <div
          className="rounded-xl p-4"
          style={{ background: ltv > 90 ? "#fef2f2" : "#f0fdf4", border: `1px solid ${ltv > 90 ? "#fecaca" : "#bbf7d0"}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold" style={{ color: ltv > 90 ? "#dc2626" : "#16a34a" }}>
              Loan-to-Value (LTV): {ltv}%
            </p>
            <p className="text-xs font-mono font-bold" style={{ color: "#1a1a1a" }}>
              Loan: {formatCurrency(loanAmount)}
            </p>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: "#e5e7eb" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(ltv, 100)}%`, background: ltv > 90 ? "#ef4444" : "#16a34a" }}
            />
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: "#6b7280" }}>
            {ltv > 90 ? "⚠ LTV above 90% may affect approval. Consider higher down payment." : "✓ RBI allows up to 90% LTV for home loans."}
          </p>
        </div>
      )}

      {/* Property Address */}
      <div>
        <Label className="mb-1.5 block flex items-center gap-2">
          <Home size={14} className="text-brand-blue" /> Property Address *
        </Label>
        <Input
          placeholder="Flat/House No, Building, Street"
          value={data.property_address}
          onChange={(e) => updateData({ property_address: e.target.value })}
          className="mb-2"
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="City"
              value={data.property_city}
              onChange={(e) => updateData({ property_city: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder="PIN Code"
              maxLength={6}
              value={data.property_pincode}
              onChange={(e) => updateData({ property_pincode: e.target.value.replace(/\D/g, "") })}
              className="font-mono"
            />
          </div>
        </div>
      </div>

      {/* Builder Name — only for under construction */}
      {showBuilder && (
        <div>
          <Label className="mb-1.5 block">Builder / Developer Name *</Label>
          <Input
            placeholder="e.g. Sobha Developers Ltd."
            value={data.builder_name}
            onChange={(e) => updateData({ builder_name: e.target.value })}
          />
        </div>
      )}

      {/* Co-applicant */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "#f8faff", border: "1px solid #dbeafe" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Users size={15} style={{ color: "#1B3A6B" }} />
          <p className="text-sm font-semibold" style={{ color: "#1B3A6B" }}>
            Co-applicant (Optional)
          </p>
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Adding a co-applicant (spouse/parent) can increase your loan eligibility.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="mb-1 block text-xs">Co-applicant Name</Label>
            <Input
              placeholder="Full name"
              value={data.co_applicant_name}
              onChange={(e) => updateData({ co_applicant_name: e.target.value })}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs">Relation</Label>
            <select
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              value={data.co_applicant_relation}
              onChange={(e) => updateData({ co_applicant_relation: e.target.value })}
            >
              <option value="">Select relation</option>
              {relations.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-1 block text-xs">Co-applicant Monthly Income (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 75000"
              value={data.co_applicant_income || ""}
              onChange={(e) => updateData({ co_applicant_income: Number(e.target.value) })}
              className="font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
