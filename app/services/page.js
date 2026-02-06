"use client";
import React, { useState, useRef, useEffect } from "react";
import RightSecContent from "./components/RightSecContent";
import CommonLayout from "../components/common/CommonLayout";
import MidSec from "./components/MidSec";
import { ROUTE } from "../constants/constants";

const SERVICES_COUNT = 6; // Update if you add/remove services


function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollTime = useRef(0);
  const activeServiceRef = useRef(activeService);
  const scrollLock = useRef(false);
  const touchCooldownRef = useRef(false);
  
  // Refs for auto-scroll and hover control
  const autoScrollIntervalRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);
  const isHoveringRef = useRef(false);
  const mainRef = useRef(null);

  // Keep the ref in sync with state
  useEffect(() => {
    activeServiceRef.current = activeService;
  }, [activeService]);

  useEffect(() => {
    function stopAutoScroll() {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    }

    function startAutoScroll() {
      stopAutoScroll();
      // Never start if hovering
      if (isHoveringRef.current) return;

      autoScrollIntervalRef.current = setInterval(() => {
        setActiveService((prev) => (prev + 1) % SERVICES_COUNT);
        setScrollDirection("down");
      }, 5000); 
    }

    function restartAutoScroll() {
      // If we are hovering, do nothing. The "leave" event will handle restart.
      if (isHoveringRef.current) return;

      stopAutoScroll();
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      // Resume after 8 seconds of inactivity
      autoScrollTimeoutRef.current = setTimeout(startAutoScroll, 8000); 
    }

    // Handlers
    const handleWheel = (event) => {
      // Restart (or pause) timer on interaction
      restartAutoScroll();

      event.preventDefault();
      if (scrollLock.current) return;
      
      scrollLock.current = true;
      setTimeout(() => {
        scrollLock.current = false;
      }, 1000);
      
      const now = Date.now();
      const deltaY = event.deltaY;
      
      if (deltaY > 120) {
        const nextService =
          activeServiceRef.current === SERVICES_COUNT - 1
            ? 0
            : activeServiceRef.current + 1;
        setScrollDirection("down");
        setActiveService(nextService);
        lastScrollTime.current = now;
      } else if (deltaY < -120) {
        const prevService =
          activeServiceRef.current === 0
            ? SERVICES_COUNT - 1
            : activeServiceRef.current - 1;
        setScrollDirection("up");
        setActiveService(prevService);
        lastScrollTime.current = now;
      }
    };

    const handleTouchStart = (event) => {
      if (touchCooldownRef.current) return;
      // Get the *first* touch point
      event.changedTouches && event.changedTouches.length > 0
        ? (lastScrollTime.current = event.changedTouches[0].screenY) 
        : (lastScrollTime.current = 0);
    };

    const handleTouchEnd = (event) => {
      restartAutoScroll();

      if (scrollLock.current || touchCooldownRef.current) return;
      
      scrollLock.current = true;
      setTimeout(() => {
        scrollLock.current = false;
      }, 1000);

      // Simple swipe detection
      // Note: reusing lastScrollTime logic from original code or variable names
      // The original code used 'touchStartY' variable in closure.
      // Let's stick to the closure variables for touch processing.
    };

    const handleKeyDown = (event) => {
      restartAutoScroll();
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const nextService =
            activeServiceRef.current === SERVICES_COUNT - 1
              ? 0
              : activeServiceRef.current + 1;
          setScrollDirection("down");
          setActiveService(nextService);
          lastScrollTime.current = Date.now();
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevService =
            activeServiceRef.current === 0
              ? SERVICES_COUNT - 1
              : activeServiceRef.current - 1;
          setScrollDirection("up");
          setActiveService(prevService);
          lastScrollTime.current = Date.now();
          break;
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      stopAutoScroll();
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      startAutoScroll();
    };

    // Initialize
    startAutoScroll();

    // Event Listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    
    // Touch logic variables re-implementation for closure access
    let touchStartY = 0;
    const onTouchStart = (e) => {
      if (touchCooldownRef.current) return;
      touchStartY = e.changedTouches[0].screenY;
    };
    const onTouchEnd = (e) => {
      restartAutoScroll();
      if (scrollLock.current || touchCooldownRef.current) return;
      
      scrollLock.current = true;
      setTimeout(() => { scrollLock.current = false; }, 1000);

      const touchEndY = e.changedTouches[0].screenY;
      const diffY = touchStartY - touchEndY;
      const minSwipeDistance = 120;

      if (Math.abs(diffY) > minSwipeDistance) {
        touchCooldownRef.current = true;
        setTimeout(() => { touchCooldownRef.current = false; }, 1000);

        const now = Date.now();
        if (diffY > 0) {
           const nextService = activeServiceRef.current === SERVICES_COUNT - 1 ? 0 : activeServiceRef.current + 1;
           setScrollDirection("down");
           setActiveService(nextService);
           lastScrollTime.current = now;
        } else {
           const prevService = activeServiceRef.current === 0 ? SERVICES_COUNT - 1 : activeServiceRef.current - 1;
           setScrollDirection("up");
           setActiveService(prevService);
           lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const mainEl = mainRef.current;
    if (mainEl) {
      mainEl.addEventListener("mouseenter", handleMouseEnter);
      mainEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      stopAutoScroll();
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      
      if (mainEl) {
        mainEl.removeEventListener("mouseenter", handleMouseEnter);
        mainEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="services-page overflow-hidden"
      aria-labelledby="services-heading"
      style={{
        cursor: 'url("/images/custom-cursor.svg") 2 2, auto',
        minHeight: "100vh",
      }}
    >
      <h2 id="services-heading" className="sr-only">
       Design Studio Services for Startups and Growing Brands
       </h2>
       <p className="sr-only">
  Ethereal Design is a modern design studio offering UI UX design, branding, web design,
  and product design services for startups and growing brands worldwide.
</p> 

<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Design Studio Services",
  "itemListElement": [
    { "@type": "Service", "name": "UI UX Design" },
    { "@type": "Service", "name": "Branding Design" },
    { "@type": "Service", "name": "Web Design" },
    { "@type": "Service", "name": "Product Design" }
  ]
})}
</script>

      <CommonLayout
        midsec={
          <MidSec
            activeService={activeService}
            setActiveService={setActiveService}
            scrollDirection={scrollDirection}
          />
        }
        page={ROUTE.SERVICES.LABEL}
      >
        <RightSecContent
          activeService={activeService}
          onActiveServiceChange={setActiveService}
        />
      </CommonLayout>
    </main>
  );
}

export default ServicesPage;
