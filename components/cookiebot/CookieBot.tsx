"use client";

import ReactCookieBot from "react-cookiebot";

const CookieBot = () => {
  return <ReactCookieBot domainGroupId={process.env.COOKIEBOT_CBID} />;
};

export default CookieBot;
