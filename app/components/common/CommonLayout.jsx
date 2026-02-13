"use client";

import React, { useState, useEffect } from "react";
import EtherealDesign from "./EtherealDesign";
import TopRightSec from "./TopRightSec";
import PricingModal from "../feature/PricingModal";
import { usePathname } from "next/navigation";

export default function CommonLayout({
  midsec,
  children,
  page,
  className = "",
}) {
  const [pricingOpen, setPricingOpen] = useState(false);
  const pathname = usePathname();

  const isTeamsTrustPage =
    pathname === "/teams-trust" || pathname === "/teams-trust/";

  useEffect(() => {
    window.openPricingModal = () => setPricingOpen(true);
    return () => {
      window.openPricingModal = undefined;
    };
  }, []);

  return (
    <div
      className={`bg-[#121212] text-white w-full h-[100dvh] flex flex-col md:flex-row overflow-hidden ${className}`}
    >
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />

      {/* =========================
          DESKTOP / TABLET
      ========================== */}
      <div className="hidden md:flex w-full h-full">
        {/* LEFT SECTION */}
        <div className="flex flex-col w-[40%] h-full border-r border-[#2F2F2F] overflow-hidden">
          {midsec}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* TOP HEADER (NO SCROLL) */}
          <div className="shrink-0">
            <TopRightSec
              activePage={page}
              onPricingClick={() => setPricingOpen(true)}
            />
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>

      {/* =========================
          MOBILE
      ========================== */}
      <div className="flex md:hidden flex-col w-full h-full overflow-hidden">
        {/* TOP HEADER */}
        <div className="shrink-0">
          <TopRightSec
            activePage={page}
            onPricingClick={() => setPricingOpen(true)}
          />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
          <div className="shrink-0">{midsec}</div>
          {children}
        </div>
      </div>
    </div>
  );
}
