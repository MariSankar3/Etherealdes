'use client'

import React, { useState } from 'react';
import CommonLayout from '../components/common/CommonLayout';
import PricingDetailModel from '../components/feature/PricingDetailModel';
import pricingData from '../data/pricingData';
import { motion } from 'framer-motion';
import Link from 'next/link';



const PRICING_KEYS = ['launchpad', 'momentum', 'velocity'];

function PricingCard({ card, isFeatured, onLearnMore, muted, style, className }) {
    return (
        <motion.div
            className={
                (isFeatured
                    ? 'mx-auto relative flex flex-col items-center justify-between w-full max-w-[340px] z-10 bg-gradient-to-b from-[#DBF900] to-transparent px-1 pt-1 rounded-3xl '
                    : 'relative mx-auto flex flex-col items-center justify-between w-full max-w-[340px] bg-[#181818] rounded-3xl px-4 md:px-6 py-6 border border-[#4F4E4E]') +
                (muted ? ' opacity-50' : ' opacity-100') +
                (className || '')
            }
            style={{ ...style }}
            role="article"
            aria-label={`${card.title} pricing plan`}
        >
            {isFeatured && (
                <span
                    className="block w-full text-center text-black text-xs font-antonio font-bold py-1"
                    style={{ letterSpacing: 1 }}
                    aria-label="Popular pricing plan"
                >
                    Popular Choice
                </span>
            )}

            <div
                className={
                    isFeatured
                        ? "flex-1 flex flex-col items-center justify-between w-full px-4 md:px-6 py-4 rounded-3xl bg-[#181818] border border-[#4F4E4E] mt-auto"
                        : "w-full mt-auto"
                }
            >
                <div className="flex flex-col w-full items-center justify-center mb-2 gap-2">
                    <div className="text-center text-white font-antonio">
                        <h3 className="text-xl font-bold">
                            {card.title}
                        </h3>
                        <p className="text-xs font-light">
                            ({card.features[2]})
                        </p>
                    </div>

                    <div className="font-antonio" aria-label={`Price ${card.price} per month`}>
                        <span className="text-[#DBF900] text-2xl font-bold">
                            {card.price}
                        </span>
                        <span className="text-white text-sm font-light ml-1">
                            /mo
                        </span>
                    </div>
                </div>

                <img
                    src={card.image}
                    alt={`${card.title} pricing illustration`}
                    className="w-40 h-40 object-contain mx-auto my-4"
                />

                <div className="flex flex-col items-center justify-center w-full">
                    <div className="w-full border-t border-[#4F4E4E] mb-4" />
                    <span
                        className="text-white text-base font-antonio cursor-pointer"
                        onClick={onLearnMore}
                        role="button"
                        aria-label={`Learn more about ${card.title} plan`}
                    >
                        Learn more
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function PricingPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [activeIdx, setActiveIdx] = useState(1);

    const handleLearnMore = (key) => {
        setSelectedKey(key);
        setModalOpen(true);
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
                pricingKey={selectedKey}
            />

            <div className="w-full h-full flex flex-col items-center">
                <div
                    className="relative w-full flex flex-col items-center mt-12 overflow-hidden"
                    role="region"
                    aria-label="Pricing plans carousel"
                >
                    <div
                        className="flex w-full h-100 items-center relative"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {PRICING_KEYS.map((key, i) => {
                            const card = pricingData[key];
                            const isFeatured = key === 'momentum';
                            if (Math.abs(i - activeIdx) > 1) return null;

                            return (
                                <div
                                    key={key}
                                    className={`absolute left-1/2 bottom-0 w-[230px] max-w-[85vw] transition-all duration-300 ease-in-out ${
                                        i === activeIdx
                                            ? 'z-[2] opacity-100 pointer-events-auto'
                                            : 'z-[1] opacity-40 pointer-events-none'
                                    }`}
                                    style={{
                                        transform: `translateX(-50%)  translateX(${(i - activeIdx) * 108}%)`
                                    }}
                                    aria-current={i === activeIdx}
                                >
                                    <PricingCard
                                        card={card}
                                        isFeatured={isFeatured}
                                        onLearnMore={() => handleLearnMore(key)}
                                        muted={i !== activeIdx}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Indicators (decorative) */}
                    <div
                        className="flex justify-center gap-2 mt-4"
                        aria-hidden="true"
                    >
                        {PRICING_KEYS.map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300 ${
                                    i === activeIdx
                                        ? 'bg-white w-6 h-2'
                                        : 'bg-[#4F4E4E] w-2 h-2'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div
                    className="w-full flex flex-col items-center mt-10 font-antonio"
                    role="contentinfo"
                >
                    <span className="text-white text-[16px] mb-3 tracking-[0.08em]">
                        Need a personalized Pod solution?
                    </span>
                    <Link
                        href="/get-in-touch"
                        className="text-black text-[12px] font-[600] bg-[#DBF900] px-4 py-2 rounded-md cursor-pointer block"
                        aria-label="Contact us for a personalized pricing solution"
                    >
                        Contact Us Now!
                    </Link>
                </div>
            </div>
        </CommonLayout>
    );
}
