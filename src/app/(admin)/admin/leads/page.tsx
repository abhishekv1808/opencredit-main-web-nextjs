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
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-emerald-600" />
          </div>
          <div>
            <h1 className="font-display text-xl lg:text-3xl font-extrabold text-heading">
              Leads & <span className="text-brand-green">Inquiries</span>
            </h1>
            <p className="text-text-muted text-[11px] lg:text-sm font-medium mt-0.5">
              {count || 0} total leads from contact form & website
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-6 lg:mb-8">
        {[
          { label: "Total Leads", value: count || 0, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Contact Form", value: leads?.filter(l => l.source?.startsWith("contact_form")).length || 0, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Other Sources", value: leads?.filter(l => !l.source?.startsWith("contact_form")).length || 0, icon: ChevronDown, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-3 lg:p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] lg:text-xs font-semibold text-text-muted">{stat.label}</p>
                  <h3 className="text-lg lg:text-2xl font-extrabold text-heading mt-0.5 lg:mt-1">{stat.value}</h3>
                </div>
                <div className={`w-7 h-7 lg:w-10 lg:h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 lg:w-[18px] lg:h-[18px] ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leads Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display text-sm lg:text-lg font-bold text-heading">All Leads</h2>
          <span className="text-[9px] lg:text-[11px] font-bold text-text-muted uppercase tracking-wider">
            Latest {leads?.length || 0} entries
          </span>
        </div>

        {!leads || leads.length === 0 ? (
          <div className="px-3 lg:px-5 py-12 lg:py-16 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-full flex items-center justify-center mb-2 lg:mb-3">
                <MessageSquare className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-gray-300" />
              </div>
              <h3 className="text-[13px] lg:text-sm font-bold text-heading mb-1">No leads yet</h3>
              <p className="text-[11px] lg:text-xs text-text-muted">Contact form submissions will appear here.</p>
            </div>
          </div>
        ) : (
          <>
            {/* ── Mobile Card Layout ── */}
            <div className="md:hidden divide-y divide-gray-50">
              {leads.map((lead) => (
                <div key={lead.id} className="px-4 py-3.5 space-y-2">
                  {/* Name + Source */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-brand-green" />
                      </div>
                      <span className="text-[12px] font-bold text-heading truncate">{lead.name || "—"}</span>
                    </div>
                    <Badge
                      variant={getSourceVariant(lead.source)}
                      className="text-[8px] capitalize px-1.5 py-0 flex-shrink-0"
                    >
                      {lead.source?.replace(/_/g, " ")?.replace("contact form — ", "") || "—"}
                    </Badge>
                  </div>
                  {/* Contact info */}
                  <div className="flex items-center gap-3 text-[10px]">
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-text-muted hover:text-brand-green transition-colors">
                      <Phone className="w-2.5 h-2.5" /> {lead.phone}
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-text-muted hover:text-brand-blue transition-colors truncate">
                        <Mail className="w-2.5 h-2.5" /> {lead.email}
                      </a>
                    )}
                  </div>
                  {/* Message */}
                  {lead.message && (
                    <p className="text-[10px] text-text-muted line-clamp-2 leading-relaxed">
                      {lead.message}
                    </p>
                  )}
                  {/* Date */}
                  <div className="flex items-center gap-1 text-[9px] text-text-muted">
                    <Calendar className="w-2.5 h-2.5" /> {formatDate(lead.created_at)}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Desktop Table ── */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80">
                    {["Name", "Phone", "Email", "Source/Subject", "Message", "Date"].map((h) => (
                      <th key={h} className="px-3 lg:px-5 py-2.5 lg:py-3.5 text-left text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-gray-100">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-3 lg:px-5 py-3 lg:py-4">
                        <div className="flex items-center gap-2 lg:gap-2.5">
                          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-brand-green" />
                          </div>
                          <span className="text-[11px] lg:text-xs font-bold text-heading">{lead.name || "—"}</span>
                        </div>
                      </td>
                      <td className="px-3 lg:px-5 py-3 lg:py-4">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 lg:gap-1.5 text-[11px] lg:text-xs font-mono text-text-muted hover:text-brand-green transition-colors">
                          <Phone className="w-[10px] h-[10px] lg:w-[11px] lg:h-[11px]" />
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-3 lg:px-5 py-3 lg:py-4">
                        {lead.email ? (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 lg:gap-1.5 text-[11px] lg:text-xs text-text-muted hover:text-brand-blue transition-colors">
                            <Mail className="w-[10px] h-[10px] lg:w-[11px] lg:h-[11px]" />
                            {lead.email}
                          </a>
                        ) : (
                          <span className="text-[11px] lg:text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-3 lg:px-5 py-3 lg:py-4">
                        <Badge
                          variant={getSourceVariant(lead.source)}
                          className="text-[9px] lg:text-[10px] capitalize px-1.5 py-0 lg:px-2.5 lg:py-0.5"
                        >
                          {lead.source?.replace(/_/g, " ")?.replace("contact form — ", "") || "—"}
                        </Badge>
                      </td>
                      <td className="px-3 lg:px-5 py-3 lg:py-4">
                        {lead.message ? (
                          <p className="text-[11px] lg:text-xs text-text-muted max-w-[150px] lg:max-w-[250px] truncate" title={lead.message}>
                            {lead.message}
                          </p>
                        ) : (
                          <span className="text-[11px] lg:text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-3 lg:px-5 py-3 lg:py-4">
                        <div className="flex items-center gap-1 lg:gap-1.5 text-[11px] lg:text-xs text-text-muted">
                          <Calendar className="w-[10px] h-[10px] lg:w-[11px] lg:h-[11px]" />
                          {formatDate(lead.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="p-3 lg:p-4 border-t border-gray-50 bg-gray-50/30 text-center">
          <p className="text-[9px] lg:text-[10px] font-medium text-text-muted">
            Displaying last {leads?.length || 0} entries · Internal Admin Record
          </p>
        </div>
      </div>
    </div>
  );
}
