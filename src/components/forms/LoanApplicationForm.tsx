"use client";

import { useState } from "react";
import { CheckCircle2, ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Step1Personal from "./steps/Step1Personal";
import Step2Address from "./steps/Step2Address";
import Step3Employment from "./steps/Step3Employment";
import Step4LoanDetails from "./steps/Step4LoanDetails";
import Step5Documents from "./steps/Step5Documents";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export interface ApplicationData {
  // Step 1
  full_name: string;
  dob: string;
  gender: string;
  pan_number: string;
  phone: string;
  // Step 2
  address_line1: string;
  address_line2: string;
  pincode: string;
  // Step 3
  employment_type: string;
  company_name: string;
  designation: string;
  monthly_income: number;
  work_experience_years: number;
  existing_emi: number;
  // Step 4
  loan_amount_requested: number;
  loan_tenure_months: number;
  purpose: string;
  cibil_score: number;
  preferred_bank: string;
}

const steps = [
  { id: 1, label: "Personal", shortLabel: "Personal" },
  { id: 2, label: "Address", shortLabel: "Address" },
  { id: 3, label: "Employment", shortLabel: "Employment" },
  { id: 4, label: "Loan Details", shortLabel: "Loan" },
  { id: 5, label: "Documents", shortLabel: "Docs" },
];

const defaultData: ApplicationData = {
  full_name: "",
  dob: "",
  gender: "",
  pan_number: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  pincode: "",
  employment_type: "",
  company_name: "",
  designation: "",
  monthly_income: 0,
  work_experience_years: 0,
  existing_emi: 0,
  loan_amount_requested: 500000,
  loan_tenure_months: 36,
  purpose: "",
  cibil_score: 0,
  preferred_bank: "",
};

export default function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<ApplicationData>(defaultData);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const supabase = createClient();

  const updateData = (updates: Partial<ApplicationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  // Map ApplicationData fields → actual DB column names
  const buildDbPayload = (formData: ApplicationData, userEmail?: string) => ({
    // Identity
    full_name:             formData.full_name         || null,
    email:                 userEmail                  || null,
    phone:                 formData.phone             || null,
    dob:                   formData.dob               || null,
    gender:                formData.gender            || null,
    pan_number:            formData.pan_number        || null,
    // Address — table has both `address` (old, NOT NULL) and `address_line1`/`address_line2`
    address:               formData.address_line1     || "",
    address_line1:         formData.address_line1     || null,
    address_line2:         formData.address_line2     || null,
    city:                  "Bangalore",
    state:                 "Karnataka",
    pincode:               formData.pincode           || null,
    // Employment
    employment_type:       formData.employment_type   || null,
    company_name:          formData.company_name      || null,
    designation:           formData.designation       || null,
    monthly_income:        formData.monthly_income    || null,
    monthly_salary:        formData.monthly_income    || null, // legacy column alias
    work_experience_years: formData.work_experience_years || null,
    existing_emi:          formData.existing_emi      ?? 0,
    existing_emis:         formData.existing_emi      ?? 0,   // legacy column alias
    // Loan
    loan_amount_requested: formData.loan_amount_requested || null,
    loan_amount:           formData.loan_amount_requested || null, // legacy column alias
    loan_tenure_months:    formData.loan_tenure_months   || null,
    purpose:               formData.purpose           || null,
    loan_purpose:          formData.purpose           || null, // legacy column alias
    cibil_score:           formData.cibil_score       || null,
    preferred_bank:        formData.preferred_bank    || null,
  });

  const saveProgress = async (): Promise<string | null> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
        .like("application_number", `OC-${year}-%`)
        .order("application_number", { ascending: false })
        .limit(1)
        .single();
      const lastSeq = lastApp?.application_number
        ? parseInt(lastApp.application_number.split("-").pop() || "0", 10)
        : 0;
      const appNumber = `OC-${year}-${String((isNaN(lastSeq) ? 0 : lastSeq) + 1).padStart(5, "0")}`;

      const { data: newApp, error } = await supabase
        .from("loan_applications")
        .insert({
          user_id: user.id,
          application_number: appNumber,
          product_type: "personal_loan",
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
    if (!savedId) return; // Block advancement if save failed
    if (currentStep < 5) setCurrentStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!applicationId) await saveProgress();
    setSubmitting(true);

    const response = await fetch(`/api/applications/${applicationId}/submit`, {
      method: "POST",
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      toast({
        title: "Submission Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} className="text-green-600" />
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-heading mb-3">
          Application Submitted!
        </h2>
        <p className="text-[11px] lg:text-base text-text-muted mb-2">
          Your application number:{" "}
          <strong className="text-heading">{applicationId}</strong>
        </p>
        <p className="text-[10px] lg:text-sm text-text-muted mb-8">
          Our team will review your application and reach out within 24–72
          hours. You can track status in your dashboard.
        </p>
        <Button
          variant="default"
          onClick={() => router.push("/dashboard/applications")}
        >
          Track My Application
          <ArrowRight size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
            <div
              className="h-full bg-brand-green transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center z-10 relative"
            >
              <div
                className={cn(
                  "w-8 lg:w-10 h-8 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold border-2 transition-all duration-300",
                  step.id < currentStep
                    ? "bg-brand-green border-brand-green text-heading"
                    : step.id === currentStep
                      ? "bg-brand-blue border-brand-blue text-white"
                      : "bg-white border-gray-300 text-gray-400",
                )}
              >
                {step.id < currentStep ? <CheckCircle2 size={18} /> : step.id}
              </div>
              <span
                className={cn(
                  "text-[9px] lg:text-xs mt-2 font-medium hidden sm:block",
                  step.id === currentStep
                    ? "text-heading"
                    : step.id < currentStep
                      ? "text-brand-green"
                      : "text-gray-400",
                )}
              >
                {step.shortLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
        <div className="mb-6">
          <h2 className="font-display text-xl lg:text-2xl font-bold text-heading">
            Step {currentStep}: {steps[currentStep - 1].label}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-green transition-all duration-500 rounded-full"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-text-muted">
              {currentStep}/{steps.length}
            </span>
          </div>
        </div>

        {/* Compliance notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-[10px] lg:text-xs text-amber-800">
          Your data is shared with partner lenders for loan processing. Rates
          10.25%–36% p.a. Subject to credit approval.
        </div>

        {/* Step Components */}
        {currentStep === 1 && (
          <Step1Personal data={data} updateData={updateData} />
        )}
        {currentStep === 2 && (
          <Step2Address data={data} updateData={updateData} />
        )}
        {currentStep === 3 && (
          <Step3Employment data={data} updateData={updateData} />
        )}
        {currentStep === 4 && (
          <Step4LoanDetails data={data} updateData={updateData} />
        )}
        {currentStep === 5 && <Step5Documents applicationId={applicationId} onSave={saveProgress} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="text-[10px] lg:text-sm h-8 lg:h-10 px-2 lg:px-4"
          >
            <ArrowLeft size={16} />
            <span className="hidden lg:inline">Previous</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={saveProgress}
            className="text-text-muted text-[10px] lg:text-sm h-8 lg:h-10 px-2 lg:px-4"
          >
            <Save size={14} />
            <span className="hidden lg:inline">Save Draft</span>
          </Button>

          {currentStep < 5 ? (
            <Button variant="default" onClick={handleNext} className="group text-[10px] lg:text-sm h-8 lg:h-10 px-2 lg:px-4">
              <span className="hidden lg:inline">Save & </span>Next
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={submitting}
              className="group text-[10px] lg:text-sm h-8 lg:h-10 px-2 lg:px-4"
            >
              {submitting ? "Submitting..." : "Submit"}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
