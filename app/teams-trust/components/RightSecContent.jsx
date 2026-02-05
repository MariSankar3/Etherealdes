import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import UserConfiguration from "../../Config/UserConfiguration.json";
import { motion } from "framer-motion";
import { Indicator } from "../../components/icons/icons";

function RightSecContent({ setActiveIndex }) {
  const { TeamsTrust } = UserConfiguration;
  const { RightSecContent: rightSecContentData } = TeamsTrust;

  const [activeIndex, setActiveIndexState] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2.25);
  const [gap, setGap] = useState(20);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);

  const numCards = rightSecContentData.length;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    if (typeof setActiveIndex === "function") setActiveIndex(activeIndex);
  }, [activeIndex, setActiveIndex]);

  /* ---------- responsive sizing (unchanged) ---------- */
  useLayoutEffect(() => {
    function updateSizes() {
      if (cardRef.current && wrapperRef.current) {
        const width = cardRef.current.getBoundingClientRect().width;
        setCardWidth(width);

        if (window.innerWidth >= 1536) {
          setVisibleCount(2.5); setGap(50); setCurrentBreakpoint("2xl");
        } else if (window.innerWidth >= 1280) {
          setVisibleCount(2.1); setGap(50); setCurrentBreakpoint("xl");
        } else if (window.innerWidth >= 1024) {
          setVisibleCount(2.1); setGap(40); setCurrentBreakpoint("lg");
        } else if (window.innerWidth >= 768) {
          setVisibleCount(1.8); setGap(40); setCurrentBreakpoint("md");
        } else if (window.innerWidth >= 640) {
          setVisibleCount(1.4); setGap(40); setCurrentBreakpoint("sm");
        } else {
          setVisibleCount(1.1); setGap(20); setCurrentBreakpoint("xs");
        }
      }
    }
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  /* ---------- auto scroll + interactions (unchanged) ---------- */
  useEffect(() => {
    function stopAutoScroll() {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    }
    function startAutoScroll() {
      stopAutoScroll();
      autoScrollIntervalRef.current = setInterval(() => {
        setActiveIndexState((prev) => (prev + 1) % numCards);
      }, 8000);
    }
    function restartAutoScrollAfterDelay() {
      stopAutoScroll();
      if (autoScrollTimeoutRef.current)
        clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = setTimeout(startAutoScroll, 8000);
    }

    startAutoScroll();

    const wrapper = wrapperRef.current;
    let isThrottled = false;
    let touchStartX = 0;

    function handleWheel(e) {
      if (isThrottled) return;
      restartAutoScrollAfterDelay();
      const delta = e.deltaY || e.deltaX;
      let newIndex = activeIndexRef.current;
      if (delta > 30) newIndex = (newIndex + 1) % numCards;
      else if (delta < -30) newIndex = (newIndex - 1 + numCards) % numCards;
      if (newIndex !== activeIndexRef.current) {
        setActiveIndexState(newIndex);
        isThrottled = true;
        setTimeout(() => (isThrottled = false), 1000);
      }
    }

    function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
      if (isThrottled) return;
      restartAutoScrollAfterDelay();
      const diffX = touchStartX - e.changedTouches[0].screenX;
      let newIndex = activeIndexRef.current;
      if (diffX > 30) newIndex = (newIndex + 1) % numCards;
      else if (diffX < -30) newIndex = (newIndex - 1 + numCards) % numCards;
      if (newIndex !== activeIndexRef.current) {
        setActiveIndexState(newIndex);
        isThrottled = true;
        setTimeout(() => (isThrottled = false), 300);
      }
    }

    wrapper?.addEventListener("wheel", handleWheel, { passive: true });
    wrapper?.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper?.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      stopAutoScroll();
      if (autoScrollTimeoutRef.current)
        clearTimeout(autoScrollTimeoutRef.current);
      wrapper?.removeEventListener("wheel", handleWheel);
      wrapper?.removeEventListener("touchstart", handleTouchStart);
      wrapper?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [numCards]);

  /* ---------- helpers ---------- */
  const getCardHeight = (isActive) => {
    const heights = {
      xs: { active: 365, inactive: 350 },
      sm: { active: 400, inactive: 380 },
      md: { active: 500, inactive: 420 },
      lg: { active: 550, inactive: 450 },
      xl: { active: 600, inactive: 480 },
      "2xl": { active: 600, inactive: 480 },
    };
    return isActive
      ? heights[currentBreakpoint].active
      : heights[currentBreakpoint].inactive;
  };

  const totalWidth = Math.max(0, numCards * (cardWidth + gap) - gap);
  const viewportWidth = Math.max(
    0,
    visibleCount * cardWidth + (visibleCount - 1) * gap
  );
  const rightPadding = Math.max(0, viewportWidth - cardWidth);
  const maxOffset = Math.max(0, totalWidth + rightPadding - viewportWidth);
  const idealOffset = activeIndex * (cardWidth + gap);
  const clampedOffset = Math.min(Math.max(idealOffset, 0), maxOffset);
  const translateX = -clampedOffset;

  return (
    /* ===== Semantic Section ===== */
    <section
      aria-labelledby="teams-trust-heading"
      className="h-full w-full py-[20px] md:py-[20px] lg:py-[30px] xl:py-[40px] flex flex-col justify-center items-center md:border-l border-[#4E4E4E] gap-[10px] overflow-hidden ml-[20px] sm:ml-[0]"
      itemScope
  itemType="https://schema.org/Service"
    >
      <meta itemProp="serviceType" content="Design Studio" />
<meta itemProp="provider" content="Ethereal Design Studio" />

      {/* ===== SEO ONLY ===== */}
      <h2 id="teams-trust-heading" className="sr-only">
        Why Teams Trust Us – Client Testimonials and Key Strengths
      </h2>
        <p className="sr-only">
  Our design studio is trusted by startups and teams worldwide for product design,
  UI UX, branding, and digital experiences that drive results.
</p>
<p className="sr-only">
  Learn more about our <a href="/design-studio">design studio services</a>.
</p>


      {/* ===== Carousel ===== */}
      <div
        ref={wrapperRef}
        role="list"
        className="relative flex items-center w-full select-none overflow-hidden"
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex items-center gap-[20px] sm:gap-[30px] md:gap-[40px] xl:gap-[50px] px-[15px] md:px-[30px] transition-transform duration-500"
          style={{ transform: `translateX(${translateX}px)`, paddingRight: gap }}
        >
          {rightSecContentData.map((item, index) => (
            <motion.article
              key={index}
              role="listitem"
              ref={index === 0 ? cardRef : null}
              itemScope
              itemType="https://schema.org/Review"
              aria-current={index === activeIndex}
              className={`p-[15px] sm:p-[25px] md:p-[30px] lg:p-[40px] border-[1px] border-[#4E4E4E] font-400 min-w-[249px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[340px] text-[16px] font-antonio flex flex-col justify-center
              ${index === activeIndex ? "bg-[#DBF900] text-black" : "bg-[#121212] text-white"}`}
              initial={false}
              animate={{
                height: getCardHeight(index === activeIndex),
                scale: index === activeIndex ? 1.02 : 1,
                filter:
                  index === activeIndex
                    ? "drop-shadow(0px 0px 22px rgba(219, 249, 0, 0.3))"
                    : "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              }}
              transition={{
                height: { duration: 0.5, ease: "easeInOut" },
                scale: { duration: 0.5, ease: "easeInOut" },
                filter: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              {/* Proper heading hierarchy */}
              <h3 itemProp="name" className="text-[22px] sm:text-[24px] md:text-[26px] xl:text-[28px] font-anton uppercase">
                {item.Title}
              </h3>

              <p itemProp="reviewBody" className="pt-[12px] sm:pt-[14px] md:pt-[16px] pb-[8px] sm:pb-[10px] md:pb-[20px] lg:pb-[32px] text-left text-[14px] sm:text-[15px] md:text-[16px]">
                {item.Para}
              </p>

              <ul itemProp="positiveNotes" className="list-disc pl-[15px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]">
                {item["Bullet ponts"].map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ===== Mobile Indicators ===== */}
      <div
        className="flex md:hidden flex-row gap-[5px] justify-end items-end mt-4"
        aria-hidden="true"
      >
        {rightSecContentData.map((_, i) => (
          <Indicator
            key={i}
            className={`transition-all duration-300 ${
              activeIndex === i
                ? "text-white w-[30px]"
                : "text-[#4F4E4E] w-[20px]"
            } rotate-90`}
          />
        ))}
      </div>
    </section>
  );
}

export default RightSecContent;
