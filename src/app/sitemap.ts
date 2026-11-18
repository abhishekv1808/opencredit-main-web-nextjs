import { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/data/locations";

/**
 * XML sitemap — served at https://opencredit.in/sitemap.xml
 *
 * SEO rules followed here:
 * - Only indexable, canonical URLs. Every URL below must match the page's
 *   `alternates.canonical` exactly (see src/lib/seo/metadata.ts).
 * - Excluded on purpose:
 *     /login, /register, /dashboard/*, /admin/*, /api/*, /auth/*  → blocked in robots.ts
 *     /car-loan, /mortgage-loan, /education-loan, /credit-cards    → "coming soon", robots noindex
 *   Add those product pages here only when they launch AND drop `index: false`.
 * - `lastModified` is the only field Google uses, and only while it stays accurate.
 *   When you make a meaningful content change to a page (copy, rates, FAQs, title),
 *   update that page's date below. Do NOT bump dates for cosmetic/code-only changes.
 * - `images` lists the content images shown on the page (absolute URLs) so they
 *   can be discovered for Google Images.
 */

const BASE_URL = "https://opencredit.in";

const img = (path: string) => `${BASE_URL}/images/${path}`;

type Entry = {
  path: string;
  lastModified: string; // YYYY-MM-DD — date of last meaningful content change
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  images?: string[];
};

const PAGES: Entry[] = [
  // ── Home ──
  {
    path: "/",
    lastModified: "2026-11-17",
    changeFrequency: "weekly",
    priority: 1.0,
    images: [
      img("personal_loan.jpg"),
      img("home_loan.jpg"),
      img("business_loan.jpg"),
      img("credit_score_correction.jpg"),
      img("pl-credit-image.png"),
      img("pl-interest-image.png"),
      img("steps/step1-signup.png"),
      img("steps/step2-application.png"),
      img("steps/step3-dashboard.png"),
    ],
  },

  // ── Core products (money pages) ──
  {
    path: "/personal-loan",
    lastModified: "2026-11-17",
    changeFrequency: "weekly",
    priority: 0.9,
    images: [
      img("personal-loan-hero-image.png"),
      img("usecase-education.jpg"),
      img("usecase-home-renovation.jpg"),
      img("usecase-travel.jpg"),
    ],
  },
  {
    path: "/credit-report-correction",
    lastModified: "2026-11-17",
    changeFrequency: "weekly",
    priority: 0.9,
    images: [img("cibil-hero-image.png"), img("cibil-feature-image.png")],
  },
  {
    path: "/home-loan",
    lastModified: "2026-11-17",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/business-loan",
    lastModified: "2026-11-17",
    changeFrequency: "weekly",
    priority: 0.9,
  },

  // ── Tools ──
  {
    path: "/emi-calculator",
    lastModified: "2026-11-17",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  // ── Company / trust pages ──
  {
    path: "/about",
    lastModified: "2026-11-17",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/contact",
    lastModified: "2026-11-17",
    changeFrequency: "monthly",
    priority: 0.6,
  },

  // ── Legal (required for Google Ads finance policy; low priority) ──
  {
    path: "/privacy-policy",
    lastModified: "2026-11-17",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms-of-service",
    lastModified: "2026-11-17",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/disclaimer",
    lastModified: "2026-11-17",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

// Local SEO landing pages: /personal-loan/{area} (Koramangala, HSR Layout, …)
const LOCATION_LAST_MODIFIED = "2026-11-17";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = PAGES.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: new Date(p.lastModified),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    ...(p.images?.length ? { images: p.images } : {}),
  }));

  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/personal-loan/${loc.slug}`,
    lastModified: new Date(LOCATION_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...locationPages];
}
