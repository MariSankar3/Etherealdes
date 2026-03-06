'use client'

import React, { useState } from 'react';
import CommonLayout from '../components/common/CommonLayout';
import PricingDetailModel from '../components/feature/PricingDetailModel';
import pricingData, { oneTimeProjects, monthlyPods } from '../data/pricingData';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

function PricingCard({ card, isFeatured, onLearnMore, muted, style, className, isMonthly, categoryKey }) {
    const { t } = useLanguage();
    return (
        <motion.div
            className={
                (isFeatured
                    ? 'mx-auto relative flex flex-col items-center justify-between w-full max-w-[340px] z-10 transition-all duration-300 rounded-[34px] p-[3px] bg-gradient-to-b from-[#D9FF00] via-[#D9FF00]/10 to-[#121212] mt-8 md:mt-10'
                    : 'relative mx-auto flex flex-col items-center justify-between w-full max-w-[340px] bg-[#121212] rounded-[31px] px-4 md:px-6 py-6 border border-[#4F4E4E]') +
                (muted ? ' opacity-50' : ' opacity-100') +
                (className || '')
            }
            style={{ ...style }}
            role="article"
            aria-label={`${card.title} pricing plan`}
        >
            {isFeatured && (
                <div className="absolute -top-[36px] w-full right-[0px] h-[100px] bg-[#D9FF00] rounded-t-[33.5px] flex items-start justify-center pt-2.5 z-0">
                    <span className="text-black text-[12px] md:text-xs uppercase font-bold tracking-widest font-antonio">
                        {t("pricing_popular_choice", "Popular Choice")}
                    </span>
                </div>
            )}

            <div className={`flex-1 flex flex-col items-center justify-between w-full h-full px-4 md:px-4 py-4 rounded-[31px] bg-[#121212] mt-auto relative z-10]`}>
                <div className="flex flex-col w-full items-center justify-center mb-2">
                    <div className="text-center text-white font-antonio mb-3">
                        <h3 className="text-[24px] leading-tight font-bold mb-1">
                            {t(`pricing_${categoryKey}_title`, card.title)}
                        </h3>
                        <p className="text-[12px] text-white/80 font-light">
                            ({t(`pricing_${categoryKey}_desc`, card.description)})
                        </p>
                    </div>

                    <div className="font-antonio flex items-baseline justify-center" aria-label={`Price ${card.price}`}>
                        {!isMonthly && (
                            <span className="text-white/90 text-[14px] font-light mr-2">
                                {t("pricing_starting_at", "Starting at")}
                            </span>
                        )}
                        <span className="text-[#D9FF00] text-[28px] font-bold">
                            {card.price}
                        </span>
                        {isMonthly && (
                            <span className="text-white text-[12px] font-light opacity-60 ml-1">
                                {t("pricing_per_mo", "/mo")}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-center items-center py-4 h-[180px] w-full">
                    {card.image && (
                        <img
                            src={card.image}
                            alt={`${card.title} pricing illustration`}
                            className="max-h-full max-w-[140px] object-contain mx-auto"
                        />
                    )}
                </div>

                <div className="flex flex-col items-center justify-center w-full mt-auto">
                    <div className="w-full border-t border-[#ffffff1a] mb-4" />
                    <span
                        className="text-white text-base font-antonio cursor-pointer opacity-80"
                        onClick={onLearnMore}
                        role="button"
                        aria-label={`Learn more about ${card.title} plan`}
                    >
                        {t("pricing_learn_more", "Learn more")}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function PricingPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [activeTab, setActiveTab] = useState("one-time"); // 'one-time' or 'monthly'
    const [activeIdx, setActiveIdx] = useState(0);

    const currentData = activeTab === "one-time" ? oneTimeProjects : monthlyPods;
    const PRICING_KEYS = Object.keys(currentData);

    const handleLearnMore = (key) => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setSelectedKey(currentData[key]);
            setModalOpen(true);
        } else {
            if (activeTab === "monthly") {
                setSelectedKey(currentData[key]);
                setModalOpen(true);
            } else {
                localStorage.setItem("selectedPricingKey", key);
                localStorage.setItem("selectedPricingTab", activeTab);
                router.push("/pricing/price-details");
            }
        }
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        setActiveIdx(0); // Reset index
    };

    const goLeft = () => setActiveIdx((idx) => Math.max(0, idx - 1));
    const goRight = () => setActiveIdx((idx) => Math.min(PRICING_KEYS.length - 1, idx + 1));

    let touchStartX = null;
    let touchEndX = null;

    const handleTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX !== null && touchEndX !== null) {
            const diff = touchStartX - touchEndX;
            if (diff > 40) goRight();
            else if (diff < -40) goLeft();
        }
        touchStartX = null;
        touchEndX = null;
    };

    return (
        <CommonLayout page="Pricing">
            {/* SEO: page topic */}
            <h1 className="sr-only">
                Pricing Plans for Product Design, Development, and Digital Services
            </h1>

            <PricingDetailModel
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                itemData={selectedKey}
            />

            <div className="w-full h-full flex flex-col items-center pt-8">
                {/* Toggle Group */}
                <div className="flex bg-[#1A1A1] p-1 rounded-full border border-[#ffffff1a] mb-12">
                    <button
                        onClick={() => handleTabSwitch("one-time")}
                        className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-antonio font-bold transition-all ${activeTab === "one-time" ? "bg-[#D9FF00] text-black shadow-lg shadow-[#D9FF00]/20" : "text-white opacity-40 hover:opacity-100"}`}
                    >
                        {t("pricing_one_time_projects", "ONE-TIME PROJECTS")}
                    </button>
                    <button
                        onClick={() => handleTabSwitch("monthly")}
                        className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-antonio font-bold transition-all ${activeTab === "monthly" ? "bg-[#D9FF00] text-black shadow-lg shadow-[#D9FF00]/20" : "text-white opacity-40 hover:opacity-100"}`}
                    >
                        {t("pricing_monthly_pods", "MONTHLY PODS")}
                    </button>
                </div>

                <div
                    className="relative w-full flex flex-col items-center overflow-hidden min-h-[480px]"
                    role="region"
                    aria-label="Pricing plans carousel"
                >
                    <div
                        className="flex w-full h-[400px] items-center relative"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {PRICING_KEYS.map((key, i) => {
                            const card = currentData[key];
                            const isFeatured = card.isPopular;
                            const diff = i - activeIdx;
                            if (Math.abs(diff) > 1) return null;

                            return (
                                <div
                                    key={key}
                                    className={`absolute left-1/2 top-4 w-[280px] h-[400px] max-w-[85vw] transition-all duration-300 ease-out ${
                                        i === activeIdx
                                            ? 'z-[2] opacity-100 pointer-events-auto'
                                            : 'z-[1] opacity-40 pointer-events-none'
                                    }`}
                                    style={{
                                        transform: `translateX(calc(-50% + ${diff * 110}%)) scale(${i === activeIdx ? 1 : 0.95})`
                                    }}
                                    aria-current={i === activeIdx}
                                >
                                    <PricingCard
                                        card={card}
                                        categoryKey={key}
                                        isFeatured={isFeatured}
                                        onLearnMore={() => handleLearnMore(key)}
                                        muted={i !== activeIdx}
                                        isMonthly={activeTab === 'monthly'}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Indicators (decorative) */}
                    <div
                        className="flex justify-center gap-2 mt-18"
                        aria-hidden="true"
                    >
                        {PRICING_KEYS.map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300 ${
                                    i === activeIdx
                                        ? 'bg-white w-8 h-2'
                                        : 'bg-[#4F4E4E] w-2 h-2 opacity-50'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div
                    className="w-full flex flex-col items-center mt-9 font-antonio"
                    role="contentinfo"
                >
                    <span className="text-[white]/90 text-[18px] mb-4 tracking-[0.05em] font-light">
                        {t("pricing_need_personalized", "Need a personalized Pod solution?")}
                    </span>
                    <Link
                        href="/get-in-touch"
                        className="bg-[#D9FF00] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                        aria-label="Contact us for a personalized pricing solution"
                    >
                        {t("pricing_contact_us_now", "Contact Us Now!")}
                    </Link>
                </div>
            </div>
        </CommonLayout>
    );
}
