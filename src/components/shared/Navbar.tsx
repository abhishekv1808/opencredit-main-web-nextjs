"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, ChevronRight, Home, IndianRupee, TrendingUp,
  Calculator, Info, Phone, ArrowRight, Shield, Sparkles,
  FileCheck, Zap, LayoutDashboard, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

/* ── Products sub-items ── */
const productLinks = [
  {
    label: "Personal Loan",
    href: "/personal-loan",
    icon: IndianRupee,
    desc: "₹50K – ₹40L at 10.25% p.a.",
    accent: "#5BC83F",
  },
  {
    label: "Home Loan",
    href: "/home-loan",
    icon: Building2,
    desc: "Up to ₹10 Cr · From 8.40% p.a.",
    accent: "#1B3A6B",
  },
  {
    label: "CIBIL Correction",
    href: "/credit-report-correction",
    icon: FileCheck,
    desc: "Fix your credit score in 30–90 days",
    accent: "#42A8E5",
  },
];

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "EMI Calculator", href: "/emi-calculator", icon: Calculator },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

const allMobileLinks = [
  { label: "Home",             href: "/",                         icon: Home },
  { label: "Personal Loan",   href: "/personal-loan",            icon: IndianRupee },
  { label: "Home Loan",       href: "/home-loan",                icon: Building2 },
  { label: "CIBIL Correction",href: "/credit-report-correction", icon: TrendingUp },
  { label: "EMI Calculator",  href: "/emi-calculator",           icon: Calculator },
  { label: "About",           href: "/about",                    icon: Info },
  { label: "Contact",         href: "/contact",                  icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      // Only show "My Dashboard" for regular users — not admins
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      if (profile?.role !== "admin") setIsLoggedIn(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setProductsOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setProductsOpen(false), 200);
  };

  const isProductActive = productLinks.some(
    (p) => pathname.startsWith(p.href)
  );

  return (
    <>
      {/* ── Top micro-bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-8 hidden lg:block"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #112240 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Shield size={10} className="text-emerald-400" />
              <span className="text-[10.5px] font-medium text-emerald-400/90 tracking-wide">RBI Compliant</span>
            </div>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-[10.5px] text-white/50 tracking-wide">60+ Partner Banks & NBFCs</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919900077949" className="flex items-center gap-1.5 text-[10.5px] text-white/50 hover:text-white/80 transition-colors">
              <Phone size={9} />
              <span>+91 99000 77949</span>
            </a>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-[10.5px] text-white/50 tracking-wide">Mon–Sat 9AM–6PM</span>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 ease-out",
          "lg:top-8 top-0",
        )}
      >
        {/* Glassmorphism background */}
        <div className={cn(
          "absolute inset-0 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_32px_rgba(0,0,0,0.04)] border-b border-black/[0.04]"
            : "bg-white/60 backdrop-blur-xl border-b border-black/[0.03]"
        )} />

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px]">

            {/* ── Logo ── */}
            <Link href="/" className="relative flex items-center flex-shrink-0 group">
              <Image
                src="/images/OpenCredit-logo.png"
                alt="OpenCredit.Money"
                width={168}
                height={42}
                className="h-[36px] w-auto transition-all duration-300 group-hover:scale-[0.97]"
                priority
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Regular links before Products */}
              <NavLink href="/" label="Home" pathname={pathname} />

              {/* Products Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className={cn(
                    "nav-link-desktop group flex items-center gap-1",
                    isProductActive && "nav-link-active"
                  )}
                >
                  <span>Products</span>
                  <ChevronDown
                    size={13}
                    className={cn(
                      "transition-transform duration-300 opacity-60 group-hover:opacity-100",
                      productsOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown Panel */}
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ease-out",
                  productsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                )}>
                  <div className="w-[340px] rounded-2xl bg-white shadow-[0_16px_64px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.06] overflow-hidden">
                    {/* Dropdown header */}
                    <div className="px-5 pt-4 pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles size={13} className="text-brand-green" />
                        <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-gray-400">Our Products</span>
                      </div>
                    </div>

                    {/* Product items */}
                    <div className="px-2 pb-2">
                      {productLinks.map((product) => {
                        const Icon = product.icon;
                        const isActive = pathname.startsWith(product.href);
                        return (
                          <Link
                            key={product.href}
                            href={product.href}
                            onClick={() => setProductsOpen(false)}
                            className={cn(
                              "flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 group/item",
                              isActive
                                ? "bg-brand-green/[0.07]"
                                : "hover:bg-gray-50"
                            )}
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover/item:scale-105"
                              style={{
                                background: `${product.accent}12`,
                                border: `1px solid ${product.accent}20`,
                              }}
                            >
                              <Icon size={18} style={{ color: product.accent }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-[13.5px] font-semibold transition-colors",
                                isActive ? "text-brand-green" : "text-gray-800 group-hover/item:text-gray-900"
                              )}>
                                {product.label}
                              </p>
                              <p className="text-[11.5px] text-gray-400 mt-0.5">{product.desc}</p>
                            </div>
                            <ArrowRight
                              size={13}
                              className="text-gray-300 transition-all duration-200 group-hover/item:text-gray-500 group-hover/item:translate-x-0.5 flex-shrink-0"
                            />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Dropdown footer */}
                    <div className="mx-3 mb-3 mt-1 rounded-xl px-4 py-3 flex items-center gap-2"
                      style={{ background: "linear-gradient(135deg, #5BC83F08 0%, #42A8E508 100%)", border: "1px solid rgba(91,200,63,0.08)" }}>
                      <Zap size={13} className="text-brand-green flex-shrink-0" />
                      <span className="text-[11px] text-gray-500">
                        <strong className="text-gray-700">Quick approval</strong> — Get results within 24 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining nav links */}
              {navLinks.filter(l => l.label !== "Home").map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
              ))}
            </div>

            {/* ── CTA Buttons ── */}
            <div className="hidden lg:flex items-center gap-2.5">
              {isLoggedIn ? (
                <Link href="/dashboard" className="nav-cta-secondary flex items-center gap-1.5">
                  <LayoutDashboard size={14} />
                  My Dashboard
                </Link>
              ) : (
                <Link href="/login" className="nav-cta-secondary">
                  Login
                </Link>
              )}

              <Link
                href={isLoggedIn ? "/dashboard/apply/personal-loan" : "/register"}
                className="nav-cta-primary group"
              >
                <span>Apply Now</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── Mobile: CTA + Hamburger ── */}
            <div className="lg:hidden flex items-center gap-2.5">
              <Link
                href={isLoggedIn ? "/dashboard" : "/register"}
                className="nav-cta-primary-mobile"
              >
                <span>{isLoggedIn ? "My Dashboard" : "Apply"}</span>
                <ArrowRight size={11} />
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isOpen
                    ? "bg-gray-900 text-white rotate-90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                aria-label="Toggle menu"
              >
                <div className="relative w-[18px] h-[18px]">
                  <X
                    size={18}
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                    )}
                  />
                  <Menu
                    size={18}
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Overlay ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(10,22,40,0.6) 0%, rgba(0,0,0,0.5) 100%)",
          backdropFilter: isOpen ? "blur(4px)" : "blur(0px)",
        }}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Mobile Drawer ── */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[310px] max-w-[85vw] lg:hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          background: "linear-gradient(180deg, #0D1B2A 0%, #0A1628 40%, #0F1F33 100%)",
        }}
      >
        {/* Decorative gradient line at top */}
        <div className="h-[2px] w-full flex-shrink-0"
          style={{ background: "linear-gradient(90deg, #5BC83F, #42A8E5, #5BC83F)" }} />

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4">
          <Image
            src="/images/OpenCredit-logo.png"
            alt="OpenCredit.Money"
            width={130}
            height={34}
            className="h-8 w-auto brightness-0 invert opacity-90"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/[0.06] hover:bg-white/[0.12] text-white/50 hover:text-white/80 hover:rotate-90"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Separator */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto scrollbar-thin">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] px-3 pb-3 text-white/20">
            Menu
          </p>
          {allMobileLinks.map((link, i) => {
            const Icon = link.icon;
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "mobile-nav-link",
                  isActive && "mobile-nav-link-active"
                )}
                style={{
                  transitionDelay: isOpen ? `${80 + i * 40}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(20px)",
                }}
              >
                <span className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  isActive
                    ? "bg-brand-green/20 shadow-[0_0_12px_rgba(91,200,63,0.15)]"
                    : "bg-white/[0.05]"
                )}>
                  <Icon
                    size={15}
                    className={isActive ? "text-brand-green" : "text-white/40"}
                  />
                </span>
                <span className={cn(
                  "flex-1 text-[13.5px] font-semibold transition-colors",
                  isActive ? "text-brand-green" : "text-white/60"
                )}>
                  {link.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(91,200,63,0.5)]" />
                )}
                <ChevronRight
                  size={13}
                  className={cn(
                    "transition-all duration-200",
                    isActive ? "text-brand-green/50" : "text-white/15"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Trust badge */}
        <div className="mx-4 mb-3 rounded-2xl p-4 flex items-start gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(91,200,63,0.08) 0%, rgba(66,168,229,0.06) 100%)",
            border: "1px solid rgba(91,200,63,0.10)",
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-brand-green/15 flex items-center justify-center flex-shrink-0">
            <Shield size={16} className="text-brand-green" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-brand-green">RBI Compliant</p>
            <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">
              Trusted by 4,200+ customers across 25+ partner banks
            </p>
          </div>
        </div>

        {/* Drawer footer CTAs */}
        <div className="px-4 pb-6 pt-2 space-y-2.5 border-t border-white/[0.04]">
          <Link href={isLoggedIn ? "/dashboard/apply/personal-loan" : "/register"} onClick={() => setIsOpen(false)}>
            <span className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[13.5px] font-bold text-white mt-3 transition-all duration-300 hover:shadow-[0_0_24px_rgba(91,200,63,0.25)]"
              style={{
                background: "linear-gradient(135deg, #5BC83F 0%, #3DA52A 100%)",
                boxShadow: "0 4px 16px rgba(91,200,63,0.25)",
              }}>
              {isLoggedIn ? "Go to Dashboard" : "Apply Now — Free"}
              <ArrowRight size={14} />
            </span>
          </Link>
          {!isLoggedIn && (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <span className="flex items-center justify-center w-full py-3 rounded-2xl text-[13px] font-semibold transition-all duration-300 bg-white/[0.05] text-white/55 hover:bg-white/[0.08] hover:text-white/75 mt-2">
                Login to Dashboard
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Desktop NavLink helper ── */
function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn("nav-link-desktop", isActive && "nav-link-active")}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-brand-green" />
      )}
    </Link>
  );
}
