# CLAUDE.md — OpenCredit.Money Brain File

> AI development assistant guide. Read this fully before writing any code.
> Last updated: April 2026

---

## 🏦 Project Overview

**Client:** OpenCredit.Money  
**Domain:** opencredit.money  
**Type:** Full-stack financial services website (Loan Marketplace / DSA)  
**Primary Market:** Bangalore, India  
**Products:** Personal Loan | Credit Report Correction (CIBIL)

**Business Model:** Lead generation → Loan DSA (referral to partner banks/NBFCs). No direct lending.

---

## ⚡ Tech Stack Quick Reference

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Framework    | Next.js 14 (App Router) + TypeScript            |
| Styling      | Tailwind CSS v3 + Shadcn/UI                     |
| Auth         | Supabase Auth (Google OAuth + Email OTP)        |
| Database     | Supabase PostgreSQL                             |
| File Storage | Supabase Storage                                |
| ORM          | Supabase JS SDK (+ Drizzle for complex queries) |
| Email        | Resend                                          |
| Animation    | Framer Motion                                   |
| Charts       | Recharts                                        |
| Forms        | React Hook Form + Zod                           |
| State        | Zustand (global) + React Query (server state)   |
| Excel Export | SheetJS (xlsx)                                  |
| Icons        | Lucide React                                    |
| Deployment   | Vercel                                          |

---

## 🎨 Design System

### Brand Colors (Tailwind Config)

```ts
// tailwind.config.ts
colors: {
  brand: {
    blue: '#1B3A6B',      // Primary — headers, CTAs, nav
    gold: '#C9A84C',      // Accent — highlights, dividers
    'blue-light': '#EBF0FA',  // Background tints
    'gold-light': '#FDF6E3',  // Alert/info backgrounds
  },
  text: {
    primary: '#1A1A2E',
    muted: '#6B7A99',
  }
}
```

### Typography

- Font: `Inter` (Google Fonts) — import in layout.tsx
- Mono: `JetBrains Mono` — for currency/number displays
- Body: 16px / 1.6 line-height
- Headings: Inter 700/600

### Component Library

- Shadcn/UI initialized with `npx shadcn-ui@latest init`
- Theme: brand-blue as primary, brand-gold as secondary
- All Shadcn components live in `src/components/ui/`

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Home
│   │   ├── personal-loan/page.tsx
│   │   ├── credit-report-correction/page.tsx
│   │   ├── emi-calculator/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-of-service/page.tsx
│   │   └── disclaimer/page.tsx
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── page.tsx               # User dashboard home
│   │       ├── apply/
│   │       │   ├── personal-loan/page.tsx
│   │       │   └── credit-correction/page.tsx
│   │       ├── applications/
│   │       │   ├── page.tsx
│   │       │   └── [id]/page.tsx
│   │       └── profile/page.tsx
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx               # Admin dashboard
│   │       ├── applications/
│   │       │   ├── page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── users/page.tsx
│   │       └── leads/page.tsx
│   ├── auth/callback/route.ts         # Supabase OAuth callback
│   ├── api/
│   │   ├── applications/
│   │   │   ├── route.ts              # GET list, POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts          # GET, PATCH
│   │   │       └── submit/route.ts   # POST submit
│   │   ├── documents/
│   │   │   ├── upload/route.ts
│   │   │   └── [id]/route.ts
│   │   ├── admin/
│   │   │   └── applications/
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   └── leads/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                           # Shadcn auto-generated
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx             # Bottom nav for mobile
│   │   └── CookieConsent.tsx
│   ├── forms/
│   │   ├── LoanApplicationForm.tsx   # Parent multi-step container
│   │   ├── steps/
│   │   │   ├── Step1Personal.tsx
│   │   │   ├── Step2Address.tsx
│   │   │   ├── Step3Employment.tsx
│   │   │   ├── Step4LoanDetails.tsx
│   │   │   └── Step5Documents.tsx
│   │   └── CreditCorrectionForm.tsx
│   ├── calculator/
│   │   ├── EMICalculator.tsx
│   │   ├── AmortizationTable.tsx
│   │   └── AmortizationChart.tsx
│   ├── admin/
│   │   ├── ApplicationsTable.tsx
│   │   ├── StatsCards.tsx
│   │   ├── ApplicationReview.tsx
│   │   └── DocumentViewer.tsx
│   └── landing/
│       ├── Hero.tsx
│       ├── ProductCards.tsx
│       ├── HowItWorks.tsx
│       ├── Testimonials.tsx
│       └── TrustBadges.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser client
│   │   ├── server.ts                 # Server component client
│   │   └── middleware.ts             # Middleware client
│   ├── validations/
│   │   ├── loanApplication.ts        # Zod schemas per step
│   │   └── creditCorrection.ts
│   ├── utils/
│   │   ├── format.ts                 # formatCurrency, formatDate
│   │   ├── emi.ts                    # EMI calculation logic
│   │   └── excel.ts                  # SheetJS amortization export
│   └── seo/
│       ├── metadata.ts               # generateMetadata helper
│       └── jsonld.ts                 # JSON-LD schema builders
├── hooks/
│   ├── useAuth.ts
│   ├── useApplications.ts
│   └── useAdminGuard.ts
├── store/
│   └── applicationStore.ts           # Zustand: draft form state
└── types/
    ├── database.ts                   # Supabase generated types
    ├── application.ts
    └── user.ts
```

---

## 🗄️ Database Schema

### Table: `public.profiles`

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  pan_number TEXT,                    -- Store encrypted
  date_of_birth DATE,
  city TEXT DEFAULT 'Bangalore',
  state TEXT DEFAULT 'Karnataka',
  kyc_status TEXT DEFAULT 'pending'   -- pending | verified | rejected
    CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  role TEXT DEFAULT 'user'
    CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### Table: `public.loan_applications`

```sql
CREATE TABLE public.loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  application_number TEXT UNIQUE NOT NULL,    -- OC-2026-00001
  product_type TEXT NOT NULL
    CHECK (product_type IN ('personal_loan', 'credit_correction')),
  status TEXT DEFAULT 'draft'
    CHECK (status IN ('draft','submitted','under_review','approved','rejected','disbursed')),

  -- Loan specifics
  loan_amount_requested NUMERIC(12,2),
  loan_tenure_months INTEGER,
  purpose TEXT,

  -- Applicant info (Step 1-2)
  full_name TEXT,
  dob DATE,
  gender TEXT,
  pan_number TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  pincode TEXT,

  -- Employment (Step 3)
  employment_type TEXT
    CHECK (employment_type IN ('salaried','self_employed','business')),
  company_name TEXT,
  designation TEXT,
  monthly_income NUMERIC(12,2),
  work_experience_years INTEGER,
  existing_emi NUMERIC(12,2) DEFAULT 0,

  -- Additional (Step 4)
  cibil_score INTEGER,
  preferred_bank TEXT,

  -- Admin fields
  admin_notes TEXT,
  assigned_to UUID REFERENCES public.profiles(id),
  approved_amount NUMERIC(12,2),
  approved_rate NUMERIC(5,2),
  rejection_reason TEXT,

  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `public.application_documents`

```sql
CREATE TABLE public.application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL
    CHECK (document_type IN (
      'pan_card','aadhaar','salary_slip_1','salary_slip_2','salary_slip_3',
      'bank_statement','itr','photo','cibil_report','other'
    )),
  storage_path TEXT NOT NULL,         -- Supabase storage path
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  verified BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `public.credit_correction_requests`

```sql
CREATE TABLE public.credit_correction_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  request_number TEXT UNIQUE NOT NULL,  -- CC-2026-00001
  current_score INTEGER,
  issues TEXT[],                         -- Array of issue types
  status TEXT DEFAULT 'submitted'
    CHECK (status IN ('submitted','in_progress','resolved','closed')),
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `public.leads`

```sql
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  phone TEXT,
  email TEXT,
  source TEXT,             -- 'emi_calculator' | 'contact_form' | 'landing_page'
  loan_amount NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_correction_requests ENABLE ROW LEVEL SECURITY;

-- profiles: users can only see/edit their own
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- loan_applications: users see own; admins see all
CREATE POLICY "Users can view own applications" ON public.loan_applications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON public.loan_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own draft applications" ON public.loan_applications
  FOR UPDATE USING (auth.uid() = user_id AND status = 'draft');
CREATE POLICY "Admins can view all applications" ON public.loan_applications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- application_documents: same pattern
CREATE POLICY "Users can manage own documents" ON public.application_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.loan_applications la
      WHERE la.id = application_id AND la.user_id = auth.uid()
    )
  );
CREATE POLICY "Admins can view all documents" ON public.application_documents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## 🔐 Auth Patterns

### Supabase Client Setup

```ts
// src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (c) =>
          c.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          ),
      },
    },
  );
};
```

### Middleware Route Protection

```ts
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (c) =>
          c.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          ),
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${path}`, request.url),
    );
  }
  if (path.startsWith("/admin")) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role !== "admin")
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return response;
}

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
```

### Google OAuth Login

```tsx
// In login page
const supabase = createClient();
const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
};
```

### Auth Callback Route

```ts
// src/app/auth/callback/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}/dashboard`);
}
```

---

## 📄 Document Upload Pattern (Supabase Storage)

```ts
// src/app/api/documents/upload/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const applicationId = formData.get("applicationId") as string;
  const documentType = formData.get("documentType") as string;

  // Validate file
  if (file.size > 5 * 1024 * 1024) {
    // 5MB limit
    return NextResponse.json(
      { error: "File too large. Max 5MB." },
      { status: 400 },
    );
  }
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Only PDF, JPG, PNG allowed" },
      { status: 400 },
    );
  }

  const fileName = `${user.id}/${applicationId}/${documentType}_${Date.now()}.${file.name.split(".").pop()}`;
  const { data, error } = await supabase.storage
    .from("loan-documents")
    .upload(fileName, file, { contentType: file.type });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // Save record to DB
  await supabase.from("application_documents").insert({
    application_id: applicationId,
    document_type: documentType,
    storage_path: data.path,
    file_name: file.name,
    file_size: file.size,
    mime_type: file.type,
  });

  return NextResponse.json({ success: true, path: data.path });
}
```

---

## 🔢 EMI Calculation Logic

```ts
// src/lib/utils/emi.ts
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number,
) {
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0)
    return {
      emi: principal / tenureMonths,
      totalAmount: principal,
      totalInterest: 0,
    };
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalAmount = emi * tenureMonths;
  return { emi, totalAmount, totalInterest: totalAmount - principal };
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureMonths: number,
) {
  const monthlyRate = annualRate / 12 / 100;
  const emi = calculateEMI(principal, annualRate, tenureMonths).emi;
  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    schedule.push({
      month,
      emi: Math.round(emi),
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    });
  }
  return schedule;
}
```

---

## 🔍 SEO Patterns

### Metadata Template

```ts
// src/lib/seo/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://opencredit.money";
const DEFAULT_OG = `${SITE_URL}/og-image.png`;

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const fullTitle = `${title} | OpenCredit.Money — Bangalore`;
  const url = `${SITE_URL}${path}`;
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
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
    keywords: [
      "personal loan Bangalore",
      "CIBIL correction Bangalore",
      "instant loan Bangalore",
      "OpenCredit",
    ],
  };
}
```

### JSON-LD Schemas

```ts
// src/lib/seo/jsonld.ts
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "OpenCredit.Money",
  description:
    "Personal loans and credit report correction services in Bangalore",
  url: "https://opencredit.money",
  telephone: "+91-XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[Office Address]",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 12.9716, longitude: 77.5946 },
  openingHours: "Mo-Sa 09:00-18:00",
  priceRange: "Free consultation",
  areaServed: ["Bangalore", "Bengaluru", "Karnataka"],
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
```

---

## ⚖️ Google Finance Policy Compliance Checklist

Before any page is considered complete, verify ALL items:

### Every Loan-Related Page MUST Have:

- [ ] Interest rate range clearly visible: "Interest rates from 10.25% p.a. to 36% p.a."
- [ ] Loan amount range: "Personal loans from ₹50,000 to ₹40,00,000"
- [ ] Tenure range: "Repayment period 12 to 60 months"
- [ ] Representative example: shown prominently
- [ ] "Subject to credit approval and lender eligibility criteria" disclaimer
- [ ] RBI disclaimer in footer: "Open Credit is a loan aggregator/DSA. Loans are disbursed by partner banks/NBFCs registered with RBI."

### Application Form MUST Have:

- [ ] Consent checkbox with links to Privacy Policy and Terms
- [ ] Clear statement that data is shared with partner lenders

### EMI Calculator MUST Have:

- [ ] "Results are indicative only. Actual EMI may vary based on lender terms."

### Site-Wide Requirements:

- [ ] SSL (HTTPS) — Vercel auto-handles
- [ ] Privacy Policy page (DPDP Act compliant)
- [ ] Cookie consent banner (for Google Ads remarketing)
- [ ] Contact information clearly listed

---

## 🔢 Application Number Generation

```ts
// Generate sequential application numbers
async function generateApplicationNumber(
  type: "loan" | "credit",
  supabase: any,
) {
  const prefix = type === "loan" ? "OC" : "CC";
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from(type === "loan" ? "loan_applications" : "credit_correction_requests")
    .select("*", { count: "exact", head: true });
  const seq = String((count || 0) + 1).padStart(5, "0");
  return `${prefix}-${year}-${seq}`; // OC-2026-00001
}
```

---

## 📱 Mobile-First Rules

1. **Bottom navigation on mobile** (`<768px`): Home | Apply | EMI Calc | Account
2. **Touch targets minimum 44px** height — use `min-h-11` in Tailwind
3. **Sticky CTAs**: "Apply Now" floating button on product pages
4. **Form steps**: Full-screen each step on mobile — no horizontal scroll
5. **File upload**: Use native `<input type="file">` — works on iOS/Android
6. **PWA Manifest**: Add to `public/manifest.json` — name, icons, theme_color: #1B3A6B

---

## 📧 Email Notifications (Resend)

Send emails for:

- Application submitted → Applicant confirmation
- Status changed (under_review → approved/rejected) → Applicant update
- New application submitted → Admin notification
- Credit correction submitted → Admin notification

Template IDs stored in `.env.local` as `RESEND_*_TEMPLATE_ID`

---

## 🛠️ Key Libraries & Commands

```bash
# Project setup
npx create-next-app@latest opencredit-website --typescript --tailwind --app --src-dir

# Shadcn UI
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input select dialog toast tabs card badge

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Forms
npm install react-hook-form zod @hookform/resolvers

# Other
npm install recharts framer-motion lucide-react xlsx resend zustand @tanstack/react-query

# Supabase CLI
npm install -g supabase
supabase login
supabase init
supabase db push  # Push migrations
```

---

## 🚫 Common Mistakes to Avoid

1. **Never** hard-code interest rates without the disclaimer "Subject to credit approval"
2. **Never** store PAN/Aadhaar in plain text — encrypt or only store last 4 digits
3. **Never** allow document uploads > 5MB — validate on client AND server
4. **Never** expose admin routes without role check in middleware
5. **Never** use `useRouter().push()` for auth redirects — use server-side redirect
6. **Always** use `createServerClient` in Server Components and API routes
7. **Always** use `createBrowserClient` in Client Components
8. **Always** test RLS policies in Supabase Studio before deploying
9. **Always** add the Google Finance compliance footer on loan pages
10. **Always** generate signed URLs for document access (never public URLs for private docs)

---

## 🌐 Supabase Storage Buckets

| Bucket           | Access        | Purpose                                 |
| ---------------- | ------------- | --------------------------------------- |
| `loan-documents` | Private (RLS) | KYC docs, salary slips, bank statements |
| `profile-photos` | Public        | User profile pictures                   |

Path convention: `{user_id}/{application_id}/{document_type}_{timestamp}.{ext}`

To get signed URL for admin viewing:

```ts
const { data } = await supabase.storage
  .from("loan-documents")
  .createSignedUrl(storagePath, 3600); // 1 hour expiry
```

---

## 📊 Admin Dashboard Queries

```ts
// Stats for admin home
const { count: totalApps } = await supabase
  .from("loan_applications")
  .select("*", { count: "exact", head: true });

const { count: pendingApps } = await supabase
  .from("loan_applications")
  .select("*", { count: "exact", head: true })
  .eq("status", "submitted");

// Applications this week
const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
const { data: weeklyApps } = await supabase
  .from("loan_applications")
  .select("created_at, status, product_type")
  .gte("created_at", weekAgo)
  .order("created_at", { ascending: false });
```

---

_End of CLAUDE.md — opencredit.money_
