import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertCircle, FileText, User, Briefcase, MapPin, CreditCard, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, maskPAN } from "@/lib/utils/format";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "info" | "destructive" | "gold" | "outline"; color: string }> = {
  draft: { label: "Draft", variant: "secondary", color: "text-gray-600" },
  submitted: { label: "Submitted", variant: "info", color: "text-blue-600" },
  under_review: { label: "Under Review", variant: "warning", color: "text-amber-600" },
  approved: { label: "Approved", variant: "success", color: "text-green-600" },
  rejected: { label: "Rejected", variant: "destructive", color: "text-red-600" },
  disbursed: { label: "Disbursed", variant: "success", color: "text-green-700" },
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: app } = await supabase
    .from("loan_applications")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!app) notFound();

  const { data: documents } = await supabase
    .from("application_documents")
    .select("*")
    .eq("application_id", id);

  const status = statusConfig[app.status] || statusConfig.draft;

  const sections = [
    {
      icon: User,
      title: "Personal Details",
      fields: [
        { label: "Full Name", value: app.full_name },
        { label: "Date of Birth", value: app.dob ? formatDate(app.dob) : "—" },
        { label: "Gender", value: app.gender },
        { label: "PAN Number", value: app.pan_number ? maskPAN(app.pan_number) : "—" },
        { label: "Phone", value: app.phone },
      ],
    },
    {
      icon: MapPin,
      title: "Address",
      fields: [
        { label: "Address", value: [app.address_line1, app.address_line2].filter(Boolean).join(", ") },
        { label: "PIN Code", value: app.pincode },
      ],
    },
    {
      icon: Briefcase,
      title: "Employment",
      fields: [
        { label: "Employment Type", value: app.employment_type?.replace("_", " ") },
        { label: "Company", value: app.company_name },
        { label: "Designation", value: app.designation },
        { label: "Monthly Income", value: app.monthly_income ? formatCurrency(app.monthly_income) : "—" },
        { label: "Work Experience", value: app.work_experience_years ? `${app.work_experience_years} years` : "—" },
        { label: "Existing EMI", value: app.existing_emi ? formatCurrency(app.existing_emi) : "₹0" },
      ],
    },
    {
      icon: CreditCard,
      title: "Loan Details",
      fields: [
        { label: "Loan Amount", value: app.loan_amount_requested ? formatCurrency(app.loan_amount_requested) : "—" },
        { label: "Tenure", value: app.loan_tenure_months ? `${app.loan_tenure_months} months` : "—" },
        { label: "Purpose", value: app.purpose },
        { label: "CIBIL Score", value: app.cibil_score?.toString() },
        { label: "Preferred Bank", value: app.preferred_bank || "No preference" },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard/applications">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2">
            <ArrowLeft size={16} />
            Back to Applications
          </Button>
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-heading">
              {app.application_number}
            </h1>
            <p className="text-text-muted text-sm mt-1">
              Submitted: {app.submitted_at ? formatDate(app.submitted_at) : "Draft"}
            </p>
          </div>
          <Badge variant={status.variant} className="text-sm px-4 py-2">
            {status.label}
          </Badge>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
        <h2 className="font-semibold text-heading mb-4 flex items-center gap-2">
          <Clock size={16} />
          Application Status
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {["submitted", "under_review", "approved", "disbursed"].map((s, idx) => {
            const statuses = ["submitted", "under_review", "approved", "disbursed"];
            const currentIdx = statuses.indexOf(app.status);
            const isDone = currentIdx >= idx;
            const isCurrent = currentIdx === idx;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isDone ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-400"
                } ${isCurrent ? "ring-2 ring-brand-gold ring-offset-1" : ""}`}>
                  {isDone && <CheckCircle size={12} />}
                  {statusConfig[s]?.label}
                </div>
                {idx < 3 && <div className={`w-6 h-0.5 ${isDone ? "bg-brand-blue" : "bg-gray-200"}`} />}
              </div>
            );
          })}
        </div>

        {/* Approved details */}
        {app.status === "approved" && app.approved_amount && (
          <div className="mt-4 bg-green-50 rounded-xl p-4">
            <p className="text-green-800 font-semibold text-sm mb-2">🎉 Loan Approved!</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-green-600">Approved Amount</p>
                <p className="font-mono font-bold text-green-800">{formatCurrency(app.approved_amount)}</p>
              </div>
              {app.approved_rate && (
                <div>
                  <p className="text-xs text-green-600">Interest Rate</p>
                  <p className="font-mono font-bold text-green-800">{app.approved_rate}% p.a.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rejected reason */}
        {app.status === "rejected" && app.rejection_reason && (
          <div className="mt-4 bg-red-50 rounded-xl p-4">
            <p className="text-red-800 font-semibold text-sm mb-1">Application not approved</p>
            <p className="text-red-700 text-xs">{app.rejection_reason}</p>
            <p className="text-red-600 text-xs mt-2">
              You can reapply after 90 days or improve your CIBIL score first.
            </p>
          </div>
        )}
      </div>

      {/* Property Details — Home Loan only */}
      {app.product_type === "home_loan" && (
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <h2 className="font-semibold text-heading mb-4 flex items-center gap-2 text-sm">
            <MapPin size={15} />
            Property Details
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Property Type",    value: (app as any).property_type?.replace(/_/g, " ") },
              { label: "Property Value",   value: (app as any).property_value ? formatCurrency((app as any).property_value) : "—" },
              { label: "Down Payment",     value: (app as any).down_payment ? formatCurrency((app as any).down_payment) : "—" },
              { label: "Property Address", value: (app as any).property_address },
              { label: "Property City",    value: (app as any).property_city || "—" },
              { label: "Builder/Developer",value: (app as any).builder_name || "N/A" },
              { label: "Co-applicant",     value: (app as any).co_applicant_name || "None" },
              { label: "Co-applicant Income", value: (app as any).co_applicant_income ? formatCurrency((app as any).co_applicant_income) + "/mo" : "—" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5">
                <span className="text-text-muted text-xs">{f.label}</span>
                <span className="font-medium text-text-primary text-xs capitalize">{f.value || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Application Details */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-semibold text-heading mb-4 flex items-center gap-2 text-sm">
                <Icon size={15} />
                {section.title}
              </h2>
              <div className="space-y-2.5">
                {section.fields.map((field) => (
                  <div key={field.label} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-text-muted text-xs">{field.label}</span>
                    <span className="font-medium text-text-primary text-xs text-right capitalize">
                      {field.value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
        <h2 className="font-semibold text-heading mb-4 flex items-center gap-2 text-sm">
          <FileText size={15} />
          Documents ({documents?.length || 0} uploaded)
        </h2>
        {!documents || documents.length === 0 ? (
          <p className="text-text-muted text-sm">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-heading" />
                  <div>
                    <p className="text-xs font-medium text-text-primary capitalize">
                      {doc.document_type?.replace(/_/g, " ")}
                    </p>
                    <p className="text-[10px] text-text-muted">{doc.file_name}</p>
                  </div>
                </div>
                <Badge variant={doc.verified ? "success" : "secondary"} className="text-[10px]">
                  {doc.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Notes (if any) */}
      {app.admin_notes && (
        <div className="bg-brand-blue-light rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold text-heading mb-1">Note from Team</p>
          <p className="text-text-muted text-sm">{app.admin_notes}</p>
        </div>
      )}

      <p className="text-xs text-text-muted text-center">
        {app.product_type === "home_loan"
          ? "Home loan rates 8.40%–9.50% p.a. · Subject to credit approval & property valuation"
          : "Rates 10.25%–36% p.a. · Subject to credit approval"}{" "}
        · Questions? Contact hello@opencredit.money
      </p>
    </div>
  );
}
