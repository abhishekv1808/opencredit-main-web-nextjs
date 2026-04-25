"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ArrowRight, CheckCircle2, Zap, Shield, Clock } from "lucide-react";

const DISMISS_KEY = "oc_exit_dismissed";
const DISMISS_TTL = 48 * 60 * 60 * 1000; // 48 hours

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const ts = localStorage.getItem(DISMISS_KEY);
      if (ts && Date.now() - Number(ts) < DISMISS_TTL) return;
    } catch { /* ignore */ }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
    };

    /* Desktop: mouse exits toward the top of viewport (browser chrome / tab bar) */
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 8) show();
    };

    /* Mobile: trigger after 25 s of inactivity */
    const mobileTimer = setTimeout(show, 25000);

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* ignore */ }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, source: "exit_intent" }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setTimeout(dismiss, 3500);
    } catch {
      setError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  }, [phone, dismiss]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes oc-popup-in {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        @keyframes oc-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100]"
        style={{
          background: "rgba(10,26,10,0.6)",
          backdropFilter: "blur(6px)",
          animation: "oc-backdrop-in 0.25s ease forwards",
        }}
        onClick={dismiss}
      />

      {/* Modal */}
      <div
        className="fixed z-[101] left-1/2 w-full max-w-md px-4"
        style={{
          top: "50%",
          animation: "oc-popup-in 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        <div
          className="relative bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.3)" }}
        >
          {/* Green accent stripe */}
          <div
            className="h-1.5"
            style={{ background: "linear-gradient(90deg, #15803d 0%, #22c55e 50%, #15803d 100%)" }}
          />

          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "#f3f4f6", color: "#6b7280" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#e5e7eb"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#f3f4f6"}
            aria-label="Close"
          >
            <X size={15} />
          </button>

          <div className="px-7 pt-6 pb-7">
            {!submitted ? (
              <>
                {/* Urgency badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                  style={{ background: "#fef9c3", color: "#854d0e", border: "1px solid #fde047" }}
                >
                  <span>⚡</span>
                  Wait — your personalised rate is ready!
                </div>

                {/* Headline */}
                <h2
                  className="text-2xl font-extrabold leading-tight mb-2"
                  style={{ color: "#0f1a0f" }}
                >
                  Get your loan offer
                  <br />
                  <span style={{ color: "#16a34a" }}>before you go</span>
                </h2>
                <p className="text-sm mb-5" style={{ color: "#6b7280" }}>
                  Leave your number — an advisor calls within 15 minutes with your
                  best rate from 60+ lenders. Free, no obligation, zero credit impact.
                </p>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { icon: Zap,    text: "From 10.25% p.a." },
                    { icon: Shield, text: "No credit impact" },
                    { icon: Clock,  text: "15-min callback" },
                  ].map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: "#f0fdf4",
                        color: "#15803d",
                        border: "1px solid rgba(22,163,74,0.2)",
                      }}
                    >
                      <Icon size={11} />
                      {text}
                    </span>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="tel"
                    required
                    autoFocus
                    placeholder="Your mobile number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-4 rounded-2xl text-sm outline-none"
                    style={{
                      border: "1.5px solid #e5e7eb",
                      color: "#1a1a1a",
                      background: "#f9fafb",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#16a34a")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />

                  {error && (
                    <p className="text-xs" style={{ color: "#dc2626" }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white transition-all"
                    style={{
                      background: submitting ? "#15803d" : "#16a34a",
                      boxShadow: submitting ? "none" : "0 8px 24px rgba(22,163,74,0.38)",
                    }}
                  >
                    {submitting ? "Connecting you…" : (
                      <>Show Me My Rate <ArrowRight size={15} /></>
                    )}
                  </button>
                </form>

                {/* Soft dismiss */}
                <button
                  onClick={dismiss}
                  className="w-full text-center text-xs mt-3 transition-colors block"
                  style={{ color: "#9ca3af" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#374151"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#9ca3af"}
                >
                  No thanks, I&apos;ll figure it out myself
                </button>
              </>
            ) : (
              /* Success */
              <div className="text-center py-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#f0fdf4" }}
                >
                  <CheckCircle2 size={32} style={{ color: "#16a34a" }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#0f1a0f" }}>
                  You&apos;re all set!
                </h3>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  An advisor will call within 15 minutes.
                  <br />
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>Mon–Sat · 9 AM – 6 PM</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
