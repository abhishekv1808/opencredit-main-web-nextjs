"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is the interest rate for personal loans?",     a: "Interest rates range from 10.25% to 36% per annum depending on your credit score, income, and lender. Higher CIBIL scores (750+) typically qualify for the best rates." },
  { q: "How long does loan approval take?",                  a: "Most applications receive a decision within 24–72 hours. Some lenders offer instant approval for pre-qualified customers. Disbursement after approval takes 1–3 business days." },
  { q: "Can self-employed people apply?",                    a: "Yes! We have partner lenders who specifically cater to self-employed individuals and business owners. Typically ITR for 2 years and 12-month bank statements are required." },
  { q: "What minimum CIBIL score is needed?",                a: "A minimum CIBIL score of 650 is generally required. Scores of 750+ get the best interest rates. If your score is low, check our CIBIL Correction service first." },
  { q: "Are there any prepayment charges?",                  a: "Prepayment policies vary by lender. Many partners allow foreclosure after 12 EMIs with 1–4% charge. Zero-charge prepayment options are available with select partners." },
  { q: "Is collateral or guarantor required?",               a: "No. Personal loans through OpenCredit are 100% unsecured — no property, gold, or guarantor required. Approval is purely based on your creditworthiness." },
  { q: "How many lender offers will I receive?",             a: "Depending on your profile you can receive up to 10 pre-approved offers from our 60+ partner banks and NBFCs. You choose the best rate and terms for your needs." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{ border: open ? "1px solid rgba(22,163,74,0.3)" : "1px solid #f0f0f0", background: "#fff" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
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

export default function PersonalLoanFAQ() {
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
