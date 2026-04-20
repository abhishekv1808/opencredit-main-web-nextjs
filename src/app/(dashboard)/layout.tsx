"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, PlusCircle, User,
  LogOut, Menu, X, TrendingUp, ChevronRight,
  Bell, Settings, HelpCircle, Shield,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home",            href: "/dashboard",                         icon: LayoutDashboard, desc: "Overview" },
  { label: "My Applications", href: "/dashboard/applications",            icon: FileText,        desc: "Track status" },
  { label: "Apply — Personal Loan", href: "/dashboard/apply/personal-loan",    icon: PlusCircle,      desc: "₹50K – ₹40L" },
  { label: "CIBIL Correction",      href: "/dashboard/apply/credit-correction", icon: TrendingUp,      desc: "Fix your score" },
  { label: "My Profile",      href: "/dashboard/profile",                 icon: User,            desc: "Account details" },
];

const bottomItems = [
  { label: "Help & Support", href: "/contact",  icon: HelpCircle },
  { label: "Privacy",        href: "/privacy-policy", icon: Shield },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser]             = useState<{ email?: string; full_name?: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      setUser({ email: data.user.email, full_name: data.user.user_metadata?.full_name });
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const initials = user?.full_name
    ? user.full_name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U";

  const firstName = user?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>

      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-40 bg-white"
        style={{ borderBottom: "1px solid #e9ecef", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Left: Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/images/OpenCredit-logo.png" alt="OpenCredit.Money"
              width={140} height={36} className="h-8 w-auto" priority />
          </Link>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all"
                  style={{
                    color: isActive ? "#16a34a" : "#6b7280",
                    background: isActive ? "#f0fdf4" : "transparent",
                    fontWeight: isActive ? 600 : 500,
                  }}
                  onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "#f8fafc"; (e.currentTarget as HTMLElement).style.color = "#1a1a1a"; } }}
                  onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; } }}
                >
                  <Icon size={14} />
                  {item.label.replace(" — Personal Loan", "").replace("Apply — ", "Apply")}
                </Link>
              );
            })}
          </nav>

          {/* Right: user + bell */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: "#f1f5f9", color: "#64748b" }}>
              <Bell size={16} />
            </button>

            {/* Avatar dropdown trigger */}
            <div className="hidden md:flex items-center gap-2.5 pl-2 border-l"
              style={{ borderColor: "#e9ecef" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                {initials}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold" style={{ color: "#1a1a1a" }}>{firstName}</p>
                <p className="text-[10px]" style={{ color: "#9ca3af" }}>Member</p>
              </div>
              <button onClick={handleLogout}
                className="ml-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors"
                style={{ color: "#6b7280", background: "#f8fafc" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fee2e2"; (e.currentTarget as HTMLElement).style.color = "#dc2626"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f8fafc"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}>
                Sign out
              </button>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setDrawerOpen(true)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#f1f5f9", color: "#1a1a1a" }}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col"
            style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.12)" }}>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid #f0f0f0" }}>
              <Image src="/images/OpenCredit-logo.png" alt="OpenCredit.Money"
                width={120} height={30} className="h-7 w-auto" />
              <button onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#f1f5f9", color: "#6b7280" }}>
                <X size={15} />
              </button>
            </div>

            {/* User card */}
            <div className="mx-4 mt-4 p-3 rounded-2xl flex items-center gap-3"
              style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: "#1a1a1a" }}>{user?.full_name || firstName}</p>
                <p className="text-xs truncate" style={{ color: "#6b7280" }}>{user?.email}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest px-3 pb-2"
                style={{ color: "#9ca3af" }}>Navigation</p>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                    style={isActive
                      ? { background: "#f0fdf4", color: "#16a34a", fontWeight: 600 }
                      : { color: "#374151" }
                    }>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? "#dcfce7" : "#f8fafc" }}>
                      <Icon size={14} style={{ color: isActive ? "#16a34a" : "#9ca3af" }} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[13px]">{item.label}</p>
                      <p className="text-[11px]" style={{ color: "#9ca3af" }}>{item.desc}</p>
                    </div>
                    <ChevronRight size={13} style={{ color: isActive ? "#16a34a" : "#d1d5db" }} />
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-3 pb-6 pt-3 space-y-1"
              style={{ borderTop: "1px solid #f0f0f0" }}>
              {bottomItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors"
                    style={{ color: "#6b7280" }}>
                    <Icon size={14} />
                    {item.label}
                  </Link>
                );
              })}
              <button onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-colors"
                style={{ color: "#dc2626" }}>
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {children}
      </main>

    </div>
  );
}
