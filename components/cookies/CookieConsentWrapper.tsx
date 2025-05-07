"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsentWrapper: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true, // Always enabled
    analytics: false,
    marketing: false,
  });

  // Check existing consent on mount
  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (cookieConsent) {
      try {
        const parsedConsent: ConsentState = JSON.parse(cookieConsent);
        setConsent(parsedConsent);
        setIsVisible(false); // Hide banner if consent exists
      } catch (error) {
        console.error("Failed to parse cookie consent:", error);
      }
    } else {
      setIsVisible(true); // Show banner if no consent
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(newConsent);
    Cookies.set("cookieConsent", JSON.stringify(newConsent), {
      expires: 365,
      secure: true,
    });
    logConsent(newConsent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleDeclineNonEssential = () => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsent(newConsent);
    Cookies.set("cookieConsent", JSON.stringify(newConsent), {
      expires: 365,
      secure: true,
    });
    logConsent(newConsent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    Cookies.set("cookieConsent", JSON.stringify(consent), {
      expires: 365,
      secure: true,
    });
    logConsent(consent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const logConsent = async (consent: ConsentState) => {
    try {
      await fetch("/api/log-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consent,
          timestamp: new Date().toISOString(),
          ip: "anonymized", // Optionally capture IP (anonymize for GDPR)
        }),
      });
    } catch (error) {
      console.error("Failed to log consent:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 bg-gray-800 text-white shadow-lg rounded-lg p-6 max-w-lg mx-auto z-50">
        <h2 className="text-lg font-semibold mb-2">We value your privacy</h2>
        <p className="text-sm mb-4">
          We use cookies to enhance your experience. Some are essential for site
          functionality, while others help us analyze traffic or serve
          personalized ads.{" "}
          <a href="/privacy-policy" className="text-blue-400 underline">
            Learn more
          </a>
          .
        </p>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleAcceptAll}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Accept All
          </button>
          <button
            onClick={handleDeclineNonEssential}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Decline Non-Essential
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="text-blue-400 underline"
          >
            Customize
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Cookie Settings</h2>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={consent.necessary}
                  disabled
                  className="mr-2"
                />
                <span>Necessary (Required for site functionality)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={() =>
                    setConsent((prev) => ({
                      ...prev,
                      analytics: !prev.analytics,
                    }))
                  }
                  className="mr-2"
                />
                <span>Analytics (e.g., Google Analytics for site usage)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={() =>
                    setConsent((prev) => ({
                      ...prev,
                      marketing: !prev.marketing,
                    }))
                  }
                  className="mr-2"
                />
                <span>Marketing (e.g., personalized ads)</span>
              </label>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSaveSettings}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Settings
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-600 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentWrapper;
