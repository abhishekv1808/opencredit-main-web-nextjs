import Image from "next/image";

const partnerBanks = [
  { name: "HDFC Bank", logo: "/images/banks/hdfc-logo.png" },
  { name: "ICICI Bank", logo: "/images/banks/icici-logo.png" },
  { name: "Axis Bank", logo: "/images/banks/axis-logo.png" },
  { name: "Kotak Bank", logo: "/images/banks/kotak-logo.png" },
  { name: "SBI", logo: "/images/banks/sbi-logo.png" },
  { name: "IndusInd", logo: "/images/banks/indusind-logo.png" },
  { name: "Bajaj Finserv", logo: "/images/banks/bajaj-logo.png" },
  { name: "Tata Capital", logo: "/images/banks/tata-logo.png" },
  { name: "L&T Finance", logo: "/images/banks/lt-logo.png" },
  { name: "Yes Bank", logo: "/images/banks/yes-logo.png" },
  { name: "Federal Bank", logo: "/images/banks/federalbank-logo.png" },
  { name: "IDFC First", logo: "/images/banks/idfc-logo.png" },
  { name: "Muthoot", logo: "/images/banks/muthoot-logo.png" },
  { name: "Bandhan Bank", logo: "/images/banks/bandhan-logo.png" },
  { name: "DBS Bank", logo: "/images/banks/dbs-logo.png" },
  { name: "DCB Bank", logo: "/images/banks/dcbbank-logo.png" },
  { name: "RBL Bank", logo: "/images/banks/rblbank-logo.png" },
  { name: "Fullerton", logo: "/images/banks/Fulerton-logo.png" },
  { name: "IIFL", logo: "/images/banks/iifl-logo.png" },
  { name: "Hero FinCorp", logo: "/images/banks/herofincorp-logo.png" },
  { name: "Aditya Birla", logo: "/images/banks/adityabirla-logo.png" },
  { name: "Piramal", logo: "/images/banks/piramal-logo.png" },
  { name: "Shriram", logo: "/images/banks/shriram-logo.png" },
  { name: "Home Credit", logo: "/images/banks/homecredit-logo.png" },
  { name: "InCred", logo: "/images/banks/incred-logo.png" },
  { name: "Adani Capital", logo: "/images/banks/adani-logo.png" },
  { name: "Navi", logo: "/images/banks/navi-logo.png" },
  { name: "KreditBee", logo: "/images/banks/kreditbee-logo.png" },
  { name: "Equitas", logo: "/images/banks/equitas-logo.png" },
  { name: "Indian Bank", logo: "/images/banks/indianbank-logo.png" },
  { name: "Union Bank", logo: "/images/banks/unionbank-logo.png" },
  { name: "Standard Chartered", logo: "/images/banks/scb-logo.png" },
  { name: "Ujjivan", logo: "/images/banks/ujjivan-logo.png" },
  { name: "Jana Bank", logo: "/images/banks/janabank-logo.png" },
  { name: "LendingKart", logo: "/images/banks/lendingkart-logo.png" },
  { name: "Finnable", logo: "/images/banks/finnable-logo.png" },
  { name: "TVS Credit", logo: "/images/banks/TVScredit-logo.png" },
  { name: "Faircent", logo: "/images/banks/faircent-logo.png" },
  { name: "NeoGrowth", logo: "/images/banks/neogrowth-logo.png" },
  { name: "PaySense", logo: "/images/banks/paysense-logo.png" },
  { name: "Indiabulls", logo: "/images/banks/indiabulls-logo.png" },
  { name: "Repco", logo: "/images/banks/repco-logo.png" },
  { name: "GIC", logo: "/images/banks/gic-logo.png" },
  { name: "Vastu", logo: "/images/banks/vastu-logo.png" },
  { name: "Vistaar", logo: "/images/banks/vistaar-logo.png" },
  { name: "Aadhaar Housing", logo: "/images/banks/aadhaarhousing-logo.png" },
  { name: "MyShubhLife", logo: "/images/banks/myshubhlife-logo.png" },
  { name: "Upwards", logo: "/images/banks/upwards-logo.png" },
  { name: "FTCash", logo: "/images/banks/ftcash-logo.png" },
  { name: "CreditVidya", logo: "/images/banks/credit-logo.png" },
  { name: "Werize", logo: "/images/banks/Werize-logo.png" },
];

export default function PartnerMarquee() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest mb-8">
          Our Partner Banks & NBFCs
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative overflow-hidden mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {[...partnerBanks.slice(0, 26), ...partnerBanks.slice(0, 26)].map((bank, i) => (
            <div key={`row1-${bank.name}-${i}`} className="flex-shrink-0 mx-3">
              <div className="h-14 w-32 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center px-4 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-200">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={100}
                  height={36}
                  className="object-contain max-h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="marquee-track-reverse">
          {[...partnerBanks.slice(26), ...partnerBanks.slice(26)].map((bank, i) => (
            <div key={`row2-${bank.name}-${i}`} className="flex-shrink-0 mx-3">
              <div className="h-14 w-32 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center px-4 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-200">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={100}
                  height={36}
                  className="object-contain max-h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
