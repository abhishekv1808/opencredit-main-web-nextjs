import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Shield, AlertCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Disclaimer",
  description: "Important disclaimers for OpenCredit.Money loan marketplace. RBI compliance notice, rate disclosures and service limitations.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const disclaimers = [
    {
      icon: Shield,
      title: "Nature of Business",
      content: "OpenCredit.Money (\"Open Credit\") is a loan marketplace and Direct Selling Agent (DSA) registered under applicable Indian laws. We act as an intermediary between borrowers and RBI-registered banks and NBFCs. We do NOT provide loans directly, accept deposits, or act as a banking institution.",
    },
    {
      icon: AlertCircle,
      title: "Interest Rate Disclosure",
      content: "Interest rates quoted on this website are indicative ranges (10.25% to 36% per annum) based on our current partner lender offerings. Actual interest rates are determined solely by individual lenders based on your credit assessment, income, employment, and other factors. Rates are not guaranteed and are subject to change without notice.",
    },
    {
      icon: AlertCircle,
      title: "No Guarantee of Approval",
      content: "Applying through OpenCredit.Money does not guarantee loan approval. All lending decisions are made independently by our partner banks and NBFCs. Approval is subject to each lender's credit assessment, income verification, CIBIL check, and eligibility criteria.",
    },
    {
      icon: AlertCircle,
      title: "EMI Calculator Disclaimer",
      content: "The EMI Calculator on this website provides indicative results only. Actual EMI may vary based on the specific lender's calculation methodology, processing fees, interest rate applied, and other charges. The calculator should not be relied upon as a definitive financial commitment.",
    },
    {
      icon: AlertCircle,
      title: "CIBIL Score Correction",
      content: "OpenCredit's CIBIL correction service provides advisory and dispute facilitation only. Improvement in CIBIL score is not guaranteed. Results are subject to CIBIL's investigation process and individual lender responses, which may take 30–90 days. Past improvement results for other customers do not guarantee similar outcomes.",
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      content: "All partner lenders on our platform are registered with the Reserve Bank of India (RBI). OpenCredit.Money complies with applicable RBI guidelines for digital lending, the Digital Personal Data Protection (DPDP) Act 2023, and other relevant Indian financial regulations.",
    },
    {
      icon: AlertCircle,
      title: "Information Accuracy",
      content: "While we strive to keep information on this website current and accurate, OpenCredit.Money makes no warranties regarding the completeness, accuracy, or timeliness of content. Users should independently verify information before making financial decisions. Interest rates, eligibility criteria, and product features may change without notice.",
    },
    {
      icon: Shield,
      title: "Representative Example",
      content: "For a personal loan of ₹5,00,000 at 14% p.a. for 36 months: Monthly EMI = ₹17,090, Total Repayment = ₹6,15,240, Total Interest = ₹1,15,240. This is a representative example only. Actual terms will vary based on individual credit assessment.",
    },
  ];

  return (
    <>
      {/* Hero — Light */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 hero-bg-light overflow-hidden">
        <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6">
            <AlertTriangle size={14} className="text-amber-600" />
            <span className="text-xs text-amber-700 font-semibold uppercase tracking-wide">
              Important Disclosures
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-heading mb-3">
            Disclaimer
          </h1>
          <p className="text-gray-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* RBI Notice */}
          <div className="dark-section-bg rounded-2xl p-6 mb-6">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-brand-green">RBI Disclaimer:</strong> OpenCredit.Money is a loan marketplace/Direct Selling Agent (DSA). All loans are disbursed by partner banks/NBFCs registered with the Reserve Bank of India. OpenCredit does not provide loans directly. Loan disbursement is subject to lender eligibility criteria and credit assessment.
            </p>
          </div>

          {/* How We Operate */}
          <div className="rounded-2xl border border-brand-blue/15 bg-brand-blue-light/40 p-6 mb-10">
            <h2 className="font-display font-bold text-heading text-base mb-4 flex items-center gap-2">
              <Shield size={16} className="text-brand-blue" />
              How OpenCredit.Money Operates
            </h2>
            <ul className="space-y-2.5">
              {[
                "Connects borrowers with eligible partner lenders",
                "Facilitates loan applications on behalf of partner banks / NBFCs",
                "Provides CIBIL credit report correction advisory services",
                "Does NOT directly lend money or guarantee loan approval",
                "Is NOT responsible for individual lender credit decisions",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            {disclaimers.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-modern p-6 group hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                      <Icon size={18} className="text-brand-green group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-heading mb-2 text-base">
                        {item.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-gray-50 rounded-2xl p-6 text-xs text-gray-400 leading-relaxed border border-gray-100">
            <p>
              For any queries regarding this disclaimer, please contact us at{" "}
              <a href="mailto:contact@opencredit.money" className="text-brand-green underline">
                contact@opencredit.money
              </a>
              . This disclaimer is subject to change without notice. The most current version is always available on this page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
