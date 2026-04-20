import HomeLoanApplicationForm from "@/components/forms/HomeLoanApplicationForm";
import Link from "next/link";
import { ArrowLeft, Home, Shield, Clock, IndianRupee } from "lucide-react";

export const metadata = {
  title: "Apply for Home Loan | OpenCredit.Money",
  description: "Apply for a home loan starting from 8.40% p.a. Up to ₹10 Crore, tenure up to 30 years.",
};

export default function ApplyHomeLoanPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium mb-5"
          style={{ color: "#6b7280" }}
        >
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#EBF0FA" }}
          >
            <Home size={26} style={{ color: "#1B3A6B" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1a1a1a" }}>
              Home Loan Application
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
              Finance your dream home from 8.40% p.a. · Up to ₹10 Crore · 30-year tenure
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: IndianRupee, label: "Min. Rate",    value: "8.40% p.a." },
            { icon: Clock,        label: "Pre-Approval", value: "48 Hours" },
            { icon: Shield,       label: "Partners",     value: "60+ Banks" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 py-3 rounded-xl text-center"
              style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}
            >
              <Icon size={16} style={{ color: "#1B3A6B" }} />
              <p className="text-[10px] font-medium" style={{ color: "#9ca3af" }}>{label}</p>
              <p className="text-sm font-bold" style={{ color: "#1a1a1a" }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <HomeLoanApplicationForm />

      {/* Compliance footer */}
      <p className="text-[11px] text-center mt-6" style={{ color: "#c4c4c4" }}>
        Home loan rates 8.40%–9.50% p.a. · Subject to credit approval & property valuation ·
        OpenCredit is a loan marketplace/DSA registered with RBI partner banks/NBFCs
      </p>
    </div>
  );
}
