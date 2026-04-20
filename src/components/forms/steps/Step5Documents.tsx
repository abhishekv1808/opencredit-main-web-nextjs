"use client";

import { useState } from "react";
import { Upload, CheckCircle, X, FileText, AlertCircle } from "lucide-react";

interface StepProps {
  applicationId: string | null;
  onSave?: () => Promise<string | null>;
}

const requiredDocs = [
  { type: "pan_card", label: "PAN Card", required: true },
  { type: "aadhaar", label: "Aadhaar Card", required: true },
  { type: "salary_slip_1", label: "Salary Slip (Month 1)", required: true },
  { type: "salary_slip_2", label: "Salary Slip (Month 2)", required: true },
  { type: "salary_slip_3", label: "Salary Slip (Month 3)", required: false },
  { type: "bank_statement", label: "Bank Statement (6 months)", required: true },
  { type: "photo", label: "Passport Photo", required: true },
];

export default function Step5Documents({ applicationId, onSave }: StepProps) {
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

  const handleFileChange = async (
    docType: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploads((prev) => ({
        ...prev,
        [docType]: { name: file.name, uploading: false, done: false, error: "File too large. Max 5MB." },
      }));
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setUploads((prev) => ({
        ...prev,
        [docType]: { name: file.name, uploading: false, done: false, error: "Only PDF, JPG, PNG allowed." },
      }));
      return;
    }

    const activeId = resolvedId ?? applicationId;

    if (!activeId) {
      setUploads((prev) => ({
        ...prev,
        [docType]: { name: file.name, uploading: false, done: false, error: "Save the application first." },
      }));
      return;
    }

    setUploads((prev) => ({
      ...prev,
      [docType]: { name: file.name, uploading: true, done: false },
    }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("applicationId", activeId);
    formData.append("documentType", docType);

    const res = await fetch("/api/documents/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setUploads((prev) => ({
        ...prev,
        [docType]: { name: file.name, uploading: false, done: true },
      }));
    } else {
      const data = await res.json();
      setUploads((prev) => ({
        ...prev,
        [docType]: { name: file.name, uploading: false, done: false, error: data.error || "Upload failed." },
      }));
    }
  };

  const removeUpload = (docType: string) => {
    setUploads((prev) => {
      const next = { ...prev };
      delete next[docType];
      return next;
    });
  };

  const activeId = resolvedId ?? applicationId;

  return (
    <div className="space-y-4">
      {/* Warning banner when application not yet saved */}
      {!activeId && (
        <div className="rounded-xl p-4 flex items-start gap-3"
          style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
          <AlertCircle size={16} style={{ color: "#ea580c", flexShrink: 0, marginTop: 1 }} />
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#9a3412" }}>Application not saved yet</p>
            <p className="text-xs mt-0.5" style={{ color: "#c2410c" }}>
              Your application must be saved before uploading documents.
            </p>
          </div>
          <button
            onClick={handleSaveFirst}
            disabled={saving}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-colors"
            style={{ background: saving ? "#9ca3af" : "#16a34a" }}
          >
            {saving ? "Saving…" : "Save Now"}
          </button>
        </div>
      )}

      <div className="bg-brand-blue-light rounded-xl p-4 mb-2">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="text-heading mt-0.5 flex-shrink-0" />
          <div className="text-xs text-heading">
            <p className="font-semibold mb-1">Document Guidelines</p>
            <ul className="space-y-0.5 text-heading/80">
              <li>• Max file size: 5 MB per document</li>
              <li>• Accepted formats: PDF, JPG, PNG</li>
              <li>• Ensure documents are clear and readable</li>
              <li>• All documents must be valid and unexpired</li>
            </ul>
          </div>
        </div>
      </div>

      {requiredDocs.map((doc) => {
        const upload = uploads[doc.type];

        return (
          <div
            key={doc.type}
            className={`border-2 rounded-xl p-4 transition-all ${
              upload?.done
                ? "border-green-300 bg-green-50"
                : upload?.error
                ? "border-red-300 bg-red-50"
                : "border-gray-200 hover:border-brand-blue/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    upload?.done
                      ? "bg-green-100"
                      : upload?.error
                      ? "bg-red-100"
                      : "bg-gray-100"
                  }`}
                >
                  {upload?.done ? (
                    <CheckCircle size={18} className="text-green-600" />
                  ) : upload?.error ? (
                    <X size={18} className="text-red-600" />
                  ) : (
                    <FileText size={18} className="text-text-muted" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {doc.label}
                    {doc.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </p>
                  {upload?.name && !upload?.error && (
                    <p className="text-xs text-text-muted truncate max-w-[200px]">
                      {upload.name}
                    </p>
                  )}
                  {upload?.error && (
                    <p className="text-xs text-red-600">{upload.error}</p>
                  )}
                  {upload?.uploading && (
                    <p className="text-xs text-heading">Uploading...</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {upload?.done && (
                  <button
                    onClick={() => removeUpload(doc.type)}
                    className="text-red-400 hover:text-red-600 text-xs"
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
                    <div className="flex items-center gap-1.5 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
                      style={{ background: activeId ? "#16a34a" : "#9ca3af" }}>
                      <Upload size={14} />
                      {upload?.error ? "Retry" : "Upload"}
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="text-xs text-text-muted text-center mt-4">
        Documents are encrypted and stored securely. Only shared with assigned
        partner lenders.
      </div>
    </div>
  );
}
