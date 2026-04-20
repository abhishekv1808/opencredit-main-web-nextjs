"use client";

import Link from "next/link";
import {
  CreditCard,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "personal-loan",
    tag: "Most Popular",
    icon: CreditCard,
    title: "Personal Loan",
    subtitle: "Quick funding for any need",
    description:
      "From medical emergencies to dream weddings — get approved in 24 hours with minimal documentation.",
    amount: "₹50K — ₹40 Lakh",
    rate: "10.25% — 36% p.a.",
    tenure: "12 — 60 months",
    features: [
      "No collateral required",
      "Digital process — 100% online",
      "Approval in 24–72 hours",
      "25+ bank partners",
    ],
    cta: "Apply for Personal Loan",
    href: "/personal-loan",
    accentColor: "from-brand-blue-accent to-brand-blue",
    tagBg: "bg-brand-green/10 text-brand-green",
    iconBg: "bg-brand-green/10",
    iconColor: "text-brand-green",
  },
  {
    id: "credit-correction",
    tag: "Expert Service",
    icon: TrendingUp,
    title: "CIBIL Score Correction",
    subtitle: "Fix errors, boost your score",
    description:
      "Dispute inaccurate entries on your credit report with expert assistance. Improve your loan eligibility significantly.",
    amount: "Flat fee service",
    rate: "Results in 30–90 days",
    tenure: "No commitment",
    features: [
      "Expert dispute handling",
      "Credit report analysis",
      "Dispute letter generation",
      "Progress tracking dashboard",
    ],
    cta: "Fix My CIBIL Score",
    href: "/credit-report-correction",
    accentColor: "from-brand-green to-emerald-600",
    tagBg: "bg-brand-green/10 text-brand-green",
    iconBg: "bg-brand-green/10",
    iconColor: "text-brand-green",
  },
];

export default function ProductCards() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
            Our Services
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-extrabold text-heading mb-5">
            Financial Solutions{" "}
            <span className="text-accent-gradient">Built for You</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need funds urgently or want to improve your credit
            profile — we have the right solution.
          </p>
          <div className="accent-divider mx-auto mt-6" />
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="group card-modern overflow-hidden"
              >
                {/* Accent top border */}
                <div className={`h-1 bg-gradient-to-r ${product.accentColor}`} />

                {/* Card Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${product.iconBg} flex items-center justify-center`}
                    >
                      <Icon size={28} className={product.iconColor} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${product.tagBg}`}
                    >
                      {product.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-heading mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium mb-3">
                    {product.subtitle}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 rounded-xl bg-gray-50">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
                        Amount
                      </p>
                      <p className="text-xs font-bold text-heading font-mono leading-tight">
                        {product.amount}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
                        Interest
                      </p>
                      <p className="text-xs font-bold text-heading font-mono leading-tight">
                        {product.rate}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
                        Tenure
                      </p>
                      <p className="text-xs font-bold text-heading font-mono leading-tight">
                        {product.tenure}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-gray-600"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-brand-green flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={product.href}>
                    <Button
                      variant="default"
                      className="w-full group"
                      size="lg"
                    >
                      {product.cta}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>

                  {/* Sub-note */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Clock size={12} className="text-gray-400" />
                    <p className="text-xs text-gray-400">
                      {product.id === "personal-loan"
                        ? "Subject to credit approval · 10.25%–36% p.a."
                        : "Free initial consultation"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-5 py-3">
            <Shield size={14} className="text-heading" />
            <p className="text-xs text-gray-500">
              <strong className="text-heading">RBI Compliant:</strong> All loans disbursed by partner
              banks/NBFCs registered with the Reserve Bank of India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
