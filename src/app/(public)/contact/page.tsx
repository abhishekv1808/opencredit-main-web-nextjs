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
    value: "+91 98765 43210",
    sub: "Mon–Sat, 9 AM – 6 PM",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@opencredit.money",
    sub: "Reply within 24 hours",
    href: "mailto:hello@opencredit.money",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "123, MG Road, Bangalore",
    sub: "Karnataka — 560001",
    href: "https://maps.google.com",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero — Light */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-bg-light overflow-hidden">
        <div className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-full bg-brand-green/[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-wider mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-heading mb-4">
            Contact <span className="text-accent-gradient">Us</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Questions? We&apos;re here to help. Reach out anytime.
          </p>
          <div className="accent-divider mx-auto mt-6" />
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
                  href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20a%20personal%20loan"
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

                  <Button type="submit" variant="accent" size="lg" className="w-full group">
                    <Send size={18} />
                    Send Message
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
