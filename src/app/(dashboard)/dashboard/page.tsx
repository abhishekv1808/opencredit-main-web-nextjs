import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  FileText, PlusCircle, TrendingUp, Clock,
  CheckCircle, XCircle, AlertCircle, ArrowRight, ArrowUpRight, Home,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";

const statusConfig = {
  draft:        { label: "Draft",        bg: "#f3f4f6", color: "#6b7280", icon: Clock },
  submitted:    { label: "Submitted",    bg: "#eff6ff", color: "#3b82f6", icon: Clock },
  under_review: { label: "Under Review", bg: "#fffbeb", color: "#d97706", icon: AlertCircle },
  approved:     { label: "Approved",     bg: "#f0fdf4", color: "#16a34a", icon: CheckCircle },
  rejected:     { label: "Rejected",     bg: "#fef2f2", color: "#dc2626", icon: XCircle },
  disbursed:    { label: "Disbursed",    bg: "#f0fdf4", color: "#15803d", icon: CheckCircle },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles").select("full_name, kyc_status").eq("id", user.id).single();

  const { data: applications } = await supabase
    .from("loan_applications").select("*").eq("user_id", user.id)
    .order("created_at", { ascending: false }).limit(5);

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome */}
      <div className="mb-7">
        <p className="text-sm font-semibold mb-1" style={{ color: "#16a34a" }}>Welcome back</p>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1a1a1a" }}>
          Hello, {firstName}!
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
          Manage your loan applications and track their status below.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        <Link href="/dashboard/apply/personal-loan">
          <div
            className="relative rounded-2xl p-6 overflow-hidden cursor-pointer group transition-all hover:-translate-y-0.5"
            style={{ background: "#16a34a" }}
          >
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="absolute right-4 -bottom-10 w-36 h-36 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="relative">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                  <PlusCircle size={20} color="white" />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <ArrowUpRight size={14} color="white" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Personal Loan</h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                ₹50K – ₹40L &nbsp;·&nbsp; From 10.25% p.a.
              </p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/apply/home-loan">
          <div
            className="relative rounded-2xl p-6 overflow-hidden cursor-pointer group transition-all hover:-translate-y-0.5"
            style={{ background: "#1B3A6B" }}
          >
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="absolute right-4 -bottom-10 w-36 h-36 rounded-full" style={{ background: "rgba(255,255,255,0.03)" }} />
            <div className="relative">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <Home size={20} color="white" />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform" style={{ background: "rgba(255,255,255,0.10)" }}>
                  <ArrowUpRight size={14} color="white" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Home Loan</h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>
                Up to ₹10 Cr &nbsp;·&nbsp; From 8.40% p.a.
              </p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/apply/credit-correction">
          <div
            className="relative rounded-2xl p-6 overflow-hidden cursor-pointer group transition-all hover:-translate-y-0.5"
            style={{ background: "#1a1a1a" }}
          >
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
            <div className="absolute right-4 -bottom-10 w-36 h-36 rounded-full" style={{ background: "rgba(255,255,255,0.03)" }} />
            <div className="relative">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(22,163,74,0.2)" }}>
                  <TrendingUp size={20} style={{ color: "#4ade80" }} />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <ArrowUpRight size={14} color="white" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">CIBIL Correction</h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                Expert correction &nbsp;·&nbsp; 30–90 days
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #f0f0f0" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f0fdf4" }}>
              <FileText size={15} style={{ color: "#16a34a" }} />
            </div>
            <div>
              <h2 className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>Recent Applications</h2>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                {applications?.length || 0} application{applications?.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/applications"
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: "#16a34a" }}
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>

        {!applications || applications.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#f0fdf4" }}>
              <FileText size={24} style={{ color: "#16a34a" }} />
            </div>
            <h3 className="font-semibold text-sm mb-1.5" style={{ color: "#1a1a1a" }}>No Applications Yet</h3>
            <p className="text-xs mb-5" style={{ color: "#9ca3af" }}>Start your first loan application today.</p>
            <Link href="/dashboard/apply/personal-loan">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#16a34a" }}
              >
                <PlusCircle size={15} />
                Apply Now
              </span>
            </Link>
          </div>
        ) : (
          <div>
            {applications.map((app, idx) => {
              const status = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.draft;
              const StatusIcon = status.icon;
              return (
                <Link key={app.id} href={`/dashboard/applications/${app.id}`}>
                  <div
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{ borderBottom: idx < applications.length - 1 ? "1px solid #f5f5f5" : "none" }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: status.bg }}>
                      <StatusIcon size={16} style={{ color: status.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-mono font-bold text-sm" style={{ color: "#1a1a1a" }}>
                          {app.application_number}
                        </span>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: status.bg, color: status.color }}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#9ca3af" }}>
                        {app.product_type === "personal_loan" ? "Personal Loan" : app.product_type === "home_loan" ? "Home Loan" : "Credit Correction"}
                        {app.loan_amount_requested && (
                          <> &middot; <span className="font-mono">{formatCurrency(app.loan_amount_requested)}</span></>
                        )}
                        {" · "}{formatDate(app.created_at)}
                      </p>
                    </div>
                    <ArrowRight size={14} style={{ color: "#d1d5db", flexShrink: 0 }} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-[11px] text-center mt-6" style={{ color: "#c4c4c4" }}>
        Rates 10.25%–36% p.a. · Subject to credit approval · OpenCredit is a loan marketplace/DSA
      </p>
    </div>
  );
}
