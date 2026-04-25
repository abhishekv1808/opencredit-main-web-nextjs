export interface LocationTestimonial {
  name: string;
  role: string;
  amount: string;
  rate: string;
  review: string;
  avatar: string;
  color: string;
}

export interface LocationData {
  slug: string;
  name: string;
  area: string;
  pincode: string;
  approvedCount: string;
  avgAmount: string;
  avgRate: string;
  disbursalTime: string;
  testimonials: LocationTestimonial[];
  seoTitle: string;
  seoDescription: string;
}

export const LOCATIONS: LocationData[] = [
  {
    slug: "koramangala",
    name: "Koramangala",
    area: "South Bangalore",
    pincode: "560034",
    approvedCount: "1,240+",
    avgAmount: "₹8.4L",
    avgRate: "11.2%",
    disbursalTime: "20 hrs",
    seoTitle: "Personal Loan in Koramangala, Bangalore — From 10.25% p.a.",
    seoDescription: "Get instant personal loans in Koramangala, Bangalore from ₹50,000 to ₹40 Lakhs. Rates from 10.25% p.a. 60+ bank partners. 24-hr disbursal. RBI compliant. Apply free.",
    testimonials: [
      { name: "Arjun M.", role: "Startup Founder", amount: "₹15L", rate: "11.5%", review: "Needed working capital fast. OpenCredit got me 4 offers within a day — chose Kotak at 11.5%. Disbursed in 20 hours. Incredible service.", avatar: "AM", color: "#3b82f6" },
      { name: "Sneha R.", role: "UX Designer", amount: "₹5L", rate: "12.0%", review: "Moved to Koramangala recently and needed funds for setup. The entire process was 100% online. Advisor called me within 10 minutes of applying.", avatar: "SR", color: "#8b5cf6" },
      { name: "Karthik B.", role: "Restaurant Owner", amount: "₹20L", rate: "13.5%", review: "Self-employed so I was worried. But OpenCredit matched me with lenders who specialize in business profiles. Got the best rate I've seen.", avatar: "KB", color: "#16a34a" },
    ],
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout",
    area: "South Bangalore",
    pincode: "560102",
    approvedCount: "980+",
    avgAmount: "₹7.8L",
    avgRate: "11.4%",
    disbursalTime: "22 hrs",
    seoTitle: "Personal Loan in HSR Layout, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in HSR Layout from ₹50,000 to ₹40 Lakhs. Rates from 10.25% p.a. 60+ lender network. Same-day approval. Apply online free.",
    testimonials: [
      { name: "Vikram R.", role: "Marketing Manager", amount: "₹5L", rate: "11.0%", review: "Very transparent — no hidden charges. The EMI I calculated online was exactly what I paid. Advisor in HSR was super responsive.", avatar: "VR", color: "#f97316" },
      { name: "Pooja N.", role: "HR Professional", amount: "₹3L", rate: "12.5%", review: "Quick turnaround. Submitted docs Monday, money in account by Wednesday. Minimal paperwork — all digital.", avatar: "PN", color: "#ec4899" },
      { name: "Rajan S.", role: "IT Consultant", amount: "₹10L", rate: "11.2%", review: "Got 6 competing offers and chose the best one. The comparison tool made it easy to understand the total cost.", avatar: "RS", color: "#0891b2" },
    ],
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    area: "East Bangalore",
    pincode: "560066",
    approvedCount: "1,520+",
    avgAmount: "₹9.1L",
    avgRate: "11.3%",
    disbursalTime: "19 hrs",
    seoTitle: "Personal Loan in Whitefield, Bangalore — From 10.25% p.a.",
    seoDescription: "Get personal loans in Whitefield, Bangalore. Instant approval from 60+ banks. Rates from 10.25% p.a. ₹50K–₹40L. 24-hr disbursal. No collateral needed.",
    testimonials: [
      { name: "Priya S.", role: "Software Engineer", amount: "₹8L", rate: "11.5%", review: "Applied Monday morning, funds by Wednesday. Completely paperless. Team was super responsive throughout.", avatar: "PS", color: "#8b5cf6" },
      { name: "Arun K.", role: "Tech Lead", amount: "₹12L", rate: "10.8%", review: "Best rate I found after checking 3 different aggregators. OpenCredit's lender network is genuinely wider.", avatar: "AK", color: "#16a34a" },
      { name: "Meghna T.", role: "Product Manager", amount: "₹6L", rate: "12.0%", review: "Smooth process. Needed funds for home renovation. Got pre-approved offers within minutes of filling the form.", avatar: "MT", color: "#d97706" },
    ],
  },
  {
    slug: "indiranagar",
    name: "Indiranagar",
    area: "East Bangalore",
    pincode: "560038",
    approvedCount: "870+",
    avgAmount: "₹11.2L",
    avgRate: "10.9%",
    disbursalTime: "18 hrs",
    seoTitle: "Personal Loan in Indiranagar, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in Indiranagar, Bangalore. Best rates from 10.25% p.a. 60+ partner banks. Up to ₹40 Lakhs. 24-hr disbursal. Apply free online.",
    testimonials: [
      { name: "Ananya K.", role: "Doctor", amount: "₹25L", rate: "10.5%", review: "Quick, professional, better rates than I expected. Disbursement in under 24 hours. Highly recommend!", avatar: "AK", color: "#16a34a" },
      { name: "Nikhil P.", role: "Architect", amount: "₹8L", rate: "11.8%", review: "Used the loan for office renovation. The eligibility checker gave me a realistic picture before I applied — no surprises.", avatar: "NP", color: "#3b82f6" },
      { name: "Sunitha L.", role: "Lawyer", amount: "₹4L", rate: "13.0%", review: "As a self-employed professional, most banks were hesitant. OpenCredit found the right lenders for my profile.", avatar: "SL", color: "#7c3aed" },
    ],
  },
  {
    slug: "jayanagar",
    name: "Jayanagar",
    area: "South Bangalore",
    pincode: "560041",
    approvedCount: "640+",
    avgAmount: "₹5.6L",
    avgRate: "12.1%",
    disbursalTime: "24 hrs",
    seoTitle: "Personal Loan in Jayanagar, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in Jayanagar, Bangalore from ₹50,000 to ₹40 Lakhs. Rates from 10.25% p.a. No collateral. 60+ lender network. Apply free in 10 minutes.",
    testimonials: [
      { name: "Deepa M.", role: "School Teacher", amount: "₹3L", rate: "13.0%", review: "As a government teacher I was sceptical. OpenCredit found a bank that considers my income type favourably. Amazing!", avatar: "DM", color: "#ec4899" },
      { name: "Suresh P.", role: "Retired Officer", amount: "₹5L", rate: "11.5%", review: "Pensioner loan was not available at my bank. OpenCredit matched me with HDFC who had a scheme for retirees.", avatar: "SP", color: "#0891b2" },
      { name: "Kavitha R.", role: "Homemaker & Tutor", amount: "₹2L", rate: "14.0%", review: "Small loan for my daughters education. Simple process, honest fees. Will use again.", avatar: "KR", color: "#d97706" },
    ],
  },
  {
    slug: "electronic-city",
    name: "Electronic City",
    area: "South Bangalore",
    pincode: "560100",
    approvedCount: "1,180+",
    avgAmount: "₹8.9L",
    avgRate: "11.6%",
    disbursalTime: "21 hrs",
    seoTitle: "Personal Loan in Electronic City, Bangalore — From 10.25% p.a.",
    seoDescription: "Fast personal loans in Electronic City, Bangalore. Rates from 10.25% p.a. 60+ banks. ₹50K–₹40L. 24-hr disbursal. No collateral. Apply online free.",
    testimonials: [
      { name: "Suresh P.", role: "IT Manager", amount: "₹12L", rate: "11.8%", review: "5 lender offers within 10 minutes. Chose the best one. The entire experience was smooth and stress-free.", avatar: "SP", color: "#0891b2" },
      { name: "Ramesh V.", role: "QA Engineer", amount: "₹6L", rate: "12.5%", review: "Night shift worker — was worried about reaching advisors. OpenCredit's online process meant I didn't need to call anyone.", avatar: "RV", color: "#3b82f6" },
      { name: "Lakshmi B.", role: "Data Analyst", amount: "₹4L", rate: "12.0%", review: "Clean, transparent fee structure. No processing fee surprises. Disbursed exactly as promised.", avatar: "LB", color: "#16a34a" },
    ],
  },
  {
    slug: "marathahalli",
    name: "Marathahalli",
    area: "East Bangalore",
    pincode: "560037",
    approvedCount: "760+",
    avgAmount: "₹7.2L",
    avgRate: "11.9%",
    disbursalTime: "23 hrs",
    seoTitle: "Personal Loan in Marathahalli, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in Marathahalli, Bangalore. 60+ bank partners. Rates from 10.25% p.a. Instant approval. Up to ₹40 Lakhs. No collateral needed.",
    testimonials: [
      { name: "Shreya T.", role: "Software Developer", amount: "₹7L", rate: "11.5%", review: "Applied for home renovation funds. Got 5 offers in 15 minutes. Picked the one with the lowest total interest.", avatar: "ST", color: "#d97706" },
      { name: "Prashanth N.", role: "Business Analyst", amount: "₹9L", rate: "12.2%", review: "Advisor walked me through each offer and explained the fine print. Rare to get that level of handholding.", avatar: "PN", color: "#7c3aed" },
      { name: "Geetha K.", role: "Nurse", amount: "₹2.5L", rate: "13.5%", review: "Medical emergency — needed funds immediately. OpenCredit got me approved and disbursed within one working day.", avatar: "GK", color: "#ec4899" },
    ],
  },
  {
    slug: "banashankari",
    name: "Banashankari",
    area: "South Bangalore",
    pincode: "560070",
    approvedCount: "490+",
    avgAmount: "₹5.1L",
    avgRate: "12.3%",
    disbursalTime: "24 hrs",
    seoTitle: "Personal Loan in Banashankari, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in Banashankari, Bangalore. Rates from 10.25% p.a. ₹50K–₹40L. No collateral. 60+ lender network. Fast approval. Apply free.",
    testimonials: [
      { name: "Vijay N.", role: "Civil Engineer", amount: "₹3L", rate: "12.0%", review: "Needed ₹3L urgently. Received in just 6 hours. No branch visit, fully digital. Excellent!", avatar: "VN", color: "#16a34a" },
      { name: "Saritha M.", role: "Teacher", amount: "₹2L", rate: "13.5%", review: "Simple process, honest advice. Advisor told me upfront what rates to expect based on my CIBIL score.", avatar: "SM", color: "#ec4899" },
      { name: "Anand G.", role: "Shop Owner", amount: "₹8L", rate: "14.0%", review: "Business loan for stock purchase. Self-employed profile was not an issue — OpenCredit had lenders for every profile.", avatar: "AG", color: "#f97316" },
    ],
  },
  {
    slug: "rajajinagar",
    name: "Rajajinagar",
    area: "West Bangalore",
    pincode: "560010",
    approvedCount: "420+",
    avgAmount: "₹6.3L",
    avgRate: "12.0%",
    disbursalTime: "24 hrs",
    seoTitle: "Personal Loan in Rajajinagar, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in Rajajinagar, Bangalore. Rates from 10.25% p.a. No collateral. 60+ banks. ₹50K to ₹40 Lakhs. Online application, 24-hr disbursal.",
    testimonials: [
      { name: "Divya S.", role: "Accountant", amount: "₹4L", rate: "12.5%", review: "Refinanced an old high-interest loan through OpenCredit. Saving ₹4,000/month on EMI now. Game changer.", avatar: "DS", color: "#d97706" },
      { name: "Mohan R.", role: "Retired Bank Manager", amount: "₹6L", rate: "11.0%", review: "Even at 62 years, I qualified with a pension income. OpenCredit's advisors knew exactly which lenders accept retirees.", avatar: "MR", color: "#3b82f6" },
      { name: "Preethi N.", role: "Fashion Designer", amount: "₹3.5L", rate: "13.0%", review: "Self-employed with irregular income. Advisor guided me on which documents to submit to maximise my chances.", avatar: "PN", color: "#7c3aed" },
    ],
  },
  {
    slug: "jp-nagar",
    name: "JP Nagar",
    area: "South Bangalore",
    pincode: "560078",
    approvedCount: "570+",
    avgAmount: "₹6.8L",
    avgRate: "11.8%",
    disbursalTime: "22 hrs",
    seoTitle: "Personal Loan in JP Nagar, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in JP Nagar, Bangalore from ₹50,000 to ₹40 Lakhs. Rates from 10.25% p.a. Fast approval. 60+ lender network. Apply free online.",
    testimonials: [
      { name: "Kiran B.", role: "Software Architect", amount: "₹12L", rate: "11.8%", review: "Approved for ₹12L within 2 hours of applying. The comparison tool helped me pick the lender with lowest total interest.", avatar: "KB", color: "#16a34a" },
      { name: "Usha P.", role: "School Principal", amount: "₹5L", rate: "12.0%", review: "Used the loan for my son's higher education expenses. Fast, hassle-free process — advisor was very patient.", avatar: "UP", color: "#ec4899" },
      { name: "Girish M.", role: "Freelance Developer", amount: "₹4L", rate: "13.5%", review: "As a freelancer getting a loan is tough. OpenCredit found 3 lenders who accept ITR as income proof.", avatar: "GM", color: "#0891b2" },
    ],
  },
  {
    slug: "hebbal",
    name: "Hebbal",
    area: "North Bangalore",
    pincode: "560024",
    approvedCount: "390+",
    avgAmount: "₹7.5L",
    avgRate: "11.7%",
    disbursalTime: "23 hrs",
    seoTitle: "Personal Loan in Hebbal, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in Hebbal, Bangalore. Rates from 10.25% p.a. ₹50K–₹40L. 60+ partner banks. No collateral. 24-hr disbursal. Apply free.",
    testimonials: [
      { name: "Lakshmi R.", role: "Pharmacist", amount: "₹6L", rate: "12.0%", review: "Medical emergency fund secured in under a day. The process was entirely online — no visit to any branch required.", avatar: "LR", color: "#16a34a" },
      { name: "Naveen K.", role: "Pilot", amount: "₹18L", rate: "10.8%", review: "Got the absolute lowest rate I've seen for a personal loan. OpenCredit's comparison saved me lakhs in interest.", avatar: "NK", color: "#3b82f6" },
      { name: "Smitha G.", role: "Dentist", amount: "₹10L", rate: "11.5%", review: "Professional loan for clinic equipment. Advisor knew exactly which lenders cater to healthcare professionals.", avatar: "SG", color: "#7c3aed" },
    ],
  },
  {
    slug: "yelahanka",
    name: "Yelahanka",
    area: "North Bangalore",
    pincode: "560064",
    approvedCount: "310+",
    avgAmount: "₹6.1L",
    avgRate: "12.2%",
    disbursalTime: "24 hrs",
    seoTitle: "Personal Loan in Yelahanka, Bangalore — From 10.25% p.a.",
    seoDescription: "Personal loans in Yelahanka, Bangalore. Rates from 10.25% p.a. No collateral required. 60+ lender network. ₹50K to ₹40 Lakhs. Apply online free.",
    testimonials: [
      { name: "Arjun V.", role: "Defence Officer", amount: "₹4L", rate: "11.0%", review: "Got approved for ₹4L in 4 hours. OpenCredit had special schemes from banks that cater to defence personnel.", avatar: "AV", color: "#16a34a" },
      { name: "Ritu S.", role: "Flight Attendant", amount: "₹3.5L", rate: "12.5%", review: "Variable income made banks hesitant. OpenCredit's advisor knew which lenders accept average monthly income proof.", avatar: "RS", color: "#ec4899" },
      { name: "Manoj T.", role: "Contractor", amount: "₹8L", rate: "13.5%", review: "Business loan for construction material. Process was smooth — no branch visits and disbursed as promised.", avatar: "MT", color: "#f97316" },
    ],
  },
];

export function getLocation(slug: string): LocationData | undefined {
  return LOCATIONS.find(l => l.slug === slug);
}
