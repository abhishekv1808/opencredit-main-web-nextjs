import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MobileNav from "@/components/shared/MobileNav";
import CookieConsent from "@/components/shared/CookieConsent";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ExitIntentPopup from "@/components/shared/ExitIntentPopup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
      <WhatsAppButton />
      <CookieConsent />
      <ExitIntentPopup />
    </>
  );
}
