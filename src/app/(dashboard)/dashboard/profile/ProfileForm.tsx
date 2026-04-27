"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Shield, Pencil, X, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  profile: {
    full_name: string | null;
    phone: string | null;
    city: string | null;
    kyc_status: string | null;
    role: string | null;
  };
  email: string;
  initials: string;
  kyc: { bg: string; color: string; label: string };
}

export default function ProfileForm({ profile, email, initials, kyc }: ProfileFormProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    full_name: profile.full_name || "",
    phone: profile.phone || "",
  });

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update profile.");
        return;
      }
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      full_name: profile.full_name || "",
      phone: profile.phone || "",
    });
    setError("");
    setEditing(false);
  };

  const displayName = form.full_name || profile.full_name;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#16a34a" }}>Account</p>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1a1a1a" }}>My Profile</h1>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>Your personal account information</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl mt-1 transition-colors"
            style={{ background: "#f0fdf4", color: "#16a34a" }}
          >
            <Pencil size={12} />
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              style={{ background: "#f5f5f5", color: "#6b7280" }}
            >
              <X size={12} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              style={{ background: "#16a34a", color: "#fff" }}
            >
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Success banner */}
      {success && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
          <Check size={14} />
          Profile updated successfully!
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl overflow-hidden mb-4"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>

        {/* Avatar Banner */}
        <div className="px-6 py-6 flex items-center gap-5" style={{ background: "#1a1a1a" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0"
            style={{ background: "#16a34a", color: "#fff" }}>
            {initials}
          </div>
          <div>
            <h2 className="font-bold text-lg text-white leading-tight">
              {displayName || "Complete Your Profile"}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: kyc.bg, color: kyc.color }}>
                KYC: {kyc.label}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                {profile.role || "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="px-6 py-2">
          {/* Full Name */}
          <FieldRow
            icon={User}
            label="Full Name"
            editing={editing}
            value={form.full_name}
            displayValue={profile.full_name || "—"}
            placeholder="Enter your full name"
            onChange={(v) => setForm((f) => ({ ...f, full_name: v }))}
            isLast={false}
          />

          {/* Email — always read-only */}
          <div className="flex items-center gap-4 py-3.5" style={{ borderBottom: "1px solid #f5f5f5" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#f0fdf4" }}>
              <Mail size={14} style={{ color: "#16a34a" }} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium" style={{ color: "#9ca3af" }}>Email</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: "#1a1a1a" }}>{email}</p>
            </div>
            {editing && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: "#f5f5f5", color: "#9ca3af" }}>
                Google account
              </span>
            )}
          </div>

          {/* Phone */}
          <FieldRow
            icon={Phone}
            label="Phone"
            editing={editing}
            value={form.phone}
            displayValue={profile.phone || "Not added"}
            placeholder="10-digit mobile number"
            inputMode="numeric"
            maxLength={10}
            onChange={(v) => setForm((f) => ({ ...f, phone: v.replace(/\D/g, "") }))}
            isLast={false}
          />

          {/* City — read-only (column not yet in DB) */}
          <div className="flex items-center gap-4 py-3.5" style={{ borderBottom: "1px solid #f5f5f5" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#f0fdf4" }}>
              <MapPin size={14} style={{ color: "#16a34a" }} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium" style={{ color: "#9ca3af" }}>City</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: "#1a1a1a" }}>
                {profile.city || "Bangalore"}
              </p>
            </div>
          </div>

          {/* KYC Status — always read-only */}
          <div className="flex items-center gap-4 py-3.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#f0fdf4" }}>
              <Shield size={14} style={{ color: "#16a34a" }} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium" style={{ color: "#9ca3af" }}>KYC Status</p>
              <p className="text-sm font-semibold capitalize mt-0.5" style={{ color: "#1a1a1a" }}>
                {profile.kyc_status || "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="bg-white rounded-2xl p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f0fdf4" }}>
            <Shield size={14} style={{ color: "#16a34a" }} />
          </div>
          <h2 className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>Security & Privacy</h2>
        </div>
        <div className="space-y-2.5">
          {[
            "Your PAN and Aadhaar data is encrypted at rest",
            "Data shared only with assigned partner lenders",
            "DPDP Act 2023 compliant data handling",
            "SSL secured connection",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "#f0fdf4" }}>
                <span className="text-[9px] font-bold" style={{ color: "#16a34a" }}>✓</span>
              </div>
              <p className="text-sm" style={{ color: "#6b7280" }}>{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid #f5f5f5" }}>
          <Link href="/privacy-policy"
            className="text-xs font-semibold"
            style={{ color: "#16a34a" }}>
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}

interface FieldRowProps {
  icon: React.ElementType;
  label: string;
  editing: boolean;
  value: string;
  displayValue: string;
  placeholder?: string;
  inputMode?: "text" | "numeric";
  maxLength?: number;
  onChange: (v: string) => void;
  isLast: boolean;
}

function FieldRow({
  icon: Icon,
  label,
  editing,
  value,
  displayValue,
  placeholder,
  inputMode = "text",
  maxLength,
  onChange,
  isLast,
}: FieldRowProps) {
  return (
    <div
      className="flex items-center gap-4 py-3.5"
      style={{ borderBottom: isLast ? "none" : "1px solid #f5f5f5" }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "#f0fdf4" }}>
        <Icon size={14} style={{ color: "#16a34a" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium" style={{ color: "#9ca3af" }}>{label}</p>
        {editing ? (
          <input
            type={inputMode === "numeric" ? "tel" : "text"}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className="mt-0.5 w-full text-sm font-semibold rounded-lg px-2.5 py-1.5 outline-none transition-colors"
            style={{
              color: "#1a1a1a",
              background: "#f9fafb",
              border: "1.5px solid #e5e7eb",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        ) : (
          <p className="text-sm font-semibold mt-0.5" style={{ color: "#1a1a1a" }}>
            {displayValue}
          </p>
        )}
      </div>
    </div>
  );
}
