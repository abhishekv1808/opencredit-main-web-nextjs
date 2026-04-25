import type { Metadata } from "next";
import ComingSoonPage from "@/components/shared/ComingSoonPage";

export const metadata: Metadata = {
  title: "Credit Cards — Coming Soon | OpenCredit.Money",
  description:
    "Compare and apply for the best credit cards in India coming soon to OpenCredit.Money. Rewards, cashback, travel benefits. Get notified when we launch.",
  alternates: { canonical: "https://opencredit.money/credit-cards" },
  robots: { index: false, follow: false },
};

export default function CreditCardsPage() {
  return <ComingSoonPage productKey="credit-cards" />;
}
