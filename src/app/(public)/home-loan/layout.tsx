import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = generatePageMetadata({
  title: "Home Loan in Bangalore | From 8.40% p.a. | Up to ₹10 Crore",
  description:
    "Apply for home loans in Bangalore from 8.40% p.a. Compare 60+ banks & NBFCs. Up to ₹10 Crore, 30-year tenure. New home, plot + construction, balance transfer. Tax benefits up to ₹3.5 Lakh/year.",
  path: "/home-loan",
  keywords: [
    "home loan Bangalore",
    "housing loan Bangalore",
    "home loan interest rates",
    "SBI home loan",
    "HDFC home loan",
    "home loan EMI calculator",
    "home loan tax benefits",
    "plot plus construction loan",
    "home loan balance transfer",
    "NRI home loan India",
  ],
});

const homeLoanSchema = {
  "@context": "https://schema.org",
  "@type": "LoanOrCredit",
  name: "Home Loan",
  loanType: "MortgageLoan",
  currency: "INR",
  amount: {
    "@type": "MonetaryAmount",
    minValue: 500000,
    maxValue: 100000000,
    currency: "INR",
  },
  loanTerm: {
    "@type": "QuantitativeValue",
    minValue: 12,
    maxValue: 360,
    unitCode: "MON",
  },
  annualPercentageRate: {
    "@type": "QuantitativeValue",
    minValue: 8.4,
    maxValue: 14,
    unitText: "% per annum",
  },
  areaServed: ["Bangalore", "Bengaluru", "Karnataka", "India"],
  provider: {
    "@type": "FinancialService",
    name: "OpenCredit.Money",
    "@id": "https://opencredit.money/#organization",
  },
};

export default function HomeLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLoanSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://opencredit.money" },
              { name: "Home Loan", url: "https://opencredit.money/home-loan" },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
