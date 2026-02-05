"use client";
import { ROUTE } from "../../constants/constants";
import Link from "next/link";
import React from "react";
import UserConfiguration from "../../Config/UserConfiguration";
const SOCIAL_LINKS = UserConfiguration.SOCIAL_LINKS;
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PAGES = [
  {
    id: "1",
    label: ROUTE.HOME.LABEL,
    route: ROUTE.HOME.PATH,
  },
  {
    id: "2",
    label: ROUTE.WORK.LABEL,
    route: ROUTE.WORK.PATH,
  },
  {
    id: "3",
    label: ROUTE.TEAMS_TRUST.LABEL,
    route: ROUTE.TEAMS_TRUST.PATH,
  },
  {
    id: "4",
    label: ROUTE.SERVICES.LABEL,
    route: ROUTE.SERVICES.PATH,
  },
  {
    id: "5",
    label: ROUTE.PRICING.LABEL,
    route: ROUTE.PRICING.PATH,
  },
  {
    id: "6",
    label: ROUTE.ABOUT_US.LABEL,
    route: ROUTE.ABOUT_US.PATH,
  },
  {
    id: "7",
    label: ROUTE.GET_IN_TOUCH.LABEL,
    route: ROUTE.GET_IN_TOUCH.PATH,
  },
];

// Map the label (or route) to the window function name
const MODAL_PAGES = {
  [ROUTE.PRICING.LABEL]: "openPricingModal",
  [ROUTE.ABOUT_US.LABEL]: "openAboutUsModal",
};

function MidSecContent({ onClose }) {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col font-anton text-[40px] w-full h-full"
      initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
      animate={{ opacity: 1, x: 0 }} // Slide into place
      exit={{ opacity: 0, x: -100 }} // Optional: slide out when unmounting
      transition={{ duration: 0.8, ease: "easeOut" }} // mdooth timing
    >
      <div className="flex flex-col font-anton text-[30px] w-full h-full">
        <div className="grid grid-cols-1 h-2/3 sm:h-auto sm:flex-1">
          {PAGES.map((page, index) => {
            const modalFnName = MODAL_PAGES[page.label];
            const baseClass = `relative overflow-hidden flex flex-col justify-center border-black px-[20px] lg:px-[54px] md:first:border-b-0 ${
              index === 0
                ? "border-b border-px md:border-y md:border-[2px]"
                : "border-b border-px md:border-[3px_2px_0_2px]"
            } group`;
            if (modalFnName) {
              // Render a button for modal pages (like Pricing, About Us)
              return (
                <button
                  key={page.id}
                  type="button"
                  className={`${baseClass} cursor-pointer w-full text-left bg-transparent outline-none`}
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.innerWidth >= 768
                    ) {
                      if (onClose) onClose();
                      if (typeof window[modalFnName] === "function") {
                        window[modalFnName]();
                      }
                    } else {
                      router.push(page.route);
                    }
                  }}
                >
                  {/* Hover bg */}
                  <span className="absolute left-0 bottom-0 w-full h-full bg-white translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-0" />
                  {/* Light text */}
                  <p
                    className="uppercase font-light transition-all duration-300 absolute top-1/2 -translate-y-1/2 z-10
          group-hover:-translate-y-full group-hover:opacity-0"
                  >
                    {page.label}
                  </p>
                  {/* Bold text */}
                  <p
                    className="uppercase font-bold text-black transition-all duration-300 absolute top-full z-10
          opacity-0 group-hover:top-1/2 group-hover:-translate-y-1/2 group-hover:opacity-100 group-hover:delay-200"
                  >
                    {page.label}
                  </p>
                </button>
              );
            }
            return (
              <Link
                key={page.id}
                href={page.route}
                className={`relative overflow-hidden flex flex-col justify-center border-black px-[20px] lg:px-[54px] md:first:border-b-0 ${
                  index === 0
                    ? "border-b border-px md:border-y md:border-[2px]"
                    : "border-b border-px md:border-[3px_2px_0_2px]"
                } group`}
              >
                {/* Sliding white bg */}
                <span className="absolute left-0 bottom-0 w-full h-full bg-white translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-0" />
                {/* Light text (initial) */}
                <p
                  className="uppercase font-light transition-all duration-300 absolute top-1/2 -translate-y-1/2 z-10
                    group-hover:-translate-y-full group-hover:opacity-0"
                >
                  {page.label}
                </p>
                {/* Bold text (on hover) */}
                <p
                  className="uppercase  font-bold text-black transition-all duration-300 absolute top-full z-10
                    opacity-0 group-hover:top-1/2 group-hover:-translate-y-1/2 group-hover:opacity-100 group-hover:delay-200"
                >
                  {page.label}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="md:border-b md:border-[3px_2px_0_2px] lg:py-[20px] py-[6px] lg:px-[32px] px-[20px] md:p-none border-black grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:flex md:justify-between">
          {/* <div className="font-antonio  font-[400] text-[16px] flex flex-col gap-2 md:gap-[16px] w-max md:w-full  ">
            <h2 className="uppercase tracking-[5px] ">Sitemap</h2>

            <Link href={ROUTE.HOME.PATH}>Home</Link>
            <Link href={ROUTE.WORK.PATH}>Work</Link>
            <Link href={ROUTE.TEAMS_TRUST.PATH}>Teams Trust</Link>
            <Link href={ROUTE.ABOUT_US.PATH}>About us</Link>
            <Link href={ROUTE.GET_IN_TOUCH.PATH}>Contact</Link>
          </div> */}
          <div className="font-antonio  font-[400] flex flex-col gap-2 md:gap-[16px] text-[16px] w-max md:w-full">
            <h2 className="uppercase tracking-[5px]">Socials</h2>
            <Link href={SOCIAL_LINKS.LINKEDIN.PATH}>Linkedin</Link>
            {/* <Link href={SOCIAL_LINKS.INSTAGRAM.PATH}>instagram</Link>
            <Link href={SOCIAL_LINKS.BEHANCE.PATH}>Behance</Link> */}
          </div>
          <div className="font-antonio  font-[400] flex flex-col gap-2 md:gap-[16px] text-[16px]  w-max md:w-full">
            <h2 className="uppercase tracking-[5px]">contact details</h2>
            <Link href={`tel:${SOCIAL_LINKS.MOBILE.PATH}`}>
              Mobile: {SOCIAL_LINKS.MOBILE.LABEL}
            </Link>
            <Link href={`mailto:${SOCIAL_LINKS.EMAIL.PATH}`}>
              Email: {SOCIAL_LINKS.EMAIL.LABEL}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MidSecContent;
