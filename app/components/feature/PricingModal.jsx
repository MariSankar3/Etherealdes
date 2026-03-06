"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "../icons/icons";
import PricingDetailModel from "./PricingDetailModel";
import { oneTimeProjects, monthlyPods } from "../../data/pricingData";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

const modalVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  }),
};

const TierCard = ({ tier, categoryKey, tierIndex }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col w-full h-full relative group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <h3 className="text-white text-2xl font-antonio font-bold leading-tight">
            {t(`pricing_${categoryKey}_tier_${tierIndex}_title`, tier.title)}
          </h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-white/70 text-[13px] font-antonio">
              {t("pricing_starting_at", "Starting at")}
            </span>
            <span className="text-[#D9FF00] text-2xl font-bold font-antonio">
              {tier.price}
            </span>
          </div>
        </div>
        <Link
          href="/get-in-touch"
          className="bg-[#D9FF00] text-black px-4 py-2 rounded-lg text-[14px] font-bold font-antonio hover:scale-105 transition-transform"
        >
          {t("pricing_book_call", "Book Call")}
        </Link>
      </div>

      <div className="w-full border-t border-[#ffffff1a] mb-6" />

      <ul className="flex flex-col gap-4">
        {tier.features.map((feature, idx) => {
          const translatedFeature = t(
            `pricing_${categoryKey}_tier_${tierIndex}_ft_${idx}`,
            feature,
          );
          return (
            <li key={idx} className="flex flex-col ml-[-28px]">
              <div className="flex items-center text-white font-antonio tracking-wider text-sm">
                {translatedFeature.split(" /").map((part, i) => (
                  <span
                    key={i}
                    className={
                      i === 0
                        ? "font-bold text-[16px]"
                        : "text-white/50 text-[14px] font-light ml-2"
                    }
                  >
                    {i === 0 ? part : `/${part}`}
                  </span>
                ))}
              </div>
              {idx < tier.features.length - 1 && (
                <div className="w-full border-b border-[#ffffff1a]/30 mt-4" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const PricingCard = ({ card, onAction, isMonthly, categoryKey }) => {
  const { t } = useLanguage();
  return (
    <div
      className="flex flex-col w-full h-full justify-between items-center relative cursor-pointer group"
      onClick={isMonthly ? undefined : onAction}
      onMouseEnter={isMonthly ? onAction : undefined}
    >
      <div className="w-full">
        <div className="flex w-full items-start justify-between mb-1">
          <h3 className="text-white text-xl md:text-2xl font-antonio font-bold w-2/3 flex-shrink min-w-0 pr-2 leading-tight">
            {t(`pricing_${categoryKey}_title`, card.title)}
          </h3>
          <div className="text-right font-antonio flex flex-col items-end text-[#ffffff] flex-shrink-0">
            <span className="text-white text-[10px] md:text-xs opacity-60">
              {isMonthly ? "" : t("pricing_starting_at", "Starting at")}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-[#D9FF00] text-xl md:text-[28px] font-bold leading-none">
                {card.price}
              </span>
              {isMonthly && (
                <span className="text-white text-[10px] md:text-xs opacity-60">
                  {t("pricing_per_mo", "/mo")}
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-[#ffffff80] text-[10px] md:text-sm font-light font-antonio mb-6 mt-1">
          ({t(`pricing_${categoryKey}_desc`, card.description)})
        </p>

        {card.image && (
          <div className="flex justify-center items-center py-4 h-60">
            <img
              src={card.image}
              alt={card.title}
              className="max-h-full object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center w-full mt-auto">
        <div className="w-full border-t border-[#ffffff1a] mb-4" />
        <button className="text-white text-sm md:text-base font-antonio opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer">
          {t("pricing_learn_more", "Learn more")}
        </button>
      </div>
    </div>
  );
};

export default function PricingModal({ open, onClose }) {
  const { t } = useLanguage();
  const backdropRef = useRef(null);
  const [activeTab, setActiveTab] = useState("one-time"); // 'one-time' or 'monthly'
  const [selectedCategory, setSelectedCategory] = useState(null); // category key if in sub-view
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const cardRefs = useRef([]);

  // Store project category if user clicks a one-time project
  const handleProjectClick = (key) => {
    setSelectedCategory(key);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open || detailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, detailOpen]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        if (detailOpen) setDetailOpen(false);
        else if (selectedCategory) setSelectedCategory(null);
        else onClose();
      }
    }
    if (open || detailOpen) {
      document.addEventListener("keydown", handleKey);
    } else {
      document.removeEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, detailOpen, onClose, selectedCategory]);

  function handleBackdrop(e) {
    if (e.target === backdropRef.current) {
      if (detailOpen) setDetailOpen(false);
      else onClose();
    }
  }

  const handleLearnMore = (item, idx, key) => {
    setSelectedItem({ ...item, categoryKey: key });
    setHoveredIndex(idx);
    if (cardRefs.current[idx]) {
      setCardRect(cardRefs.current[idx].getBoundingClientRect());
    }
    setDetailOpen(true);
  };

  const currentData = activeTab === "one-time" ? oneTimeProjects : monthlyPods;
  const keys = Object.keys(currentData);
  const categoryData = selectedCategory
    ? oneTimeProjects[selectedCategory]
    : null;

  return (
    <>
      {selectedItem && (
        <PricingDetailModel
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          itemData={selectedItem}
          cardRect={cardRect}
          cardIndex={hoveredIndex}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={backdropRef}
            className="fixed inset-0 z-[999] flex items-end justify-center"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={handleBackdrop}
          >
            <motion.div
              className="relative w-full h-[95vh] bg-[#121212] border-t border-[#ffffff1a] overflow-hidden rounded-t-[40px] flex flex-col"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Scrollable Area - Mouse wheel capturing prevents global scroll lock from hijacking. */}
              <div
                className="w-full flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar"
                style={{
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                  scrollbarGutter: "stable",
                }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <div className="w-full min-h-full flex flex-col items-center px-6 md:px-12 pt-6">
                  {selectedCategory ? (
                    /* Tier Sub-View Header */
                    <div className="w-full flex items-center justify-between pt-4 relative mb-12">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={handleBack}
                          className="mt-2 text-white/60 hover:text-white transition-colors"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 12H5" />
                            <path d="m12 19-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="flex flex-col">
                          <h2 className="text-white text-3xl font-antonio font-bold">
                            {t(
                              `pricing_${selectedCategory}_title`,
                              categoryData.title,
                            )}
                          </h2>
                          <p className="text-white/80 text-[12px] font-antonio uppercase tracking-widest mt-1">
                            {t("pricing_includes", "Includes :")}{" "}
                            {t(
                              `pricing_${selectedCategory}_desc`,
                              categoryData.description,
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Close className="w-8 h-8" />
                      </button>
                    </div>
                  ) : (
                    /* Main View Header */
                    <div className="w-full flex items-center justify-between pt-4 relative">
                      <h2 className="text-white text-2xl md:text-3xl font-antonio font-bold">
                        {t("pricing_details", "Pricing Details")}
                      </h2>

                      <div className="absolute left-1/2 -translate-x-1/2 flex bg-[#1A1A1A] p-1 rounded-full border border-[#ffffff1a]">
                        <button
                          onClick={() => setActiveTab("one-time")}
                          className={`px-6 py-2 rounded-full text-[10px] md:text-sm font-antonio font-bold transition-all ${activeTab === "one-time" ? "bg-[#D9FF00] text-black" : "text-white opacity-40 hover:opacity-100"}`}
                        >
                          {t("pricing_one_time_projects", "ONE-TIME PROJECTS")}
                        </button>
                        <button
                          onClick={() => setActiveTab("monthly")}
                          className={`px-6 py-2 rounded-full text-[10px] md:text-sm font-antonio font-bold transition-all ${activeTab === "monthly" ? "bg-[#D9FF00] text-black" : "text-white opacity-40 hover:opacity-100"}`}
                        >
                          {t("pricing_monthly_pods", "MONTHLY PODS")}
                        </button>
                      </div>

                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Close className="w-8 h-8" />
                      </button>
                    </div>
                  )}

                  {/* Grid Layout */}
                  <div className="w-full flex flex-col items-center gap-12 mt-3">
                    {selectedCategory ? (
                      /* Category Tiers View */
                      <div
                        className={`grid grid-cols-1 -mt-13 md:grid-cols-${Math.min(categoryData.tiers.length, 3)} gap-8 w-full ${categoryData.tiers.length === 1 ? "max-w-md" : categoryData.tiers.length === 2 ? "max-w-4xl" : "max-w-7xl"} justify-items-center`}
                      >
                        {categoryData.tiers.map((tier, i) => (
                          <motion.div
                            key={tier.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className={`relative w-full transition-all duration-300 min-h-[500px] flex flex-col mt-12 ${tier.isPopular ? "rounded-[34px] p-[3px] bg-[#D9FF00] bg-gradient-to-b from-[#D9FF00] via-[#D9FF00]/20 to-[#121212]/90" : ""}`}
                          >
                            {tier.isPopular && (
                              <div className="absolute -top-[35px] left-0 right-0 h-[65px] bg-[#D9FF00] rounded-t-[33px] flex items-center justify-center z-0">
                                <span className="text-black text-[12px] md:text-[14px] uppercase font-bold tracking-widest font-antonio mb-5">
                                  {t(
                                    "pricing_popular_choice",
                                    "Popular Choice",
                                  )}
                                </span>
                              </div>
                            )}
                            <div
                              className={`w-full h-full bg-[#121212] rounded-[30px] p-6 md:p-8 flex flex-col relative z-20 ${tier.isPopular ? "hover:shadow-[0_0_25px_rgba(217,255,0,0.15)]" : "border border-[#ffffff1a] hover:border-[#D9FF00]/30"} transition-all duration-300 group`}
                            >
                              <TierCard
                                tier={tier}
                                categoryKey={selectedCategory}
                                tierIndex={i}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : activeTab === "monthly" ? (
                      /* Monthly Pods View */
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center mt-8">
                        {keys.map((key, i) => (
                          <motion.div
                            key={key}
                            ref={(el) => (cardRefs.current[i] = el)}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className={`relative w-full max-w-[320px] transition-all duration-300 min-h-[400px] flex flex-col mt-16 ${currentData[key].isPopular ? "!mt-[60px] rounded-[34px] p-[4px] bg-gradient-to-b from-[#D9FF00] via-[#D9FF00]/20 to-[#121212]/90" : ""}`}
                          >
                            {currentData[key].isPopular && (
                              <div className="absolute w-full -top-[36px] right-[0px] h-[100px] bg-[#D9FF00] rounded-t-[33.5px] flex items-start justify-center pt-2.5 z-0">
                                <span className="text-black text-[12px] md:text-[14px] uppercase font-bold tracking-widest font-antonio">
                                  {t(
                                    "pricing_popular_choice",
                                    "Popular Choice",
                                  )}
                                </span>
                              </div>
                            )}
                            <div
                              className={`w-full h-full bg-[#121212] rounded-[30px] p-5 md:p-6 flex flex-col relative z-20 ${currentData[key].isPopular ? "hover:shadow-[0_0_25px_rgba(217,255,0,0.15)]" : "border border-[#ffffff1a] hover:border-[#D9FF00]/60"} transition-all duration-300 group`}
                            >
                              <PricingCard
                                card={currentData[key]}
                                categoryKey={key}
                                onAction={() =>
                                  handleLearnMore(currentData[key], i, key)
                                }
                                isMonthly={true}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      /* One-time Projects Main View */
                      <div className="flex flex-wrap justify-center gap-8 w-full max-w-[1920px] mx-auto">
                        {keys.map((key, i) => (
                          <motion.div
                            key={key}
                            ref={(el) => (cardRefs.current[i] = el)}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className={`relative w-full max-w-[420px] md:max-w-none md:w-[calc(33.333%-1.34rem)] xl:w-[calc(20%-1.6rem)] transition-all duration-300 flex flex-col min-h-[400px] mt-12 ${currentData[key].isPopular ? "rounded-[34px] p-[3px] bg-[#D9FF00]" : ""}`}
                          >
                            {currentData[key].isPopular && (
                              <div className="absolute -top-[35px] left-0 right-0 h-[40px] bg-[#D9FF00] rounded-t-[33px] flex items-start justify-center pt-2.5 z-0">
                                <span className="text-black text-[12px] md:text-[14px] uppercase font-bold tracking-widest font-antonio">
                                  {t(
                                    "pricing_popular_choice",
                                    "Popular Choice",
                                  )}
                                </span>
                              </div>
                            )}
                            <div
                              className={`w-full h-full bg-[#121212] rounded-[30px] p-6 md:p-8 flex flex-col relative z-20 ${currentData[key].isPopular ? "hover:shadow-[0_0_25px_rgba(217,255,0,0.15)]" : "border border-[#ffffff1a] hover:border-[#D9FF00]/30"} transition-all duration-300 group`}
                            >
                              <PricingCard
                                card={currentData[key]}
                                categoryKey={key}
                                onAction={() => handleProjectClick(key)}
                                isMonthly={false}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {!selectedCategory && (
                      /* Footer Contact Section */
                      <div className="w-full flex flex-col items-center font-antonio">
                        <span className="text-[white] text-lg md:text-xl font-light mb-4 tracking-wider">
                          {t(
                            "pricing_need_personalized",
                            "Need a personalized Pod solution?",
                          )}
                        </span>
                        <Link
                          href="/get-in-touch"
                          className="bg-[#D9FF00] text-black px-8 py-3 rounded-xl font-bold md:mb-8 hover:scale-105 active:scale-95 transition-all"
                          onClick={onClose}
                        >
                          {t("pricing_contact_us_now", "Contact Us Now!")}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
