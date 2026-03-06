"use client";

import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/common/CommonLayout";
import pricingData from "../../data/pricingData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

export default function PriceDetailsPage() {
    const { t } = useLanguage();
    const [data, setData] = useState(null);
    const [categoryKey, setCategoryKey] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const selectedPricingKey = localStorage.getItem("selectedPricingKey");
        const selectedPricingTab = localStorage.getItem("selectedPricingTab");

        if (selectedPricingKey && selectedPricingTab) {
            const currentData = pricingData[selectedPricingTab === "one-time" ? "oneTimeProjects" : "monthlyPods"];
            if (currentData && currentData[selectedPricingKey]) {
                setData(currentData[selectedPricingKey]);
                setCategoryKey(selectedPricingKey);
            } else {
                router.push("/pricing");
            }
        } else {
            router.push("/pricing");
        }
    }, [router]);

    if (!data) return null;

    return (
        <CommonLayout page="Pricing">
            <div className="w-full h-full flex flex-col items-center pt-8 px-4 pb-8">
                <button 
                    onClick={() => router.push('/pricing')}
                    className="self-start mb-6 flex items-center gap-2 text-white hover:text-white transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="relative w-full max-w-[390px] bg-[#121212] rounded-[32px] px-4 pb-8 pt-2 flex flex-col items-center shadow-2xl">
                    {/* Header */}
                    <div className="w-full flex items-start justify-between pb-4 border-[#ffffff1a] mb-6 relative">
                        <div className="flex flex-col">
                            <h2 className="text-white text-[24px] font-bold font-antonio leading-tight mb-1 tracking-wide">
                                {t(`pricing_${categoryKey}_title`, data.title)}
                            </h2>
                            <div className="flex items-baseline gap-1">
                                <span className="text-white/60 text-[13px] font-antonio tracking-wider">
                                    {t("pricing_includes", "Includes :")} {t(`pricing_${categoryKey}_desc`, data.description)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Content (Images/Features) */}
                    <div className="w-full flex flex-col gap-6">
                        {data.tiers ? (
                            data.tiers.map((tier, tIdx) => (
                                <div key={tIdx} className={`relative flex flex-col items-center justify-between w-full bg-[#121212] rounded-[31px] px-6 py-6 border border-[#4F4E4E] ${tier.isPopular ? 'mt-8 border-[#D9FF00]  ' : ''}`}>
                                    {tier.isPopular && (
                                        <div className="absolute -top-[22px] w-[calc(100%+2px)] -right-[1px] h-[50px] bg-[#D9FF00]  rounded-t-[33.5px] flex items-start justify-center pt-4 z-0">
                                            <span className="text-black text-[12px] md:text-xs uppercase font-bold tracking-widest font-antonio">
                                                {t("pricing_popular_choice", "Popular Choice")}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="flex w-full items-start justify-between mb-6 mt-4 z-10">
                                        <div className="flex flex-col">
                                            <h3 className="text-white text-[28px] font-antonio font-bold leading-none ">
                                                {t(`pricing_${categoryKey}_tier_${tIdx}_title`, tier.title)}
                                            </h3>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-white/60 text-[12px] font-antonio font-light">
                                                    {t("pricing_starting_at", "Starting at")}
                                                </span>
                                                <span className="text-[#D9FF00] text-[24px] font-bold font-antonio">
                                                    {tier.price}
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/get-in-touch"
                                            className="bg-[#D9FF00] text-black text-[12px] font-bold px-4 py-2 rounded-lg font-antonio hover:scale-105 transition-transform"
                                        >
                                            {t("pricing_book_call", "Book Call")}
                                        </Link>
                                    </div>
                                    
                                    <div className="w-full  border-t border-[#ffffff1a] mb-2 z-10" />

                                    <ul className="flex flex-col w-full pl-0 m-0 z-10">
                                        {tier.features.map((feature, idx) => {
                                            const translatedFeature = t(`pricing_${categoryKey}_tier_${tIdx}_ft_${idx}`, feature);
                                            return (
                                            <li
                                                key={idx}
                                                className="w-[130%] py-4 -ml-8 border-b border-[#ffffff1a]/50 last:border-b-0 flex items-start group"
                                            >
                                                <span className="font-antonio tracking-widest flex items-baseline">
                                                    {translatedFeature.split(" /").map((part, index) => (
                                                        <span
                                                            key={index}
                                                            className={
                                                                index > 0
                                                                    ? "text-white/40 text-[13px] font-light uppercase ml-1"
                                                                    : "text-white text-[16px] font-bold uppercase"
                                                            }
                                                        >
                                                            {index === 0 ? part.trim() : `/${part.trim()}`}
                                                        </span>
                                                    ))}
                                                </span>
                                            </li>
                                        )})}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <>
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
                                    <ul className="flex flex-col w-full pl-0 m-0">
                                        {data.features.map((feature, idx) => {
                                            const translatedFeature = t(`pricing_${categoryKey}_ft_${idx}`, feature);
                                            return (
                                            <li
                                                key={idx}
                                                className="w-full py-3 border-b border-[#ffffff1a]/50 last:border-b-0 flex items-center group"
                                            >
                                                <span className="font-antonio tracking-widest flex items-baseline">
                                                    {translatedFeature.split(" /").map((part, index) => (
                                                        <span
                                                            key={index}
                                                            className={
                                                                index > 0
                                                                    ? "text-white/40 text-[13px] font-light uppercase"
                                                                    : "text-white text-[14px] font-bold uppercase"
                                                            }
                                                        >
                                                            {index === 0 ? part.trim() : `/${part.trim()}`}
                                                        </span>
                                                    ))}
                                                </span>
                                            </li>
                                        )})}
                                    </ul>
                                ) : (
                                    <div className="text-white/60 text-sm font-antonio italic mb-6">
                                        {t(`pricing_${categoryKey}_desc`, data.description)}
                                    </div>
                                )}
                                <Link
                                    href="/get-in-touch"
                                    className="bg-[#D9FF00] text-black text-[14px] font-bold px-6 py-3 rounded-xl font-antonio hover:scale-105 transition-transform mt-8 w-full text-center"
                                >
                                    {t("pricing_contact_us_now", "Contact Us Now!")}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
