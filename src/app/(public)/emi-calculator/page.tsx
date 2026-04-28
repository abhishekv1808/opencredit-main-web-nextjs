import { Metadata } from "next";
import EMICalculator from "@/components/calculator/EMICalculator";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import Link from "next/link";
import { ArrowRight, Info, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = generatePageMetadata({
  title: "EMI Calculator",
  description:
    "Calculate your personal loan EMI online. Free loan EMI calculator with amortization schedule. Get instant EMI, total interest and repayment details for any loan amount.",
  path: "/emi-calculator",
  keywords: [
    "EMI calculator",
    "loan EMI calculator",
    "personal loan calculator",
    "EMI calculator India",
    "loan amortization calculator",
  ],
});

export default function EMICalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "https://opencredit.money" },
          { name: "EMI Calculator", url: "https://opencredit.money/emi-calculator" },
        ])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "EMI Calculator — OpenCredit.Money",
          url: "https://opencredit.money/emi-calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "All",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
          description: "Free online EMI calculator. Calculate monthly installment, total interest, and amortization schedule for personal, home, and business loans.",
          provider: {
            "@type": "FinancialService",
            name: "OpenCredit.Money",
            "@id": "https://opencredit.money/#organization",
          },
        }) }}
      />
      {/* Hero — Light */}
      <section className="relative pt-24 pb-10 md:pt-40 md:pb-20 hero-bg-light overflow-hidden">
        <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-2 mb-6">
            <Calculator size={14} className="text-brand-green" />
            <span className="text-xs text-brand-green font-semibold uppercase tracking-wide">
              Free Tool
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-6xl font-extrabold text-heading mb-3 md:mb-4">
            EMI <span className="text-accent-gradient">Calculator</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg mb-2">
            Calculate your monthly installment, total interest & repayment
            schedule instantly.
          </p>
          <p className="text-gray-400 text-sm">
            Results are indicative only. Actual EMI may vary based on lender
            terms.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-6 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <EMICalculator />
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-modern p-5 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info size={18} className="text-brand-green" />
              </div>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-heading mb-2">
                  How EMI is Calculated
                </h2>
                <p className="text-gray-500 text-sm">
                  EMI (Equated Monthly Instalment) is calculated using the
                  reducing balance method:
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 font-mono text-sm text-center text-brand-green border border-gray-100">
              EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)
              <p className="text-xs text-gray-400 mt-2 font-body">
                P = Principal · r = Monthly rate · n = Tenure in months
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  title: "Lower Rate = Lower EMI",
                  desc: "A better CIBIL score (750+) unlocks lower interest rates from our partner lenders.",
                },
                {
                  title: "Longer Tenure = Lower EMI",
                  desc: "Spreading the loan over more months reduces monthly burden but increases total interest.",
                },
                {
                  title: "Prepay to Save",
                  desc: "Making part-prepayments reduces outstanding principal and saves significant interest over time.",
                },
              ].map((tip) => (
                <div key={tip.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-display font-bold text-heading text-sm mb-2">
                    {tip.title}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">
                Ready to apply for a loan with the best rate?
              </p>
              <Link href="/register">
                <Button variant="accent" size="lg" className="group">
                  Apply Now — Free
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
