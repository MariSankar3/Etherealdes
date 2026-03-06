import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "../icons/icons";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

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
    transition: { duration: 0.2 },
  },
};

export default function PricingDetailModel({
  open,
  onClose,
  itemData,
  cardRect,
  cardIndex,
}) {
  const { t } = useLanguage();
  const backdropRef = useRef(null);
  const modalContentRef = useRef(null);
  const data = itemData;

  const [isLg, setIsLg] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsLg(window.innerWidth >= 1024);
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
    if (e.target === backdropRef.current) onClose();
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  }

  if (!data) return null;

  let style = {};
  let modalClass =
    "relative w-full max-w-[390px] bg-[#121212] rounded-[32px] border border-[white]/30 px-6 py-8 flex flex-col items-center shadow-2xl overflow-hidden";
  const isOverlay = !(isLg && cardRect);

  if (isLg && cardRect) {
    const modalWidth = 350;
    const viewportWidth = window.innerWidth;
    let left = cardRect.left + cardRect.width / 2 - modalWidth / 2;

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
  }

  if (isOverlay) {
    if (isLg) {
      modalClass += " h-full flex justify-center items-center";
      style = { ...style, height: "100vh", maxHeight: "100vh" };
    } else {
      style = { ...style, height: "auto", maxHeight: "90vh" };
    }
  }

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
            {/* Header */}
            <div className="w-full flex items-start justify-between pb-4 border-b border-[#ffffff1a] mb-6 relative">
              <div className="flex flex-col">
                <h2 className="text-white text-[24px] font-bold font-antonio leading-tight tracking-wide">
                  {t(`pricing_${data.categoryKey}_title`, data.title)}
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#D9FF00] text-xl font-bold font-antonio tracking-wide">
                    {data.price}
                  </span>
                  <span className="text-white/60 text-[13px] font-antonio tracking-wider uppercase">
                    {data.features
                      ? t("pricing_per_month", "/month")
                      : t("pricing_one_time", "one-time")}
                  </span>
                </div>
              </div>
              <Link
                href="/get-in-touch"
                className="bg-[#D9FF00] text-black text-[11px] font-bold px-3 py-2 rounded-md font-antonio hover:scale-105 transition-transform mt-1"
                onClick={onClose}
              >
                {t("pricing_contact_us_now", "Contact Us Now!")}
              </Link>
            </div>

            {/* Content Content (Images/Features) */}
            <div className="w-full h-full overflow-y-auto custom-scrollbar pr-1 -mr-1">
              {(data.featureImage || data.image) && (
                <div className="w-full flex justify-center mb-6">
                  <img
                    src={data.featureImage || data.image}
                    alt={data.title}
                    className={
                      data.featureImage
                        ? "w-64 object-contain"
                        : "w-40 object-contain"
                    }
                  />
                </div>
              )}

              {data.features ? (
                <ul className="flex flex-col w-full">
                  {data.features.map((feature, idx) => {
                    const translatedFeature = t(
                      `pricing_${data.categoryKey}_ft_${idx}`,
                      feature,
                    );
                    return (
                      <li
                        key={idx}
                        className="w-[110%] py-2 ml-[-28px] border-b border-[#ffffff1a]/50 last:border-b-0 flex items-center group"
                      >
                        <span className="font-antonio tracking-widest flex items-baseline">
                          {translatedFeature.split(" /").map((part, index) => (
                            <span
                              key={index}
                              className={
                                index > 0
                                  ? "text-white/40 text-[14px] font-light uppercase"
                                  : "text-white text-[16px] font-bold uppercase"
                              }
                            >
                              {index === 0 ? part.trim() : `/${part.trim()}`}
                            </span>
                          ))}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-white/60 text-sm font-antonio italic mb-6">
                  {t(`pricing_${data.categoryKey}_desc`, data.description)}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
