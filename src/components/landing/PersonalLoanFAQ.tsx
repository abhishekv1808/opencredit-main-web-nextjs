"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What is the interest rate for personal loans?",
    a: "Interest rates range from 10.25% to 36% per annum depending on your credit score, income, and lender. Higher CIBIL scores (750+) typically qualify for the best rates.",
    tag: "Rates",
  },
  {
    q: "How long does loan approval take?",
    a: "Most applications receive a decision within 24–72 hours. Some lenders offer instant approval for pre-qualified customers. Disbursement after approval takes 1–3 business days.",
    tag: "Process",
  },
  {
    q: "Can self-employed people apply?",
    a: "Yes! We have partner lenders who specifically cater to self-employed individuals and business owners. Typically ITR for 2 years and 12-month bank statements are required.",
    tag: "Eligibility",
  },
  {
    q: "What minimum CIBIL score is needed?",
    a: "A minimum CIBIL score of 650 is generally required. Scores of 750+ get the best interest rates. If your score is low, check our CIBIL Correction service first.",
    tag: "Credit",
  },
  {
    q: "Are there any prepayment charges?",
    a: "Prepayment policies vary by lender. Many partners allow foreclosure after 12 EMIs with 1–4% charge. Zero-charge prepayment options are available with select partners.",
    tag: "Repayment",
  },
  {
    q: "Is collateral or guarantor required?",
    a: "No. Personal loans through OpenCredit are 100% unsecured — no property, gold, or guarantor required. Approval is purely based on your creditworthiness.",
    tag: "Security",
  },
  {
    q: "How many lender offers will I receive?",
    a: "Depending on your profile you can receive up to 10 pre-approved offers from our 60+ partner banks and NBFCs. You choose the best rate and terms for your needs.",
    tag: "Offers",
  },
];

function FAQItem({ q, a, tag, index, isOpen, onToggle }: {
  q: string; a: string; tag: string; index: number; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? "1px solid rgba(22,163,74,0.25)" : "1px solid #f0f0f0",
        background: isOpen ? "#fafffe" : "#fff",
        boxShadow: isOpen ? "0 4px 20px rgba(22,163,74,0.08)" : "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left group"
      >
        {/* Number badge */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-300"
          style={{
            background: isOpen ? "#16a34a" : "#f4f5f7",
            color: isOpen ? "#fff" : "#9ca3af",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Question text + tag */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{
                background: isOpen ? "rgba(22,163,74,0.1)" : "#f4f5f7",
                color: isOpen ? "#16a34a" : "#9ca3af",
              }}
            >
              {tag}
            </span>
          </div>
          <span className="text-sm font-semibold block" style={{ color: "#1a1a1a" }}>
            {q}
          </span>
        </div>

        {/* Chevron */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? "rgba(22,163,74,0.1)" : "#f4f5f7",
          }}
        >
          <ChevronDown
            size={15}
            className="transition-transform duration-300"
            style={{
              color: isOpen ? "#16a34a" : "#9ca3af",
              transform: isOpen ? "rotate(180deg)" : "none",
            }}
          />
        </div>
      </button>

      {/* Answer — animated */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "200px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 pl-[4.25rem]">
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PersonalLoanFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#f9fafb" }}>

      {/* Background accents */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left — Header + Contact CTA (2 cols) */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(22,163,74,0.1)", color: "#16a34a" }}
            >
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
              Common{" "}
              <span style={{ color: "#16a34a" }}>Questions</span>
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "#6b7280" }}>
              Everything you need to know about personal loans through OpenCredit. Can&apos;t find your answer? Talk to us.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mb-8">
              <div>
                <p className="text-2xl font-extrabold font-mono" style={{ color: "#16a34a" }}>4,200+</p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>Questions answered</p>
              </div>
              <div className="w-px h-10" style={{ background: "#e5e7eb" }} />
              <div>
                <p className="text-2xl font-extrabold font-mono" style={{ color: "#16a34a" }}>&lt;15 min</p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>Avg. response time</p>
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "#111", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>

              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full"
                style={{ background: "rgba(22,163,74,0.1)" }} />

              <p className="text-white font-bold text-sm mb-1">Still have questions?</p>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Our loan advisors are available Mon–Sat, 9AM to 6PM.
              </p>

              <div className="space-y-2.5">
                <Link href="/contact" className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:translate-x-1"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(22,163,74,0.15)" }}>
                    <MessageCircle size={14} style={{ color: "#4ade80" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">Chat with us</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Get instant answers</p>
                  </div>
                  <ArrowRight size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                </Link>

                <a href="tel:+919900077949" className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:translate-x-1"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(22,163,74,0.15)" }}>
                    <Phone size={14} style={{ color: "#4ade80" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">+91 99000 77949</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Call our advisor</p>
                  </div>
                  <ArrowRight size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — FAQ accordion (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                tag={faq.tag}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}

            {/* Bottom disclaimer */}
            <div className="rounded-xl px-5 py-4 mt-6 flex items-start gap-3"
              style={{ background: "#fff", border: "1px solid #f0f0f0" }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#f0fdf4" }}>
                <span className="text-[10px]">ℹ️</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
                All answers are general guidance only. Actual terms, rates, and eligibility may vary based on the specific lender&apos;s policies. OpenCredit is a loan marketplace (DSA), not a lender.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
