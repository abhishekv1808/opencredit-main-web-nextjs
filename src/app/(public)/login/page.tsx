"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Mail, ArrowRight, ArrowLeft, Shield, Chrome, Lock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const verifyingRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";

  const supabase = createClient();

  // Resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Auto-submit when all 8 digits entered (with guard against React 18 strict mode double-fire)
  useEffect(() => {
    if (otp.length === 8 && otpSent && !loading && !verifyingRef.current) {
      verifyingRef.current = true;
      handleVerifyOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  const handleEmailOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setOtpSent(true);
      setCountdown(60);
      toast({ title: "OTP Sent", description: "Check your email for the verification code." });
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (otp.length !== 8) return;
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    verifyingRef.current = false;
    if (error) {
      toast({ title: "Invalid Code", description: error.message || "The code is invalid or expired. Please try again.", variant: "destructive" });
      setOtp("");
    } else {
      toast({ title: "Success", description: "Logged in successfully!" });
      router.push(returnUrl);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setOtp("");
    setCountdown(60);
    await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });
    toast({ title: "Code Resent", description: "A new verification code has been sent to your email." });
  };

  return (
    <div className="min-h-screen hero-bg-light flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[15%] w-[300px] h-[300px] rounded-full bg-brand-green/[0.03] blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex">
            <Image
              src="/images/OpenCredit-logo.png"
              alt="OpenCredit.Money"
              width={168}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="card-modern p-8">
          <h1 className="font-display text-3xl font-extrabold text-heading mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            Sign in to track your loan application
          </p>

          {!otpSent ? (
            <>
              {/* Google Login */}
              <Button
                variant="outline"
                size="lg"
                className="w-full mb-6 gap-3 border-2 border-gray-200 hover:border-brand-green"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-gray-400">
                    or sign in with email
                  </span>
                </div>
              </div>

              {/* Email OTP */}
              <form onSubmit={handleEmailOTP} className="space-y-4">
                <div>
                  <Label className="mb-1.5 block text-gray-600">Email Address</Label>
                  <Input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-gray-200 focus-visible:ring-brand-green"
                  />
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  <Mail size={18} />
                  {loading ? "Sending..." : "Send Verification Code"}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform ml-auto"
                  />
                </Button>
              </form>
            </>
          ) : (
            /* OTP Verification Step */
            <div className="flex flex-col">
              <button
                onClick={() => { setOtpSent(false); setOtp(""); }}
                className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-700 mb-6 transition-colors w-fit"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(91,200,63,0.12), rgba(66,168,229,0.08))", border: "1px solid rgba(91,200,63,0.15)" }}
                >
                  <Mail size={26} className="text-brand-green" />
                </div>
                <h3 className="font-display text-xl font-bold text-heading mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We sent a verification code to
                </p>
                <p className="text-[14px] font-semibold text-heading mt-1">
                  {email}
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5">
                <div>
                  <p className="text-[12.5px] font-semibold text-gray-500 text-center mb-4 uppercase tracking-wider">
                    Enter verification code
                  </p>
                  <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={loading || otp.replace(/\s/g, "").length !== 6}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Verify & Sign In
                    </>
                  )}
                </Button>

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

          <div className="mt-6 flex items-center justify-center gap-2 bg-brand-green/5 border border-brand-green/10 rounded-xl p-3">
            <Shield size={14} className="text-brand-green" />
            <p className="text-xs text-brand-green">
              SSL secured · RBI compliant platform
            </p>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-brand-green font-semibold hover:underline"
            >
              Apply Now — Free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 max-w-sm mx-auto">
          By signing in, you agree to our{" "}
          <Link href="/terms-of-service" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
