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
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Instant Personal Loans Across India",
  description:
    "Get instant personal loans from ₹50,000 to ₹40 Lakh across India. Interest rates from 10.25% p.a. Compare 60+ lenders. Expert CIBIL credit score correction. RBI compliant. Apply online in 10 minutes.",
  path: "/",
  keywords: [
    "instant personal loan",
    "personal loan online",
    "loan marketplace India",
    "best loan rates India",
    "quick loan approval",
  ],
});

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
