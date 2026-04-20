import { Shield, Award, Users, Lock, Zap, BarChart3 } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "RBI Compliant",
    description: "All partner banks/NBFCs registered with Reserve Bank of India",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "256-bit SSL encryption protects your personal data",
  },
  {
    icon: Users,
    title: "4,200+ Customers",
    description: "Trusted by thousands of Bangalore residents since 2020",
  },
  {
    icon: Zap,
    title: "24-Hour Processing",
    description: "Fast-track approvals for eligible applicants",
  },
  {
    icon: Award,
    title: "25+ Bank Partners",
    description: "Best rate matching across our NBFC and bank network",
  },
  {
    icon: BarChart3,
    title: "Transparent Pricing",
    description: "No hidden charges. All fees disclosed upfront",
  },
];

export default function TrustBadges() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Grid */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
            Why Trust Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-extrabold text-heading mb-5">
            Why <span className="text-accent-gradient">4,200+ Customers</span> Trust Us
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            We&apos;re committed to transparency, security, and delivering real
            financial value.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                  <Icon size={22} className="text-brand-green group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-800 mb-1 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RBI Rate Disclosure */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <h4 className="font-display font-bold text-heading text-sm mb-3">
                Important Rate & Compliance Disclosure
              </h4>
              <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-500">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-heading mb-1">
                    Interest Rates
                  </p>
                  <p>
                    Personal loans: 10.25% to 36% per annum. Subject to credit
                    assessment by individual lenders.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-heading mb-1">
                    Loan Amount
                  </p>
                  <p>
                    ₹50,000 to ₹40,00,000. Actual amount subject to income,
                    CIBIL score, and lender policy.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-heading mb-1">
                    Repayment
                  </p>
                  <p>
                    12 to 60 months. Representative example: ₹5L at 14% for 36
                    months = ₹17,090 EMI/month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
