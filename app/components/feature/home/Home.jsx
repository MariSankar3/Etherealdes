"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import MidSecContent from "./MidSecContent";
import TopRightSec from "./common/TopRightSec";
import RightSecContent, { mobComponents } from "./RightSecContent";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTE } from "../../../constants/constants";
import Link from "next/link";
import PricingModal from "../../feature/PricingModal";

const fadeUp = {
  hidden: { y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};
// const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1000; // fallback

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: "0%",
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerRef = useRef(null);
  const rightSecRef = useRef(null);
  const emblaApiRef = useRef(null); // Desktop Embla API
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({ loop: true }); // Mobile Embla
  const isAnimatingRef = useRef(false);
  const touchLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);

  const autoScrollTimeoutRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const [pricingOpen, setPricingOpen] = useState(false);
  const userInteractingRef = useRef(false);

  // Previous index to determine direction
  const previousIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    // Sync Mobile Embla when activeIndex changes (driven by other means)
    if (mobileEmblaApi) {
      if (mobileEmblaApi.selectedScrollSnap() !== activeIndex) {
        mobileEmblaApi.scrollTo(activeIndex);
      }
    }
  }, [activeIndex, mobileEmblaApi]);

  // Sync state when Mobile Embla is scrolled by user
  useEffect(() => {
    if (!mobileEmblaApi) return;
    const onSelect = () => {
      setActiveIndex(mobileEmblaApi.selectedScrollSnap());
    };
    mobileEmblaApi.on("select", onSelect);
    return () => mobileEmblaApi.off("select", onSelect);
  }, [mobileEmblaApi]);

  useEffect(() => {
    window.openPricingModal = () => setPricingOpen(true);
    return () => {
      window.openPricingModal = undefined;
    };
  }, []);

  // Calculate direction for slide transitions (inverted mapping)
  const getDirection = (currentIndex) => {
    const previousIndex = previousIndexRef.current;
    if (currentIndex === 0 && previousIndex === 5) return -1;
    if (currentIndex === 5 && previousIndex === 0) return 1;
    return currentIndex > previousIndex ? -1 : 1;
  };

  // Update previous index
  useEffect(() => {
    previousIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Remove custom wheel handling; rely on Embla inside RightSecContent.
  useLayoutEffect(() => {
    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };

    const tick = () => {
      if (userInteractingRef.current) return;
      const currentIndex = activeIndexRef.current;
      const newIndex = (currentIndex + 1) % 5;
      setActiveIndex(newIndex);
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      autoScrollIntervalRef.current = setInterval(tick, 8000);
    };

    startAutoScroll();
    return () => {
      stopAutoScroll();
      if (autoScrollTimeoutRef.current)
        clearTimeout(autoScrollTimeoutRef.current);
    };
  }, []);

  // Global wheel handling: scroll anywhere controls the right carousel
  useEffect(() => {
    let lock = false;
    let acc = 0;
    let lastTs = 0;
    const threshold = 0; // quicker initiation
    const idleResetMs = 0; // reset sooner between bursts
    const cooldownMs = 0; // slightly shorter lock

    const onWheel = (e) => {
      const api = emblaApiRef.current;
      if (!api) return;
      if (lock || isAnimatingRef.current) {
        e.preventDefault();
        return;
      }
      const now = Date.now();
      if (now - lastTs > idleResetMs) acc = 0;
      lastTs = now;
      acc += e.deltaY;

      // down -> prev (N->N-1), up -> next (N->N+1)
      if (acc > threshold) {
        api.scrollPrev();
        acc = 0;
        lock = true;
        userInteractingRef.current = true;
        clearTimeout(autoScrollTimeoutRef.current);
        autoScrollTimeoutRef.current = setTimeout(() => {
          userInteractingRef.current = false;
        }, 500);
        e.preventDefault();
        setTimeout(() => (lock = false), cooldownMs);
      } else if (acc < -threshold) {
        api.scrollNext();
        acc = 0;
        lock = true;
        userInteractingRef.current = true;
        clearTimeout(autoScrollTimeoutRef.current);
        autoScrollTimeoutRef.current = setTimeout(() => {
          userInteractingRef.current = false;
        }, 500);
        e.preventDefault();
        setTimeout(() => (lock = false), cooldownMs);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Subscribe to Embla animation events to guard against multiple advances
  useEffect(() => {
    const api = emblaApiRef.current;
    if (!api) return;
    const onScroll = () => {
      isAnimatingRef.current = true;
    };
    const onSettle = () => {
      isAnimatingRef.current = false;
    };
    api.on("scroll", onScroll);
    api.on("settle", onSettle);
    return () => {
      api.off("scroll", onScroll);
      api.off("settle", onSettle);
    };
  }, [emblaApiRef.current]);

  // Mobile touch handling: vertical swipe maps to slide change
  useEffect(() => {
    const el = containerRef.current || window;
    let startY = 0;
    const threshold = 35;
    const cooldownMs = 0;

    const onTouchStart = (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      startY = e.changedTouches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (touchLockRef.current) return;
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      if (Math.abs(diff) < threshold) return;

      // finger up (diff > 0) => scroll down => N -> N-1
      // finger down (diff < 0) => scroll up => N -> N+1
      const api = emblaApiRef.current;
      if (diff > 0) {
        if (api) api.scrollPrev();
        else setActiveIndex((prev) => (prev + 4) % 5);
      } else {
        if (api) api.scrollNext();
        else setActiveIndex((prev) => (prev + 1) % 5);
      }

      touchLockRef.current = true;
      userInteractingRef.current = true;
      clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = setTimeout(() => {
        userInteractingRef.current = false;
      }, 500);
      setTimeout(() => (touchLockRef.current = false), cooldownMs);
    };

    // Only attach on coarse pointers (mobile)
    const mq = window.matchMedia && window.matchMedia("(pointer: coarse)");
    const enable = !mq || mq.matches;
    if (enable) {
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchend", onTouchEnd, { passive: true });
    }
    return () => {
      if (enable) {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, []);

  return (
    <>
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />

      <main
        aria-labelledby="home-heading"
        ref={containerRef}
        className="ethereal-container bg-[#121212] flex-1 flex flex-col sm:flex-row text-white box-border h-dvh overflow-hidden"
      >
        <h2 id="home-heading" className="sr-only">
          Ethereal Design Studio — UI UX, Web & Digital Product Design for
          Startups
        </h2>

        <p className="sr-only">
          Ethereal Design Studio helps startups and growing companies build
          beautiful, intuitive digital products through expert UI UX design, web
          development, mobile apps, and AI-powered experiences.
        </p>

        {/* Desktop Layout */}
        <section
          className="hidden sm:flex flex-col flex-1 w-[50%]"
          aria-labelledby="home-left-heading"
        >
          <h2 id="home-left-heading" className="sr-only">
            About Our Design Studio
          </h2>
          <MidSecContent index={activeIndex} />
        </section>

        <section
          className="flex-1 hidden sm:flex flex-col text-4 font-100 h-dvh border-[0_1px] border-[#4F4E4E] w-[50%]"
          aria-labelledby="home-right-heading"
        >
          <h2 id="home-right-heading" className="sr-only">
            Featured Work and Services
          </h2>
          <TopRightSec />
          <RightSecContent
            ref={rightSecRef}
            index={activeIndex}
            onIndexChange={(i) => {
              setActiveIndex(i);
              activeIndexRef.current = i;
              // Briefly mark as interacting to pause auto-scroll
              userInteractingRef.current = true;
              clearTimeout(autoScrollTimeoutRef.current);
              autoScrollTimeoutRef.current = setTimeout(() => {
                userInteractingRef.current = false;
              }, 6000);
            }}
            onEmblaReady={(api) => {
              emblaApiRef.current = api;
            }}
          />
        </section>

        {/* Mobile Header */}
        <nav
          aria-label="Mobile quick links"
          className="flex sm:hidden h-[103px] border-b border-[#4F4E4E] flex-col font-antonio"
        >
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
              className="flex-1 w-full flex flex-col justify-center items-center border-r-0 border-b border-[#4F4E4E] py-[13px] hover:bg-[#FF4E21]"
            >
              Clients & Works
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Content with touch-action fixed */}
        <section className="flex-1 sm:hidden relative h-[calc(100vh-103px)] overflow-hidden">
          <div className="w-full h-full" ref={mobileEmblaRef}>
            <div className="flex w-full h-full touch-pan-x">
              {/* Slide 0: MidSecContent (Home) */}
              <div className="flex-[0_0_100%] min-w-0 h-full overflow-hidden">
                <MidSecContent index={0} />
              </div>

              {/* Slides 1-5: RightSecContent Components */}
              {mobComponents.map((Component, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] min-w-0 h-full overflow-hidden"
                >
                  <Component />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
