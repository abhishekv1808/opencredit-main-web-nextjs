import { 
  Settings, User, Bell, Shield, 
  Database, Globe, Moon, CreditCard,
  CheckCircle2, AlertTriangle, RefreshCw,
  ExternalLink, ChevronRight, LogOut,
  AppWindow, LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const settingsGroups = [
  {
    title: "Account & Profile",
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: [
      { id: "profile", label: "Admin Profile", description: "Manage your personal info and avatar", status: "Admin Account" },
      { id: "notifications", label: "Email Notifications", description: "Configure which alerts you receive", status: "Enabled" },
      { id: "security", label: "Two-Factor Auth", description: "Add an extra layer of security", status: "Recommended", alert: true },
    ]
  },
  {
    title: "System Parameters",
    icon: Settings,
    color: "text-purple-600",
    bg: "bg-purple-50",
    items: [
      { id: "products", label: "Loan Products", description: "Manage interest rates and limits", status: "2 Active" },
      { id: "regions", label: "Serviceable Regions", description: "Filter applications by location", status: "Pan India" },
      { id: "api", label: "API Configuration", description: "Manage webhooks and external keys", status: "Live" },
    ]
  },
  {
    title: "Database & Security",
    icon: Database,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    items: [
      { id: "backup", label: "Periodic Backups", description: "Last backup: 2 hours ago", status: "Healthy" },
      { id: "audit", label: "Audit Logs", description: "Track all administrative actions", status: "View Logs" },
      { id: "permissions", label: "Role Management", description: "Control access for other admins", status: "Advanced" },
    ]
  }
];

export default function AdminSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8 pb-8 lg:pb-12">
      {/* Header */}
      <div className="flex flex-col gap-1 lg:gap-2">
        <h1 className="font-display text-xl lg:text-3xl font-black text-[#0F2347]">Settings & Configuration</h1>
        <p className="text-[11px] lg:text-sm text-text-muted font-medium">Global control center for OpenCredit operations and system health.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
        {/* Left Sidebar Nav — Horizontal scroll on mobile */}
        <div className="md:col-span-1">
          {/* Mobile: horizontal pills */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            {[
              { label: "General", icon: AppWindow, active: true },
              { label: "Products", icon: CreditCard },
              { label: "Security", icon: Shield },
              { label: "System", icon: Database },
              { label: "Support", icon: LifeBuoy },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                  item.active 
                    ? "bg-white shadow-sm border border-gray-100 text-brand-blue" 
                    : "text-text-muted hover:text-heading bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </div>
          {/* Desktop: vertical sidebar */}
          <div className="hidden md:block space-y-1">
            {[
              { label: "General", icon: AppWindow, active: true },
              { label: "Products", icon: CreditCard },
              { label: "Security", icon: Shield },
              { label: "System Status", icon: Database },
              { label: "Support", icon: LifeBuoy },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-2.5 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl lg:rounded-2xl text-[11px] lg:text-sm font-bold transition-all ${
                  item.active 
                    ? "bg-white shadow-sm border border-gray-100 text-brand-blue" 
                    : "text-text-muted hover:text-heading hover:bg-gray-50/50"
                }`}
              >
                <item.icon className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                {item.label}
              </button>
            ))}
            <div className="pt-2 lg:pt-4 px-3 lg:px-4">
              <Separator className="mb-3 lg:mb-4 bg-gray-100" />
              <button className="flex items-center gap-2 lg:gap-3 text-red-500 hover:text-red-600 text-[11px] lg:text-sm font-bold transition-colors">
                <LogOut className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                Logout Session
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-4 lg:space-y-6">
          {/* Status Overview Card */}
          <div className="bg-[#0F2347] rounded-2xl lg:rounded-[32px] p-4 lg:p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/10">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.2em] font-black text-brand-green">Critical Systems Operational</span>
                </div>
                <h2 className="text-lg lg:text-2xl font-black">Admin Health Console</h2>
                <p className="text-white/60 text-[10px] lg:text-sm font-medium">All infrastructure services are responding within expected latency.</p>
              </div>
              <Button className="w-full sm:w-auto bg-white text-brand-blue hover:bg-white/90 font-black rounded-xl lg:rounded-2xl px-4 lg:px-6 h-9 lg:h-12 text-[10px] lg:text-[13px] shadow-lg shadow-white/5">
                System Refresh
              </Button>
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          </div>

          {/* Settings Groups */}
          {settingsGroups.map((group) => (
            <div key={group.title} className="bg-white rounded-2xl lg:rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 lg:px-8 lg:py-6 border-b border-gray-50 flex items-center gap-2 lg:gap-3 bg-gray-50/30">
                <div className={`w-7 h-7 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl ${group.bg} flex items-center justify-center shrink-0`}>
                  <group.icon className={`w-3.5 h-3.5 lg:w-5 lg:h-5 ${group.color}`} />
                </div>
                <h3 className="font-bold text-heading text-[11px] lg:text-sm uppercase tracking-widest">{group.title}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {group.items.map((item) => (
                  <div key={item.id} className="px-4 py-3.5 lg:px-8 lg:py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group cursor-pointer gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-black text-heading text-[11px] lg:text-sm">{item.label}</p>
                      <p className="text-[9px] lg:text-xs text-text-muted font-medium truncate">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-4 shrink-0">
                      <Badge variant={item.alert ? "warning" : "secondary"} className={`text-[8px] lg:text-[10px] font-bold px-1.5 py-0 lg:px-2.5 lg:py-0.5 ${!item.alert && "bg-white border-gray-200 text-text-muted"}`}>
                        {item.status}
                      </Badge>
                      <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Footer Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[8px] lg:text-[10px] text-text-muted font-bold uppercase tracking-widest px-2 lg:px-8">
            <p>© 2026 OPENCREDIT CORE · V4.2.0-STABLE</p>
            <div className="flex items-center gap-2 lg:gap-4">
              <a href="#" className="hover:text-brand-blue transition-colors">Documentation</a>
              <a href="#" className="hover:text-brand-blue transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
