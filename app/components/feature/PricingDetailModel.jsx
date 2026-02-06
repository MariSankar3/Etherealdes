import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "../icons/icons";
import pricingData from "../../data/pricingData";
import Link from "next/link";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 }, // Slightly slower exit
  },
};

export default function PricingDetailModel({
  open,
  onClose,
  pricingKey,
  cardRect,
  cardIndex,
}) {
  const backdropRef = useRef(null);
  const modalContentRef = useRef(null);
  const data = pricingData[pricingKey];

  // Helper to determine if screen is large
  const [isLg, setIsLg] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsLg(window.innerWidth >= 1024); // Tailwind's lg breakpoint
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open && !isLg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isLg]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
    } else {
      document.removeEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  function handleBackdrop(e) {
    // Only close if click is outside the modal content
    if (e.target === backdropRef.current) onClose();
    // If modalContentRef is set, also check if click is outside modal
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  }

  if (!data) return null;

  // For lg+, center the modal over the card and always show an overlay
  let style = {};
  let modalClass =
    "relative w-full max-w-[320px] bg-[#181818] rounded-2xl md:rounded-3xl border-2 border-[#4F4E4E] px-4 py-4 sm:p-6 flex flex-col items-center";
  const isOverlay = !(isLg && cardRect);
  if (isLg && cardRect) {
    // Responsive width: use maxWidth from modalClass, not hardcoded
    // Clamp left so modal never overflows viewport
    // Responsive width: match card width for seamless hover, or fallback
    const modalWidth = cardRect ? cardRect.width : 340;
    const viewportWidth = window.innerWidth;
    let left = cardRect.left + window.scrollX;
    // Ensure it doesn't go off screen (basic clamping)
    if (left < 16) left = 16;
    if (left + modalWidth > viewportWidth - 16)
      left = viewportWidth - modalWidth - 16;
    style = {
      position: "fixed",
      left,
      zIndex: 1200,
      pointerEvents: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
    modalClass =
      "relative w-full max-w-[350px] bg-[#181818] rounded-3xl border border-[#4F4E4E] px-4 py-4 sm:p-6 flex flex-col items-center shadow-2xl";
  }
  if (isOverlay) {
    // Only add h-full for large screens, not mobile
    if (isLg) {
      modalClass += " h-full flex justify-center items-center";
      style = { ...style, height: "100vh", maxHeight: "100vh" };
    } else {
      // On mobile, do not force h-full, let modal fit content
      modalClass = modalClass
        .replace(" h-full", "")
        .replace("flex justify-center items-center", "");
      style = { ...style, height: "auto", maxHeight: "90vh" };
    }
  }

  // Determine backdrop classes based on mode
  const isDesktopTooltip = isLg && !isOverlay;
  const backdropClass = isDesktopTooltip
    ? "fixed inset-0 z-[1100] flex items-center justify-center px-4 pointer-events-none bg-black/20 backdrop-blur-md"
    : "fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black/40 backdrop-blur-md pointer-events-auto";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={backdropRef}
          className={backdropClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          onMouseDown={handleBackdrop}
        >
          <motion.div
            ref={modalContentRef}
            className={modalClass}
            style={isOverlay ? style : isLg && cardRect ? style : {}}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
            onMouseLeave={() => {
              if (isLg && !isOverlay) {
                onClose();
              }
            }}
          >
            {/* ESC Button - positioned outside the card on the right */}
            <button
              onClick={onClose}
              className="absolute sm:hidden -top-10 right-0 text-white cursor-pointer font-antonio text-sm tracking-[0.05em] bg-[#181818] border border-[#4F4E4E] px-4 py-1 rounded-lg"
            >
              ESC
            </button>

            {/* Header */}
            <div className="w-full flex items-center justify-between pb-2 border-b border-[#4F4E4E]">
              <div className="flex flex-col items-start font-antonio">
                <h2 className="text-white text-2xl font-bold leading-tight mb-1">
                  {data.title}
                </h2>
                <span className="text-[#DBF900] text-xl font-bold">
                  {data.price}
                  <span className="text-white text-sm font-light ml-1">
                    /month
                  </span>{" "}
                </span>
              </div>
              <Link
                href="/get-in-touch"
                className="text-black text-xs md:text-sm font-light bg-[#DBF900] px-2 md:px-4 py-2 rounded-md font-antonio tracking-[0.02em]"
                onClick={onClose}
              >
                Contact Us Now!
              </Link>
            </div>
            {/* Image */}
            <div className="flex justify-center items-center py-2">
              <img
                src={data.featureImage}
                alt={data.title}
                className="w-48 object-contain"
              />
            </div>
            {/* Features */}
            <section className="w-full">
              <ul className="flex flex-col" style={{ paddingLeft: "0px" }}>
                {data.features.map((feature, idx) => (
                  <div key={idx}>
                    <li className="text-white text-base font-antonio flex items-center tracking-[0.08em]">
                      {feature.split("/").map((word, index) => (
                        <span
                          key={index}
                          className={`${index > 0 ? "text-[#ffffff7a] text-xs font-light ml-2" : "font-[600]"}`}
                        >
                          {index === 0 ? word : `/${word}`}
                        </span>
                      ))}
                    </li>
                    <div
                      className={`border-b border-[#4F4E4E5a] my-1 w-full ${idx === data.features.length - 1 ? "hidden" : ""}`}
                    ></div>
                  </div>
                ))}
              </ul>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
