import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Phone, Calendar, ShieldCheck } from "lucide-react";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users, count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
        <Users className="w-5 h-5 lg:w-6 lg:h-6 text-heading" />
        <div>
          <h1 className="font-display text-xl lg:text-3xl font-bold text-heading">Registered Users</h1>
          <p className="text-text-muted text-[11px] lg:text-sm">{count || 0} total users</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* ── Mobile Card Layout ── */}
        <div className="md:hidden divide-y divide-gray-50">
          {users?.map((user) => (
            <div key={user.id} className="px-4 py-3.5 space-y-2">
              {/* Name row + Role */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-brand-blue">
                    {(user.full_name?.[0] || user.email?.[0] || "U").toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-heading truncate">{user.full_name || "—"}</p>
                    {user.email && (
                      <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-[8px] px-1.5 py-0">
                    {user.role || "user"}
                  </Badge>
                </div>
              </div>
              {/* Details */}
              <div className="flex items-center gap-3 text-[10px] flex-wrap">
                {user.phone && (
                  <span className="flex items-center gap-1 text-text-muted">
                    <Phone className="w-2.5 h-2.5" /> {user.phone}
                  </span>
                )}
                <Badge
                  variant={user.kyc_status === "verified" ? "success" : user.kyc_status === "rejected" ? "destructive" : "warning"}
                  className="text-[8px] px-1.5 py-0"
                >
                  <ShieldCheck className="w-2.5 h-2.5 mr-0.5" />
                  {user.kyc_status || "pending"}
                </Badge>
                <span className="flex items-center gap-1 text-text-muted">
                  <Calendar className="w-2.5 h-2.5" /> {formatDate(user.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-blue text-white">
                {["Name", "Email", "Phone", "KYC Status", "Role", "Joined"].map((h) => (
                  <th key={h} className="px-3 lg:px-4 py-2 lg:py-3 text-left text-[10px] lg:text-xs font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-[11px] lg:text-xs font-medium">{user.full_name || "—"}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-[11px] lg:text-xs text-text-muted">{user.email || "—"}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-[11px] lg:text-xs font-mono">{user.phone || "—"}</td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3">
                    <Badge
                      variant={user.kyc_status === "verified" ? "success" : user.kyc_status === "rejected" ? "destructive" : "warning"}
                      className="text-[9px] lg:text-[10px] px-1.5 py-0 lg:px-2.5 lg:py-0.5"
                    >
                      {user.kyc_status || "pending"}
                    </Badge>
                  </td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-[9px] lg:text-[10px] px-1.5 py-0 lg:px-2.5 lg:py-0.5">
                      {user.role || "user"}
                    </Badge>
                  </td>
                  <td className="px-3 lg:px-4 py-2 lg:py-3 text-[11px] lg:text-xs text-text-muted">{formatDate(user.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
