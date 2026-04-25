import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCATIONS, getLocation } from "@/lib/data/locations";
import LocationPersonalLoanPage from "@/components/landing/LocationPersonalLoanPage";
import { breadcrumbSchema } from "@/lib/seo/jsonld";

export async function generateStaticParams() {
  return LOCATIONS.map(l => ({ location: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getLocation(location);
  if (!loc) return {};

  const url = `https://opencredit.money/personal-loan/${loc.slug}`;

  return {
    title: loc.seoTitle,
    description: loc.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: loc.seoTitle,
      description: loc.seoDescription,
      url,
      siteName: "OpenCredit.Money",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: loc.seoTitle,
      description: loc.seoDescription,
    },
    keywords: [
      `personal loan ${loc.name}`,
      `personal loan ${loc.name} Bangalore`,
      `instant loan ${loc.name}`,
      `quick loan ${loc.name}`,
      `low interest personal loan ${loc.name}`,
      "OpenCredit",
    ],
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = getLocation(location);
  if (!loc) notFound();

  const pageUrl = `https://opencredit.money/personal-loan/${loc.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LoanOrCredit",
            name: `Personal Loan in ${loc.name}, Bangalore`,
            description: loc.seoDescription,
            url: pageUrl,
            loanType: "PersonalLoan",
            currency: "INR",
            amount: { "@type": "MonetaryAmount", minValue: 50000, maxValue: 4000000, currency: "INR" },
            loanTerm: { "@type": "QuantitativeValue", minValue: 12, maxValue: 60, unitCode: "MON" },
            annualPercentageRate: { "@type": "QuantitativeValue", minValue: 10.25, maxValue: 36, unitText: "% per annum" },
            areaServed: {
              "@type": "Place",
              name: loc.name,
              address: {
                "@type": "PostalAddress",
                addressLocality: loc.name,
                postalCode: loc.pincode,
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
            },
            provider: {
              "@type": "FinancialService",
              "@id": "https://opencredit.money/#organization",
              name: "OpenCredit.Money",
              url: "https://opencredit.money",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://opencredit.money" },
              { name: "Personal Loan", url: "https://opencredit.money/personal-loan" },
              { name: `Personal Loan in ${loc.name}`, url: pageUrl },
            ])
          ),
        }}
      />
      <LocationPersonalLoanPage loc={loc} />
    </>
  );
}
