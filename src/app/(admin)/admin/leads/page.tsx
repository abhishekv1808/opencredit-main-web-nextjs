import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TrendingUp, MessageSquare, Phone, Mail, Calendar, User, ChevronDown } from "lucide-react";
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
    landing_page: "success",
  };

  const getSourceVariant = (source: string | null) => {
    if (!source) return "secondary" as const;
    if (source.startsWith("contact_form")) return "info" as const;
    return sourceColors[source] || ("secondary" as const);
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <TrendingUp size={22} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-heading">
              Leads & <span className="text-brand-green">Inquiries</span>
            </h1>
            <p className="text-text-muted text-sm font-medium mt-0.5">
              {count || 0} total leads from contact form & website
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Leads", value: count || 0, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Contact Form", value: leads?.filter(l => l.source?.startsWith("contact_form")).length || 0, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Other Sources", value: leads?.filter(l => !l.source?.startsWith("contact_form")).length || 0, icon: ChevronDown, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-text-muted">{stat.label}</p>
                  <h3 className="text-2xl font-extrabold text-heading mt-1">{stat.value}</h3>
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-heading">All Leads</h2>
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
            Latest {leads?.length || 0} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                {["Name", "Phone", "Email", "Source/Subject", "Message", "Date"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-gray-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!leads || leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <MessageSquare size={22} className="text-gray-300" />
                      </div>
                      <h3 className="text-sm font-bold text-heading mb-1">No leads yet</h3>
                      <p className="text-xs text-text-muted">Contact form submissions will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                          <User size={14} className="text-brand-green" />
                        </div>
                        <span className="text-xs font-bold text-heading">{lead.name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-brand-green transition-colors">
                        <Phone size={11} />
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      {lead.email ? (
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-brand-blue transition-colors">
                          <Mail size={11} />
                          {lead.email}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={getSourceVariant(lead.source)}
                        className="text-[10px] capitalize"
                      >
                        {lead.source?.replace(/_/g, " ")?.replace("contact form — ", "") || "—"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      {lead.message ? (
                        <p className="text-xs text-text-muted max-w-[250px] truncate" title={lead.message}>
                          {lead.message}
                        </p>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <Calendar size={11} />
                        {formatDate(lead.created_at)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-50 bg-gray-50/30 text-center">
          <p className="text-[10px] font-medium text-text-muted">
            Displaying last {leads?.length || 0} entries · Internal Admin Record
          </p>
        </div>
      </div>
    </div>
  );
}
