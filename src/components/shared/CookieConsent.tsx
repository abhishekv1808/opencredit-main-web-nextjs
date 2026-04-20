"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-fade-up">
      <div className="bg-white rounded-2xl shadow-card-hover border border-gray-100 p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 bg-brand-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
            <Cookie size={18} className="text-heading" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary mb-1">
              Cookie Preferences
            </p>
            <p className="text-xs text-text-muted leading-relaxed">
              We use cookies to enhance your experience and for analytics. By
              continuing, you agree to our{" "}
              <a href="/privacy-policy" className="text-heading underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decline}
            className="flex-1 text-xs"
          >
            Decline
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={accept}
            className="flex-1 text-xs"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
