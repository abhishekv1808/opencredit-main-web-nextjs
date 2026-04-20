"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

const issueOptions = [
  "Incorrect personal details (name, DOB, address)",
  "Accounts/loans not mine",
  "Settled accounts showing as active",
  "Duplicate loan entries",
  "Wrong outstanding amounts",
  "Closed accounts showing as open",
  "Missed EMI entries (payments were made)",
  "Written-off accounts despite full payment",
  "Old defaults beyond 7 years still showing",
  "Other inaccuracies",
];

export default function CreditCorrectionForm() {
  const [currentScore, setCurrentScore] = useState<number | "">("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const toggleIssue = (issue: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIssues.length === 0) {
      toast({
        title: "Select Issues",
        description: "Please select at least one issue with your credit report.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { count } = await supabase
      .from("credit_correction_requests")
      .select("*", { count: "exact", head: true });
    const seq = String((count || 0) + 1).padStart(5, "0");
    const reqNumber = `CC-${new Date().getFullYear()}-${seq}`;

    const { error } = await supabase
      .from("credit_correction_requests")
      .insert({
        user_id: user.id,
        request_number: reqNumber,
        current_score: currentScore || null,
        issues: selectedIssues,
        status: "submitted",
      });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRequestNumber(reqNumber);
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl shadow-card p-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} className="text-green-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-heading mb-2">
          Request Submitted!
        </h2>
        <p className="text-text-muted mb-1">
          Request Number: <strong className="text-heading">{requestNumber}</strong>
        </p>
        <p className="text-text-muted text-sm mb-6">
          Our credit correction team will review your request and contact you
          within 2 business days.
        </p>
        <Button onClick={() => router.push("/dashboard/applications")}>
          View My Requests <ArrowRight size={16} />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card p-6 md:p-8 space-y-6">
      {/* Current Score */}
      <div>
        <Label className="mb-1.5 block">Your Current CIBIL Score (if known)</Label>
        <Input
          type="number"
          min={300}
          max={900}
          placeholder="e.g. 620"
          value={currentScore}
          onChange={(e) => setCurrentScore(e.target.value ? Number(e.target.value) : "")}
          className="font-mono max-w-xs"
        />
        <p className="text-xs text-text-muted mt-1">
          Leave blank if you don&apos;t know your score.
        </p>
      </div>

      {/* Issues */}
      <div>
        <Label className="mb-3 block">
          What issues do you see in your credit report? *
        </Label>
        <div className="space-y-2">
          {issueOptions.map((issue) => (
            <label
              key={issue}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                selectedIssues.includes(issue)
                  ? "border-brand-blue bg-brand-blue-light"
                  : "border-gray-200 hover:border-brand-blue/40"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedIssues.includes(issue)}
                onChange={() => toggleIssue(issue)}
                className="w-4 h-4 text-heading rounded"
              />
              <span className="text-sm text-text-primary">{issue}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label className="mb-1.5 block">Additional Details (optional)</Label>
        <textarea
          rows={3}
          placeholder="Describe the specific issues in detail — lender names, loan amounts, dates, etc."
          className="flex w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green resize-none"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
      </div>

      {/* Summary */}
      {selectedIssues.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-600" />
            <p className="text-sm font-semibold text-green-800">
              {selectedIssues.length} issue(s) selected for dispute
            </p>
          </div>
          <p className="text-xs text-green-700">
            Our experts will analyze each issue and prepare dispute letters for
            CIBIL and the concerned lenders.
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full group"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Correction Request"}
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Button>

      <p className="text-xs text-text-muted text-center">
        By submitting, you authorize OpenCredit to act on your behalf for
        credit dispute purposes.
      </p>
    </form>
  );
}
