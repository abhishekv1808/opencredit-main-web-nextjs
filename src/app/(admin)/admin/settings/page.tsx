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
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-black text-[#0F2347]">Settings & Configuration</h1>
        <p className="text-sm text-text-muted font-medium">Global control center for OpenCredit operations and system health.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Left Sidebar Nav */}
        <div className="md:col-span-1 space-y-1">
          {[
            { label: "General", icon: AppWindow, active: true },
            { label: "Products", icon: CreditCard },
            { label: "Security", icon: Shield },
            { label: "System Status", icon: Database },
            { label: "Support", icon: LifeBuoy },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                item.active 
                  ? "bg-white shadow-sm border border-gray-100 text-brand-blue" 
                  : "text-text-muted hover:text-heading hover:bg-gray-50/50"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <div className="pt-4 px-4">
            <Separator className="mb-4 bg-gray-100" />
            <button className="flex items-center gap-3 text-red-500 hover:text-red-600 text-sm font-bold transition-colors">
              <LogOut size={18} />
              Logout Session
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* Status Overview Card */}
          <div className="bg-[#0F2347] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/10">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-green">Critical Systems Operational</span>
                </div>
                <h2 className="text-2xl font-black">Admin Health Console</h2>
                <p className="text-white/60 text-sm font-medium">All infrastructure services are responding within expected latency.</p>
              </div>
              <Button className="bg-white text-brand-blue hover:bg-white/90 font-black rounded-2xl px-6 h-12 shadow-lg shadow-white/5">
                System Refresh
              </Button>
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          </div>

          {/* Settings Groups */}
          {settingsGroups.map((group) => (
            <div key={group.title} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
                <div className={`w-10 h-10 rounded-2xl ${group.bg} flex items-center justify-center shrink-0`}>
                  <group.icon size={20} className={group.color} />
                </div>
                <h3 className="font-bold text-heading text-sm uppercase tracking-widest">{group.title}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {group.items.map((item) => (
                  <div key={item.id} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <div className="space-y-0.5">
                      <p className="font-black text-heading text-sm">{item.label}</p>
                      <p className="text-xs text-text-muted font-medium">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={item.alert ? "warning" : "secondary"} className={`text-[10px] font-bold ${!item.alert && "bg-white border-gray-200 text-text-muted"}`}>
                        {item.status}
                      </Badge>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Footer Info */}
          <div className="flex items-center justify-between text-[10px] text-text-muted font-bold uppercase tracking-widest px-8">
            <p>© 2026 OPENCREDIT CORE · V4.2.0-STABLE</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-brand-blue transition-colors">Documentation</a>
              <a href="#" className="hover:text-brand-blue transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
