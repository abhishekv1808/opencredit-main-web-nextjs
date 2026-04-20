"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, Users, TrendingUp,
  LogOut, Menu, ChevronRight, BarChart3,
  Bell, Settings, ExternalLink, Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",    href: "/admin",              icon: LayoutDashboard, group: "main" },
  { label: "Applications", href: "/admin/applications", icon: FileText,        group: "main" },
  { label: "Users",        href: "/admin/users",        icon: Users,           group: "main" },
  { label: "Leads",        href: "/admin/leads",        icon: TrendingUp,      group: "main" },
  { label: "Settings",     href: "/admin/settings",     icon: Settings,        group: "system" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail]   = useState("");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setAdminEmail(data.user.email || "");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    const segment = pathname.split("/admin/")[1]?.split("/")[0];
    return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : "Admin";
  };

  const mainNav    = navItems.filter(n => n.group === "main");
  const systemNav  = navItems.filter(n => n.group === "system");
  const initials   = adminEmail ? adminEmail[0].toUpperCase() : "A";

  return (
    <div className="min-h-screen flex" style={{ background: "#F0F2F5" }}>

      {/* ── Sidebar ── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-[220px] flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )} style={{ background: "#0A1628" }}>

        {/* Top accent bar */}
        <div className="h-[3px] flex-shrink-0"
          style={{ background: "linear-gradient(90deg, #16a34a 0%, #22c55e 50%, #16a34a 100%)" }} />

        {/* Logo */}
        <div className="px-5 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/OpenCredit-logo.png"
              alt="OpenCredit"
              width={120}
              height={30}
              className="h-7 w-auto brightness-0 invert opacity-90"
            />
          </Link>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
            style={{ background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "#4ade80" }}>
              Admin Portal
            </span>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-0.5">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] px-3 pb-3"
            style={{ color: "rgba(255,255,255,0.2)" }}>
            Main Menu
          </p>
          {mainNav.map(item => {
            const Icon = item.icon;
            const isActive = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative"
                style={isActive
                  ? { background: "rgba(22,163,74,0.18)", color: "#4ade80" }
                  : { color: "rgba(255,255,255,0.45)" }
                }
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; } }}
              >
                {/* Active left border */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: "#22c55e" }} />
                )}
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: isActive ? "rgba(22,163,74,0.25)" : "rgba(255,255,255,0.04)",
                    border: isActive ? "1px solid rgba(22,163,74,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  }}>
                  <Icon size={15} />
                </span>
                <span className="flex-1 font-semibold">{item.label}</span>
                {isActive && <ChevronRight size={13} style={{ color: "#4ade80", opacity: 0.7 }} />}
              </Link>
            );
          })}

          {/* System section */}
          <div className="pt-5">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] px-3 pb-3"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              System
            </p>
            {systemNav.map(item => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
                  style={isActive
                    ? { background: "rgba(22,163,74,0.18)", color: "#4ade80" }
                    : { color: "rgba(255,255,255,0.45)" }
                  }
                  onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; } }}
                  onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; } }}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isActive ? "rgba(22,163,74,0.25)" : "rgba(255,255,255,0.04)",
                      border: isActive ? "1px solid rgba(22,163,74,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    }}>
                    <Icon size={15} />
                  </span>
                  <span className="flex-1 font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Quick stat pill */}
        <div className="mx-3 mb-3 rounded-xl p-3.5 flex items-center gap-3"
          style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.14)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(22,163,74,0.18)" }}>
            <Zap size={14} style={{ color: "#4ade80" }} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold" style={{ color: "#4ade80" }}>System Online</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.28)" }}>All services active</p>
          </div>
        </div>

        {/* Admin user card */}
        <div className="flex-shrink-0 px-3 pb-4 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 p-3 rounded-xl mb-2"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: "rgba(255,255,255,0.85)" }}>
                admin@opencredit.money
              </p>
              <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.28)" }}>
                Administrator
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-[12px] font-semibold transition-all"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.10)"; (e.currentTarget as HTMLElement).style.color = "#f87171"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 lg:ml-[220px]">
        {/* Top Header */}
        <header className="sticky top-0 z-20 px-4 md:px-6 h-[56px] flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              style={{ color: "#374151" }}>
              <Menu size={18} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <BarChart3 size={13} style={{ color: "#16a34a" }} />
              <span className="text-xs" style={{ color: "#9ca3af" }}>Admin</span>
              <ChevronRight size={11} style={{ color: "#d1d5db" }} />
              <span className="text-xs font-bold" style={{ color: "#111827" }}>{getPageTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ color: "#6b7280" }}>
              <Bell size={17} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <div className="w-px h-4 mx-1" style={{ background: "#e5e7eb" }} />

            <Link href="/" target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
              style={{ color: "#1B3A6B", background: "rgba(27,58,107,0.06)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(27,58,107,0.12)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(27,58,107,0.06)"}>
              Public Site
              <ExternalLink size={11} />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
