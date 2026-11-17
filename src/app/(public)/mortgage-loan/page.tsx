import type { Metadata } from "next";
import ComingSoonPage from "@/components/shared/ComingSoonPage";

export const metadata: Metadata = {
  title: "Mortgage Loan (Loan Against Property) — Coming Soon | OpenCredit",
  description:
    "Loan Against Property at the best rates coming soon to OpenCredit. Unlock the value of your property. Get notified when we launch.",
  alternates: { canonical: "https://opencredit.in/mortgage-loan" },
  robots: { index: false, follow: false },
};

export default function MortgageLoanPage() {
  return <ComingSoonPage productKey="mortgage-loan" />;
}
