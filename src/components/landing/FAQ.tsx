"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is the minimum CIBIL score required for a personal loan?",
    answer:
      "Most of our partner lenders require a minimum CIBIL score of 650. However, some NBFCs offer loans for scores as low as 600, albeit at higher interest rates. If your score is below 600, we recommend our CIBIL Correction service to improve your creditworthiness first.",
  },
  {
    question: "How long does the loan approval process take?",
    answer:
      "Once you submit a complete application with all required documents, our partner lenders typically process approvals within 24–72 hours. Some digital lenders may approve within a few hours. Fund disbursement usually happens within 1–2 business days after approval.",
  },
  {
    question: "What documents are needed to apply for a personal loan?",
    answer:
      "You'll need: PAN Card, Aadhaar Card, last 3 months' salary slips (for salaried individuals), last 6 months' bank statements, and a passport-size photograph. Self-employed individuals need ITR for the last 2 years instead of salary slips.",
  },
  {
    question: "What interest rates can I expect?",
    answer:
      "Interest rates range from 10.25% p.a. to 36% p.a., depending on your credit profile, income, employment type, and the lending partner. Salaried individuals with a CIBIL score above 750 typically get the best rates. Use our EMI Calculator to estimate your monthly payments.",
  },
  {
    question: "Is OpenCredit a direct lender?",
    answer:
      "No. OpenCredit is a loan marketplace and DSA (Direct Selling Agent). We do not lend money directly. We connect borrowers with the best-fit lenders from our network of 25+ RBI-registered partner banks and NBFCs. This means you get competitive offers tailored to your profile.",
  },
  {
    question: "Can I prepay or foreclose my loan?",
    answer:
      "Yes, most personal loans from our partner lenders allow prepayment or foreclosure after a lock-in period (usually 6–12 months). Prepayment charges, if applicable, range from 2–5% of the outstanding principal. RBI guidelines prohibit foreclosure charges on floating-rate loans.",
  },
  {
    question: "How does the CIBIL Correction service work?",
    answer:
      "Our expert team reviews your credit report, identifies errors (incorrect account details, duplicate entries, wrongly reported defaults), and files formal disputes with the credit bureaus on your behalf. The process typically takes 30–60 days, and most clients see a score improvement of 50–150 points.",
  },
  {
    question: "Is my personal data safe with OpenCredit?",
    answer:
      "Absolutely. We use bank-grade 256-bit SSL encryption for all data transmissions. Your documents are stored securely in encrypted cloud storage. We only share your information with our partner lenders for loan processing, as outlined in our Privacy Policy. We are fully DPDP Act compliant.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(91,200,63,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(66,168,229,0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left side — Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/[0.06] border border-brand-green/10 mb-5">
              <HelpCircle size={13} className="text-brand-green" />
              <span className="text-[11px] font-bold text-brand-green uppercase tracking-[0.14em]">
                FAQ
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] font-extrabold text-heading leading-[1.1] mb-4">
              Frequently Asked{" "}
              <span className="text-brand-green">Questions</span>
            </h2>

            <p className="text-sm lg:text-[15px] text-body leading-relaxed mb-8 max-w-sm">
              Everything you need to know about personal loans, CIBIL
              correction, and using OpenCredit.
            </p>

            {/* CTA */}
            <div
              className="rounded-2xl p-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,200,63,0.05) 0%, rgba(66,168,229,0.04) 100%)",
                border: "1px solid rgba(91,200,63,0.10)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <MessageCircle size={18} className="text-brand-green" />
                </div>
                <div>
                  <p className="text-sm font-bold text-heading">
                    Still have questions?
                  </p>
                  <p className="text-xs text-body">We&apos;re here to help</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
              >
                Contact our team →
              </Link>
            </div>
          </div>

          {/* Right side — Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={cn(
                      "rounded-2xl border transition-all duration-300",
                      isOpen
                        ? "bg-white border-brand-green/15 shadow-[0_4px_24px_rgba(91,200,63,0.06)]"
                        : "bg-gray-50/50 border-gray-100 hover:border-gray-200 hover:bg-white"
                    )}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-left"
                    >
                      {/* Number */}
                      <span
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[12px] font-bold transition-all duration-300",
                          isOpen
                            ? "bg-brand-green/10 text-brand-green"
                            : "bg-gray-100 text-gray-400"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Question */}
                      <span
                        className={cn(
                          "flex-1 text-[13px] lg:text-[15px] font-semibold transition-colors duration-200 pr-4",
                          isOpen ? "text-heading" : "text-gray-600"
                        )}
                      >
                        {faq.question}
                      </span>

                      {/* Chevron */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300",
                          isOpen
                            ? "bg-brand-green/10 rotate-180"
                            : "bg-gray-100"
                        )}
                      >
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-colors duration-200",
                            isOpen ? "text-brand-green" : "text-gray-400"
                          )}
                        />
                      </div>
                    </button>

                    {/* Answer with animated height */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-400 ease-out",
                        isOpen ? "max-h-[500px]" : "max-h-0"
                      )}
                    >
                      <div className="px-6 pb-6 pl-[4.5rem]">
                        <div
                          className="w-8 h-[2px] rounded-full mb-3"
                          style={{
                            background:
                              "linear-gradient(90deg, #5BC83F, transparent)",
                          }}
                        />
                        <p className="text-[11px] lg:text-[14px] text-body leading-[1.8]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
