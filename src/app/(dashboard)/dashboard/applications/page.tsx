import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  FileText, PlusCircle, ArrowRight,
  CheckCircle, TrendingUp,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  draft:        { label: "Draft",        bg: "#f3f4f6", color: "#6b7280" },
  submitted:    { label: "Submitted",    bg: "#eff6ff", color: "#3b82f6" },
  under_review: { label: "Under Review", bg: "#fffbeb", color: "#d97706" },
  approved:     { label: "Approved",     bg: "#f0fdf4", color: "#16a34a" },
  rejected:     { label: "Rejected",     bg: "#fef2f2", color: "#dc2626" },
  disbursed:    { label: "Disbursed",    bg: "#f0fdf4", color: "#15803d" },
};

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: applications } = await supabase
    .from("loan_applications").select("*").eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: corrections } = await supabase
    .from("credit_correction_requests").select("*").eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalApps = (applications?.length || 0) + (corrections?.length || 0);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#16a34a" }}>Applications</p>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1a1a1a" }}>My Applications</h1>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
            {totalApps} application{totalApps !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link href="/dashboard/apply/personal-loan">
          <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "#16a34a" }}>
            <PlusCircle size={15} />
            New Application
          </span>
        </Link>
      </div>

      {totalApps === 0 ? (
        <div className="bg-white rounded-2xl py-20 text-center"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "#f0fdf4" }}>
            <FileText size={28} style={{ color: "#16a34a" }} />
          </div>
          <h3 className="font-bold text-base mb-2" style={{ color: "#1a1a1a" }}>No Applications Yet</h3>
          <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
            Start your first loan application — it only takes 10 minutes.
          </p>
          <Link href="/dashboard/apply/personal-loan">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#16a34a" }}>
              <PlusCircle size={15} />
              Apply for Personal Loan
            </span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Loan Applications */}
          {applications && applications.length > 0 && (
            <div className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 flex items-center gap-3"
                style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                  <FileText size={13} style={{ color: "#16a34a" }} />
                </div>
                <h2 className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>Loan Applications</h2>
                <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  {applications.length}
                </span>
              </div>
              <div>
                {applications.map((app, idx) => {
                  const status = statusConfig[app.status] || statusConfig.draft;
                  return (
                    <Link key={app.id} href={`/dashboard/applications/${app.id}`}>
                      <div
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                        style={{ borderBottom: idx < applications.length - 1 ? "1px solid #f5f5f5" : "none" }}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: status.bg }}>
                          <FileText size={15} style={{ color: status.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="font-mono font-bold text-sm" style={{ color: "#1a1a1a" }}>
                              {app.application_number}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: status.bg, color: status.color }}>
                              {status.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: "#9ca3af" }}>
                            <span>{app.product_type === "home_loan" ? "Home Loan" : "Personal Loan"}</span>
                            {app.loan_amount_requested && (
                              <><span>·</span><span className="font-mono">{formatCurrency(app.loan_amount_requested)}</span></>
                            )}
                            {app.loan_tenure_months && (
                              <><span>·</span><span>{app.loan_tenure_months} months</span></>
                            )}
                            <span>·</span>
                            <span>{formatDate(app.created_at)}</span>
                          </div>
                        </div>
                        <ArrowRight size={14} style={{ color: "#d1d5db", flexShrink: 0 }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Credit Correction */}
          {corrections && corrections.length > 0 && (
            <div className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 flex items-center gap-3"
                style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                  <TrendingUp size={13} style={{ color: "#16a34a" }} />
                </div>
                <h2 className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>CIBIL Correction Requests</h2>
                <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  {corrections.length}
                </span>
              </div>
              <div>
                {corrections.map((req, idx) => (
                  <div key={req.id}
                    className="flex items-center gap-4 px-6 py-4"
                    style={{ borderBottom: idx < corrections.length - 1 ? "1px solid #f5f5f5" : "none" }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "#f0fdf4" }}>
                      <CheckCircle size={15} style={{ color: "#16a34a" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono font-bold text-sm" style={{ color: "#1a1a1a" }}>
                          {req.request_number}
                        </span>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={req.status === "resolved"
                            ? { background: "#f0fdf4", color: "#16a34a" }
                            : { background: "#fffbeb", color: "#d97706" }
                          }
                        >
                          {req.status?.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#9ca3af" }}>
                        {req.issues?.length || 0} issue(s) · {formatDate(req.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <p className="text-[11px] text-center mt-6" style={{ color: "#c4c4c4" }}>
        Rates 10.25%–36% p.a. · Subject to credit approval · OpenCredit is a loan marketplace/DSA
      </p>
    </div>
  );
}
