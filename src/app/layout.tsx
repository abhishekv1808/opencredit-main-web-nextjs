import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AnalyticsScripts from "@/components/shared/AnalyticsScripts";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://opencredit.money/#website",
      name: "OpenCredit.Money",
      url: "https://opencredit.money",
      description: "Bangalore's loan marketplace — personal loans and CIBIL correction services",
      publisher: { "@id": "https://opencredit.money/#organization" },
      inLanguage: "en-IN",
    },
    {
      "@type": ["Organization", "FinancialService"],
      "@id": "https://opencredit.money/#organization",
      name: "OpenCredit.Money",
      url: "https://opencredit.money",
      logo: {
        "@type": "ImageObject",
        url: "https://opencredit.money/images/logo.png",
      },
      foundingDate: "2020",
      areaServed: [
        { "@type": "City", name: "Bangalore", sameAs: "https://en.wikipedia.org/wiki/Bangalore" },
        { "@type": "State", name: "Karnataka", sameAs: "https://en.wikipedia.org/wiki/Karnataka" },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "OpenCredit.Money — Personal Loans & CIBIL Correction | Bangalore",
  description:
    "Get instant personal loans from ₹50,000 to ₹40,00,000 in Bangalore. Expert CIBIL credit score correction. RBI compliant loan marketplace with 25+ partner banks.",
  metadataBase: new URL("https://opencredit.money"),
  openGraph: {
    siteName: "OpenCredit.Money",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "Zj0126JoLKmdzULYDaxQ8Iy_k4HsCktNFzCrVfMS_h0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/logo-favi-icon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <AnalyticsScripts />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
