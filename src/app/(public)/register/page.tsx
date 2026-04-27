"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Mail,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Lock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type Step = "form" | "otp" | "success";

const benefits = [
  "Apply for loans up to ₹40 Lakh",
  "Track application status in real time",
  "Compare offers from 60+ lenders",
  "100% digital — no branch visits",
];

// ── 8-box OTP input ────────────────────────────────────────────────────────
function OTPInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(8, "").split("").slice(0, 8);

  const handleChange = (i: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const next = [...digits];
    next[i] = char.slice(-1);
    onChange(next.join("").trimEnd());
    if (char && i < 7) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        const next = [...digits];
        next[i] = "";
        onChange(next.join("").trimEnd());
      } else if (i > 0) {
        inputs.current[i - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 8);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, 7);
    inputs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={digits[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={`
            w-10 h-13 text-center text-lg font-bold rounded-xl border-2 transition-all duration-200
            outline-none bg-white text-heading
            ${digits[i] ? "border-brand-green bg-brand-green/5 text-brand-green shadow-[0_0_0_3px_rgba(34,197,94,0.12)]" : "border-gray-200 hover:border-gray-300"}
            focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(34,197,94,0.15)]
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          style={{ height: "48px", width: "40px" }}
        />
      ))}
    </div>
  );
}

// ── Step indicator (left panel) ────────────────────────────────────────────
function StepDots({ current }: { current: Step }) {
  const steps = [
    { key: "form", label: "Details" },
    { key: "otp",  label: "Verify" },
    { key: "success", label: "Done" },
  ];
  const activeIdx = steps.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-1.5 mb-8">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-1.5">
          <div
            className={`flex items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
              i < activeIdx
                ? "w-5 h-5 bg-brand-green text-white"
                : i === activeIdx
                ? "w-6 h-6 bg-brand-green text-white shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                : "w-5 h-5 bg-white/10 text-white/30"
            }`}
          >
            {i < activeIdx ? "✓" : i + 1}
          </div>
          <span
            className={`text-[11px] font-medium transition-colors ${
              i <= activeIdx ? "text-white/70" : "text-white/25"
            }`}
          >
            {s.label}
          </span>
          {i < 2 && (
            <div
              className={`w-5 h-px transition-colors ${
                i < activeIdx ? "bg-brand-green/50" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const verifyingRef = useRef(false);

  // Resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Auto-submit when all 8 digits entered (with guard against React 18 strict mode double-fire)
  useEffect(() => {
    if (otp.length === 8 && step === "otp" && !loading && !verifyingRef.current) {
      verifyingRef.current = true;
      handleVerifyOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleGoogleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  const handleSendOTP = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    const cleanPhone = form.phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        data: { full_name: form.fullName, phone: cleanPhone },
        shouldCreateUser: true,
      },
    });
    if (error) {
      setError(error.message);
    } else {
      setStep("otp");
      setCountdown(60);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (otp.length !== 8) { setError("Enter the complete 8-digit code."); return; }
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email: form.email,
      token: otp,
      type: "email",
    });
    verifyingRef.current = false;
    if (error) {
      setError(error.message || "Invalid or expired code. Please try again.");
      setOtp("");
    } else {
      if (data.user) {
        await supabase
          .from("profiles")
          .update({ phone: form.phone.replace(/\D/g, ""), full_name: form.fullName })
          .eq("id", data.user.id);
      }
      setStep("success");
      setTimeout(() => router.push("/dashboard"), 3000);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setError("");
    setOtp("");
    setCountdown(60);
    await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        data: { full_name: form.fullName, phone: form.phone.replace(/\D/g, "") },
        shouldCreateUser: true,
      },
    });
  };

  return (
    <div className="min-h-screen hero-bg-light flex items-center justify-center px-4 pt-28 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-10 left-[8%] w-[500px] h-[500px] rounded-full bg-brand-green/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[8%] w-[400px] h-[400px] rounded-full bg-brand-blue/[0.04] blur-[100px] pointer-events-none" />

      {/* ── Success Modal ── */}
      {step === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div
            className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl"
            style={{ animation: "fadeUp 0.4s ease-out" }}
          >
            {/* Animated checkmark ring */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-brand-green/10 animate-ping" style={{ animationDuration: "1.5s" }} />
              <div className="relative w-24 h-24 bg-gradient-to-br from-brand-green to-green-600 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(34,197,94,0.35)]">
                <CheckCircle2 size={44} className="text-white" strokeWidth={2.5} />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-brand-green/10 px-3 py-1 rounded-full mb-3">
              <Sparkles size={11} className="text-brand-green" />
              <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider">
                Account Created
              </span>
            </div>

            <h2 className="font-display text-2xl font-extrabold text-heading mb-2">
              Welcome to OpenCredit!
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Hey <strong className="text-gray-700">{form.fullName.split(" ")[0]}</strong>, your account is ready.
              Taking you to your dashboard…
            </p>

            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-green to-green-500 rounded-full"
                style={{ animation: "progressFill 3s linear forwards", width: "0%" }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Redirecting in 3 seconds…</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl relative">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">

          {/* ── Left: Benefits Panel ── */}
          <div
            className="rounded-3xl p-8 text-white hidden md:flex flex-col relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #0A1628 0%, #0F2240 50%, #0A1628 100%)" }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
            />
            {/* Green glow top-right */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-green/[0.07] blur-[80px] pointer-events-none" />

            <div className="relative flex-1">
              {/* Logo */}
              <Link href="/" className="inline-flex mb-8">
                <Image
                  src="/images/OpenCredit-logo.png"
                  alt="OpenCredit.Money"
                  width={160}
                  height={40}
                  className="h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  priority
                />
              </Link>

              <StepDots current={step} />

              <h2 className="font-display text-[28px] font-extrabold leading-snug mb-3">
                Start Your Financial{" "}
                <span style={{ background: "linear-gradient(135deg, #5BC83F, #42A8E5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Journey
                </span>
              </h2>
              <p className="text-white/45 text-[13.5px] mb-8 leading-relaxed">
                Join 4,200+ customers who found their perfect loan through
                OpenCredit&apos;s marketplace.
              </p>

              <ul className="space-y-3.5 mb-10">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-brand-green" />
                    </div>
                    <span className="text-white/65 text-[13.5px]">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["RBI Compliant", "SSL Secured", "DPDP Act"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/45 font-medium">
                    <Shield size={10} className="text-brand-green/70" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Rate disclosure */}
            <div className="relative bg-white/[0.04] border border-white/[0.07] rounded-xl p-4">
              <p className="text-[11.5px] text-white/35 leading-relaxed">
                <strong className="text-white/55">Rate disclosure:</strong> Interest rates from 10.25% to 36% p.a.
                Loan amounts ₹50,000 to ₹40,00,000. Tenure 12–60 months.
                Subject to credit approval by partner lenders.
              </p>
            </div>
          </div>

          {/* ── Right: Form Panel ── */}
          <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(0,0,0,0.07)] border border-gray-100/80 p-8 flex flex-col">

            {/* ── STEP 1: Registration Form ── */}
            {step === "form" && (
              <div className="flex-1 flex flex-col">
                <div className="mb-7">
                  <h1 className="font-display text-[28px] font-extrabold text-heading mb-1 leading-tight">
                    Create Account
                  </h1>
                  <p className="text-gray-400 text-[13.5px]">
                    Free registration · No credit check to sign up
                  </p>
                </div>

                {/* Google */}
                <button
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-[14px] font-semibold text-gray-700 mb-5 disabled:opacity-60"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="relative mb-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-[12px] text-gray-400">or sign up with email</span>
                  </div>
                </div>

                <form onSubmit={handleSendOTP} className="flex-1 flex flex-col gap-4">
                  {/* Full Name */}
                  <div>
                    <Label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
                      Full Name <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 text-gray-400" />
                      <Input
                        required
                        placeholder="As per PAN card"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="pl-10 h-11 rounded-xl border-gray-200 text-[14px] focus-visible:ring-brand-green/30 focus-visible:border-brand-green"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
                      Email Address <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="pl-10 h-11 rounded-xl border-gray-200 text-[14px] focus-visible:ring-brand-green/30 focus-visible:border-brand-green"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <Label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
                      Mobile Number <span className="text-red-400">*</span>
                    </Label>
                    <div className="flex gap-0">
                      <div className="flex items-center px-3.5 h-11 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-[13px] font-semibold text-gray-500 select-none">
                        🇮🇳 +91
                      </div>
                      <div className="relative flex-1">
                        <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                            })
                          }
                          className="pl-9 h-11 rounded-l-none rounded-r-xl border-gray-200 text-[14px] focus-visible:ring-brand-green/30 focus-visible:border-brand-green"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded accent-green-600 cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="consent" className="text-[12px] text-gray-500 leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms-of-service" className="text-brand-green underline underline-offset-2">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-brand-green underline underline-offset-2">
                        Privacy Policy
                      </Link>
                      . I consent to my data being shared with partner lenders for loan processing.
                    </label>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_4px_24px_rgba(34,197,94,0.35)] hover:-translate-y-0.5 active:translate-y-0"
                    style={{
                      background: loading
                        ? "#86efac"
                        : "linear-gradient(135deg, #5BC83F 0%, #3DA52A 100%)",
                      boxShadow: "0 4px 16px rgba(91,200,63,0.25)",
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending OTP…
                      </>
                    ) : (
                      <>
                        Send Verification Code
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ── STEP 2: OTP Verification ── */}
            {step === "otp" && (
              <div className="flex-1 flex flex-col">
                <button
                  onClick={() => { setStep("form"); setOtp(""); setError(""); }}
                  className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-700 mb-6 transition-colors w-fit"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>

                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "linear-gradient(135deg, rgba(91,200,63,0.12), rgba(66,168,229,0.08))", border: "1px solid rgba(91,200,63,0.15)" }}
                  >
                    <Mail size={26} className="text-brand-green" />
                  </div>
                  <h1 className="font-display text-2xl font-extrabold text-heading mb-2">
                    Check Your Email
                  </h1>
                  <p className="text-gray-400 text-[13.5px] leading-relaxed">
                    We sent a verification code to
                  </p>
                  <p className="text-[14px] font-semibold text-heading mt-1">
                    {form.email}
                  </p>
                </div>

                <form
                  onSubmit={handleVerifyOTP}
                  className="flex-1 flex flex-col gap-6"
                >
                  <div>
                    <p className="text-[12.5px] font-semibold text-gray-500 text-center mb-4 uppercase tracking-wider">
                      Enter verification code
                    </p>
                    <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otp.replace(/\s/g, "").length !== 6}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_4px_24px_rgba(34,197,94,0.35)] hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #5BC83F 0%, #3DA52A 100%)",
                      boxShadow: "0 4px 16px rgba(91,200,63,0.25)",
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Verify &amp; Create Account
                      </>
                    )}
                  </button>

                  {/* Resend */}
                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-[13px] text-gray-400">
                        Resend code in{" "}
                        <span className="font-semibold text-gray-600 tabular-nums">
                          0:{String(countdown).padStart(2, "0")}
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="inline-flex items-center gap-1.5 text-[13px] text-brand-green font-semibold hover:underline underline-offset-2"
                      >
                        <RefreshCw size={13} />
                        Resend Code
                      </button>
                    )}
                  </div>

                  <p className="text-center text-[12px] text-gray-400">
                    Didn&apos;t get the email? Check your spam folder.
                  </p>
                </form>
              </div>
            )}

            {/* ── Bottom trust row (always visible) ── */}
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-brand-green/5 border border-brand-green/10 rounded-xl">
                <Shield size={13} className="text-brand-green flex-shrink-0" />
                <p className="text-[12px] text-brand-green font-medium">
                  Your data is encrypted and protected per DPDP Act
                </p>
              </div>
              <p className="text-center text-[13px] text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-green font-semibold hover:underline underline-offset-2">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
