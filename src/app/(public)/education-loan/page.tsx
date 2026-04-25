import type { Metadata } from "next";
import ComingSoonPage from "@/components/shared/ComingSoonPage";

export const metadata: Metadata = {
  title: "Education Loan — Coming Soon | OpenCredit.Money",
  description:
    "Education loans for India and abroad coming soon to OpenCredit.Money. Invest in your future. Get notified when we launch.",
  alternates: { canonical: "https://opencredit.money/education-loan" },
  robots: { index: false, follow: false },
};

export default function EducationLoanPage() {
  return <ComingSoonPage productKey="education-loan" />;
}
