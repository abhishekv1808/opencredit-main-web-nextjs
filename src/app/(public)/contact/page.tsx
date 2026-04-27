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

      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl font-extrabold text-heading mb-8">
                Get in Touch
              </h2>
              <div className="space-y-5 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                        <Icon size={20} className="text-brand-green group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-medium">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-semibold text-heading hover:text-brand-green transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-heading">
                            {item.value}
                          </p>
                        )}
                        <p className="text-gray-400 text-sm">{item.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle size={20} className="text-brand-green" />
                  <p className="font-display font-bold text-gray-800">
                    Chat on WhatsApp
                  </p>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Fastest response — typically within 30 minutes during
                  business hours.
                </p>
                <a
                  href="https://wa.me/919900077949?text=Hi%2C%20I%20need%20help%20with%20a%20personal%20loan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="bg-brand-green hover:bg-emerald-600 text-white"
                    size="sm"
                  >
                    <MessageCircle size={16} />
                    Open WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-modern p-8">
              <h2 className="font-display text-2xl font-bold text-heading mb-6">
                Send a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-brand-green" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-heading mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400 text-sm">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block text-gray-600">Full Name *</Label>
                      <Input
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="rounded-xl border-gray-200 focus-visible:ring-brand-green"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-gray-600">Phone *</Label>
                      <Input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="rounded-xl border-gray-200 focus-visible:ring-brand-green"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-gray-600">Email</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="rounded-xl border-gray-200 focus-visible:ring-brand-green"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-gray-600">Subject</Label>
                    <select
                      className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                    >
                      <option>Personal Loan Inquiry</option>
                      <option>CIBIL Correction</option>
                      <option>Application Status</option>
                      <option>EMI / Repayment Query</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-gray-600">Message *</Label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your query in detail..."
                      className="flex w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green resize-none"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                    />
                  </div>

                  <div className="text-xs text-gray-400">
                    By submitting, you consent to being contacted by OpenCredit
                    team regarding your query. See our{" "}
                    <a
                      href="/privacy-policy"
                      className="text-brand-green underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </div>

                  {formError && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {formError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full group"
                    disabled={submitting}
                  >
                    <Send size={18} />
                    {submitting ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
