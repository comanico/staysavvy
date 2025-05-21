"use client";

import React from "react";
import Cookies from "js-cookie";

const ManageCookies: React.FC = () => {
  const resetConsent = () => {
    Cookies.remove("cookieConsent");
    window.location.reload(); // Reopen banner
  };

  return (
    <button
      onClick={resetConsent}
      className="text-primary/90 underline hover:text-blue-800"
    >
      Manage Cookies
    </button>
  );
};

export default ManageCookies;
