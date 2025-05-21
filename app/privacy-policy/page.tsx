import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p>
          We use cookies to enhance your experience on our hotel booking
          platform:
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Necessary</strong>: Session cookies (e.g., `sessionId`,
            expires on session end) for bookings and site functionality.
          </li>
          <li>
            <strong>Analytics</strong>: Google Analytics (e.g., `_ga`, 2 years)
            to track site usage and improve our services.
          </li>
          <li>
            <strong>Marketing</strong>: None currently (add if you use marketing
            cookies).
          </li>
        </ul>
        <p>
          You can manage your cookie preferences via our cookie banner. For more
          details or to exercise your GDPR rights, contact{" "}
          <a
            href="mailto:gdpr@neva-apartments.org"
            className="text-blue-600 underline"
          >
            gdpr@neva-apartments.org
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
