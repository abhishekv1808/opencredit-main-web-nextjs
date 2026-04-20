"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: 1,
    badge: "Step 1",
    title: "Create Your Free\nAccount",
    description:
      "Sign up in less than a minute — no credit card required. Just enter your email and you're in.",
    image: "/images/steps/step1-signup.png",
    imageAlt: "OpenCredit signup screen showing welcome form with email and phone fields",
  },
  {
    step: 2,
    badge: "Step 2",
    title: "Fill Your Loan\nApplication",
    description:
      "Complete our smart 5-step form with personal, employment, and loan details. Save progress anytime.",
    image: "/images/steps/step2-application.png",
    imageAlt: "Loan application form with multi-step progress and input fields",
  },
  {
    step: 3,
    badge: "Step 3",
    title: "Track Everything From\nYour Dashboard",
    description:
      "Stay in control with real-time updates on approvals, disbursement status and EMI schedules — all from one place.",
    image: "/images/steps/step3-dashboard.png",
    imageAlt: "OpenCredit dashboard showing loan status, amount, and EMI details",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".step-animate");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#F0FAF0" }}
    >
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(91,200,63,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        {/* ── Header ── */}
        <div className="text-center mb-16 md:mb-24 step-animate">
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] mb-5"
            style={{
              background: "#fff",
              color: "#3DA52A",
              border: "1px solid rgba(91,200,63,0.2)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            How to get started
          </div>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-5 leading-[1.08]"
            style={{ color: "#1A1A1A" }}
          >
            Get Started in Three
            <br />
            <span style={{ color: "#3DA52A" }}>Simple Steps</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#6B7A8D" }}
          >
            No setup headaches. OpenCredit makes it easy to apply, track and
            manage your loan — all online.
          </p>
        </div>

        {/* ── Timeline Steps ── */}
        <div className="relative">
          {/* ── Vertical timeline line (desktop only) ── */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(91,200,63,0.15) 0%, #3DA52A 15%, #3DA52A 85%, rgba(91,200,63,0.15) 100%)",
            }}
          />

          {/* ── Steps ── */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={step.step}
                  className="step-animate relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:min-h-[380px]"
                  style={{
                    /* stagger each step's animation delay */
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* ── Timeline dot (desktop) ── */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                    <div
                      className="w-[18px] h-[18px] rounded-full border-[3px] border-white"
                      style={{
                        background: "#3DA52A",
                        boxShadow:
                          "0 0 0 4px rgba(61,165,42,0.15), 0 2px 8px rgba(61,165,42,0.3)",
                      }}
                    />
                  </div>

                  {/* ── Text Side ── */}
                  <div
                    className={`mb-8 lg:mb-0 ${
                      isEven
                        ? "lg:col-start-2 lg:pl-16"
                        : "lg:col-start-1 lg:pr-16 lg:text-right"
                    }`}
                    style={{ order: isEven ? 2 : 1 }}
                  >
                    {/* Step badge */}
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] mb-4 ${
                        isEven ? "" : "lg:ml-auto"
                      }`}
                      style={{
                        background: "rgba(91,200,63,0.10)",
                        color: "#3DA52A",
                        border: "1px solid rgba(91,200,63,0.18)",
                      }}
                    >
                      <span
                        className="w-[6px] h-[6px] rounded-full mr-2"
                        style={{ background: "#3DA52A" }}
                      />
                      {step.badge}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display text-2xl md:text-[28px] lg:text-[32px] font-extrabold leading-[1.15] mb-3"
                      style={{ color: "#1A1A1A", whiteSpace: "pre-line" }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[15px] md:text-base leading-relaxed max-w-md"
                      style={{
                        color: "#6B7A8D",
                        marginLeft: isEven ? "0" : undefined,
                        marginRight: isEven ? undefined : "0",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* ── Image Side ── */}
                  <div
                    className={`${
                      isEven
                        ? "lg:col-start-1 lg:row-start-1 lg:pr-16"
                        : "lg:col-start-2 lg:pl-16"
                    }`}
                    style={{ order: isEven ? 1 : 2 }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden group"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(91,200,63,0.15)",
                        boxShadow:
                          "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
                      }}
                    >
                      {/* Top accent bar on image card */}
                      <div
                        className="h-[3px] w-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #5BC83F, #42A8E5)",
                        }}
                      />
                      <div className="p-3 md:p-4">
                        <Image
                          src={step.image}
                          alt={step.imageAlt}
                          width={600}
                          height={400}
                          className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-16 md:mt-24 step-animate">
          <Link href="/register">
            <Button
              size="lg"
              className="group text-base font-bold px-8 py-6 rounded-2xl text-white"
              style={{
                background: "linear-gradient(135deg, #5BC83F 0%, #3DA52A 100%)",
                boxShadow: "0 4px 20px rgba(91,200,63,0.30)",
              }}
            >
              Start Your Application — Free
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <p className="text-sm mt-4" style={{ color: "#8B9AAB" }}>
            Free to apply · No hidden fees · Subject to credit approval
          </p>
        </div>
      </div>

      {/* ── Custom CSS for scroll animations ── */}
      <style jsx>{`
        .step-animate {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .step-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile: simplified layout, vertical connector */
        @media (max-width: 1023px) {
          .step-animate > div:first-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
