import { Metadata } from "next";
import LoanApplicationForm from "@/components/forms/LoanApplicationForm";

export const metadata: Metadata = {
  title: "Apply for Personal Loan | OpenCredit.Money",
  robots: { index: false },
};

export default function ApplyPersonalLoanPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-heading">
          Personal Loan Application
        </h1>
        <p className="text-text-muted mt-1">
          Complete all 5 steps. Your progress is auto-saved.
        </p>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
          <strong>Compliance notice:</strong> Interest rates 10.25%–36% p.a. ·
          Loan ₹50,000–₹40,00,000 · Tenure 12–60 months · Subject to credit
          approval by partner lenders. Data shared with partner banks/NBFCs.
        </div>
      </div>
      <LoanApplicationForm />
    </div>
  );
}
