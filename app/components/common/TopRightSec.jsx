'use client'

import { ROUTE } from "../../constants/constants";
import { useRouter } from 'next/navigation';
import React, { useRef } from "react";
import { Arrow } from "../icons/icons";
import { gsap } from "gsap";
import { motion } from 'framer-motion';

// AnimatedNavLabel: On hover, label animates each character crossly (diagonally) with stagger
const AnimatedNavLabel = ({ label, isActive }) => {
  const containerRef = useRef(null);
  const topLabelRefs = useRef([]);
  const bottomLabelRefs = useRef([]);

  // Force re-render after mount to ensure refs are set
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Reset refs on label change using useLayoutEffect for DOM consistency
  React.useLayoutEffect(() => {
    topLabelRefs.current = [];
    bottomLabelRefs.current = [];
  }, [label]);

  // Defensive check: ensure refs are populated before running GSAP
  const areRefsReady = () => {
    const len = label.length;
    return (
      topLabelRefs.current.length === len &&
      bottomLabelRefs.current.length === len &&
      topLabelRefs.current.every(Boolean) &&
      bottomLabelRefs.current.every(Boolean)
    );
  };

  const handleMouseEnter = () => {
    if (isActive) return;
    if (!areRefsReady()) return;
    const tl = gsap.timeline();
    // For each character, animate top char up and out, bottom char up and in, perfectly synchronized
    label.split("").forEach((_, i) => {
      tl.to(
        topLabelRefs.current[i],
        {
          y: -24,
          opacity: 0,
          duration: 0.28,
          ease: "power2.inOut",
        },
        i * 0.035
      );
      tl.fromTo(
        bottomLabelRefs.current[i],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.28,
          ease: "power2.inOut",
        },
        i * 0.035
      );
    });
  };

  const handleMouseLeave = () => {
    if (isActive) return;
    if (!areRefsReady()) return;
    const tl = gsap.timeline();
    // For each character, animate bottom char down and out, top char down and in, perfectly synchronized
    label.split("").forEach((_, i) => {
      tl.to(
        bottomLabelRefs.current[i],
        {
          y: 24,
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        },
        i * 0.01
      );
      tl.to(
        topLabelRefs.current[i],
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        i * 0.015
      );
    });
  };

  return (
    <span
      ref={containerRef}
      className="relative inline-block h-[24px] overflow-hidden select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "100%" }}
    >
      {mounted && (
        <>
          {/* Top label chars */}
          <span className="block absolute left-0 w-full text-inherit transition-none" style={{ top: 0 }}>
            {label.split("").map((char, i) => (
              <span
                key={"top-" + i}
                ref={el => (topLabelRefs.current[i] = el)}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          {/* Bottom label chars */}
          <span className="block absolute left-0 w-full text-inherit transition-none" style={{ top: 0 }}>
            {label.split("").map((char, i) => (
              <span
                key={"bottom-" + i}
                ref={el => (bottomLabelRefs.current[i] = el)}
                style={{ display: "inline-block", opacity: 0 }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </>
      )}
    </span>
  );
};

const PAGES = [
  {
    id: "1",
    label: ROUTE.WORK.LABEL,
    route: ROUTE.WORK.PATH,
  },
  {
    id: "2",
    label: ROUTE.TEAMS_TRUST.LABEL,
    route: ROUTE.TEAMS_TRUST.PATH,
  },
  {
    id: "3",
    label: ROUTE.SERVICES.LABEL,
    route: ROUTE.SERVICES.PATH,
  },
  {
    id: "4",
    label: ROUTE.PRICING.LABEL,
    route: ROUTE.PRICING.PATH,
  },
  {
    id: "5",
    label: ROUTE.GET_IN_TOUCH.LABEL,
    route: ROUTE.GET_IN_TOUCH.PATH,
  },
];

function TopRightSec({ activePage = "Work", className = "", onPricingClick }) {
  const router = useRouter();
  const currentIndex = PAGES.findIndex((page) => page.label === activePage);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : PAGES.length - 1;

  const getInTouchPage = PAGES.find((page) => page.label === ROUTE.GET_IN_TOUCH.LABEL);
  const prevPage = PAGES[prevIndex];
  const activePageObj = PAGES[currentIndex];

  const fadeUp = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className={`font-antonio w-full ${className}`}
    >
      <motion.div
        className={`w-full h-[73px] text-center text-white hidden sm:flex border-[0_1px_1px_1px] border-[#4F4E4E]`}
      >
        {PAGES.map((page, idx) => {
          if (page.label === ROUTE.PRICING.LABEL) {
            return (
              <React.Fragment key={page.id}>
                <motion.button
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  type="button"
                  className={`group cursor-pointer flex-1 flex justify-center items-center px-2 transition-colors duration-300 ${activePage === page.label ? "w-full bg-[#FF4E21]" : "hover:bg-[#ffffff0a]"
                    }`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                      // md and above: open modal
                      onPricingClick && onPricingClick();
                    } else {
                      // mobile: navigate to /pricing
                      router.push('/pricing');
                    }
                  }}
                  style={{ background: activePage === page.label ? "#FF4E21" : undefined }}
                >
                  <div className="flex-1">
                    <AnimatedNavLabel label={page.label} isActive={activePage === page.label} />
                  </div>{" "}
                  {/* {activePage === page.label && (
                    <Arrow className="ml-auto rotate-90 w-6 h-6 p-1" />
                  )} */}
                </motion.button>
                <div className="hidden sm:block h-full w-px bg-[#4F4E4E]"></div>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={page.id}>
              <motion.a
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                href={page.route}
                className={`group flex-1 flex justify-center items-center px-2 transition-colors duration-300 ${activePage === page.label ? "w-full bg-[#FF4E21]" : "hover:bg-[#ffffff0a]"
                  }`}
              >
                <div className="flex-1">
                  <AnimatedNavLabel label={page.label} isActive={activePage === page.label} />
                </div>{" "}
                {/* {activePage === page.label && (
                  <Arrow className="ml-auto rotate-90 w-6 h-6 p-1" />
                )} */}
              </motion.a>
              {idx < PAGES.length - 1 && (
                <div className="hidden sm:block h-full w-px bg-[#4F4E4E]"></div>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
      <div className="h-full flex flex-col">
        {/* {prevPage.label !== activePage && ( */}
        <motion.a
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          href={getInTouchPage.route}
          key={getInTouchPage.id + '-mobile'}
          className={`flex-1 sm:hidden text-center flex justify-center items-center py-3 transition-colors duration-300 hover:bg-[#ffffff0a] border-b-2 border-[#4F4E4E]`}
        >
          <div className="flex-1">
            {activePageObj.label === ROUTE.GET_IN_TOUCH.LABEL ? <AnimatedNavLabel label={ROUTE.HOME.LABEL} isActive={false} /> : <AnimatedNavLabel label={getInTouchPage.label} isActive={false} />}
            {/* <AnimatedNavLabel label={getInTouchPage.label} isActive={false} /> */}
          </div>
        </motion.a>

        <motion.a
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          href={activePageObj.route}
          key={activePageObj.id + '-active'}
          className={`flex-1 sm:hidden text-center flex justify-center items-center bg-[#FF4E21] py-3 border-b-2 border-l-1 border-[#4F4E4E]`}
        >
          <div className="flex-1">{activePageObj.label}</div>
          {/* <Arrow className="ml-auto rotate-90 w-6 h-6 p-1 absolute right-4" /> */}
        </motion.a>
      </div>
    </motion.div>
  );
}

export default TopRightSec;
