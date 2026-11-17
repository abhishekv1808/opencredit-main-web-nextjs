import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with OpenCredit.Money — Bangalore's trusted loan marketplace. Call +91-9535111137, email contact@opencredit.in, or visit our T. Dasarahalli office. WhatsApp support available.",
  path: "/contact",
  keywords: [
    "contact OpenCredit",
    "loan enquiry Bangalore",
    "personal loan helpline",
    "CIBIL correction contact",
    "OpenCredit phone number",
    "loan support Bangalore",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
