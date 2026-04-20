"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

const sections = [
  {
    id: "experience",
    badge: { text: "2 hr", sub: "Avg. Approval" },
    badgeColor: "#16a34a",
    heading: ["With Us you will get the", " best loan experience possible"],
    headingHighlight: 1, // index in heading array that gets green color
    body: "Say goodbye to lengthy paperwork and endless waiting. OpenCredit offers a streamlined application process that puts you in control. Our user-friendly online platform ensures that applying for a personal loan is quick, easy, and stress-free.",
    trustLogos: [
      { label: "Google", icon: "google" },
      { label: "Meta", icon: "meta" },
    ],
    cta: { text: "Apply Now", href: "/register" },
    image: "/images/pl-credit-image.png",
    imageAlt: "Happy customer approved for loan",
    imageLeft: true,
    accentText: null,
  },
  {
    id: "fees",
    badge: { text: "10.25%", sub: "p.a. Starting" },
    badgeColor: "#16a34a",
    heading: ["No hidden fees. ", "Quick Approvals & Disbursements"],
    headingHighlight: 0,
    body: "We have more than 60 partner financial institutions registered. So with a single apply — you can receive up to 10 pre-approved credit offers within 5 minutes. After the application is approved, the money is deposited in the account within 24 hours.",
    trustLogos: [
      { label: "Google", icon: "google" },
      { label: "Meta", icon: "meta" },
    ],
    cta: { text: "Apply Now", href: "/register" },
    image: "/images/pl-interest-image.png",
    imageAlt: "Quick loan approvals and disbursements",
    imageLeft: false,
    accentText: "Personal loan.",
  },
];

// Inline SVG logos — no external dependency
function GoogleLogo() {
  return (
    <svg width="56" height="20" viewBox="0 0 56 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#4285F4">G</text>
      <text x="10" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#EA4335">o</text>
      <text x="20" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#FBBC05">o</text>
      <text x="30" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#4285F4">g</text>
      <text x="38" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#34A853">l</text>
      <text x="43" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#EA4335">e</text>
    </svg>
  );
}

function MetaLogo() {
  return (
    <svg width="52" height="20" viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#0866FF">Meta</text>
    </svg>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="#facc15" style={{ color: "#facc15" }} />
      ))}
    </div>
  );
}

function TrustBadge({ icon }: { icon: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <StarRating />
      {icon === "google" ? <GoogleLogo /> : <MetaLogo />}
    </div>
  );
}


export default function FeatureSections() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className={`flex flex-col ${section.imageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-16 lg:gap-20`}
          >
            {/* ── Image Column ── */}
            <div className="w-full md:w-[45%] flex-shrink-0">
              {/* Try to load the image; show placeholder if not found */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl"
                style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}>

                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  width={520}
                  height={400}
                  className="w-full h-auto object-cover"
                />

              </div>
            </div>

            {/* ── Text Column ── */}
            <div className="w-full md:flex-1">
              {/* Section number */}
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ color: "#16a34a" }}>
                0{idx + 1} — Why OpenCredit
              </p>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight tracking-tight mb-5"
                style={{ color: "#1a1a1a" }}>
                {section.heading.map((part, i) => (
                  i === section.headingHighlight
                    ? <span key={i} style={{ color: "#16a34a" }}>{part}</span>
                    : <span key={i}>{part}</span>
                ))}
              </h2>

              {/* Body */}
              <p className="text-base leading-relaxed mb-8 max-w-lg"
                style={{ color: "#6b7280" }}>
                {section.body}
              </p>

              {/* Trust logos */}
              <div className="flex items-center gap-6 mb-8">
                {section.trustLogos.map((logo) => (
                  <TrustBadge key={logo.label} icon={logo.icon} />
                ))}
                <div className="h-8 w-px" style={{ background: "#e5e7eb" }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: "#1a1a1a" }}>4.8 / 5</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>Avg. rating</p>
                </div>
              </div>

              {/* CTA */}
              <Link href={section.cta.href}>
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer group"
                  style={{ background: "#16a34a" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#15803d"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#16a34a"}
                >
                  {section.cta.text}
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              {/* Compliance micro-note */}
              <p className="text-[11px] mt-3" style={{ color: "#c4c4c4" }}>
                Subject to credit approval · Rates 10.25%–36% p.a.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
