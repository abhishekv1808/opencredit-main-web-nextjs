"use client";

import { useState } from "react";
import { CheckCircle2, ArrowLeft, ArrowRight, Save, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Step1Personal from "./steps/Step1Personal";
import Step2Address from "./steps/Step2Address";
import Step3Employment from "./steps/Step3Employment";
import HLStep4Property from "./steps/homeloan/HLStep4Property";
import HLStep5LoanDetails from "./steps/homeloan/HLStep5LoanDetails";
import HLStep6Documents from "./steps/homeloan/HLStep6Documents";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export interface HomeLoanApplicationData {
  // Step 1 — Personal
  full_name: string;
  dob: string;
  gender: string;
  pan_number: string;
  phone: string;
  // Step 2 — Address
  address_line1: string;
  address_line2: string;
  pincode: string;
  // Step 3 — Employment
  employment_type: string;
  company_name: string;
  designation: string;
  monthly_income: number;
  work_experience_years: number;
  existing_emi: number;
  // Step 4 — Property
  property_type: string;
  property_value: number;
  down_payment: number;
  property_address: string;
  property_city: string;
  property_pincode: string;
  builder_name: string;
  co_applicant_name: string;
  co_applicant_relation: string;
  co_applicant_income: number;
  // Step 5 — Loan Details
  loan_amount_requested: number;
  loan_tenure_months: number;
  cibil_score: number;
  preferred_bank: string;
}

const steps = [
  { id: 1, label: "Personal",     shortLabel: "Personal" },
  { id: 2, label: "Address",      shortLabel: "Address" },
  { id: 3, label: "Employment",   shortLabel: "Employment" },
  { id: 4, label: "Property",     shortLabel: "Property" },
  { id: 5, label: "Loan Details", shortLabel: "Loan" },
  { id: 6, label: "Documents",    shortLabel: "Docs" },
];

const defaultData: HomeLoanApplicationData = {
  full_name: "", dob: "", gender: "", pan_number: "", phone: "",
  address_line1: "", address_line2: "", pincode: "",
  employment_type: "", company_name: "", designation: "",
  monthly_income: 0, work_experience_years: 0, existing_emi: 0,
  property_type: "", property_value: 0, down_payment: 0,
  property_address: "", property_city: "", property_pincode: "",
  builder_name: "", co_applicant_name: "", co_applicant_relation: "", co_applicant_income: 0,
  loan_amount_requested: 5000000, loan_tenure_months: 240,
  cibil_score: 0, preferred_bank: "",
};

export default function HomeLoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<HomeLoanApplicationData>(defaultData);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [applicationNumber, setApplicationNumber] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const updateData = (updates: Partial<HomeLoanApplicationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const buildDbPayload = (formData: HomeLoanApplicationData, userEmail?: string) => ({
    // Identity
    full_name:             formData.full_name        || null,
    email:                 userEmail                 || null,
    phone:                 formData.phone            || null,
    dob:                   formData.dob              || null,
    gender:                formData.gender           || null,
    pan_number:            formData.pan_number       || null,
    // Address
    address:               formData.address_line1    || "",
    address_line1:         formData.address_line1    || null,
    address_line2:         formData.address_line2    || null,
    city:                  "Bangalore",
    state:                 "Karnataka",
    pincode:               formData.pincode          || null,
    // Employment
    employment_type:       formData.employment_type  || null,
    company_name:          formData.company_name     || null,
    designation:           formData.designation      || null,
    monthly_income:        formData.monthly_income   || null,
    monthly_salary:        formData.monthly_income   || null,
    work_experience_years: formData.work_experience_years || null,
    existing_emi:          formData.existing_emi     ?? 0,
    existing_emis:         formData.existing_emi     ?? 0,
    // Property (new columns)
    property_type:         formData.property_type    || null,
    property_value:        formData.property_value   || null,
    down_payment:          formData.down_payment     || null,
    property_address:      formData.property_address || null,
    property_city:         formData.property_city    || null,
    property_state:        "Karnataka",
    property_pincode:      formData.property_pincode || null,
    builder_name:          formData.builder_name     || null,
    co_applicant_name:     formData.co_applicant_name    || null,
    co_applicant_relation: formData.co_applicant_relation || null,
    co_applicant_income:   formData.co_applicant_income  || null,
    // Loan details
    loan_amount_requested: formData.loan_amount_requested || null,
    loan_amount:           formData.loan_amount_requested || null,
    loan_tenure_months:    formData.loan_tenure_months   || null,
    purpose:               formData.property_type        || null,
    loan_purpose:          formData.property_type        || null,
    cibil_score:           formData.cibil_score          || null,
    preferred_bank:        formData.preferred_bank       || null,
  });

  const saveProgress = async (): Promise<string | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Not logged in", description: "Please log in to save.", variant: "destructive" });
      return null;
    }

    const payload = buildDbPayload(data, user.email);

    if (!applicationId) {
      const year = new Date().getFullYear();
      const { data: lastApp } = await supabase
        .from("loan_applications")
        .select("application_number")
        .like("application_number", `HL-${year}-%`)
        .order("application_number", { ascending: false })
        .limit(1)
        .single();
      const lastSeq = lastApp?.application_number
        ? parseInt(lastApp.application_number.split("-").pop() || "0", 10)
        : 0;
      const appNumber = `HL-${year}-${String((isNaN(lastSeq) ? 0 : lastSeq) + 1).padStart(5, "0")}`;

      const { data: newApp, error } = await supabase
        .from("loan_applications")
        .insert({
          user_id: user.id,
          application_number: appNumber,
          product_type: "home_loan",
          status: "draft",
          ...payload,
        })
        .select()
        .single();

      if (error || !newApp) {
        toast({ title: "Save failed", description: error?.message || "Please try again.", variant: "destructive" });
        return null;
      }

      setApplicationId(newApp.id);
      setApplicationNumber(appNumber);
      toast({ title: "Progress saved!", description: appNumber });
      return newApp.id;
    } else {
      const { error } = await supabase
        .from("loan_applications")
        .update(payload)
        .eq("id", applicationId);
      if (error) {
        toast({ title: "Save failed", description: error.message, variant: "destructive" });
        return null;
      }
      toast({ title: "Progress saved!" });
      return applicationId;
    }
  };

  const handleNext = async () => {
    const savedId = await saveProgress();
    if (!savedId) return;
    if (currentStep < 6) setCurrentStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!applicationId) await saveProgress();
    setSubmitting(true);
    const response = await fetch(`/api/applications/${applicationId}/submit`, { method: "POST" });
    if (response.ok) {
      setSubmitted(true);
    } else {
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#f0fdf4" }}>
          <CheckCircle2 size={36} style={{ color: "#16a34a" }} />
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#EBF0FA" }}>
          <Home size={22} style={{ color: "#1B3A6B" }} />
        </div>
        <h2 className="font-display text-3xl font-bold text-heading mb-3">
          Home Loan Application Submitted!
        </h2>
        <p className="text-text-muted mb-2">
          Your application number: <strong className="text-heading font-mono">{applicationNumber}</strong>
        </p>
        <p className="text-text-muted text-sm mb-8">
          Our home loan specialist will review your application and reach out within 24–72 hours.
          You can track your application status in the dashboard.
        </p>
        <Button variant="default" onClick={() => router.push("/dashboard/applications")}>
          Track My Application
          <ArrowRight size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
            <div
              className="h-full bg-brand-green transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center z-10 relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                  step.id < currentStep
                    ? "bg-brand-green border-brand-green text-heading"
                    : step.id === currentStep
                      ? "bg-brand-blue border-brand-blue text-white"
                      : "bg-white border-gray-300 text-gray-400"
                )}
              >
                {step.id < currentStep ? <CheckCircle2 size={18} /> : step.id}
              </div>
              <span className={cn(
                "text-xs mt-2 font-medium hidden sm:block",
                step.id === currentStep ? "text-heading"
                  : step.id < currentStep ? "text-brand-green"
                  : "text-gray-400"
              )}>
                {step.shortLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-heading">
            Step {currentStep}: {steps[currentStep - 1].label}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-green transition-all duration-500 rounded-full"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-text-muted">{currentStep}/{steps.length}</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-xs text-amber-800">
          Your data is shared with partner lenders for loan processing. Home loan rates 8.40%–9.50% p.a. Subject to credit approval and property valuation.
        </div>

        {currentStep === 1 && <Step1Personal data={data as any} updateData={updateData as any} />}
        {currentStep === 2 && <Step2Address data={data as any} updateData={updateData as any} />}
        {currentStep === 3 && <Step3Employment data={data as any} updateData={updateData as any} />}
        {currentStep === 4 && <HLStep4Property data={data} updateData={updateData} />}
        {currentStep === 5 && <HLStep5LoanDetails data={data} updateData={updateData} />}
        {currentStep === 6 && <HLStep6Documents applicationId={applicationId} onSave={saveProgress} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
            <ArrowLeft size={16} /> Previous
          </Button>

          <Button variant="ghost" size="sm" onClick={saveProgress} className="text-text-muted">
            <Save size={14} /> Save Draft
          </Button>

          {currentStep < 6 ? (
            <Button variant="default" onClick={handleNext} className="group">
              Save & Next
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Button variant="default" onClick={handleSubmit} disabled={submitting} className="group">
              {submitting ? "Submitting…" : "Submit Application"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
