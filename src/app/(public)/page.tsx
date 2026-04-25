import { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import ActivityTicker from "@/components/shared/ActivityTicker";
import PartnerMarquee from "@/components/landing/PartnerMarquee";
import CreditProducts from "@/components/landing/CreditProducts";
import ProductSlider from "@/components/landing/ProductSlider";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureSections from "@/components/landing/FeatureSections";
import Testimonials from "@/components/landing/Testimonials";
import TrustBadges from "@/components/landing/TrustBadges";
import FAQ from "@/components/landing/FAQ";
import { localBusinessSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Personal Loans & CIBIL Correction in Bangalore | OpenCredit.Money",
  description:
    "Get instant personal loans from ₹50,000 to ₹40 Lakh in Bangalore. Interest rates from 10.25% p.a. Expert CIBIL credit score correction. RBI compliant. Apply online in 10 minutes.",
  alternates: {
    canonical: "https://opencredit.money",
  },
  openGraph: {
    title: "OpenCredit.Money — Personal Loans & CIBIL Correction in Bangalore",
    description:
      "Get instant personal loans in Bangalore. Rates from 10.25% p.a. Expert CIBIL correction. 25+ partner banks.",
    url: "https://opencredit.money",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenCredit.Money — Bangalore Loan Marketplace",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      <ActivityTicker />
      <PartnerMarquee />
      <CreditProducts />
      <ProductSlider />
      <FeatureSections />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <TrustBadges />
    </>
  );
}
