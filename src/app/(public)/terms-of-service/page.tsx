import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { FileText } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service",
  description: "OpenCredit.Money Terms of Service — Governing your use of our loan marketplace and financial services platform.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <>
      {/* Hero — Light */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 hero-bg-light overflow-hidden">
        <div className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-2 mb-6">
            <FileText size={14} className="text-brand-green" />
            <span className="text-xs text-brand-green font-semibold uppercase tracking-wide">
              Legal
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-6xl font-extrabold text-heading mb-3">
            Terms of <span className="text-accent-gradient">Service</span>
          </h1>
          <p className="text-gray-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-gray-700">

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Important:</strong> OpenCredit.Money is a loan marketplace and Direct Selling Agent (DSA). We do not directly lend money. All loans are disbursed by our partner banks and NBFCs registered with the Reserve Bank of India (RBI). By using our services, you agree to these terms.
              </p>
            </div>

            {[
              {
                title: "1. Nature of Service",
                content: `OpenCredit.Money operates as a loan marketplace/DSA that:
• Connects borrowers with eligible partner lenders
• Facilitates loan applications on behalf of partner banks/NBFCs
• Provides CIBIL credit report correction advisory services
• Does NOT directly lend money or guarantee loan approval
• Is NOT responsible for individual lender credit decisions`,
              },
              {
                title: "2. Eligibility",
                content: `To use our services, you must:
• Be an Indian citizen aged 21–60 years
• Have a valid PAN card
• Have a minimum monthly income of ₹25,000 (salaried) or demonstrable business income
• Reside in areas served by our partner lenders
• Not have been declared bankrupt or have existing loan defaults (for loan applications)`,
              },
              {
                title: "3. Interest Rates & Loan Terms",
                content: `All loan rates and terms are set by individual partner lenders:
• Interest rates range from 10.25% to 36% per annum
• Loan amounts: ₹50,000 to ₹40,00,000
• Repayment tenure: 12 to 60 months
• Processing fees: 1–3% of loan amount (charged by lenders)
• All rates are subject to credit assessment by the specific lender
• OpenCredit does not charge applicants any fee for our matching service`,
              },
              {
                title: "4. Application & Data Consent",
                content: `By submitting an application, you:
• Authorize OpenCredit to share your data with partner lenders
• Consent to credit bureau checks (CIBIL, Experian)
• Confirm all information provided is accurate and complete
• Authorize lenders to contact you regarding your application
• Understand that false information may result in rejection and legal liability`,
              },
              {
                title: "5. CIBIL Correction Services",
                content: `For CIBIL correction services:
• We provide advisory and dispute facilitation only
• Score improvement is not guaranteed
• Results depend on CIBIL and lender dispute resolution timelines (30–90 days typically)
• We do not guarantee specific score targets
• Fees (if applicable) are disclosed before service commencement`,
              },
              {
                title: "6. Limitation of Liability",
                content: `OpenCredit.Money is not liable for:
• Lender's credit assessment decisions
• Interest rates offered by specific lenders
• Delays in loan disbursement by lenders
• Any financial loss arising from reliance on our EMI calculator results (indicative only)
• Third-party service interruptions`,
              },
              {
                title: "7. Prohibited Activities",
                content: `Users must not:
• Submit false or misleading information in applications
• Use our platform for fraudulent purposes
• Attempt to bypass our security systems
• Share account credentials with third parties
• Use automated tools to access our services`,
              },
              {
                title: "8. Governing Law",
                content: `These terms are governed by Indian law. Disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.`,
              },
              {
                title: "9. Contact",
                content: `For terms-related queries:
legal@opencredit.money | +91 98765 43210
OpenCredit.Money, 123, MG Road, Bangalore, Karnataka — 560001`,
              },
            ].map((section) => (
              <div key={section.title} className="border-b border-gray-100 pb-6 last:border-0">
                <h2 className="font-display text-xl font-bold text-heading mb-3">
                  {section.title}
                </h2>
                <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
