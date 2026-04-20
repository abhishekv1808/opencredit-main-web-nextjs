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

      // Verify admin role
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A1628 0%, #0F2347 40%, #162D55 100%)" }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-green/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-blue/[0.06] blur-[100px]" />
        <div className="absolute top-[30%] left-[20%] w-[200px] h-[200px] rounded-full bg-brand-green/[0.03] blur-[60px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-green rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/20">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div className="text-left">
              <span className="font-display font-bold text-white text-xl block leading-tight">
                OpenCredit
              </span>
              <span className="text-[10px] text-brand-green tracking-[0.25em] uppercase font-medium">
                Admin Portal
              </span>
            </div>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white mb-2">
            Admin Sign In
          </h1>
          <p className="text-white/40 text-sm">
            Authorized personnel only · Internal use
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-8 shadow-2xl">
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5">
              <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label className="text-white/70 text-xs font-medium mb-2 block uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <Input
                  type="email"
                  required
                  placeholder="admin@opencredit.money"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white/25 rounded-xl focus:border-brand-green focus:ring-brand-green/20"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/70 text-xs font-medium mb-2 block uppercase tracking-wider">
                Password
              </Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 h-12 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white/25 rounded-xl focus:border-brand-green focus:ring-brand-green/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl text-base shadow-lg shadow-brand-green/20 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <>
                  <Lock size={16} />
                  Sign In Securely
                </>
              )}
            </Button>
          </form>

          {/* Security info */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={12} className="text-brand-green/60" />
              <p className="text-white/25 text-[11px]">
                256-bit SSL · Session encrypted · Access logged
              </p>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <p className="text-center text-white/20 text-xs mt-6">
          OpenCredit.Money — Internal Admin Portal
          <br />
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </div>
  );
}
