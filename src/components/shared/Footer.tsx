import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Clock,
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";

const serviceLinks = [
  { label: "Personal Loan",         href: "/personal-loan" },
  { label: "Home Loan",             href: "/home-loan" },
  { label: "CIBIL Score Correction",href: "/credit-report-correction" },
  { label: "EMI Calculator",        href: "/emi-calculator" },
  { label: "Loan Eligibility Check",href: "/personal-loan#eligibility" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <>
      {/* ════════════════════════════════════════════
           CTA Banner — Above Footer
           ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0A1628 0%, #0F2035 50%, #0A1628 100%)",
          }}
        />
        {/* Decorative radials */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(91,200,63,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 50%, rgba(66,168,229,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/15 mb-4">
                <Sparkles size={12} className="text-brand-green" />
                <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider">
                  Free to Apply
                </span>
              </div>
              <h2
                className="font-display text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight"
              >
                Ready to Get Your{" "}
                <span className="text-brand-green">Loan Approved?</span>
              </h2>
              <p className="text-white/45 text-[15px] leading-relaxed">
                Join 4,200+ customers who got their loans approved through
                OpenCredit. Takes less than 10 minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-[15px] font-bold text-white transition-all duration-300 hover:shadow-[0_0_32px_rgba(91,200,63,0.3)]"
                style={{
                  background:
                    "linear-gradient(135deg, #5BC83F 0%, #3DA52A 100%)",
                  boxShadow: "0 4px 20px rgba(91,200,63,0.25)",
                }}
              >
                Apply Now — It&apos;s Free
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/emi-calculator"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-[14px] font-semibold text-white/60 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300"
              >
                Calculate EMI
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           Main Footer
           ════════════════════════════════════════════ */}
      <footer
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #060E1A 0%, #0A1628 30%, #0C1A30 100%)",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, rgba(91,200,63,0.3) 30%, rgba(66,168,229,0.3) 70%, transparent 90%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Main Grid ── */}
          <div className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* ── Brand Column ── */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <Image
                  src="/images/OpenCredit-logo.png"
                  alt="OpenCredit.Money"
                  width={160}
                  height={42}
                  className="h-[36px] w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </Link>
              <p className="text-white/35 text-sm leading-[1.8] mb-7 max-w-xs">
                Bangalore&apos;s trusted loan marketplace. We connect you with
                the best personal loan offers from 25+ RBI-registered partner
                banks and NBFCs.
              </p>

              {/* Social Links */}
              <div className="flex gap-2.5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/30 hover:bg-brand-green/15 hover:border-brand-green/25 hover:text-brand-green flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Services Column ── */}
            <div>
              <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.18em] mb-6 flex items-center gap-2">
                <span
                  className="w-5 h-px"
                  style={{ background: "rgba(91,200,63,0.4)" }}
                />
                Services
              </h3>
              <ul className="space-y-3.5">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group/link flex items-center gap-2 text-white/35 hover:text-white text-[13.5px] transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/15 group-hover/link:bg-brand-green group-hover/link:shadow-[0_0_6px_rgba(91,200,63,0.5)] transition-all duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Company Column ── */}
            <div>
              <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.18em] mb-6 flex items-center gap-2">
                <span
                  className="w-5 h-px"
                  style={{ background: "rgba(66,168,229,0.4)" }}
                />
                Company
              </h3>
              <ul className="space-y-3.5">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group/link flex items-center gap-2 text-white/35 hover:text-white text-[13.5px] transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/15 group-hover/link:bg-brand-blue group-hover/link:shadow-[0_0_6px_rgba(66,168,229,0.5)] transition-all duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact Column ── */}
            <div>
              <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.18em] mb-6 flex items-center gap-2">
                <span
                  className="w-5 h-px"
                  style={{ background: "rgba(91,200,63,0.4)" }}
                />
                Get in Touch
              </h3>

              <div className="space-y-4 mb-7">
                {/* Address */}
                <div className="flex items-start gap-3.5 group/contact">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover/contact:bg-brand-green/10 group-hover/contact:border-brand-green/20 transition-all duration-300">
                    <MapPin
                      size={15}
                      className="text-brand-green/70 group-hover/contact:text-brand-green transition-colors"
                    />
                  </div>
                  <p className="text-white/35 text-[13px] leading-relaxed pt-1.5">
                    123, MG Road, Bangalore,
                    <br />
                    Karnataka — 560001
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3.5 group/contact">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover/contact:bg-brand-green/10 group-hover/contact:border-brand-green/20 transition-all duration-300">
                    <Phone
                      size={15}
                      className="text-brand-green/70 group-hover/contact:text-brand-green transition-colors"
                    />
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="text-white/35 hover:text-white text-[13px] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3.5 group/contact">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover/contact:bg-brand-green/10 group-hover/contact:border-brand-green/20 transition-all duration-300">
                    <Mail
                      size={15}
                      className="text-brand-green/70 group-hover/contact:text-brand-green transition-colors"
                    />
                  </div>
                  <a
                    href="mailto:hello@opencredit.money"
                    className="text-white/35 hover:text-white text-[13px] transition-colors"
                  >
                    hello@opencredit.money
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <Clock
                      size={15}
                      className="text-brand-green/70"
                    />
                  </div>
                  <span className="text-white/35 text-[13px]">
                    Mon – Sat, 9:00 AM – 6:00 PM
                  </span>
                </div>
              </div>

              {/* Trust badges inline */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <Shield size={12} className="text-brand-green/60" />
                  <span className="text-[10.5px] font-semibold text-white/30">
                    SSL Secured
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <Shield size={12} className="text-brand-green/60" />
                  <span className="text-[10.5px] font-semibold text-white/30">
                    RBI Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Representative Example + RBI Disclaimer ── */}
          <div className="border-t border-white/[0.05] py-8">
            <div
              className="rounded-2xl p-5 mb-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,200,63,0.03) 0%, rgba(66,168,229,0.03) 100%)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <p className="text-[11.5px] text-white/30 leading-[1.8] text-center">
                <strong className="text-white/50 font-semibold">
                  Representative Example:
                </strong>{" "}
                For a personal loan of ₹5,00,000 at 14% p.a. for 36 months, EMI
                = ₹17,090/month. Total repayment = ₹6,15,240. Interest rates
                range from{" "}
                <strong className="text-brand-green/60 font-semibold">
                  10.25% to 36% p.a.
                </strong>{" "}
                Subject to credit assessment and lender eligibility.
              </p>
            </div>

            <p className="text-[10.5px] text-white/18 leading-[1.9] max-w-4xl mx-auto text-center">
              <strong className="text-white/25 font-semibold">
                RBI Disclaimer:
              </strong>{" "}
              Open Credit is a loan marketplace/DSA (Direct Selling Agent). We
              do not lend directly. All loans are disbursed by partner
              banks/NBFCs registered with the Reserve Bank of India (RBI). Loan
              approval is subject to lender&apos;s credit assessment and
              eligibility criteria. Credit score improvement is not guaranteed.
            </p>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="border-t border-white/[0.04] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11.5px] text-white/20 flex items-center gap-1.5">
              © {new Date().getFullYear()} OpenCredit.Money. Made with
              <Heart size={10} className="text-red-400/50 fill-red-400/50" />
              in Bangalore.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy-policy"
                className="text-[11.5px] text-white/20 hover:text-white/50 transition-colors"
              >
                Privacy
              </Link>
              <span className="w-px h-3 bg-white/[0.06]" />
              <Link
                href="/terms-of-service"
                className="text-[11.5px] text-white/20 hover:text-white/50 transition-colors"
              >
                Terms
              </Link>
              <span className="w-px h-3 bg-white/[0.06]" />
              <Link
                href="/disclaimer"
                className="text-[11.5px] text-white/20 hover:text-white/50 transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
