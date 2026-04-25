"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Invalid credentials. Access denied.");
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        setError("Access denied. Admin privileges required.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#f0faf4" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #16a34a1a 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Soft blobs */}
      <div
        className="absolute top-[-8%] right-[-4%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(22,163,74,0.09)", filter: "blur(90px)" }}
      />
      <div
        className="absolute bottom-[-8%] left-[-4%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "rgba(66,168,229,0.08)", filter: "blur(80px)" }}
      />

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "#16a34a", boxShadow: "0 4px 16px rgba(22,163,74,0.25)" }}
            >
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div className="text-left">
              <span className="font-bold text-xl block leading-tight" style={{ color: "#0f1a0f" }}>
                OpenCredit
              </span>
              <span
                className="text-[10px] tracking-[0.25em] uppercase font-semibold"
                style={{ color: "#16a34a" }}
              >
                Admin Portal
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold mb-1.5" style={{ color: "#0f1a0f" }}>
            Admin Sign In
          </h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Authorized personnel only · Internal use
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-2xl p-8"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          {error && (
            <div
              className="mb-5 flex items-center gap-3 rounded-xl p-3.5"
              style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
            >
              <AlertTriangle size={16} className="flex-shrink-0" style={{ color: "#dc2626" }} />
              <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <Label
                className="text-xs font-semibold mb-2 block uppercase tracking-wider"
                style={{ color: "#374151" }}
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#9ca3af" }}
                />
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl text-sm border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  style={{ color: "#1a1a1a" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label
                className="text-xs font-semibold mb-2 block uppercase tracking-wider"
                style={{ color: "#374151" }}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#9ca3af" }}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 h-12 rounded-xl text-sm border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  style={{ color: "#1a1a1a" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#9ca3af" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#374151"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#9ca3af"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl text-base font-bold text-white transition-all duration-200"
              style={{
                background: loading ? "#15803d" : "#16a34a",
                boxShadow: loading ? "none" : "0 4px 14px rgba(22,163,74,0.30)",
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#15803d"; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#16a34a"; }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock size={16} />
                  Sign In Securely
                </span>
              )}
            </Button>
          </form>

          {/* Security strip */}
          <div className="mt-6 pt-5" style={{ borderTop: "1px solid #f3f4f6" }}>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={12} style={{ color: "#16a34a" }} />
              <p className="text-[11px]" style={{ color: "#9ca3af" }}>
                256-bit SSL · Session encrypted · Access logged
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "#9ca3af" }}>
          OpenCredit.Money — Internal Admin Portal
          <br />
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </div>
  );
}
