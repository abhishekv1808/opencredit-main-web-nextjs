import type { Metadata } from "next";
import ComingSoonPage from "@/components/shared/ComingSoonPage";

export const metadata: Metadata = {
  title: "Car Loan — Coming Soon | OpenCredit.Money",
  description:
    "Car loans with the best rates from 60+ lenders coming soon to OpenCredit.Money. Get notified when we launch.",
  alternates: { canonical: "https://opencredit.money/car-loan" },
  robots: { index: false, follow: false },
};

export default function CarLoanPage() {
  return <ComingSoonPage productKey="car-loan" />;
}
