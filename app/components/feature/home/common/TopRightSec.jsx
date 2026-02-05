import { ROUTE } from "../../../../constants/constants";
import Link from "next/link";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { gsap } from "gsap";

/* ===== Animated label (visual only) ===== */
const AnimatedNavLabel = ({ label, isActive }) => {
  const topLabelRefs = useRef([]);
  const bottomLabelRefs = useRef([]);

  React.useEffect(() => {
    topLabelRefs.current = [];
    bottomLabelRefs.current = [];
  }, [label]);

  const handleMouseEnter = () => {
    if (isActive) return;
    const tl = gsap.timeline();
    label.split("").forEach((_, i) => {
      tl.to(topLabelRefs.current[i], { y: -24, opacity: 0, duration: 0.28, ease: "power2.inOut" }, i * 0.035);
      tl.fromTo(
        bottomLabelRefs.current[i],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: "power2.inOut" },
        i * 0.035
      );
    });
  };

  const handleMouseLeave = () => {
    if (isActive) return;
    const tl = gsap.timeline();
    label.split("").forEach((_, i) => {
      tl.to(bottomLabelRefs.current[i], { y: 24, opacity: 0, duration: 0.2, ease: "power2.inOut" }, i * 0.01);
      tl.to(topLabelRefs.current[i], { y: 0, opacity: 1, duration: 0.2, ease: "power2.inOut" }, i * 0.015);
    });
  };

  return (
    <span
      className="relative inline-block h-[24px] overflow-hidden select-none w-full text-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ lineHeight: "24px" }}
      aria-hidden="true"   // 👈 visual only
    >
      <span className="block absolute left-0 w-full" style={{ top: 0 }}>
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

      <span className="block absolute left-0 w-full" style={{ top: 0 }}>
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
    </span>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: -40, scale: 0.98 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7, ease: "easeOut" } },
};

const navItems = [
  { label: ROUTE.WORK.LABEL, path: ROUTE.WORK.PATH, isButton: false },
  { label: ROUTE.TEAMS_TRUST.LABEL, path: ROUTE.TEAMS_TRUST.PATH, isButton: false },
  { label: ROUTE.SERVICES.LABEL, path: ROUTE.SERVICES.PATH, isButton: false },
  { label: ROUTE.PRICING.LABEL, path: ROUTE.PRICING.PATH, isButton: true },
  { label: ROUTE.GET_IN_TOUCH.LABEL, path: ROUTE.GET_IN_TOUCH.PATH, isButton: false },
];

function TopRightSec() {
  const router = useRouter();

  return (
    /* ===== Semantic Navigation ===== */
    <nav
      aria-label="Primary navigation"
      className="w-full"
    >
      <motion.div
        variants={{ hidden: {}, visible: {} }}
        initial="hidden"
        animate="visible"
        className="font-antonio w-full flex-col sm:flex-row flex sm:h-[65px] border-b-0 sm:border-b border-[#4F4E4E]"
      >
        {navItems.map((item, idx) => (
          <React.Fragment key={item.label}>
            <motion.div
              variants={fadeUp}
              className="w-full flex flex-1 items-center justify-center"
            >
              {item.isButton ? (
                <button
                  type="button"
                  aria-label={`Open ${item.label} pricing`}
                  className="flex-1 w-full flex items-center justify-center h-full hover:bg-[#FF4E21] bg-transparent outline-none cursor-pointer"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.innerWidth >= 768) {
                      if (window.openPricingModal) window.openPricingModal();
                    } else {
                      router.push(item.path);
                    }
                  }}
                >
                  {/* Crawlable label */}
                  <span className="sr-only">{item.label}</span>
                  <AnimatedNavLabel label={item.label} isActive={false} />
                </button>
              ) : (
                <Link
                  href={item.path}
                  aria-label={`Navigate to ${item.label}`}
                  className="flex-1 w-full flex items-center justify-center h-full hover:bg-[#FF4E21] bg-transparent outline-none cursor-pointer"
                  style={{ minHeight: 0 }}
                >
                  {/* Crawlable label */}
                  <span className="sr-only">{item.label}</span>
                  <AnimatedNavLabel label={item.label} isActive={false} />
                </Link>
              )}
            </motion.div>

            {idx < navItems.length - 1 && (
              <div className="hidden sm:block h-full w-px bg-[#4F4E4E]"></div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </nav>
  );
}

export default TopRightSec;
