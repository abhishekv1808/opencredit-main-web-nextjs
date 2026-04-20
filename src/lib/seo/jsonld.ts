export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "OpenCredit.Money",
  description:
    "Personal loans and credit report correction services in Bangalore",
  url: "https://opencredit.money",
  telephone: "+91-9876543210",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123, MG Road",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 12.9716, longitude: 77.5946 },
  openingHours: "Mo-Sa 09:00-18:00",
  priceRange: "Free consultation",
  areaServed: ["Bangalore", "Bengaluru", "Karnataka"],
  sameAs: [
    "https://www.facebook.com/opencredit.money",
    "https://www.instagram.com/opencredit.money",
    "https://www.linkedin.com/company/opencredit-money",
  ],
};

export const loanProductSchema = (type: "personal" | "credit") => ({
  "@context": "https://schema.org",
  "@type": "LoanOrCredit",
  name: type === "personal" ? "Personal Loan" : "Credit Report Correction",
  loanType: "PersonalLoan",
  currency: "INR",
  amount: { "@type": "MonetaryAmount", minValue: 50000, maxValue: 4000000 },
  loanTerm: {
    "@type": "QuantitativeValue",
    minValue: 12,
    maxValue: 60,
    unitCode: "MON",
  },
  interestRate: {
    "@type": "QuantitativeValue",
    minValue: 10.25,
    maxValue: 36,
    unitCode: "P1Y",
  },
  provider: { "@type": "FinancialService", name: "OpenCredit.Money" },
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const breadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
