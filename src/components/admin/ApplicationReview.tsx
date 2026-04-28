"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface Props {
  application: {
    id: string;
    status: string;
    application_number: string;
    loan_amount_requested?: number;
    admin_notes?: string;
    approved_amount?: number;
    approved_rate?: number;
  };
}

export default function AdminApplicationActions({ application }: Props) {
  const [adminNotes, setAdminNotes] = useState(application.admin_notes || "");
  const [approvedAmount, setApprovedAmount] = useState(
    application.approved_amount?.toString() || "",
  );
  const [approvedRate, setApprovedRate] = useState(
    application.approved_rate?.toString() || "",
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateStatus = async (
    status: string,
    extra: Record<string, unknown> = {},
  ) => {
    setLoading(true);
    const res = await fetch(`/api/admin/applications/${application.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, admin_notes: adminNotes, ...extra }),
    });

    if (res.ok) {
      toast({
        title: "Application Updated",
        description: `Status set to ${status}`,
      });
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const actions = [
    {
      label: "Mark Under Review",
      status: "under_review",
      icon: Clock,
      variant: "secondary" as const,
      show: application.status === "submitted",
    },
    {
      label: "Approve Application",
      status: "approved",
      icon: CheckCircle,
      variant: "default" as const,
      show: ["submitted", "under_review"].includes(application.status),
      extra: {
        approved_amount: approvedAmount
          ? Number(approvedAmount)
          : application.loan_amount_requested,
        approved_rate: approvedRate ? Number(approvedRate) : null,
      },
    },
    {
      label: "Mark as Disbursed",
      status: "disbursed",
      icon: Send,
      variant: "default" as const,
      show: application.status === "approved",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div className="bg-white rounded-2xl shadow-card p-4 lg:p-5">
        <h2 className="font-semibold text-heading mb-2 lg:mb-3 text-[11px] lg:text-sm flex items-center gap-1.5 lg:gap-2">
          <AlertCircle className="w-3.5 h-3.5 lg:w-[15px] lg:h-[15px]" />
          Admin Actions
        </h2>

        {/* Approval Fields */}
        {["submitted", "under_review"].includes(application.status) && (
          <div className="space-y-3 mb-4">
            <div>
              <Label className="text-[10px] lg:text-xs mb-1 block">
                Approved Amount (₹)
              </Label>
              <Input
                type="number"
                placeholder={application.loan_amount_requested?.toString()}
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
                className="text-[11px] lg:text-sm h-8 lg:h-10 font-mono"
              />
            </div>
            <div>
              <Label className="text-[10px] lg:text-xs mb-1 block">
                Approved Rate (% p.a.)
              </Label>
              <Input
                type="number"
                step="0.25"
                min="10.25"
                max="36"
                placeholder="12.50"
                value={approvedRate}
                onChange={(e) => setApprovedRate(e.target.value)}
                className="text-[11px] lg:text-sm h-8 lg:h-10 font-mono"
              />
              <p className="text-[9px] lg:text-[10px] text-text-muted mt-1">
                Range: 10.25% – 36% p.a.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {actions
            .filter((a) => a.show)
            .map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.status}
                  variant={action.variant}
                  size="sm"
                  className="w-full gap-1.5 lg:gap-2 text-[10px] lg:text-xs h-8 lg:h-9"
                  disabled={loading}
                  onClick={() => updateStatus(action.status, action.extra)}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {action.label}
                </Button>
              );
            })}

          {/* Reject */}
          {["submitted", "under_review"].includes(application.status) && (
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <Label className="text-[10px] lg:text-xs block">
                Rejection Reason
              </Label>
              <textarea
                rows={2}
                className="w-full text-[10px] lg:text-xs rounded-lg border border-input p-2 lg:p-2.5 resize-none focus:ring-2 focus:ring-brand-blue focus:outline-none"
                placeholder="Low CIBIL score, insufficient income..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <Button
                variant="destructive"
                size="sm"
                className="w-full gap-1.5 lg:gap-2 text-[10px] lg:text-xs h-8 lg:h-9"
                disabled={loading || !rejectionReason}
                onClick={() =>
                  updateStatus("rejected", {
                    rejection_reason: rejectionReason,
                  })
                }
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject Application
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Notes */}
      <div className="bg-white rounded-2xl shadow-card p-4 lg:p-5">
        <Label className="text-[11px] lg:text-sm font-semibold text-heading mb-2 block">
          Internal Notes
        </Label>
        <textarea
          rows={4}
          className="w-full text-[10px] lg:text-xs rounded-lg border border-input p-2.5 lg:p-3 resize-none focus:ring-2 focus:ring-brand-blue focus:outline-none"
          placeholder="Add internal notes visible only to admin team..."
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
        />
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full text-[10px] lg:text-xs h-8 lg:h-9"
          disabled={loading}
          onClick={() => updateStatus(application.status)}
        >
          Save Notes
        </Button>
      </div>
    </div>
  );
}
