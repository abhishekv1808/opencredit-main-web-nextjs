import type { Metadata } from "next";
import { Urbanist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AnalyticsScripts from "@/components/shared/AnalyticsScripts";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

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
        url: "https://opencredit.money/images/OpenCredit-logo.png",
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
    <html lang="en-IN" className={`${urbanist.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo-favi-icon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
