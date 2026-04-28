"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 99000 77949",
    sub: "Mon–Sat, 9 AM – 6 PM",
    href: "tel:+919900077949",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@opencredit.money",
    sub: "Reply within 24 hours",
    href: "mailto:contact@opencredit.money",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Metro Pillar 471, Narasappa Road",
    sub: "T. Dasarahalli, Bengaluru — 560057",
    href: "https://maps.google.com/maps?q=Metro+Pillar+471+Narasappa+Road+T+Dasarahalli+Bengaluru+560057",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat",
    sub: "9:00 AM – 6:00 PM IST",
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Personal Loan Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          source: `contact_form — ${form.subject}`,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please call us directly at +91 99000 77949.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden" style={{ background: "#FAFCF8" }}>

        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.38 }} />
          <div style={{ position: "absolute", width: 560, height: 560, top: -160, right: -140, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,200,63,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", width: 420, height: 420, bottom: -120, left: -100, borderRadius: "50%", background: "radial-gradient(circle, rgba(66,168,229,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* ── Left: Text ── */}
            <div>
              {/* Online badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(91,200,63,0.08)", border: "1px solid rgba(91,200,63,0.2)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#5BC83F" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#5BC83F" }} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#3DA52A" }}>We&apos;re Online</span>
              </div>

              <h1 className="font-display font-extrabold text-heading mb-4"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
                Let&apos;s{" "}
                <span className="text-accent-gradient">Talk</span>
              </h1>

              <p className="text-gray-400 text-lg mb-8 max-w-xs">
                We reply within 24 hours — usually much sooner.
              </p>

              {/* Quick-action buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+919900077949"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg,#5BC83F,#3DA52A)", boxShadow: "0 4px 16px rgba(91,200,63,0.3)" }}
                >
                  <Phone size={15} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919900077949?text=Hi%2C%20I%20need%20help%20with%20a%20loan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{ background: "#fff", border: "1.5px solid #e5e7eb", color: "#374151", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                  <MessageCircle size={15} style={{ color: "#25d366" }} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* ── Right: Floating contact cards ── */}
            <div className="relative hidden md:flex items-center justify-center" style={{ height: 360 }}>

              {/* Outer orbit ring */}
              <div className="absolute" style={{
                width: 300, height: 300,
                borderRadius: "50%",
                border: "1.5px dashed rgba(91,200,63,0.18)",
              }} />

              {/* Inner ring */}
              <div className="absolute" style={{
                width: 180, height: 180,
                borderRadius: "50%",
                border: "1px solid rgba(66,168,229,0.15)",
              }} />

              {/* Centre icon */}
              <div className="absolute flex items-center justify-center rounded-full animate-float"
                style={{
                  width: 80, height: 80,
                  background: "linear-gradient(135deg,rgba(91,200,63,0.12),rgba(66,168,229,0.10))",
                  border: "1.5px solid rgba(91,200,63,0.2)",
                  boxShadow: "0 8px 32px rgba(91,200,63,0.12)",
                }}>
                <MessageCircle size={34} style={{ color: "#5BC83F" }} />
              </div>

              {/* Floating card — Phone (top) */}
              <div className="absolute animate-float flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  top: "2%", left: "50%", transform: "translateX(-50%)",
                  animationDuration: "3.6s",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  minWidth: 160,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(91,200,63,0.1)" }}>
                  <Phone size={16} style={{ color: "#5BC83F" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "#1a1a1a" }}>Call Us</p>
                  <p className="text-[11px]" style={{ color: "#9ca3af" }}>+91 99000 77949</p>
                </div>
              </div>

              {/* Floating card — Email (right) */}
              <div className="absolute animate-float flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  top: "50%", right: "0%", transform: "translateY(-50%)",
                  animationDuration: "4.1s", animationDelay: "0.7s",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  minWidth: 160,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(66,168,229,0.1)" }}>
                  <Mail size={16} style={{ color: "#42A8E5" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "#1a1a1a" }}>Email</p>
                  <p className="text-[11px]" style={{ color: "#9ca3af" }}>Reply in 24 hrs</p>
                </div>
              </div>

              {/* Floating card — Location (bottom) */}
              <div className="absolute animate-float flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  bottom: "2%", left: "50%", transform: "translateX(-50%)",
                  animationDuration: "3.9s", animationDelay: "1.4s",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  minWidth: 160,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(234,88,12,0.09)" }}>
                  <MapPin size={16} style={{ color: "#ea580c" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "#1a1a1a" }}>Office</p>
                  <p className="text-[11px]" style={{ color: "#9ca3af" }}>T. Dasarahalli, Bengaluru</p>
                </div>
              </div>

              {/* Floating card — Hours (left) */}
              <div className="absolute animate-float flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  top: "50%", left: "0%", transform: "translateY(-50%)",
                  animationDuration: "4.4s", animationDelay: "2.1s",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  minWidth: 148,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(217,119,6,0.09)" }}>
                  <Clock size={16} style={{ color: "#d97706" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "#1a1a1a" }}>Hours</p>
                  <p className="text-[11px]" style={{ color: "#9ca3af" }}>Mon–Sat, 9–6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#F7F9FC" }}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #d1d5db 0.8px, transparent 0.8px)", backgroundSize: "32px 32px", opacity: 0.2 }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(91,200,63,0.08)", border: "1px solid rgba(91,200,63,0.18)" }}>
              <Mail size={13} style={{ color: "#3DA52A" }} />
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#3DA52A" }}>Get In Touch</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-heading" style={{ letterSpacing: "-0.025em" }}>
              We&apos;d love to{" "}
              <span className="text-accent-gradient">hear from you</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-md mx-auto text-[15px]">
              Whether you need help with a loan or have a question — reach out anytime.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* ── Left Column: Contact Info ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Contact cards */}
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="group relative">
                    {item.href ? (
                      <a href={item.href} target={item.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                          style={{ background: "linear-gradient(135deg, rgba(91,200,63,0.1), rgba(91,200,63,0.05))", border: "1px solid rgba(91,200,63,0.15)" }}>
                          <Icon size={20} style={{ color: "#3DA52A" }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</p>
                          <p className="font-bold text-heading text-[15px] group-hover:text-brand-green transition-colors truncate">{item.value}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, rgba(91,200,63,0.1), rgba(91,200,63,0.05))", border: "1px solid rgba(91,200,63,0.15)" }}>
                          <Icon size={20} style={{ color: "#3DA52A" }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</p>
                          <p className="font-bold text-heading text-[15px]">{item.value}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* WhatsApp CTA */}
              <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0F2347, #162D55)" }}>
                <div className="absolute inset-0 pointer-events-none" aria-hidden>
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(91,200,63,0.15), transparent 70%)" }} />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(66,168,229,0.1), transparent 70%)" }} />
                </div>
                <div className="relative p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.25)" }}>
                      <MessageCircle size={18} style={{ color: "#25d366" }} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-[15px]">Chat on WhatsApp</p>
                      <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>Fastest way to reach us</p>
                    </div>
                  </div>
                  <p className="text-[13px] mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Get a response within <span className="font-semibold text-white">30 minutes</span> during business hours.
                  </p>
                  <a
                    href="https://wa.me/919900077949?text=Hi%2C%20I%20need%20help%20with%20a%20personal%20loan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
                    style={{ background: "#25d366", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}
                  >
                    <MessageCircle size={16} />
                    Open WhatsApp
                  </a>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-3 px-2 pt-2">
                {["SSL Secured", "RBI Compliant", "DPDP Act"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Column: Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
                {/* Form header */}
                <div className="px-8 pt-8 pb-5 border-b border-gray-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #5BC83F, #3DA52A)" }}>
                      <Send size={16} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-heading">Send a Message</h2>
                      <p className="text-xs text-gray-400">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-7">
                  {submitted ? (
                    <div className="text-center py-14">
                      <div className="relative w-20 h-20 mx-auto mb-5">
                        <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(91,200,63,0.1)" }} />
                        <div className="relative w-full h-full rounded-full flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, rgba(91,200,63,0.12), rgba(91,200,63,0.06))", border: "2px solid rgba(91,200,63,0.2)" }}>
                          <Send size={30} style={{ color: "#3DA52A" }} />
                        </div>
                      </div>
                      <h3 className="font-display text-2xl font-extrabold text-heading mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400 text-sm max-w-xs mx-auto">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", subject: "Personal Loan Inquiry", message: "" }); }}
                        className="mt-6 text-sm font-semibold text-brand-green hover:underline"
                      >
                        Send another message →
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></Label>
                          <Input
                            required
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-brand-green focus-visible:bg-white transition-colors text-[14px]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone <span className="text-red-400">*</span></Label>
                          <Input
                            required
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-brand-green focus-visible:bg-white transition-colors text-[14px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</Label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-brand-green focus-visible:bg-white transition-colors text-[14px]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</Label>
                          <select
                            className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-[14px] text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus:bg-white transition-colors cursor-pointer appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          >
                            <option>Personal Loan Inquiry</option>
                            <option>Home Loan Inquiry</option>
                            <option>CIBIL Correction</option>
                            <option>Application Status</option>
                            <option>EMI / Repayment Query</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message <span className="text-red-400">*</span></Label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Describe your query in detail — include any loan amounts, timelines, or specific questions..."
                          className="flex w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-[14px] text-heading placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus:bg-white resize-none transition-colors"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>

                      {/* Consent */}
                      <div className="flex items-start gap-2.5 px-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          By submitting, you consent to being contacted by OpenCredit
                          team regarding your query. See our{" "}
                          <a href="/privacy-policy" className="text-brand-green hover:underline font-medium">
                            Privacy Policy
                          </a>.
                        </p>
                      </div>

                      {formError && (
                        <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                          {formError}
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-13 text-[15px] font-bold rounded-xl group transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                        style={{ background: "linear-gradient(135deg, #5BC83F, #3DA52A)", boxShadow: "0 6px 24px rgba(91,200,63,0.25)" }}
                        disabled={submitting}
                      >
                        <Send size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        {submitting ? "Sending your message…" : "Send Message"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
