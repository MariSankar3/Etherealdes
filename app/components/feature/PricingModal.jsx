'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '../icons/icons';
import Button from '../common/Button';
import PricingDetailModel from './PricingDetailModel';
import pricingData from '../../data/pricingData';
import Link from 'next/link';

const PRICING_KEYS = ['launchpad', 'momentum', 'velocity'];

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    exit: { opacity: 0, scale: 0.95, y: 40, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.76, 0, 0.24, 1] } }),
    exit: { opacity: 0, y: 40, transition: { duration: 0.2 } },
};

const PricingCard = ({ card }) => {
    return (
        <>
            <div className="flex w-full items-center justify-between mb-2">
                <div className="text-left text-white font-antonio space-y-1">
                    <h3 className=" text-xl font-bold ">{card.title}</h3>
                    <p className="text-xs font-light">({card.description})</p>
                </div>
                <div className="text-right font-antonio">
                    <span className="text-[#DBF900] text-2xl font-bold">{card.price}</span>
                    <span className="text-white text-sm font-light ml-1">/mo</span>
                </div>
            </div>
            <img src={card.image} alt={card.title} className="w-42 h-42 object-contain mx-auto my-4" />
            <div className="flex flex-col items-center justify-center w-full">
                <div className="w-full border-t border-[#4F4E4E] my-4" />
                <span className="text-white text-base font-antonio cursor-pointer">Learn more</span>
            </div>
        </>
    )
}

export default function PricingModal({ open, onClose }) {
    const backdropRef = useRef(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [cardRects, setCardRects] = useState([null, null, null]);
    const cardRefs = [useRef(null), useRef(null), useRef(null)];

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (open || detailOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open, detailOpen]);

    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') {
                if (detailOpen) setDetailOpen(false);
                else onClose();
            }
        }
        if (open || detailOpen) {
            document.addEventListener('keydown', handleKey);
        } else {
            document.removeEventListener('keydown', handleKey);
        }
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, detailOpen, onClose]);

    function handleBackdrop(e) {
        if (e.target === backdropRef.current) {
            if (detailOpen) setDetailOpen(false);
            else onClose();
        }
    }

    const handleLearnMore = (key, idx) => {
        setSelectedKey(key);
        setHoveredIndex(idx);
        setDetailOpen(true);
        // Save the bounding rect for the hovered card
        if (cardRefs[idx]?.current) {
            const rect = cardRefs[idx].current.getBoundingClientRect();
            setCardRects(prev => {
                const next = [...prev];
                next[idx] = rect;
                return next;
            });
        }
    };

    return (
        <>
            <PricingDetailModel
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
                pricingKey={selectedKey}
                cardRect={hoveredIndex !== null ? cardRects[hoveredIndex] : null}
                cardIndex={hoveredIndex}
            />
            <script type="application/ld+json">
            {JSON.stringify({
             "@context": "https://schema.org",
             "@type": "FAQPage",
             "mainEntity": [
              { "@type": "Question", "name": "Do you offer custom pricing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, contact us for a custom quote." } }
                 ]
                })}
            </script>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={backdropRef}
                        className="min-h-[80vh] fixed inset-0 z-[999] flex items-end justify-center sm:items-end sm:justify-center"
                        style={{
                            background: 'linear-gradient(120deg, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.4) 100%)',
                            backdropFilter: 'blur(2px)',
                        }}
                        initial={{ y: 100, opacity: 0 }}
                        itemScope
                        itemType="https://schema.org/Offer"
                         itemProp="itemListElement"
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
                        exit={{ y: 100, opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
                        onMouseDown={handleBackdrop}
                    >
                        <motion.div
                            className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-t-2xl bg-[#121212] p-0 sm:p-5 flex flex-col items-center border-t border-[#4F4E4E]"
                            variants={modalVariants}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
                            exit={{ y: 100, opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
                        >
                            {/* Header */}
                            <div className="w-full flex items-center justify-between px-4 pt-2 pb-2 sm:px-8">
                                <h2 className="text-white text-2xl sm:text-3xl font-antonio font-bold">Pricing Details</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-[#DBF900] transition-colors cursor-pointer">
                                    <Close className="w-8 h-8" />
                                </button>
                            </div>
                            {/* Cards */}
                            <div itemScope
                                 itemType="https://schema.org/ItemList"
                                 itemProp="offers"
                                className="flex flex-col md:flex-row gap-4 md:gap-10 items-end w-full px-2 md:px-8 py-8 justify-center">
                                {PRICING_KEYS.map((key, i) => {
                                    const card = pricingData[key];
                                    const isFeatured = key === 'momentum';
                                    if (isFeatured) {
                                        return (
                                            <motion.div
                                                key={card.title}
                                                ref={cardRefs[i]}
                                                className="relative flex flex-col items-center justify-between w-full max-w-[340px] z-10 bg-gradient-to-b from-[#DBF900] to-transparent px-1 pt-1 rounded-3xl"
                                                custom={i}
                                                variants={cardVariants}
                                                initial="hidden"
                                                animate="visible"
                                                itemScope
                                                itemType="https://schema.org/Offer"
                                                itemProp="itemListElement"
                                                exit="exit"
                                                onMouseEnter={() => handleLearnMore(key, i)}
                                            >
                                                <div className="relative flex flex-col items-center w-full h-full p-0" style={{ zIndex: 1 }}>
                                                    <span className="block w-full text-center text-black text-sm font-antonio font-bold py-2.5" style={{ letterSpacing: 1 }}>Popular Choice</span>
                                                    {/* Pricing Card */}
                                                    <div className="relative flex flex-col items-center justify-between w-full h-fit max-w-[340px] bg-[#181818] rounded-3xl px-4 md:px-6 py-6 border border-[#4F4E4E]" style={{ minHeight: '340px' }}>
                                                        <PricingCard card={card} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    }
                                    return (
                                        <motion.div
                                            key={card.title}
                                            ref={cardRefs[i]}
                                            className="relative flex flex-col items-center justify-between w-full h-fit max-w-[340px] bg-[#181818] rounded-3xl px-4 md:px-6 py-6 border border-[#4F4E4E]"
                                            custom={i}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            style={{ minHeight: '340px' }}
                                            onMouseEnter={() => handleLearnMore(key, i)}
                                             role="dialog"
                                            aria-modal="true"
                                            aria-labelledby="pricing-heading"
                                        >
                                            {/* Pricing Card */}
                                            <PricingCard card={card} />
                                        </motion.div>
                                    );
                                })}
                            </div>
                            {/* Contact Section */}
                            <div className="w-full flex flex-col items-center py-6 font-antonio">
                                <span className="text-white text-xl md:text-2xl font-[400] mb-3 tracking-[0.08em]">Need a personalized Pod solution?</span>
                                    <Link href="/get-in-touch" className="text-black text-sm md:text-lg font-[600] bg-[#DBF900] px-4 py-2 rounded-lg cursor-pointer block" onClick={() => { onClose(); setDetailOpen && setDetailOpen(false); }}>
                                        Contact Us Now!
                                    </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 