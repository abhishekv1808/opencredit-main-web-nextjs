import Link from "next/link";
import { ArrowRight, CreditCard, TrendingUp, Home, Briefcase, Car, Building2, GraduationCap, Landmark } from "lucide-react";

const products = [
  {
    title: "Personal Loan",
    desc: "Avail best offers with interest rates starting @ 10.25% per annum. Minimal docs, 24-hr disbursal.",
    icon: CreditCard,
    iconBg: "#e0f2fe",
    iconColor: "#0284c7",
    highlight: "From 10.25% p.a.",
    highlightColor: "#16a34a",
    cta: "Check eligibility",
    href: "/personal-loan",
    badge: "Most Popular",
  },
  {
    title: "Home Loan",
    desc: "Finance your dream home with the lowest rates from 60+ lenders. Up to ₹10 Crore, tenure up to 30 years.",
    icon: Home,
    iconBg: "#EBF0FA",
    iconColor: "#1B3A6B",
    highlight: "From 8.40% p.a.",
    highlightColor: "#1B3A6B",
    cta: "Check eligibility",
    href: "/home-loan",
    badge: null,
  },
  {
    title: "Business Loan",
    desc: "Fuel your business ambitions with dynamic business loans @ 10% ROI per annum.",
    icon: Briefcase,
    iconBg: "#fef9c3",
    iconColor: "#ca8a04",
    highlight: "From 10% p.a.",
    highlightColor: "#16a34a",
    cta: "Check eligibility",
    href: "/business-loan",
    badge: null,
  },
  {
    title: "Car Loan",
    desc: "Hit the road in style with OpenCredit's seamless car loans — driving your aspirations forward.",
    icon: Car,
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
    highlight: null,
    highlightColor: null,
    cta: "Check eligibility",
    href: "/car-loan",
    badge: null,
  },
  {
    title: "Mortgage Loan",
    desc: "Avail best offers curated just for you from a wide choice of Banks & NBFCs.",
    icon: Building2,
    iconBg: "#ffedd5",
    iconColor: "#ea580c",
    highlight: null,
    highlightColor: null,
    cta: "Check eligibility",
    href: "/mortgage-loan",
    badge: null,
  },
  {
    title: "Education Loan",
    desc: "Avail best offers curated just for you from a wide choice of Banks & NBFCs.",
    icon: GraduationCap,
    iconBg: "#e0f2fe",
    iconColor: "#0369a1",
    highlight: null,
    highlightColor: null,
    cta: "Check eligibility",
    href: "/education-loan",
    badge: null,
  },
  {
    title: "Credit Cards",
    desc: "Avail best offers curated just for you from a wide choice of Banks & NBFCs.",
    icon: Landmark,
    iconBg: "#fce7f3",
    iconColor: "#db2777",
    highlight: null,
    highlightColor: null,
    cta: "Avail now",
    href: "/credit-cards",
    badge: null,
  },
  {
    title: "CIBIL Correction",
    desc: "Fix inaccurate entries on your credit report with expert dispute handling. Score improvement in 30–90 days.",
    icon: TrendingUp,
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
    highlight: "Expert Service",
    highlightColor: "#16a34a",
    cta: "Fix my score",
    href: "/credit-report-correction",
    badge: null,
  },
];

export default function CreditProducts() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-[10px] lg:text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: "#16a34a" }}>
              Credit Products
            </h2>
            <div className="flex-1 h-0.5 max-w-[60px]" style={{ background: "#16a34a" }} />
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: "#1a1a1a" }}>
            Everything You Need,{" "}
            <span style={{ color: "#16a34a" }}>One Platform</span>
          </p>
          <p className="text-xs lg:text-sm mt-2 max-w-xl" style={{ color: "#6b7280" }}>
            Compare offers from 60+ banks & NBFCs across all major credit products — and get the best deal for your profile.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative rounded-2xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "#fff",
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                {/* Popular badge */}
                {p.badge && (
                  <span className="absolute top-4 right-4 text-[9px] lg:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: "#f0fdf4", color: "#16a34a" }}>
                    {p.badge}
                  </span>
                )}

                {/* Icon + title row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-sm lg:text-[15px] mb-0.5" style={{ color: "#1a1a1a" }}>
                      {p.title}
                    </h3>
                    {p.highlight && (
                      <span className="text-[10px] lg:text-[11px] font-semibold" style={{ color: p.highlightColor ?? "#16a34a" }}>
                        {p.highlight}
                      </span>
                    )}
                  </div>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3"
                    style={{ background: p.iconBg }}>
                    <Icon size={20} style={{ color: p.iconColor }} />
                  </div>
                </div>

                {/* Description */}
                <p className="text-[10px] lg:text-xs leading-relaxed flex-1 mb-5" style={{ color: "#6b7280" }}>
                  {p.desc}
                </p>

                {/* CTA */}
                <Link href={p.href}
                  className="inline-flex items-center gap-1.5 text-[10px] lg:text-xs font-semibold transition-all group-hover:gap-2.5"
                  style={{ color: "#16a34a" }}>
                  {p.cta}
                  <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-[10px] lg:text-[11px] text-center mt-8" style={{ color: "#c4c4c4" }}>
          All loans subject to credit approval · Rates vary by lender · OpenCredit is a loan marketplace/DSA registered with RBI partner banks/NBFCs
        </p>
      </div>
    </section>
  );
}
