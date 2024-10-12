import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";
import Script from "next/script";

export const Head = () => {
  return (
    <NextHead>
      <title>{siteConfig.name}</title>
      <meta key="title" content={siteConfig.name} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
      {/* <Script id="amap-security-config" strategy="beforeInteractive">
        {`
          window._AMapSecurityConfig = {
            securityJsCode: "8f0ca4a0c31f3a2af375d2100b2a2974",
          };
        `}
      </Script>
      <Script
        src="https://webapi.amap.com/maps?v=1.4.15&key=da30dbf024771192f7bc6f022fc6791a"
        strategy="beforeInteractive"
      /> */}
    </NextHead>
  );
};
