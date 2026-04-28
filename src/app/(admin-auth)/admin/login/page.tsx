"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(22, 163, 74, 0.15); }
          50% { box-shadow: 0 0 40px rgba(22, 163, 74, 0.25); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .admin-login-page * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .admin-login-card {
          animation: fadeInUp 0.7s ease-out;
        }
        .admin-login-left {
          animation: fadeIn 0.8s ease-out;
        }
        .login-field-focus {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .brand-panel-feature {
          animation: slideInLeft 0.6s ease-out backwards;
        }
        .brand-panel-feature:nth-child(1) { animation-delay: 0.3s; }
        .brand-panel-feature:nth-child(2) { animation-delay: 0.45s; }
        .brand-panel-feature:nth-child(3) { animation-delay: 0.6s; }
      `}</style>

      <div className="admin-login-page min-h-screen flex" style={{ background: "#f8fafb" }}>
        {/* Left Branded Panel */}
        <div
          className="admin-login-left hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col justify-between overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #0a2e1c 0%, #0d4a2a 30%, #116634 60%, #16a34a 100%)",
          }}
        >
          {/* Decorative mesh pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.03) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 40%)
              `,
            }}
          />
          {/* Floating geometric shapes */}
          <div
            className="absolute top-16 right-12 w-24 h-24 rounded-full pointer-events-none"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-32 left-8 w-16 h-16 rounded-lg pointer-events-none"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              transform: "rotate(45deg)",
              animation: "float 8s ease-in-out infinite 1s",
            }}
          />
          <div
            className="absolute top-1/2 right-6 w-8 h-8 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              animation: "float 5s ease-in-out infinite 0.5s",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-10 xl:px-14">
            {/* Logo */}
            <div className="mb-12">
              <div
                className="inline-flex items-center justify-center rounded-2xl p-3 mb-6"
                style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
              >
                <Image
                  src="/images/OpenCredit-logo.png"
                  alt="OpenCredit Logo"
                  width={180}
                  height={60}
                  className="brightness-0 invert"
                  priority
                />
              </div>
              <h2
                className="text-3xl xl:text-4xl font-bold leading-tight mb-3"
                style={{ color: "#ffffff" }}
              >
                Administration<br />Control Center
              </h2>
              <p className="text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
                Secure access for authorized personnel only
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-5">
              {[
                {
                  icon: "🔒",
                  title: "End-to-End Encryption",
                  desc: "All sessions are encrypted with 256-bit SSL",
                },
                {
                  icon: "📊",
                  title: "Real-Time Analytics",
                  desc: "Monitor applications and approvals live",
                },
                {
                  icon: "🛡️",
                  title: "Audit Logging",
                  desc: "Every action is recorded and traceable",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="brand-panel-feature flex items-start gap-4 rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
                >
                  <span className="text-xl mt-0.5">{feature.icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#ffffff" }}>
                      {feature.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div
            className="relative z-10 px-10 xl:px-14 py-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              © {new Date().getFullYear()} OpenCredit.Money · Internal Admin Portal
            </p>
          </div>
        </div>

        {/* Right Login Panel */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
          {/* Subtle background accents */}
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "rgba(22,163,74,0.03)", filter: "blur(100px)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "rgba(59,130,246,0.03)", filter: "blur(80px)" }}
          />

          <div className="admin-login-card w-full max-w-[420px] relative z-10">
            {/* Mobile Logo (shown on smaller screens) */}
            <div className="lg:hidden text-center mb-10">
              <Image
                src="/images/OpenCredit-logo.png"
                alt="OpenCredit Logo"
                width={200}
                height={66}
                className="mx-auto mb-3"
                priority
              />
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest"
                style={{ background: "#f0fdf4", color: "#16a34a" }}
              >
                <ShieldCheck size={12} />
                Admin Portal
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="hidden lg:flex items-center gap-2 mb-6">
                <Image
                  src="/images/OpenCredit-logo.png"
                  alt="OpenCredit Logo"
                  width={140}
                  height={46}
                  priority
                />
                <div
                  className="h-5 w-px mx-1"
                  style={{ background: "#e5e7eb" }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-md"
                  style={{ background: "#f0fdf4", color: "#16a34a" }}
                >
                  Admin
                </span>
              </div>
              <h1
                className="text-2xl lg:text-[28px] font-extrabold mb-2 tracking-tight"
                style={{ color: "#0f172a" }}
              >
                Welcome back
              </h1>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                className="mb-6 flex items-center gap-3 rounded-xl p-4"
                style={{
                  background: "linear-gradient(135deg, #fef2f2, #fff1f2)",
                  border: "1px solid #fecaca",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#fee2e2" }}
                >
                  <AlertTriangle size={14} style={{ color: "#dc2626" }} />
                </div>
                <p className="text-sm font-medium" style={{ color: "#b91c1c" }}>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <Label
                  className="text-xs font-semibold mb-2.5 block tracking-wide"
                  style={{ color: "#475569" }}
                >
                  Email Address
                </Label>
                <div
                  className="relative login-field-focus rounded-xl overflow-hidden"
                  style={{
                    boxShadow: focusedField === "email"
                      ? "0 0 0 2px #16a34a, 0 4px 12px rgba(22,163,74,0.1)"
                      : "0 0 0 1px #e2e8f0",
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-11 flex items-center justify-center pointer-events-none"
                    style={{
                      background: focusedField === "email" ? "#f0fdf4" : "#f8fafc",
                      borderRight: `1px solid ${focusedField === "email" ? "#bbf7d0" : "#e2e8f0"}`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Mail
                      size={15}
                      style={{
                        color: focusedField === "email" ? "#16a34a" : "#94a3b8",
                        transition: "color 0.3s ease",
                      }}
                    />
                  </div>
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="pl-14 h-12 rounded-xl text-sm border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{ color: "#0f172a", background: "white" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label
                  className="text-xs font-semibold mb-2.5 block tracking-wide"
                  style={{ color: "#475569" }}
                >
                  Password
                </Label>
                <div
                  className="relative login-field-focus rounded-xl overflow-hidden"
                  style={{
                    boxShadow: focusedField === "password"
                      ? "0 0 0 2px #16a34a, 0 4px 12px rgba(22,163,74,0.1)"
                      : "0 0 0 1px #e2e8f0",
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-11 flex items-center justify-center pointer-events-none"
                    style={{
                      background: focusedField === "password" ? "#f0fdf4" : "#f8fafc",
                      borderRight: `1px solid ${focusedField === "password" ? "#bbf7d0" : "#e2e8f0"}`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Lock
                      size={15}
                      style={{
                        color: focusedField === "password" ? "#16a34a" : "#94a3b8",
                        transition: "color 0.3s ease",
                      }}
                    />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="pl-14 pr-12 h-12 rounded-xl text-sm border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{ color: "#0f172a", background: "white" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-all duration-200"
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#16a34a";
                      (e.currentTarget as HTMLElement).style.background = "#f0fdf4";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[52px] rounded-xl text-[15px] font-bold text-white transition-all duration-300 group"
                  style={{
                    background: loading
                      ? "#15803d"
                      : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    boxShadow: loading
                      ? "none"
                      : "0 4px 15px rgba(22,163,74,0.3), 0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLElement).style.background =
                        "linear-gradient(135deg, #15803d 0%, #166534 100%)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 6px 20px rgba(22,163,74,0.4), 0 2px 4px rgba(0,0,0,0.1)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLElement).style.background =
                        "linear-gradient(135deg, #16a34a 0%, #15803d 100%)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 4px 15px rgba(22,163,74,0.3), 0 1px 3px rgba(0,0,0,0.1)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2.5">
                      <svg className="animate-spin h-[18px] w-[18px]" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2.5">
                      Sign In to Dashboard
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Security badges */}
            <div
              className="mt-8 pt-6 flex items-center justify-center gap-5"
              style={{ borderTop: "1px solid #f1f5f9" }}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} style={{ color: "#16a34a" }} />
                <span className="text-[11px] font-medium" style={{ color: "#94a3b8" }}>
                  256-bit SSL
                </span>
              </div>
              <div
                className="w-1 h-1 rounded-full"
                style={{ background: "#e2e8f0" }}
              />
              <div className="flex items-center gap-1.5">
                <Lock size={11} style={{ color: "#16a34a" }} />
                <span className="text-[11px] font-medium" style={{ color: "#94a3b8" }}>
                  Encrypted
                </span>
              </div>
              <div
                className="w-1 h-1 rounded-full"
                style={{ background: "#e2e8f0" }}
              />
              <span className="text-[11px] font-medium" style={{ color: "#94a3b8" }}>
                Access Logged
              </span>
            </div>

            {/* Footer (mobile) */}
            <p
              className="lg:hidden text-center text-[11px] mt-8"
              style={{ color: "#94a3b8" }}
            >
              OpenCredit.Money — Internal Admin Portal
              <br />
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
