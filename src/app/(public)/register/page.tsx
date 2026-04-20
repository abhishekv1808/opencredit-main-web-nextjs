"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Chrome,
  Mail,
  User,
  Phone,
  ArrowRight,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

const benefits = [
  "Apply for loans up to ₹40 Lakh",
  "Track application status in real time",
  "Compare offers from 25+ lenders",
  "100% digital — no branch visits",
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const supabase = createClient();

  const handleGoogleSignup = async () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to Terms and Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        data: { full_name: form.fullName, phone: form.phone },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRegistered(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen hero-bg-light flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-10 left-[10%] w-[500px] h-[500px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.03] blur-[80px] pointer-events-none" />

      <div className="w-full max-w-4xl relative">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Benefits Panel — Dark */}
          <div className="dark-section-bg rounded-3xl p-8 text-white hidden md:flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }} />
            <div className="relative flex-1">
              <Link href="/" className="flex items-center gap-2.5 mb-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-brand-blue font-display font-bold text-xl leading-none">
                    O
                  </span>
                </div>
                <div>
                  <span className="font-display font-bold text-xl block leading-tight">
                    <span className="text-white">Open</span>
                    <span className="text-brand-green"> Credit</span>
                  </span>
                  <span className="text-[10px] text-white/40 font-medium tracking-widest uppercase">
                    .money
                  </span>
                </div>
              </Link>

              <h2 className="font-display text-3xl font-extrabold mb-4">
                Start Your Financial <span className="text-accent-gradient">Journey</span>
              </h2>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                Join 4,200+ Bangaloreans who found their perfect loan through
                OpenCredit&apos;s marketplace.
              </p>

              <ul className="space-y-4 mb-10">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-brand-green flex-shrink-0" />
                    <span className="text-white/70 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rate disclosure */}
            <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
              <p className="text-xs text-white/40 leading-relaxed">
                <strong className="text-white/60">Rate disclosure:</strong>{" "}
                Interest rates from 10.25% to 36% p.a. Loan amounts ₹50,000
                to ₹40,00,000. Tenure 12–60 months. Subject to credit
                approval by partner lenders.
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="card-modern p-8">
            <h1 className="font-display text-3xl font-extrabold text-heading mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              Free registration · No credit check to sign up
            </p>

            {/* Google Signup */}
            <Button
              variant="outline"
              size="lg"
              className="w-full mb-5 gap-3 border-2 border-gray-200 hover:border-brand-green"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <Chrome size={20} />
              Sign up with Google
            </Button>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">or</span>
              </div>
            </div>

            {!registered ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="mb-1.5 block text-gray-600">
                    <User size={14} className="inline mr-1.5" />
                    Full Name *
                  </Label>
                  <Input
                    required
                    placeholder="As per PAN card"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="rounded-xl border-gray-200 focus-visible:ring-brand-green"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-gray-600">
                    <Mail size={14} className="inline mr-1.5" />
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="rounded-xl border-gray-200 focus-visible:ring-brand-green"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-gray-600">
                    <Phone size={14} className="inline mr-1.5" />
                    Mobile Number *
                  </Label>
                  <Input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="rounded-xl border-gray-200 focus-visible:ring-brand-green"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={form.consent}
                    onChange={(e) =>
                      setForm({ ...form, consent: e.target.checked })
                    }
                    className="mt-0.5 w-4 h-4 text-brand-green rounded accent-brand-blue-accent"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs text-gray-500 leading-relaxed cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms-of-service"
                      className="text-brand-green underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-brand-green underline"
                    >
                      Privacy Policy
                    </Link>
                    . I consent to my data being shared with partner lenders
                    for loan processing purposes.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create My Account"}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-brand-green" />
                </div>
                <h3 className="font-display text-xl font-bold text-heading mb-2">
                  Verify Your Email!
                </h3>
                <p className="text-gray-400 text-sm">
                  We&apos;ve sent a confirmation link to{" "}
                  <strong className="text-gray-700">{form.email}</strong>. Click the link to activate
                  your account.
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 mt-6 p-3 bg-brand-green/5 border border-brand-green/10 rounded-xl">
              <Shield size={14} className="text-brand-green" />
              <p className="text-xs text-brand-green">
                Your data is encrypted and protected per DPDP Act
              </p>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-brand-green font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
