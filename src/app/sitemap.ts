import { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/data/locations";

const BASE_URL = "https://opencredit.money";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreDate = new Date("2026-04-25");

  const homepage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: coreDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const productPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/personal-loan`,
      lastModified: coreDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/credit-report-correction`,
      lastModified: coreDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/home-loan`,
      lastModified: coreDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/business-loan`,
      lastModified: coreDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/emi-calculator`,
      lastModified: coreDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // 12 location pages — under the 30-page warning threshold
  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/personal-loan/${loc.slug}`,
    lastModified: coreDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: coreDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: coreDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Coming-soon pages (/car-loan, /mortgage-loan, /education-loan, /credit-cards)
  // are intentionally excluded — each carries robots: { index: false }.

  return [...homepage, ...productPages, ...locationPages, ...utilityPages];
}
