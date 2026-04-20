"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
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

interface Application {
  id: string;
  application_number: string;
  full_name?: string;
  phone?: string;
  email?: string;
  pan_number?: string;
  gender?: string;
  employment_type?: string;
  company_name?: string;
  designation?: string;
  monthly_income?: number;
  existing_emi?: number;
  loan_amount_requested?: number;
  loan_tenure_months?: number;
  purpose?: string;
  status: string;
  admin_notes?: string;
  cibil_score?: number;
  approved_amount?: number;
  approved_rate?: number;
  rejection_reason?: string;
}

export default function EditApplicationModal({
  application,
  trigger,
}: {
  application: Application;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: application.full_name || "",
    phone: application.phone || "",
    email: application.email || "",
    pan_number: application.pan_number || "",
    gender: application.gender || "",
    employment_type: application.employment_type || "",
    company_name: application.company_name || "",
    designation: application.designation || "",
    monthly_income: application.monthly_income?.toString() || "",
    existing_emi: application.existing_emi?.toString() || "",
    loan_amount_requested: application.loan_amount_requested?.toString() || "",
    loan_tenure_months: application.loan_tenure_months?.toString() || "",
    purpose: application.purpose || "",
    status: application.status,
    admin_notes: application.admin_notes || "",
    cibil_score: application.cibil_score?.toString() || "",
    approved_amount: application.approved_amount?.toString() || "",
    approved_rate: application.approved_rate?.toString() || "",
    rejection_reason: application.rejection_reason || "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          monthly_income: form.monthly_income ? Number(form.monthly_income) : null,
          existing_emi: form.existing_emi ? Number(form.existing_emi) : null,
          loan_amount_requested: form.loan_amount_requested ? Number(form.loan_amount_requested) : null,
          loan_tenure_months: form.loan_tenure_months ? Number(form.loan_tenure_months) : null,
          cibil_score: form.cibil_score ? Number(form.cibil_score) : null,
          approved_amount: form.approved_amount ? Number(form.approved_amount) : null,
          approved_rate: form.approved_rate ? Number(form.approved_rate) : null,
        }),
      });
      if (res.ok) {
        toast({ title: "Updated", description: `Application ${application.application_number} updated.` });
        setOpen(false);
        router.refresh();
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Pencil size={13} /> Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit {application.application_number}</DialogTitle>
          <DialogDescription className="text-text-muted">
            Update application details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status & Admin */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Status & Admin</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Status</Label>
                <Select value={form.status} onValueChange={(v) => updateField("status", v)}>
                  <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="disbursed">Disbursed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">CIBIL Score</Label>
                <Input type="number" placeholder="750" value={form.cibil_score} onChange={(e) => updateField("cibil_score", e.target.value)} className="bg-white" />
              </div>
            </div>
            {(form.status === "approved" || form.status === "disbursed") && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">Approved Amount (₹)</Label>
                  <Input type="number" value={form.approved_amount} onChange={(e) => updateField("approved_amount", e.target.value)} className="bg-white" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Approved Rate (%)</Label>
                  <Input type="number" step="0.25" value={form.approved_rate} onChange={(e) => updateField("approved_rate", e.target.value)} className="bg-white" />
                </div>
              </div>
            )}
            {form.status === "rejected" && (
              <div>
                <Label className="text-xs mb-1 block">Rejection Reason</Label>
                <Textarea value={form.rejection_reason} onChange={(e) => updateField("rejection_reason", e.target.value)} rows={2} className="bg-white" />
              </div>
            )}
            <div>
              <Label className="text-xs mb-1 block">Admin Notes</Label>
              <Textarea value={form.admin_notes} onChange={(e) => updateField("admin_notes", e.target.value)} rows={2} className="bg-white" placeholder="Internal notes..." />
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Personal Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Full Name</Label>
                <Input value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Phone</Label>
                <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Email</Label>
                <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">PAN</Label>
                <Input value={form.pan_number} onChange={(e) => updateField("pan_number", e.target.value.toUpperCase())} maxLength={10} />
              </div>
            </div>
          </div>

          {/* Employment */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Employment</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Type</Label>
                <Select value={form.employment_type} onValueChange={(v) => updateField("employment_type", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self_employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Company</Label>
                <Input value={form.company_name} onChange={(e) => updateField("company_name", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Monthly Income (₹)</Label>
                <Input type="number" value={form.monthly_income} onChange={(e) => updateField("monthly_income", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Existing EMI (₹)</Label>
                <Input type="number" value={form.existing_emi} onChange={(e) => updateField("existing_emi", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Loan Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Amount Requested (₹)</Label>
                <Input type="number" value={form.loan_amount_requested} onChange={(e) => updateField("loan_amount_requested", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Tenure (months)</Label>
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
                <Label className="text-xs mb-1 block">Purpose</Label>
                <Input value={form.purpose} onChange={(e) => updateField("purpose", e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
