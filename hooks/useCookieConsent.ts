import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const cookieConsent = Cookies.get('cookieConsent');
    if (cookieConsent) {
      try {
        const parsedConsent: ConsentState = JSON.parse(cookieConsent);
        setConsent(parsedConsent);
      } catch (error) {
        console.error('Failed to parse cookie consent:', error);
      }
    }
  }, []);

  return consent;
};

export default useCookieConsent;