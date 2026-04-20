import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users, count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <Users size={24} className="text-heading" />
        <div>
          <h1 className="font-display text-3xl font-bold text-heading">Registered Users</h1>
          <p className="text-text-muted text-sm">{count || 0} total users</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-blue text-white">
                {["Name", "Email", "Phone", "KYC Status", "Role", "Joined"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-medium">{user.full_name || "—"}</td>
                  <td className="px-4 py-3 text-xs text-text-muted">{user.email || "—"}</td>
                  <td className="px-4 py-3 text-xs font-mono">{user.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.kyc_status === "verified" ? "success" : user.kyc_status === "rejected" ? "destructive" : "warning"}
                      className="text-[10px]"
                    >
                      {user.kyc_status || "pending"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-[10px]">
                      {user.role || "user"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-muted">{formatDate(user.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
