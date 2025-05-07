"use client";

import useCookieConsent from "@/hooks/useCookieConsent";
import { useEffect } from "react";

const AnalyticsProvider: React.FC = () => {
  const GA_ID = process.env.GA_ID;
  const consent = useCookieConsent();

  useEffect(() => {
    if (consent.analytics) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      script.async = true;
      document.head.appendChild(script);

      const inlineScript = document.createElement("script");
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${GA_ID}, { anonymize_ip: true });
      `;
      document.head.appendChild(inlineScript);
    }
  }, [consent.analytics]);

  return null;
};

export default AnalyticsProvider;
