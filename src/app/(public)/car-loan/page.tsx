import type { Metadata } from "next";
import ComingSoonPage from "@/components/shared/ComingSoonPage";

export const metadata: Metadata = {
  title: "Car Loan — Coming Soon | OpenCredit",
  description:
    "Car loans with the best rates from 60+ lenders coming soon to OpenCredit. Get notified when we launch.",
  alternates: { canonical: "https://opencredit.in/car-loan" },
  robots: { index: false, follow: false },
};

export default function CarLoanPage() {
  return <ComingSoonPage productKey="car-loan" />;
}
