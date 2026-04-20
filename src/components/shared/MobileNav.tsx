"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, FileText, User, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Apply", href: "/personal-loan", icon: CreditCard },
  { label: "EMI Calc", href: "/emi-calculator", icon: Calculator },
  { label: "CIBIL", href: "/credit-report-correction", icon: FileText },
  { label: "Account", href: "/dashboard", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  // Hide on dashboard and admin pages
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100/80">
      <div className="flex items-center justify-around px-2 py-2 safe-bottom">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[56px] transition-all duration-200",
                isActive
                  ? "text-brand-green bg-brand-green/10"
                  : "text-gray-400 hover:text-heading"
              )}
            >
              <Icon
                size={20}
                className={cn(
                  "transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-none",
                  isActive ? "text-brand-green font-semibold" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
