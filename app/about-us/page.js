"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Arrow, Indicator } from "../components/icons/icons";
import Link from "next/link";
import { ROUTE } from "../../app/constants/constants";

const CARD_GAP = 20;
const SLIDE_DURATION = 5; // 5 seconds per slide as per previous logic

export default function About() {
  const containerRef = useRef(null);
  const hasUserInteracted = useRef(false);
  

  // Ref to track if we've done the initial instant scroll
  const hasInitialized = useRef(false);

  const cards = [
    {
      id: "ourStory",
      title: "Our Story",
      content:
        "Ethereal Design was founded on a simple principle: technology should be powerful, not complicated. We are a collective of designers, strategists, and innovators passionate about creating digital products that feel intuitive and look exceptional.",
      MainContent: [
        {
          subTitle: "Our Story",
          text: "We partner with ambitious founders and enterprises to navigate the entire product lifecycle— from a spark of an idea to a market-ready solution. Our strength lies in aligning business vision with seamless usability, ensuring every pixel serves a purpose.",
        },
      ],
    },
    {
      id: "theDifference",
      title: "The Ethereal Difference",
      content:
        "Why partner with us? It's our unique blend of technology, talent, and technique",
      MainContent: [
        {
          subTitle: "AI-Powered Velocity",
          text: "We leverage AI to amplify our creativity and accelerate our process, delivering high-quality design work at unprecedented speed.",
        },
        {
          subTitle: "A Blend of Minds",
          text: "Our team pairs fresh, innovative minds with seasoned strategists, ensuring your product is both cutting-edge and reliable.",
        },
        {
          subTitle: "Unmatched Value",
          text: "Get the quality of a veteran studio with the speed of a modern tech startup. Great results, delivered efficiently.",
        },
      ],
    },
    {
      id: "meetTeam",
      title: "Meet the Core Team",
      content: "The strategists and visionaries leading our studio.",
      shortContent: "Strategists and visionaries leading the studio.",
      MainContent: [
        {
          name: "Suganth Alagesan",
          role: "UX/UI Product Strategist",
          teamImg: "/images/about-us/UXUI_strategist.svg",
          teamInfo: "Co-Founder",
        },
        {
          name: "Suresh Balaraman",
          role: "Product Delivery Head",
          teamImg: "/images/about-us/product_head.svg",
          teamInfo: "Co-Founder",
        },
        {
          name: "Praveen",
          role: "Technical Lead",
          teamImg: "/images/about-us/technical_lead.svg",
        },
      ],
    },
    {
      id: "buildNext",
      title: "Let's Build What's Next!",
      content:
        "Have a project in mind? We are ready to listen and partner with you to create something amazing.",
      MainContent: [
        {
          subTitle: "Let's Build What's Next!",
          text: "Have a project in mind? We are ready to listen and partner with you to create something amazing.",
          contactus: "Get In Touch",
        },
      ],
    },
  ];

  // Triple the cards for the infinite loop effect
  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);

  // Start at the first card of the middle set
  const [currentIndex, setCurrentIndex] = useState(cards.length);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCardIndex, setPopupCardIndex] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Centering Logic Function
  const getScrollPosition = useCallback((index) => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Calculate card width dynamically (matching CSS: 85vw capped at 350px)
    const computedCardWidth = Math.min(window.innerWidth * 0.75, 350);
    const cardTotalWidth = computedCardWidth + CARD_GAP;

    // Center the card: (Position of card) - (Half of container) + (Half of card)
    return index * cardTotalWidth - containerWidth / 2 + computedCardWidth / 2;
  }, []);

  // Check for infinite loop bounds after scroll animation (approx 500ms)
  const handleInfiniteLoop = useCallback(() => {
     const totalCards = cards.length;
     if (currentIndex >= totalCards * 2) {
       const newIndex = currentIndex - totalCards;
       if (containerRef.current) {
          containerRef.current.scrollTo({
             left: getScrollPosition(newIndex),
             behavior: "auto"
          });
       }
       setCurrentIndex(newIndex);
     } else if (currentIndex < totalCards) {
       const newIndex = currentIndex + totalCards;
        if (containerRef.current) {
          containerRef.current.scrollTo({
             left: getScrollPosition(newIndex),
             behavior: "auto"
          });
       }
       setCurrentIndex(newIndex);
     }
  }, [currentIndex, cards.length, getScrollPosition]);

  // Scroll to active card whenever index changes
  useEffect(() => {
    const container = containerRef.current;
    if (container && !isPopupOpen) {
      if (!hasInitialized.current) {
        // First render: Jump instantly to position
        container.scrollTo({
          left: getScrollPosition(currentIndex),
          behavior: "auto",
        });
        hasInitialized.current = true;
        
        // Show the carousel only after positioning is done
        requestAnimationFrame(() => {
             // Small timeout to ensure paint/layout is 100% stable before revealing
             setTimeout(() => {
                setIsReady(true);
             }, 550);
          });
      } else {
        // Subsequent navigations: Smooth scroll
        container.scrollTo({
          left: getScrollPosition(currentIndex),
          behavior: "smooth",
        });
        
        const timer = setTimeout(() => {
           handleInfiniteLoop();
        }, 700); // Wait for smooth scroll to finish
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, isPopupOpen, getScrollPosition, handleInfiniteLoop]);

  // Handle screen resize to keep card centered
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: getScrollPosition(currentIndex),
          behavior: "auto" // Instant re-center on resize
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, getScrollPosition]);

  const openPopup = (index) => {
    setPopupCardIndex(index % cards.length);
    setIsPopupOpen(true);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe Left -> Next
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Swipe Right -> Prev
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isPopupOpen]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <div className="bg-[#121212] text-white w-full overflow-x-hidden flex flex-col">
      <div className="bg-[#121212] text-white w-full overflow-x-hidden flex flex-col md:justify-between relative">
        {/* Mobile Header */}
        <div className="flex sm:hidden h-[103px] border-b border-[#4F4E4E] flex-col font-antonio">
          <motion.div variants={fadeUp} className="w-full flex flex-1">
            <Link
              href={ROUTE.GET_IN_TOUCH.PATH}
              className="flex-1 w-full flex flex-col justify-center items-center border-r-0 border-b border-[#4F4E4E] py-[13px] hover:bg-[#FF4E21]"
            >
              Get in Touch
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="w-full flex flex-1">
            <Link
              href={ROUTE.WORK.PATH}
              className="flex-1 sm:hidden text-center flex justify-center items-center bg-[#FF4E21] py-3 border-b-2 border-l-1 border-[#4F4E4E]"
            >
              About Us
            </Link>
          </motion.div>
        </div>
        {/* Header Section */}
        <div className="p-4 md:px-8">
          <div className="block sm:flex items-end sm:mb-2 mb-16 md:mb-2">
            <div className="sm:w-[50%] w-[90%]">
              <h3 className="font-antonio text-lg lg:block hidden">About Us</h3>
              <h1 className="font-antonio text-2xl md:text-4xl capitalize mb-1 w-[70%] md:w-[100%]">
                Vision To Reality. Our Human Touch.
              </h1>
            </div>
            <div className="sm:w-[40%] md:mb-2 mb-8 mt-4 md:mt-[0] w-[80%] ml-[auto]">
              <p className="font-antonio text-md">
                We are a digital product studio that transforms complex ideas
                into beautiful, user-friendly experiences that drive results
              </p>
            </div>
          </div>
        </div>
      
      {/* Center-Aligned Infinite Carousel */}
      <div className="sm:hidden mobile-cards-container w-full h-[450px]  overflow-hidden flex flex-col justify-center items-center z-40 mt-auto mb-10">
        <div
          className="flex flex-nowrap overflow-x-hidden scrollbar-hide w-full transition-opacity duration-500"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ 
            visibility: isReady ? "visible" : "hidden",
            opacity: isReady ? 1 : 0 
          }}
        >
          {extendedCards.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              className={`border flex-shrink-0 relative cursor-pointer overflow-hidden transition-all duration-500 ${
                currentIndex === index
                  ? "opacity-100 border-[#4E4E4E]"
                  : "opacity-40 border-[#4E4E4E]"
              }`}
              style={{
                width: "75vw",
                maxWidth: "350px",
                height: 225, // Fixed height for mobile cards
                marginRight: CARD_GAP,
              }}
              onClick={() => {
                if (currentIndex === index) openPopup(index);
                else setCurrentIndex(index);
              }}
            >
              {/* Progress Bar */}
              {currentIndex === index && !isPopupOpen && (
                <motion.div
                  key={`progress-${index}`}
                  className="absolute top-0 left-0 h-[5px] bg-white z-20"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_DURATION, ease: "linear" }}
                  onAnimationComplete={() => {
                    setCurrentIndex((prev) => prev + 1);
                  }}
                />
              )}

              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{
                  backgroundImage: `url('/images/about_us_bg.png')`,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="p-6 text-white text-center">
                  <h2 className="text-xl text-white font-antonio mb-2 uppercase">
                    {card.title}
                  </h2>
                  <p className="text-gray-400 font-antonio text-md">
                    {card.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="lg:hidden absolute bottom-[20px] rotate-270 left-1/2 transform -translate-x-1/2 flex-col flex gap-[30px] z-10">
          {cards.map((_, index) => (
            <Indicator
              key={index}
              className={`cursor-pointer transition-all duration-300 ${
                currentIndex % cards.length === index
                  ? "text-white w-[30px]"
                  : "text-[#4E4E4E] w-[20px]"
              }`}
              onClick={() => setCurrentIndex(cards.length + index)}
            />
          ))}
        </div>

      </div>
    </div>
      {mounted && createPortal(
        <AnimatePresence>
          {isPopupOpen && popupCardIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsPopupOpen(false);
              }}
            >
              <motion.div
                className="relative w-full max-w-[320px] bg-[#181818] rounded-2xl md:rounded-3xl border-2 border-[#4E4E4E] px-4 py-4 sm:p-6 flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 40 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
                  },
                  exit: {
                    opacity: 0,
                    scale: 0.95,
                    y: 40,
                    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* ESC Button */}
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="absolute -top-10 right-0 text-white cursor-pointer font-antonio text-sm tracking-[0.05em] bg-[#181818] border border-[#4E4E4E] px-4 py-1 rounded-lg"
                >
                  ESC
                </button>
                {/* Popup Content */}
                <div className="max-h-[440px] w-full overflow-auto">
                  {cards[popupCardIndex].MainContent?.map((section, idx) => (
                    <div key={idx} className="w-full mb-8 last:mb-0">
                      {section.text && (
                        <div>
                          <h3 className="text-xl text-white font-bold mb-2 font-antonio">
                            {section.subTitle || section.name}
                          </h3>
                          <p className="font-antonio text-sm text-gray-400">
                            {section.text}
                          </p>
                        </div>
                      )}

                      {cards[popupCardIndex].id === "buildNext" &&
                        section.contactus && (
                          <div className="mt-4">
                            <Link
                              href="/get-in-touch"
                              className="w-fit flex items-center gap-2.5 font-antonio text-[14px] bg-[#FF4E21] p-[10px] text-white font-300"
                            >
                              {section.contactus}
                              <Arrow className="w-3 h-3 text-white rotate-320" />
                            </Link>
                          </div>
                        )}

                      {cards[popupCardIndex].id === "meetTeam" &&
                        section.name && (
                          <div className="mt-4 w-full flex justify-center items-center flex-col">
                            <img
                              src={section.teamImg}
                              alt={section.name}
                              height={150}
                              width={150}
                            />
                            <h3 className="font-antonio text-white font-[400] text-[18px] mt-2">
                              {section.name}
                            </h3>
                            {section.teamInfo && (
                              <p className="font-antonio text-[#FF4E21] font-[400] text-[12px] mt-2">
                                {section.teamInfo}
                              </p>
                            )}
                            <h3 className="font-antonio text-white font-[400] text-[14px]">
                              {section.role}
                            </h3>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
