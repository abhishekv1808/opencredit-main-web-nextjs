import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminLeadsPage() {
  const supabase = await createClient();

  const { data: leads, count } = await supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(100);

  const sourceColors: Record<string, "default" | "gold" | "success" | "info" | "warning"> = {
    emi_calculator: "gold",
    contact_form: "info",
    landing_page: "success",
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <TrendingUp size={24} className="text-heading" />
        <div>
          <h1 className="font-display text-3xl font-bold text-heading">Leads</h1>
          <p className="text-text-muted text-sm">{count || 0} total leads</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-blue text-white">
                {["Name", "Phone", "Email", "Source", "Loan Amount", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {!leads || leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-text-muted text-sm">
                    No leads yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-medium">{lead.name || "—"}</td>
                    <td className="px-4 py-3 text-xs font-mono text-text-muted">{lead.phone}</td>
                    <td className="px-4 py-3 text-xs text-text-muted">{lead.email || "—"}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={sourceColors[lead.source] || "secondary"}
                        className="text-[10px] capitalize"
                      >
                        {lead.source?.replace(/_/g, " ") || "—"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">
                      {lead.loan_amount ? formatCurrency(lead.loan_amount) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted">{formatDate(lead.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
