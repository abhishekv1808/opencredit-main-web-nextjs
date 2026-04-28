"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, User, Briefcase, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function CreateApplicationModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    pan_number: "",
    gender: "",
    employment_type: "",
    company_name: "",
    designation: "",
    monthly_income: "",
    existing_emi: "",
    loan_amount_requested: "",
    loan_tenure_months: "",
    purpose: "",
    admin_notes: "",
    status: "submitted",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.phone || !form.loan_amount_requested) {
      toast({ title: "Missing Fields", description: "Name, Phone, and Loan Amount are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({ title: "Application Created", description: "New loan application has been created successfully." });
        setOpen(false);
        setStep(1);
        setForm({
          full_name: "", phone: "", email: "", pan_number: "", gender: "",
          employment_type: "", company_name: "", designation: "", monthly_income: "",
          existing_emi: "", loan_amount_requested: "", loan_tenure_months: "",
          purpose: "", admin_notes: "", status: "submitted",
        });
        router.refresh();
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.error || "Failed to create application", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 lg:gap-2 text-[10px] lg:text-sm h-8 lg:h-9 px-2 lg:px-4">
          <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
          <span className="hidden xs:inline">New Application</span>
          <span className="xs:hidden">New App</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg lg:text-xl">Create New Application</DialogTitle>
          <DialogDescription className="text-[10px] lg:text-sm text-text-muted">
            Manually create a personal loan application
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center gap-1 lg:gap-2 mb-4">
          {[
            { n: 1, label: "Personal", icon: User },
            { n: 2, label: "Employment", icon: Briefcase },
            { n: 3, label: "Loan", icon: CreditCard },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.n}
                onClick={() => setStep(s.n)}
                className={`flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg text-[9px] lg:text-xs font-medium transition-all flex-1 justify-center ${
                  step === s.n
                    ? "bg-brand-green text-white"
                    : "bg-gray-100 text-text-muted hover:bg-gray-200"
                }`}
              >
                <Icon className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-xs mb-1.5 block font-medium">Full Name *</Label>
              <Input placeholder="Applicant's full name" value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Phone *</Label>
              <Input placeholder="9876543210" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Email</Label>
              <Input type="email" placeholder="email@example.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">PAN Number</Label>
              <Input placeholder="ABCDE1234F" value={form.pan_number} onChange={(e) => updateField("pan_number", e.target.value.toUpperCase())} maxLength={10} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Gender</Label>
              <Select value={form.gender} onValueChange={(v) => updateField("gender", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Employment */}
        {step === 2 && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-xs mb-1.5 block font-medium">Employment Type</Label>
              <Select value={form.employment_type} onValueChange={(v) => updateField("employment_type", v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="self_employed">Self Employed</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Company Name</Label>
              <Input placeholder="Company" value={form.company_name} onChange={(e) => updateField("company_name", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Designation</Label>
              <Input placeholder="Role / Title" value={form.designation} onChange={(e) => updateField("designation", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Monthly Income (₹)</Label>
              <Input type="number" placeholder="50000" value={form.monthly_income} onChange={(e) => updateField("monthly_income", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Existing EMI (₹)</Label>
              <Input type="number" placeholder="0" value={form.existing_emi} onChange={(e) => updateField("existing_emi", e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 3: Loan Details */}
        {step === 3 && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Loan Amount (₹) *</Label>
              <Input type="number" placeholder="500000" value={form.loan_amount_requested} onChange={(e) => updateField("loan_amount_requested", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1.5 block font-medium">Tenure (months)</Label>
              <Select value={form.loan_tenure_months} onValueChange={(v) => updateField("loan_tenure_months", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {[12, 24, 36, 48, 60].map((m) => (
                    <SelectItem key={m} value={m.toString()}>{m} months</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label className="text-xs mb-1.5 block font-medium">Purpose</Label>
              <Input placeholder="Home renovation, debt consolidation, etc." value={form.purpose} onChange={(e) => updateField("purpose", e.target.value)} />
            </div>
            <div className="col-span-2">
              <Label className="text-xs mb-1.5 block font-medium">Initial Status</Label>
              <Select value={form.status} onValueChange={(v) => updateField("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label className="text-xs mb-1.5 block font-medium">Admin Notes</Label>
              <Textarea placeholder="Internal notes..." value={form.admin_notes} onChange={(e) => updateField("admin_notes", e.target.value)} rows={3} />
            </div>
          </div>
        )}

        {/* Navigation & Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
          >
            ← Back
          </Button>
          <div className="flex gap-2">
            {step < 3 ? (
              <Button size="sm" onClick={() => setStep(step + 1)}>
                Next →
              </Button>
            ) : (
              <Button size="sm" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create Application"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
