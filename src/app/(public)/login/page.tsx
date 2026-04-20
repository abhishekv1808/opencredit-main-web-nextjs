"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight, Shield, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";

  const supabase = createClient();

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
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setOtpSent(true);
      toast({ title: "OTP Sent", description: "Check your email for the login link." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen hero-bg-light flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[15%] w-[300px] h-[300px] rounded-full bg-brand-green/[0.03] blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl leading-none">
                O
              </span>
            </div>
            <div>
              <span className="font-display font-bold text-xl block leading-tight">
                <span className="text-heading">Open</span>
                <span className="text-brand-green">Credit</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                .money
              </span>
            </div>
          </Link>
        </div>

        <div className="card-modern p-8">
          <h1 className="font-display text-3xl font-extrabold text-heading mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            Sign in to track your loan application
          </p>

          {/* Google Login */}
          <Button
            variant="outline"
            size="lg"
            className="w-full mb-6 gap-3 border-2 border-gray-200 hover:border-brand-green"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Chrome size={20} />
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
          {!otpSent ? (
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
                {loading ? "Sending..." : "Send Login Link"}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform ml-auto"
                />
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-brand-green" />
              </div>
              <h3 className="font-display font-bold text-heading mb-2">
                Check your email!
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                We&apos;ve sent a magic link to{" "}
                <strong className="text-gray-700">{email}</strong>
              </p>
              <button
                onClick={() => setOtpSent(false)}
                className="text-brand-green text-sm underline"
              >
                Use a different email
              </button>
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
