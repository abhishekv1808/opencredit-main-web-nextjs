import { createServiceClient as createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, FileText, User, Briefcase, CreditCard, 
  MapPin, Calendar, Phone, Mail, ShieldCheck, 
  TrendingUp, Clock, AlertCircle, CheckCircle2,
  Trash2, Pencil, ExternalLink, IndianRupee
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate, maskPAN } from "@/lib/utils/format";
import AdminApplicationActions from "@/components/admin/ApplicationReview";
import EditApplicationModal from "@/components/admin/EditApplicationModal";
import DeleteApplicationDialog from "@/components/admin/DeleteApplicationDialog";
import DocumentViewer from "@/components/admin/DocumentViewer";

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();

  // Fetch application without join first (join fails if FK not declared in Supabase)
  const { data: app, error: appError } = await supabase
    .from("loan_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (appError || !app) notFound();

  const { data: documents } = await supabase
    .from("application_documents")
    .select("*")
    .eq("application_id", id);

  const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "info" | "destructive" | "gold" | "outline" }> = {
    draft: { label: "Draft", variant: "secondary" },
    submitted: { label: "Submitted", variant: "info" },
    under_review: { label: "Under Review", variant: "warning" },
    approved: { label: "Approved", variant: "success" },
    rejected: { label: "Rejected", variant: "destructive" },
    disbursed: { label: "Disbursed", variant: "success" },
  };

  const status = statusConfig[app.status] || statusConfig.draft;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-4">
        <Link href="/admin/applications">
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 lg:gap-2 text-[10px] lg:text-sm text-text-muted hover:text-brand-blue -ml-2">
            <ArrowLeft className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> Back to Applications
          </Button>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-6 bg-white p-4 lg:p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-start gap-3 lg:gap-5">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center shrink-0 border border-brand-blue/10">
              <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-brand-blue" />
            </div>
            <div>
              <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
                <h1 className="font-display text-xl lg:text-2xl font-black text-[#0F2347]">
                  {app.application_number}
                </h1>
                <Badge variant={status.variant} className="px-2 lg:px-3 py-0.5 lg:py-1 font-bold text-[9px] lg:text-[10px] uppercase tracking-wider">
                  {status.label}
                </Badge>
                <Badge variant="outline" className="px-2 lg:px-3 py-0.5 lg:py-1 font-bold text-[9px] lg:text-[10px] uppercase tracking-wider bg-gray-50 border-gray-200 text-heading">
                  {app.product_type === "personal_loan" ? "Personal Loan" : app.product_type === "home_loan" ? "Home Loan" : "Credit Correction"}
                </Badge>
              </div>
              <p className="text-xs lg:text-sm text-text-muted font-medium mt-1 flex items-center gap-1.5 lg:gap-2 flex-wrap">
                Created on {formatDate(app.created_at)} 
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                Applicant: <span className="text-heading font-bold">{app.full_name}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <EditApplicationModal 
              application={app} 
              trigger={
                <Button variant="outline" className="gap-1.5 lg:gap-2 font-bold text-[10px] lg:text-xs h-8 lg:h-10 px-3 lg:px-4 rounded-xl border-gray-200">
                  <Pencil className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> Edit Data
                </Button>
              }
            />
            <DeleteApplicationDialog
              applicationId={app.id}
              applicationNumber={app.application_number}
              redirectTo="/admin/applications"
              trigger={
                <Button variant="outline" className="gap-1.5 lg:gap-2 font-bold text-[10px] lg:text-xs h-8 lg:h-10 px-3 lg:px-4 rounded-xl border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 transition-all">
                  <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> Delete
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Data Sections */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section: Applicant Details */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-2 lg:gap-2.5">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600" />
                </div>
                <h2 className="font-bold text-heading text-[11px] lg:text-sm uppercase tracking-wider">Applicant Information</h2>
              </div>
            </div>
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 lg:gap-y-6 gap-x-4 lg:gap-x-8">
                {[
                  { label: "Full Name", value: app.full_name, icon: User },
                  { label: "Phone Number", value: app.phone, icon: Phone },
                  { label: "Email Address", value: app.email, icon: Mail },
                  { label: "Date of Birth", value: app.dob ? formatDate(app.dob) : "—", icon: Calendar },
                  { label: "PAN Number", value: app.pan_number ? maskPAN(app.pan_number) : "—", icon: ShieldCheck },
                  { label: "Gender", value: app.gender, icon: User },
                ].map((field) => (
                  <div key={field.label} className="space-y-0.5 lg:space-y-1">
                    <p className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest">{field.label}</p>
                    <p className="text-[11px] lg:text-sm font-bold text-heading truncate">{field.value || "—"}</p>
                  </div>
                ))}
                <div className="sm:col-span-2 space-y-0.5 lg:space-y-1">
                  <p className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest text-wrap">Residential Address</p>
                  <p className="text-[11px] lg:text-sm font-bold text-heading leading-relaxed">
                    {[app.address_line1, app.address_line2, app.pincode].filter(Boolean).join(", ") || "No address provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Employment & Income */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-2 lg:gap-2.5">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-600" />
                </div>
                <h2 className="font-bold text-heading text-[11px] lg:text-sm uppercase tracking-wider">Employment Details</h2>
              </div>
            </div>
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 lg:gap-y-6 gap-x-4 lg:gap-x-8">
                {[
                  { label: "Employment Type", value: app.employment_type?.replace(/_/g, " "), icon: Briefcase },
                  { label: "Company Name", value: app.company_name, icon: Briefcase },
                  { label: "Designation", value: app.designation, icon: User },
                  { label: "Monthly Income", value: app.monthly_income ? formatCurrency(app.monthly_income) : "—", highlight: true },
                  { label: "Experience", value: app.work_experience_years ? `${app.work_experience_years} Years` : "—" },
                  { label: "Existing EMIs", value: app.existing_emi ? formatCurrency(app.existing_emi) : "₹0", color: "text-amber-600" },
                ].map((field) => (
                  <div key={field.label} className="space-y-0.5 lg:space-y-1">
                    <p className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest">{field.label}</p>
                    <p className={cn("text-[11px] lg:text-sm font-bold", field.highlight ? "text-brand-blue" : field.color ? field.color : "text-heading")}>
                      {field.value || "—"}
                    </p>
                  </div>
                ))}
              </div>

              {app.monthly_income > 0 && (
                <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <TrendingUp className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-blue" />
                      <span className="text-[9px] lg:text-[11px] font-bold text-text-muted uppercase tracking-widest">
                        Fixed Obligation Ratio (FOIR)
                      </span>
                    </div>
                    <span className={cn(
                      "text-[10px] lg:text-xs font-black px-1.5 lg:px-2 py-0.5 rounded",
                      (app.existing_emi / app.monthly_income) > 0.5 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    )}>
                      {Math.round((app.existing_emi / app.monthly_income) * 100)}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        (app.existing_emi / app.monthly_income) > 0.5 ? "bg-red-500" : "bg-brand-green"
                      )}
                      style={{ width: `${Math.min((app.existing_emi / app.monthly_income) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-[9px] lg:text-[10px] text-text-muted font-medium mt-1.5 lg:mt-2">
                    {(app.existing_emi / app.monthly_income) > 0.5 
                      ? "Caution: High debt ratios may impact bank approval odds."
                      : "Healthy ratio for most lending institutions."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section: Loan Parameters */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-2 lg:gap-2.5">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <IndianRupee className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-blue" />
                </div>
                <h2 className="font-bold text-heading text-[11px] lg:text-sm uppercase tracking-wider">Loan Requirements</h2>
              </div>
            </div>
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 lg:gap-y-6 gap-x-4 lg:gap-x-8">
                {[
                  { label: "Request Amount", value: app.loan_amount_requested ? formatCurrency(app.loan_amount_requested) : "—", highlight: true },
                  { label: "Requested Tenure", value: app.loan_tenure_months ? `${app.loan_tenure_months} Months` : "—" },
                  { label: "CIBIL Score", value: app.cibil_score?.toString() || "Not provided", icon: ShieldCheck },
                  { label: "Loan Purpose", value: app.purpose, wrap: true },
                  { label: "Preferred Bank", value: app.preferred_bank || "Any Bank", icon: CheckCircle2 },
                ].map((field) => (
                  <div key={field.label} className={cn("space-y-0.5 lg:space-y-1", field.wrap && "sm:col-span-2")}>
                    <p className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest">{field.label}</p>
                    <p className={cn("text-[11px] lg:text-sm font-bold", field.highlight ? "text-brand-blue text-[13px] lg:text-base" : "text-heading")}>
                      {field.value || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Property Details — Home Loan only */}
          {app.product_type === "home_loan" && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center gap-2 lg:gap-2.5">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center" style={{ background: "#EBF0FA" }}>
                    <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4" style={{ color: "#1B3A6B" }} />
                  </div>
                  <h2 className="font-bold text-heading text-[11px] lg:text-sm uppercase tracking-wider">Property Details</h2>
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 lg:gap-y-6 gap-x-4 lg:gap-x-8">
                  {[
                    { label: "Property Type",    value: (app as any).property_type?.replace(/_/g, " ") },
                    { label: "Property Value",   value: (app as any).property_value ? formatCurrency((app as any).property_value) : "—", highlight: true },
                    { label: "Down Payment",     value: (app as any).down_payment ? formatCurrency((app as any).down_payment) : "—" },
                    { label: "Property Address", value: (app as any).property_address, wrap: true },
                    { label: "Property City",    value: (app as any).property_city || "—" },
                    { label: "Property Pincode", value: (app as any).property_pincode || "—" },
                    { label: "Builder / Developer", value: (app as any).builder_name || "N/A" },
                    { label: "Co-applicant",     value: (app as any).co_applicant_name || "None" },
                    { label: "Co-applicant Income", value: (app as any).co_applicant_income ? formatCurrency((app as any).co_applicant_income) + "/mo" : "—" },
                  ].map((field) => (
                    <div key={field.label} className={cn("space-y-0.5 lg:space-y-1", field.wrap && "sm:col-span-2")}>
                      <p className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest">{field.label}</p>
                      <p className={cn("text-[11px] lg:text-sm font-bold capitalize", field.highlight ? "text-brand-blue" : "text-heading")}>
                        {field.value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section: KYC Documents */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-2 lg:gap-2.5">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-purple-600" />
                </div>
                <h2 className="font-bold text-heading text-[11px] lg:text-sm uppercase tracking-wider">Uploaded Documents ({documents?.length || 0})</h2>
              </div>
            </div>
            <div className="p-4 lg:p-6">
              {!documents || documents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 lg:py-12 px-4 text-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/30">
                  <AlertCircle className="w-6 h-6 lg:w-8 lg:h-8 text-gray-300 mb-2 lg:mb-3" />
                  <p className="text-[11px] lg:text-sm font-bold text-heading">No digital copies provided</p>
                  <p className="text-[10px] lg:text-xs text-text-muted mt-1">Client hasn't uploaded any verification docs yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="group p-3 lg:p-4 rounded-2xl border border-gray-100 bg-white hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] hover:shadow-sm transition-all flex items-center justify-between">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className={cn(
                          "w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
                          doc.verified ? "bg-green-50 border-green-100 text-green-600" : "bg-gray-50 border-gray-100 text-gray-400 group-hover:border-brand-blue/20"
                        )}>
                          {doc.verified ? <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" /> : <FileText className="w-4 h-4 lg:w-5 lg:h-5" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] lg:text-xs font-black text-heading uppercase truncate tracking-tight">
                            {doc.document_type?.replace(/_/g, " ")}
                          </p>
                          <p className="text-[9px] lg:text-[10px] text-text-muted font-mono truncate">{doc.file_name}</p>
                        </div>
                      </div>
                      <DocumentViewer 
                        document={doc} 
                        trigger={
                          <Button variant="ghost" size="sm" className="h-8 lg:h-9 px-2 lg:px-3 text-brand-blue font-bold text-[9px] lg:text-[10px] hover:bg-brand-blue/5">
                            VIEW <ExternalLink className="w-3 h-3 lg:w-3.5 lg:h-3.5 ml-1 lg:ml-1.5" />
                          </Button>
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Review & Process */}
        <div className="lg:col-span-4 space-y-6">
          <AdminApplicationActions application={app} />
          
          <div className="bg-[#0F2347] rounded-3xl p-5 lg:p-6 text-white shadow-xl shadow-blue-900/10 border border-blue-800">
            <h3 className="font-display text-base lg:text-lg font-bold mb-3 lg:mb-4 flex items-center gap-1.5 lg:gap-2">
              <Clock className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-brand-green" />
              Processing Notes
            </h3>
            <div className="space-y-3 lg:space-y-4">
              <div className="p-3 lg:p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[9px] lg:text-[10px] text-white/40 font-bold uppercase tracking-[0.15em] mb-1.5 lg:mb-2">Internal Remarks</p>
                <p className="text-[11px] lg:text-xs leading-relaxed text-white/80 italic">
                  {app.admin_notes || "No internal remarks recorded for this application yet."}
                </p>
              </div>
              
              <div className="flex items-center gap-2.5 lg:gap-3 p-2.5 lg:p-3 rounded-2xl bg-brand-green/10 border border-brand-green/20">
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-brand-green/20 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-green" />
                </div>
                <div>
                  <p className="text-[8px] lg:text-[9px] text-brand-green font-black uppercase tracking-widest">Security Check</p>
                  <p className="text-[10px] lg:text-[11px] text-white/70 font-medium leading-none mt-1">Ready for verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
