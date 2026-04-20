import { Metadata } from "next";
import CreditCorrectionForm from "@/components/forms/CreditCorrectionForm";

export const metadata: Metadata = {
  title: "Apply for CIBIL Correction | OpenCredit.Money",
  robots: { index: false },
};

export default function ApplyCreditCorrectionPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-heading">
          CIBIL Score Correction Request
        </h1>
        <p className="text-text-muted mt-1">
          Tell us about the issues in your credit report. Our experts will
          review and begin the dispute process.
        </p>
        <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800">
          Score improvement is not guaranteed. Results in 30–90 days depending
          on CIBIL and lender response times.
        </div>
      </div>
      <CreditCorrectionForm />
    </div>
  );
}
