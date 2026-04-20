import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Shield } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "OpenCredit.Money Privacy Policy — How we collect, use and protect your personal data in compliance with DPDP Act 2023.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero — Light */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 hero-bg-light overflow-hidden">
        <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-2 mb-6">
            <Shield size={14} className="text-brand-green" />
            <span className="text-xs text-brand-green font-semibold uppercase tracking-wide">
              Legal
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-heading mb-3">
            Privacy <span className="text-accent-gradient">Policy</span>
          </h1>
          <p className="text-gray-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none">
          <div className="space-y-8 text-gray-700 leading-relaxed">

            <div className="bg-brand-green/5 border border-brand-green/10 rounded-2xl p-6">
              <p className="text-heading font-semibold text-sm">
                OpenCredit.Money (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal data in compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023. This policy explains how we collect, use, and safeguard your information.
              </p>
            </div>

            {[
              {
                title: "1. Information We Collect",
                content: `We collect the following categories of personal data:

• Identity Information: Full name, date of birth, gender, PAN card number (partially masked after collection), Aadhaar number
• Contact Information: Mobile number, email address, residential address
• Financial Information: Monthly income, employment details, existing loan obligations, bank statements
• Credit Information: CIBIL score, credit history
• Technical Information: IP address, device type, browser, cookies, usage data
• Documents: Uploaded KYC documents, salary slips, bank statements`,
              },
              {
                title: "2. How We Use Your Data",
                content: `Your data is used for:

• Processing loan applications and matching with partner lenders
• Identity verification and KYC compliance
• Credit assessment by partner banks/NBFCs
• Sending application status updates and communications
• Customer support and query resolution
• Analytics to improve our services
• Compliance with RBI and legal requirements`,
              },
              {
                title: "3. Data Sharing",
                content: `We share your data with:

• Partner Banks/NBFCs: For loan processing and credit assessment. You will be informed which lender receives your data before application submission.
• Credit Bureaus: CIBIL, Experian, CRIF for credit checks
• Technology Service Providers: Supabase (database), Vercel (hosting), Resend (email) — all under data processing agreements
• Regulatory Authorities: RBI, Income Tax Department when required by law

We do NOT sell your personal data to any third party for marketing purposes.`,
              },
              {
                title: "4. Data Security",
                content: `We implement industry-standard security measures:

• 256-bit SSL/TLS encryption for all data transmission
• Data encrypted at rest in our database
• PAN numbers are partially masked after initial verification
• Access controls — only authorized team members can access sensitive data
• Regular security audits and vulnerability assessments`,
              },
              {
                title: "5. Data Retention",
                content: `We retain your data for:

• Active loan applications: Until loan is fully disbursed and closed
• KYC documents: 5 years post loan closure (RBI requirement)
• Lead/inquiry data: 12 months
• Account data: Until account deletion request + 30 days for backup

You may request data deletion by emailing privacy@opencredit.money, subject to regulatory retention requirements.`,
              },
              {
                title: "6. Your Rights (DPDP Act 2023)",
                content: `Under the Digital Personal Data Protection Act 2023, you have the right to:

• Access: Request a copy of your personal data we hold
• Correction: Request correction of inaccurate data
• Erasure: Request deletion of your data (subject to legal obligations)
• Grievance Redressal: Contact our Data Protection Officer
• Nomination: Nominate a person to exercise your data rights

To exercise your rights, email: privacy@opencredit.money`,
              },
              {
                title: "7. Cookies",
                content: `We use cookies for:

• Essential operation of the website
• Analytics (Google Analytics) — only with your consent
• Remarketing (Google Ads) — only with your consent

You can manage cookie preferences through the cookie banner on our website.`,
              },
              {
                title: "8. Data Protection Officer",
                content: `For privacy-related queries or grievances:

Data Protection Officer
OpenCredit.Money
Email: privacy@opencredit.money
Phone: +91 98765 43210
Address: 123, MG Road, Bangalore, Karnataka — 560001

We will respond to all requests within 30 days.`,
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
