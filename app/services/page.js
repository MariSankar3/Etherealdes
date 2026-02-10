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
  // lastScrollTime removed for lint
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

  // Keep the ref in sync with state
  useEffect(() => {
    activeServiceRef.current = activeService;
  }, [activeService]);

  // Main Auto-Scroll Logic
  useEffect(() => {
    const stopTimers = () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    };

    stopTimers();

    if (isHoveringRef.current) return;

    // Schedule next slide
    autoScrollTimeoutRef.current = setTimeout(() => {
      setScrollDirection("down");
      setActiveService((prev) => (prev + 1) % SERVICES_COUNT);
    }, 5000);

    return stopTimers;
  }, [activeService]); // Re-run on every slide change (debounces the timer)

  // Event Listeners & Interactions
  useEffect(() => {
    const handleInteraction = () => {
      // Just clearing the timeout here might be enough if we trigger a re-render,
      // but purely imperative interaction needs to coordinate.
      // Actually, if we interact, we want to pause for longer (e.g. 8s).
      // But we can't easily effect the other hook's variable from here without side effects.
      // Simpler approach: Interaction updates state? No.
      
      // Let's just restart the cycle by forcing a "no-op" update or handled via refs.
      // But the simplest way is to let the component re-render or just manipulate the refs directly.
      
      // If we interact, we clear the current timeout, and set a NEW timeout for 8s.
      // Since the other effect owns the timeout, we must be careful.
      // BUT if the other effect only runs on `activeService` change, we are free to mess with refs here
      // as long as we don't cause race conditions.
      
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current); // Just in case
      
      if (isHoveringRef.current) return;

      autoScrollTimeoutRef.current = setTimeout(() => {
        setScrollDirection("down");
        setActiveService((prev) => (prev + 1) % SERVICES_COUNT);
      }, 8000); // Longer delay after interaction
    };

    const handleWheel = (event) => {
      if (scrollLock.current) {
        event.preventDefault(); // Prevent default even if locked
        return;
      }
      
      // event.preventDefault(); // Moved inside checks or just passive: false
      // Note: passive: false is required to preventDefault
      
      const deltaY = event.deltaY;
      if (Math.abs(deltaY) > 120) {
        scrollLock.current = true;
        setTimeout(() => {
          scrollLock.current = false;
        }, 1000);
        
        handleInteraction(); // Reset timer

        if (deltaY > 0) {
           const next = activeServiceRef.current === SERVICES_COUNT - 1 ? 0 : activeServiceRef.current + 1;
           setScrollDirection("down");
           setActiveService(next);
        } else {
           const prev = activeServiceRef.current === 0 ? SERVICES_COUNT - 1 : activeServiceRef.current - 1;
           setScrollDirection("up");
           setActiveService(prev);
        }
      }
    };

    const handleKeyDown = (event) => {
      handleInteraction();
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const next = activeServiceRef.current === SERVICES_COUNT - 1 ? 0 : activeServiceRef.current + 1;
          setScrollDirection("down");
          setActiveService(next);
          break;
        case "ArrowUp":
          event.preventDefault();
          const prev = activeServiceRef.current === 0 ? SERVICES_COUNT - 1 : activeServiceRef.current - 1;
          setScrollDirection("up");
          setActiveService(prev);
          break;
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      // Restart immediately? or wait?
      // Let's trigger the 5s loop
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = setTimeout(() => {
        setScrollDirection("down");
        setActiveService((prev) => (prev + 1) % SERVICES_COUNT);
      }, 5000);
    };
    
    // Touch logic
    let touchStartY = 0;
    const onTouchStart = (e) => {
      if (touchCooldownRef.current) return;
      touchStartY = e.changedTouches[0].screenY;
    };
    const onTouchEnd = (e) => {
      handleInteraction();
      if (scrollLock.current || touchCooldownRef.current) return;
      
      const touchEndY = e.changedTouches[0].screenY;
      const diffY = touchStartY - touchEndY;
      
      if (Math.abs(diffY) > 120) {
        scrollLock.current = true;
        setTimeout(() => { scrollLock.current = false; }, 1000);
        touchCooldownRef.current = true;
        setTimeout(() => { touchCooldownRef.current = false; }, 1000);

        if (diffY > 0) {
           const next = activeServiceRef.current === SERVICES_COUNT - 1 ? 0 : activeServiceRef.current + 1;
           setScrollDirection("down");
           setActiveService(next);
        } else {
           const prev = activeServiceRef.current === 0 ? SERVICES_COUNT - 1 : activeServiceRef.current - 1;
           setScrollDirection("up");
           setActiveService(prev);
        }
      }
    };

    // Initialize listeners
    window.addEventListener("wheel", handleWheel, { passive: false }); // passive: false to allow preventDefault? 
    // Actually, if we don't preventDefault, page scrolls. User probably wants page scroll lock?
    // Using passive: true for performance unless we explicitly need to block scroll.
    // The original code used passive: false.
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const mainEl = mainRef.current;
    if (mainEl) {
      mainEl.addEventListener("mouseenter", handleMouseEnter);
      mainEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
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
            setScrollDirection={setScrollDirection}
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
