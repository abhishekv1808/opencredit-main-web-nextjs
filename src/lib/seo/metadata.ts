import type { Metadata } from "next";

const SITE_URL = "https://opencredit.money";
const DEFAULT_OG = `${SITE_URL}/images/og-image.png`;

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | OpenCredit.Money — Bangalore`;
  const url = `${SITE_URL}${path}`;
  const allKeywords = [
    "personal loan Bangalore",
    "CIBIL correction Bangalore",
    "instant loan Bangalore",
    "OpenCredit",
    ...keywords,
  ];
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    keywords: allKeywords,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "OpenCredit.Money",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
