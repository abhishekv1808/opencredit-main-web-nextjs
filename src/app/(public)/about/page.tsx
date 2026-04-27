import { Metadata } from "next";
import Link from "next/link";
import { Shield, Users, Award, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "OpenCredit.Money is Bangalore's trusted loan marketplace. We connect borrowers with RBI-registered banks and NBFCs for personal loans and CIBIL correction services.",
  path: "/about",
});

const values = [
  {
    icon: Shield,
    title: "Transparency First",
    description:
      "No hidden fees. All interest rates, charges, and terms disclosed upfront before you apply.",
  },
  {
    icon: Users,
    title: "Customer Centric",
    description:
      "Every decision we make puts the borrower's financial wellbeing at the center.",
  },
  {
    icon: Award,
    title: "RBI Compliance",
    description:
      "We operate strictly within RBI guidelines. All partner lenders are registered and regulated.",
  },
  {
    icon: Target,
    title: "Best Rate Matching",
    description:
      "Our algorithm matches your profile with the most suitable lender to maximize approval chances.",
  },
];

const team = [
  {
    name: "Arjun Sharma",
    role: "Co-Founder & CEO",
    bio: "Ex-HDFC Bank. 12 years in retail lending.",
    avatar: "AS",
    gradient: "from-brand-blue-accent to-blue-600",
  },
  {
    name: "Kavitha Reddy",
    role: "Co-Founder & COO",
    bio: "IIM Bangalore MBA. Fintech & operations specialist.",
    avatar: "KR",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    name: "Rohit Menon",
    role: "Head of Partnerships",
    bio: "15+ bank and NBFC partnerships managed.",
    avatar: "RM",
    gradient: "from-brand-green to-emerald-600",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "https://opencredit.money" },
          { name: "About Us", url: "https://opencredit.money/about" },
        ])) }}
      />
      {/* Hero — Light */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-bg-light overflow-hidden">
        <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
            Our Story
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-heading mb-6">
            About <span className="text-accent-gradient">OpenCredit</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We started with one mission: make personal loans accessible,
            transparent, and fair for every Bangalorean.
          </p>
          <div className="accent-divider mx-auto mt-6" />
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-green/10 rounded-full px-4 py-2 mb-6">
                <span className="text-xs font-semibold text-brand-green uppercase tracking-wide">
                  Our Mission
                </span>
              </div>
              <h2 className="font-display text-4xl font-extrabold text-heading mb-6">
                Democratizing Access to{" "}
                <span className="text-accent-gradient">Fair Credit</span>
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Founded in 2020 in Bangalore, OpenCredit.Money was born from
                  a frustrating personal experience — the opacity and
                  complexity of getting a personal loan in India.
                </p>
                <p>
                  We are a SEBI and RBI compliant loan marketplace (DSA — Direct
                  Selling Agent) that connects qualified borrowers with our
                  network of 25+ partner banks and NBFCs.
                </p>
                <p>
                  We don&apos;t lend money directly. Instead, we work hard to
                  find you the <strong className="text-heading">best possible rate</strong>{" "}
                  from our partner network — completely free of charge to you.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "4,200+", label: "Loans Processed" },
                { number: "₹280 Cr+", label: "Disbursed" },
                { number: "25+", label: "Bank Partners" },
                { number: "4.8★", label: "Customer Rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="card-modern rounded-2xl p-6 text-center"
                >
                  <p className="font-display text-3xl font-extrabold text-brand-green mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
              Our Values
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-heading">
              What We <span className="text-accent-gradient">Stand For</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="card-modern p-6 group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-green transition-colors duration-300">
                    <Icon size={22} className="text-brand-green group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-heading mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
            Leadership
          </p>
          <h2 className="font-display text-4xl font-extrabold text-heading mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="card-modern p-6 text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}
                >
                  {member.avatar}
                </div>
                <h3 className="font-display font-bold text-heading mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-green text-xs font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance — Dark */}
      <section className="section-padding dark-section-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
            Compliance
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
            Regulatory <span className="text-accent-gradient">Compliance</span>
          </h2>
          <p className="text-white/50 mb-10">
            We operate with full transparency and regulatory compliance.
          </p>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-10 text-left">
            {[
              "RBI registered Direct Selling Agent (DSA)",
              "DPDP Act compliant data handling",
              "No direct lending — only marketplace facilitation",
              "All partner banks/NBFCs RBI registered",
              "Transparent fee disclosure before application",
              "Secure 256-bit SSL data encryption",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 py-2.5">
                <CheckCircle2 size={16} className="text-brand-green flex-shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <Link href="/contact">
            <Button variant="accent" size="lg" className="group">
              Contact Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
