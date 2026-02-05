"use client";
import { ROUTE } from "../../constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function EtherealDesign() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <Link
      href={ROUTE.HOME.PATH}
      className={` flex gap-4 justify-center items-center lg:p-0 ${
        isHomePage ? " sm:p-[0px_0px]" : ""
      }`}
    >
      <img
        className="w-[34px] "
        src="/logo.png"
        alt="Ethereal Design Studio Logo"
      />
      {/* <div className="hidden sm:flex flex-col gap-0 text-white">
        <img src="/logo/logo-text.png" className="w-[76px] h-[24px]" />
      </div> */}
    </Link>
  );
}

export default EtherealDesign;
