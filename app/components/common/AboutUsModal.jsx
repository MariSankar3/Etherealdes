"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { Close } from "../icons/icons";

const modalVariants = {
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
};

export default function Home({ open, onClose }) {
  const [selectedCard, setSelectedCard] = useState("ourStory");
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCardIndex, setPopupCardIndex] = useState(null);
  const cardRefs = useRef([]);
  const autoScrollRef = useRef(null);
  const swipeCooldownRef = useRef(false);
  const backdropRef = useRef(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const autoCycleRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

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

  // Sync selectedCard with activeDesktopIndex on desktop
  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCard(cards[activeDesktopIndex].id);
    }
  }, [activeDesktopIndex, cards]);

  // Desktop auto-cycle is now driven by the progress bar's onAnimationComplete
  // to ensure perfect synchronization between the visual loader and the slide change.
  useEffect(() => {
    // Just reset to 0 on open
    if (open) {
      if (typeof window !== "undefined" && window.innerWidth >= 640) {
        setActiveDesktopIndex(0);
      }
    }
  }, [open]);

  // Handle manual activate
  const handleManualActivate = (id) => {
    const idx = cards.findIndex((c) => c.id === id);
    if (idx !== -1) {
      setSelectedCard(id);
      setActiveDesktopIndex(idx);
      setMobileActiveIndex(idx);
    }
  };

  // Open popup for mobile and set index
  const openPopup = (index) => {
    setMobileActiveIndex(index);
    setPopupCardIndex(index);
    setIsPopupOpen(true);
  };

  // Mobile auto-scroll with border animation, skip if popup open
  useEffect(() => {
    if (isPopupOpen) return;
    if (typeof window === "undefined") return;

    const scrollToIndex = (index) => {
      const container = document.querySelector(
        ".mobile-cards-container .overflow-x-auto",
      );
      if (container) {
        container.scrollTo({
          left: index * (window.innerWidth - 32),
          behavior: "smooth",
        });
      }
    };

    autoScrollRef.current = setInterval(() => {
      setMobileActiveIndex((prev) => {
        const nextIdx = prev < cards.length - 1 ? prev + 1 : 0;
        scrollToIndex(nextIdx);
        return nextIdx;
      });
    }, 5000);

    return () => clearInterval(autoScrollRef.current);
  }, [cards.length, isPopupOpen]);

  // Pause mobile auto-scroll for user interaction
  const pauseAutoScroll = () => {
    clearInterval(autoScrollRef.current);
    setTimeout(() => {
      if (!isPopupOpen) {
        const evt = new Event("resume-autoscroll");
        window.dispatchEvent(evt);
      }
    }, 5000);
  };

  // Swipe handler for mobile
  useEffect(() => {
    const container = document.querySelector(
      ".mobile-cards-container .overflow-x-auto",
    );
    if (!container) return;
    let startX = 0;
    let isScrolling = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isScrolling = true;
    };

    const handleTouchEnd = (e) => {
      if (!isScrolling || isPopupOpen) return;
      const deltaX = e.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) > 50 && !swipeCooldownRef.current) {
        let newIndex = mobileActiveIndex;
        if (deltaX < 0 && newIndex < cards.length - 1) {
          newIndex++;
        } else if (deltaX > 0 && newIndex > 0) {
          newIndex--;
        }
        setMobileActiveIndex(newIndex);
        container.scrollTo({
          left: newIndex * (window.innerWidth - 32),
          behavior: "smooth",
        });
        swipeCooldownRef.current = true;
        pauseAutoScroll();
        setTimeout(() => (swipeCooldownRef.current = false), 300);
      }
      isScrolling = false;
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mobileActiveIndex, cards.length, isPopupOpen]);

  // GSAP animations on mount
  useEffect(() => {
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { x: 100, y: -100, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.2,
          },
        );
      }
    });
  }, []);

  // Prevent scroll when popup open or modal open
  useEffect(() => {
    if (isPopupOpen || open || detailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen, open, detailOpen]);

  // Close popup on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsPopupOpen(false);
    };
    if (isPopupOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isPopupOpen]);

  // Handle ESC to close modal or detail
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        if (detailOpen) setDetailOpen(false);
        else onClose();
      }
    }
    if (open || detailOpen) {
      document.addEventListener("keydown", handleKey);
    } else {
      document.removeEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, detailOpen, onClose]);

  // Handle backdrop click to close modal or detail
  const handleBackdrop = (e) => {
    if (e.target === backdropRef.current) {
      if (detailOpen) setDetailOpen(false);
      else onClose();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={backdropRef}
            className="min-h-[80vh] fixed inset-0 z-[999] flex items-end justify-center sm:items-end sm:justify-center"
            style={{
              background:
                "linear-gradient(120deg, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.4) 100%)",
              backdropFilter: "blur(2px)",
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              y: 100,
              opacity: 0,
              transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
            }}
            onMouseDown={handleBackdrop}
          >
            <motion.div
              className="relative w-full h-full sm:max-h-[96vh] sm:rounded-t-2xl bg-[#121212] p-0 sm:p-5 lg:px-5 lg:py-2 flex flex-col items-center border-t border-[#4F4E4E]"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-[#121212] text-white lg:min-h-screen w-full overflow-x-hidden flex flex-col md:justify-start">
                {/* Header Section */}
                <div className="p-2 md:px-8">
                  <div className="block sm:flex items-end sm:mb-2 mb-8 md:mb-2">
                    <div className="sm:w-[50%] w-[90%]">
                      <h3 className="font-antonio text-lg lg:block hidden">
                        About Us
                      </h3>
                      <h1 className="font-antonio text-2xl md:text-4xl capitalize mb-1 w-[70%] md:w-[100%]">
                        Vision To Reality. Our Human Touch.
                      </h1>
                    </div>
                    <div className="sm:w-[40%] md:mb-2 mb-12 mt-8 md:mt-[0] w-[70%] ml-[auto]">
                      <p className="font-antonio text-md">
                        We are a digital product studio that transforms complex
                        ideas into beautiful, user-friendly experiences that
                        drive results
                      </p>
                    </div>
                    {/* Header */}
                    <div className="w-max relative left-[45px] bottom-[40px]">
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-[#DBF900] transition-colors cursor-pointer"
                      >
                        <Close className="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Version */}
                <div className="hidden sm:block px-8 pb-2">
                  <div className="flex items-center justify-center md:h-[calc(100vh-60vh)] lg:h-[calc(100vh-58vh)]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedCard}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5 }}
                        className="lg:p-5 py-4 flex flex-col gap-6 w-full"
                      >
                        <div className="w-full">
                          <div className="flex lg:gap-10 md:gap-4 items-center justify-between relative md:bottom-[60px] lg:bottom-[0]">
                            {cards
                              .find((card) => card.id === selectedCard)
                              ?.MainContent?.map((section) => (
                                <div
                                  key={section.subTitle || section.name}
                                  className="w-[30%] lg:max-w-[350px] sm:w-[auto]  md:min-w-[auto]"
                                  onClick={() =>
                                    handleManualActivate(
                                      cards.find((c) =>
                                        c.MainContent.includes(section),
                                      )?.id || selectedCard,
                                    )
                                  }
                                  onMouseEnter={() =>
                                    handleManualActivate(
                                      cards.find((c) =>
                                        c.MainContent.includes(section),
                                      )?.id || selectedCard,
                                    )
                                  }
                                >
                                  <div>
                                    <h3 className="text-xl font-bold mb-2 font-antonio">
                                      {section.subTitle}
                                    </h3>
                                    <p className="font-antonio text-sm text-gray-400 w-[90%]">
                                      {section.text}
                                    </p>
                                    {selectedCard === "buildNext" &&
                                      section.contactus && (
                                        <div className="mt-4">
                                          <Link
                                            href="/get-in-touch"
                                            className="w-fit flex items-center gap-2.5 font-antonio text-[14px] bg-[#FF4E21] p-[10px] text-white font-300"
                                          >
                                            {section.contactus}
                                          </Link>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="flex lg:gap-10 md:gap-4 items-center justify-evenly relative md:bottom-[60px] lg:bottom-[0]">
                            {cards
                              .find((card) => card.id === selectedCard)
                              ?.MainContent?.map((section, index) => (
                                <div
                                  key={index}
                                  className="w-[30%] lg:max-w-[350px] sm:w-[auto]  md:min-w-[auto]"
                                >
                                  {selectedCard === "meetTeam" && section && (
                                    <div className="mt-4 lg:mt-[0] w-full flex justify-center items-center flex-col">
                                      <img
                                        src={section.teamImg}
                                        alt={section.name || ""}
                                        height={130}
                                        width={130}
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
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Desktop Cards Grid */}
                <div className="hidden sm:block px-8 sm:absolute lg:relative lg:w-[100%] sm:bottom-[25px] sm:w-[92%]">
                  <div className="grid lg:grid-cols-4 sm:grid-cols-2">
                    {cards.map((card, index) => (
                      <div
                        key={card.id}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="border border-[#4E4E4E] w-[350px] sm:h-[215px] sm:w-[100%] h-[300px] lg:h-[275px] relative cursor-pointer overflow-hidden group"
                        onClick={() => handleManualActivate(card.id)}
                        onMouseEnter={() => handleManualActivate(card.id)}
                      >
                        {/* Title/preview */}
                        <motion.div
                          className="absolute top-4 left-4 text-left"
                          initial={{ x: 0, y: 0, opacity: 1 }}
                          animate={
                            selectedCard === card.id || card.id === selectedCard
                              ? { x: 0, y: 150, opacity: 0 }
                              : { x: 0, y: 0, opacity: 1 }
                          }
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <h2 className="text-xl font-antonio mb-2 uppercase">
                            {card.title}
                          </h2>
                          <p className="text-gray-400 font-antonio text-[14px] pr-[20px]">
                            {card.content}
                          </p>
                        </motion.div>
                        {/* Full content view */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={
                            selectedCard === card.id || card.id === selectedCard
                              ? { opacity: 1 }
                              : { opacity: 0 }
                          }
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <div className="p-4 text-white z-10">
                            <h2 className="text-xl font-antonio mb-2 uppercase">
                              {card.title}
                            </h2>
                            <p className="text-gray-400 font-antonio w-[85%] sm:w-[100%] xl:w-[85%] text-md">
                              {card.content}
                            </p>
                            {/* 5s top progress bar for active card */}
                            {selectedCard === card.id && (
                              <motion.div
                                key={`${card.id}-${selectedCard}`}
                                className="absolute top-0 left-0 h-[5px] bg-white"
                                style={{
                                  width: "100%",
                                  transformOrigin: "left",
                                  willChange: "transform",
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 4, ease: "linear" }}
                                onAnimationComplete={() => {
                                  // Trigger next slide exactly when animation finishes
                                  setActiveDesktopIndex(
                                    (prev) => (prev + 1) % cards.length,
                                  );
                                }}
                              />
                            )}
                          </div>
                          {selectedCard === card.id && (
                            <div
                              className="absolute inset-0 bg-cover bg-[100%] bg-no-repeat transition-opacity duration-300"
                              style={{
                                backgroundImage: `url('/images/about_us_bg.png')`,
                                zIndex: 0,
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Version - Cards with Popup */}
                <div className="sm:hidden mobile-cards-container sm:relative h-[400px] px-4 pb-8 absolute bottom-[-50px] w-[85%]">
                  <div
                    className="flex gap-0 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      scrollSnapType: "x mandatory",
                      scrollSnapAlign: "start",
                    }}
                  >
                    {cards.map((card, index) => (
                      <motion.div
                        key={card.id}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className={`border flex-shrink-0 w-[100%] h-[275px] relative cursor-pointer overflow-hidden group transition-all duration-300 relative ${
                          mobileActiveIndex === index
                            ? "border-[#4E4E4E] border"
                            : "border-[#4E4E4E] border"
                        }`}
                        style={{ scrollSnapAlign: "start" }}
                        onClick={() => openPopup(index)}
                      >
                        {/* Mobile: 5s top progress bar for active card */}
                        {mobileActiveIndex === index && (
                          <motion.div
                            key={`m-${index}-${mobileActiveIndex}`}
                            className="absolute top-0 left-0 h-[5px] bg-white"
                            style={{
                              width: "100%",
                              transformOrigin: "left",
                              willChange: "transform",
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 5, ease: "linear" }}
                          />
                        )}
                        {/* Background image always */}
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                          style={{
                            backgroundImage: `url('/images/about_us_bg.png')`,
                          }}
                        />
                        {/* Content always visible on mobile */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="p-6 text-white">
                            <h2 className="text-xl font-antonio mb-2 uppercase">
                              {card.title}
                            </h2>
                            <p className="text-gray-400 font-antonio md:w-[85%] text-md">
                              {card.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Dots */}
                  <div className="lg:hidden absolute bottom-[50px] rotate-270 left-1/2 transform -translate-x-1/2 flex-col flex gap-[30px] z-10">
                    {cards.map((_, index) => (
                      <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => {
                          setMobileActiveIndex(index);
                          const container = document.querySelector(
                            ".mobile-cards-container .overflow-x-auto",
                          );
                          if (container) {
                            container.scrollTo({
                              left: index * (window.innerWidth - 32),
                              behavior: "smooth",
                            });
                          }
                        }}
                      />
                    ))}
                  </div>

                  {/* Popup for Mobile */}
                  <AnimatePresence>
                    {isPopupOpen && popupCardIndex !== null && (
                      <motion.div
                        className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.2 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        onClick={(e) => {
                          if (e.target === e.currentTarget)
                            setIsPopupOpen(false);
                        }}
                      >
                        <motion.div
                          className="relative w-full max-w-[320px] bg-[#181818] rounded-2xl md:rounded-3xl border-2 border-[#4E4E4E] px-4 py-4 sm:p-6 flex flex-col items-center"
                          onMouseEnter={() =>
                            handleManualActivate(cards[popupCardIndex].id)
                          }
                          onClick={() =>
                            handleManualActivate(cards[popupCardIndex].id)
                          }
                          variants={modalVariants}
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
                            {cards[popupCardIndex].MainContent?.map(
                              (section, idx) => (
                                <div
                                  key={idx}
                                  className="w-full mb-8 last:mb-0"
                                >
                                  {section.text && (
                                    <div>
                                      <h3 className="text-xl font-bold mb-2 font-antonio">
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
                                        </Link>
                                      </div>
                                    )}
                                  {cards[popupCardIndex].id === "meetTeam" &&
                                    section.name && (
                                      <div className="mt-4 w-full flex justify-center items-center flex-col">
                                        <img
                                          src={section.teamImg}
                                          alt={section.name || ""}
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
                              ),
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
