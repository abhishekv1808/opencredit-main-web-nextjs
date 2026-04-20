import { createClient } from "@/lib/supabase/server";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", user.id).single();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : (user.email?.[0] || "U").toUpperCase();

  const kycColors = {
    verified:  { bg: "#f0fdf4", color: "#16a34a", label: "Verified" },
    pending:   { bg: "#fffbeb", color: "#d97706", label: "Pending" },
    rejected:  { bg: "#fef2f2", color: "#dc2626", label: "Rejected" },
  };
  const kyc = kycColors[(profile?.kyc_status as keyof typeof kycColors) || "pending"];

  const fields = [
    { icon: User,   label: "Full Name",   value: profile?.full_name || "—" },
    { icon: Mail,   label: "Email",        value: user.email || "—" },
    { icon: Phone,  label: "Phone",        value: profile?.phone || "Not added" },
    { icon: MapPin, label: "City",         value: profile?.city || "Bangalore" },
    { icon: Shield, label: "KYC Status",   value: profile?.kyc_status || "pending" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <p className="text-sm font-semibold mb-1" style={{ color: "#16a34a" }}>Account</p>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1a1a1a" }}>My Profile</h1>
        <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>Your personal account information</p>
      </div>

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
              {profile?.full_name || "Complete Your Profile"}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: kyc.bg, color: kyc.color }}>
                KYC: {kyc.label}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                {profile?.role || "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="px-6 py-2">
          {fields.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.label}
                className="flex items-center gap-4 py-3.5"
                style={{ borderBottom: idx < fields.length - 1 ? "1px solid #f5f5f5" : "none" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f0fdf4" }}>
                  <Icon size={14} style={{ color: "#16a34a" }} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium" style={{ color: "#9ca3af" }}>{item.label}</p>
                  <p className="text-sm font-semibold capitalize mt-0.5" style={{ color: "#1a1a1a" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
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
