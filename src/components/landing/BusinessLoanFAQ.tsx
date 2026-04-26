"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What types of business loans do you offer?",               a: "We offer 6 business loan products: Working Capital Loans, Equipment & Machinery Finance, Business Expansion Loans, Business Overdraft / Line of Credit, MSME/SME Loans, and Trade Finance / Invoice Discounting. Our advisors help you choose the best fit." },
  { q: "What is the minimum business vintage required?",            a: "Most lenders require a minimum of 2 years of business operation. However, some fintech lenders in our network extend loans to businesses as young as 1 year with strong bank statement cash flows." },
  { q: "Is GST registration mandatory?",                            a: "GST registration is required by most traditional banks, especially for loans above ₹20L. Some NBFC partners accept non-GST registered businesses for smaller loan amounts up to ₹15L." },
  { q: "Can I get a business loan without collateral?",             a: "Yes. Unsecured business loans up to ₹75L are available through our NBFC partners. For loans above ₹50L, collateral (property, machinery, or government-backed CGTMSE guarantee) is typically required." },
  { q: "What interest rates should I expect?",                      a: "Business loan rates start from 12% p.a. and can go up to 36% p.a. depending on your credit profile, business vintage, annual turnover, and lender. Secured loans typically get 12%–18% while unsecured loans are 18%–28%." },
  { q: "How does the overdraft facility work?",                     a: "An overdraft (OD) is a revolving credit limit against your current account or assets. You withdraw as needed up to your approved limit and interest accrues only on the amount utilised daily. Ideal for businesses with irregular cash flows." },
  { q: "Can proprietorships and partnerships apply?",               a: "Yes. We work with all business structures — sole proprietorships, partnerships, LLPs, private limited companies, and OPCs. Requirements vary slightly by structure but all are eligible to apply." },
  { q: "How long does it take to get the loan?",                    a: "Approval decisions typically come within 48 hours of complete document submission. Disbursement follows in 2–3 working days after agreement signing. Complex or large-ticket loans may take 5–7 working days for due diligence." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{ border: open ? "1px solid rgba(22,163,74,0.3)" : "1px solid #f0f0f0", background: "#fff" }}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-sm font-semibold pr-4" style={{ color: "#1a1a1a" }}>{q}</span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ background: open ? "#16a34a" : "#f4f5f7" }}
        >
          <ChevronDown
            size={14}
            style={{ color: open ? "#fff" : "#6b7280", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          />
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function BusinessLoanFAQ() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}
          >
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a1a" }}>
            Common{" "}
            <span style={{ color: "#16a34a" }}>Questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map(faq => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
