import { createClient } from "@/lib/supabase/server";
import {
  FileText, Users, TrendingUp, Clock, CheckCircle,
  ArrowRight, IndianRupee, BarChart3, Wallet, 
  CreditCard, ShieldCheck, Activity
} from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: totalApps },
    { count: pendingApps },
    { count: approvedApps },
    { count: disbursedApps },
    { count: totalUsers },
    { count: totalLeads },
    { count: personalLoanCount },
    { count: creditCorrectionCount },
  ] = await Promise.all([
    supabase.from("loan_applications").select("*", { count: "exact", head: true }),
    supabase.from("loan_applications").select("*", { count: "exact", head: true }).eq("status", "submitted"),
    supabase.from("loan_applications").select("*", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("loan_applications").select("*", { count: "exact", head: true }).eq("status", "disbursed"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("loan_applications").select("*", { count: "exact", head: true }).eq("product_type", "personal_loan"),
    supabase.from("loan_applications").select("*", { count: "exact", head: true }).eq("product_type", "credit_correction"),
  ]);

  const { data: recentApps } = await supabase
    .from("loan_applications")
    .select("id, application_number, status, loan_amount_requested, full_name, created_at, product_type, phone")
    .order("created_at", { ascending: false })
    .limit(10);

  const mainStats = [
    { 
      label: "Applications", 
      value: totalApps || 0, 
      icon: FileText, 
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Total submissions"
    },
    { 
      label: "Active Users", 
      value: totalUsers || 0, 
      icon: Users, 
      color: "text-purple-600",
      bg: "bg-purple-50",
      description: "Registered profiles"
    },
    { 
      label: "New Leads", 
      value: totalLeads || 0, 
      icon: TrendingUp, 
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      description: "Last 30 days"
    },
    { 
      label: "Disbursed", 
      value: disbursedApps || 0, 
      icon: Wallet, 
      color: "text-amber-600",
      bg: "bg-amber-50",
      description: "Finalized loans"
    },
  ];

  const productStats = [
    { 
      label: "Personal Loans", 
      value: personalLoanCount || 0, 
      icon: IndianRupee, 
      color: "text-brand-green",
      percentage: totalApps ? Math.round(((personalLoanCount || 0) / totalApps) * 100) : 0
    },
    { 
      label: "Credit Correction", 
      value: creditCorrectionCount || 0, 
      icon: ShieldCheck, 
      color: "text-brand-blue",
      percentage: totalApps ? Math.round(((creditCorrectionCount || 0) / totalApps) * 100) : 0
    },
  ];

  const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "info" | "destructive" | "gold" | "outline" }> = {
    draft: { label: "Draft", variant: "secondary" },
    submitted: { label: "Submitted", variant: "info" },
    under_review: { label: "Under Review", variant: "warning" },
    approved: { label: "Approved", variant: "success" },
    rejected: { label: "Rejected", variant: "destructive" },
    disbursed: { label: "Disbursed", variant: "success" },
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-[#0F2347]">
            Overview <span className="text-brand-green">Dashboard</span>
          </h1>
          <p className="text-sm text-text-muted font-medium mt-1">
            Real-time insights and application metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">
            <Activity size={14} className="text-brand-green" />
            <span className="text-[11px] font-bold text-heading uppercase tracking-wider">Live Updates</span>
          </div>
          <Link href="/admin/applications">
            <Button className="bg-[#0F2347] hover:bg-[#162D55] shadow-lg shadow-blue-900/10">
              Manage Applications
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-muted">{stat.label}</p>
                  <h3 className="text-3xl font-extrabold text-heading mt-1 group-hover:text-brand-blue transition-colors">
                    {stat.value.toLocaleString()}
                  </h3>
                </div>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                  <Icon size={22} className={stat.color} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-[11px] text-text-muted font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                {stat.description}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Product Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-heading mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-brand-blue" />
              Product Performance
            </h2>
            <div className="space-y-6">
              {productStats.map((prod) => {
                const Icon = prod.icon;
                return (
                  <div key={prod.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", prod.color.replace('text-', 'bg-') + "/10")}>
                          <Icon size={14} className={prod.color} />
                        </div>
                        <span className="text-sm font-bold text-heading">{prod.label}</span>
                      </div>
                      <span className="text-sm font-bold font-mono text-brand-blue">
                        {prod.value}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000", prod.color.replace('text-', 'bg-'))}
                        style={{ width: `${prod.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-widest">
                      <span>Volume</span>
                      <span>{prod.percentage}% of total</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Clock size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-heading">Pending Review</h4>
                    <p className="text-[10px] text-text-muted">Requires attention</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-blue">{pendingApps || 0}</span>
                  <span className="text-[10px] font-bold text-amber-600 uppercase">Waitlist</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-heading">Recent Applications</h2>
                <p className="text-[11px] text-text-muted mt-0.5">Quick view of latest submissions</p>
              </div>
              <Link href="/admin/applications">
                <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-wider gap-2">
                  View List <ArrowRight size={14} />
                </Button>
              </Link>
            </div>

            <div className="flex-1 overflow-x-auto">
              {!recentApps || recentApps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <FileText size={24} className="text-gray-300" />
                  </div>
                  <h3 className="text-sm font-bold text-heading">No applications yet</h3>
                  <p className="text-xs text-text-muted mt-1">Submit your first application to see activity here.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50">
                      {["No.", "Applicant", "Product", "Amount", "Status", ""].map((col) => (
                        <th key={col} className="px-6 py-4 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-gray-100">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentApps.map((app) => {
                      const status = statusConfig[app.status] || statusConfig.draft;
                      return (
                        <tr key={app.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-mono text-[11px] font-bold text-heading">
                              {app.application_number}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-heading">{app.full_name}</span>
                              <span className="text-[10px] text-text-muted font-mono">{app.phone}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="text-[9px] bg-white border-gray-200 text-heading font-medium">
                              {app.product_type === "personal_loan" ? "Personal Loan" : "Credit Correction"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs font-bold text-heading">
                            {app.loan_amount_requested ? formatCurrency(app.loan_amount_requested) : "—"}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={status.variant} className="text-[10px] font-bold">
                              {status.label}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link href={`/admin/applications/${app.id}`}>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight size={14} className="text-brand-blue" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-50 bg-gray-50/30 text-center">
              <p className="text-[10px] font-medium text-text-muted">
                Displaying last 10 entries · Internal Admin Record
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
