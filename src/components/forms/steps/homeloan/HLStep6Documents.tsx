"use client";

import { useState } from "react";
import { Upload, CheckCircle, X, FileText, AlertCircle } from "lucide-react";

interface StepProps {
  applicationId: string | null;
  onSave?: () => Promise<string | null>;
}

const docGroups = [
  {
    group: "Identity & KYC",
    docs: [
      { type: "pan_card",    label: "PAN Card",       required: true },
      { type: "aadhaar",     label: "Aadhaar Card",   required: true },
      { type: "photo",       label: "Passport Photo", required: true },
    ],
  },
  {
    group: "Income Documents",
    docs: [
      { type: "salary_slip_1",  label: "Salary Slip – Month 1",        required: true },
      { type: "salary_slip_2",  label: "Salary Slip – Month 2",        required: true },
      { type: "salary_slip_3",  label: "Salary Slip – Month 3",        required: false },
      { type: "bank_statement", label: "Bank Statement (6 months)",    required: true },
      { type: "itr",            label: "ITR – Last 2 Years",           required: false },
    ],
  },
  {
    group: "Property Documents",
    docs: [
      { type: "property_doc", label: "Sale Agreement / Allotment Letter", required: true },
      { type: "title_deed",   label: "Title Deed / Chain of Documents",   required: false },
      { type: "noc",          label: "NOC from Builder / Society",        required: false },
      { type: "property_tax", label: "Property Tax Receipt",              required: false },
    ],
  },
];

export default function HLStep6Documents({ applicationId, onSave }: StepProps) {
  const [uploads, setUploads] = useState<
    Record<string, { name: string; uploading: boolean; done: boolean; error?: string }>
  >({});
  const [saving, setSaving] = useState(false);
  const [resolvedId, setResolvedId] = useState<string | null>(applicationId);

  const handleSaveFirst = async () => {
    if (!onSave) return;
    setSaving(true);
    const id = await onSave();
    if (id) setResolvedId(id);
    setSaving(false);
  };

  const handleFileChange = async (docType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploads((prev) => ({ ...prev, [docType]: { name: file.name, uploading: false, done: false, error: "Max 5MB allowed." } }));
      return;
    }
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setUploads((prev) => ({ ...prev, [docType]: { name: file.name, uploading: false, done: false, error: "Only PDF, JPG, PNG." } }));
      return;
    }

    const activeId = resolvedId ?? applicationId;
    if (!activeId) {
      setUploads((prev) => ({ ...prev, [docType]: { name: file.name, uploading: false, done: false, error: "Save application first." } }));
      return;
    }

    setUploads((prev) => ({ ...prev, [docType]: { name: file.name, uploading: true, done: false } }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("applicationId", activeId);
    formData.append("documentType", docType);

    const res = await fetch("/api/documents/upload", { method: "POST", body: formData });
    if (res.ok) {
      setUploads((prev) => ({ ...prev, [docType]: { name: file.name, uploading: false, done: true } }));
    } else {
      const json = await res.json();
      setUploads((prev) => ({ ...prev, [docType]: { name: file.name, uploading: false, done: false, error: json.error || "Upload failed." } }));
    }
  };

  const activeId = resolvedId ?? applicationId;

  return (
    <div className="space-y-5">
      {!activeId && (
        <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
          <AlertCircle size={16} style={{ color: "#ea580c", flexShrink: 0, marginTop: 1 }} />
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#9a3412" }}>Application not saved yet</p>
            <p className="text-xs mt-0.5" style={{ color: "#c2410c" }}>Save before uploading documents.</p>
          </div>
          <button
            onClick={handleSaveFirst}
            disabled={saving}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
            style={{ background: saving ? "#9ca3af" : "#16a34a" }}
          >
            {saving ? "Saving…" : "Save Now"}
          </button>
        </div>
      )}

      <div className="rounded-xl p-3.5" style={{ background: "#EBF0FA", border: "1px solid #c7d7f0" }}>
        <p className="text-xs font-semibold mb-1" style={{ color: "#1B3A6B" }}>Document Guidelines</p>
        <ul className="text-xs space-y-0.5" style={{ color: "#374151" }}>
          <li>• Max 5 MB per file · PDF, JPG, PNG accepted</li>
          <li>• Documents must be clear, valid and unexpired</li>
          <li>• Property docs: signed copies preferred</li>
        </ul>
      </div>

      {docGroups.map((group) => (
        <div key={group.group}>
          <p className="text-xs font-bold uppercase tracking-[0.12em] mb-2.5" style={{ color: "#6b7280" }}>
            {group.group}
          </p>
          <div className="space-y-2">
            {group.docs.map((doc) => {
              const upload = uploads[doc.type];
              return (
                <div
                  key={doc.type}
                  className="border-2 rounded-xl p-3.5 transition-all"
                  style={{
                    borderColor: upload?.done ? "#86efac" : upload?.error ? "#fca5a5" : "#e5e7eb",
                    background: upload?.done ? "#f0fdf4" : upload?.error ? "#fef2f2" : "#fff",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: upload?.done ? "#dcfce7" : upload?.error ? "#fee2e2" : "#f3f4f6" }}
                      >
                        {upload?.done ? (
                          <CheckCircle size={16} style={{ color: "#16a34a" }} />
                        ) : upload?.error ? (
                          <X size={16} style={{ color: "#dc2626" }} />
                        ) : (
                          <FileText size={16} style={{ color: "#9ca3af" }} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                          {doc.label}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                          {!doc.required && <span className="text-[10px] ml-1.5" style={{ color: "#9ca3af" }}>(optional)</span>}
                        </p>
                        {upload?.name && !upload?.error && (
                          <p className="text-xs truncate max-w-[180px]" style={{ color: "#6b7280" }}>{upload.name}</p>
                        )}
                        {upload?.error && <p className="text-xs" style={{ color: "#dc2626" }}>{upload.error}</p>}
                        {upload?.uploading && <p className="text-xs" style={{ color: "#1B3A6B" }}>Uploading…</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {upload?.done && (
                        <button
                          onClick={() => setUploads((prev) => { const n = { ...prev }; delete n[doc.type]; return n; })}
                          className="text-xs"
                          style={{ color: "#dc2626" }}
                        >
                          Remove
                        </button>
                      )}
                      {!upload?.done && (
                        <label className={activeId ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            disabled={!activeId}
                            onChange={(e) => handleFileChange(doc.type, e)}
                          />
                          <div
                            className="flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-lg"
                            style={{ background: activeId ? "#16a34a" : "#9ca3af" }}
                          >
                            <Upload size={13} />
                            {upload?.error ? "Retry" : "Upload"}
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <p className="text-xs text-center" style={{ color: "#9ca3af" }}>
        All documents are encrypted and stored securely. Only shared with your assigned lender.
      </p>
    </div>
  );
}
