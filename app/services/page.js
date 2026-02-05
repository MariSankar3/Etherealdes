"use client";
import React, { useState, useRef, useEffect } from "react";
import RightSecContent from "./components/RightSecContent";
import CommonLayout from "../components/common/CommonLayout";
import MidSec from "./components/MidSec";
import { ROUTE } from "../constants/constants";

const SERVICES_COUNT = 6; // Update if you add/remove services


function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down"); // 'up' or 'down'
  const lastScrollTime = useRef(0);
  const activeServiceRef = useRef(activeService);
  const scrollLock = useRef(false);
  const touchCooldownRef = useRef(false);

  // Keep the ref in sync with state
  useEffect(() => {
    activeServiceRef.current = activeService;
  }, [activeService]);

  // Global scroll and keyboard navigation
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (event) => {
      event.preventDefault();
      if (scrollLock.current) return;
      
      // Increased scroll lock duration to prevent multiple page changes
      scrollLock.current = true;
      setTimeout(() => {
        scrollLock.current = false;
      }, 1000); // Increased from 1000ms
      
      const now = Date.now();
      const deltaY = event.deltaY;
      
      // Further increased threshold for more controlled scrolling
      if (deltaY > 120) { // Increased from 80
        // Scroll down - go to next service (circular)
        const nextService =
          activeServiceRef.current === SERVICES_COUNT - 1
            ? 0
            : activeServiceRef.current + 1;
        setScrollDirection("down"); // User scrolled down
        setActiveService(nextService);
        lastScrollTime.current = now;
      } else if (deltaY < -120) { // Increased from -80
        // Scroll up - go to previous service (circular)
        const prevService =
          activeServiceRef.current === 0
            ? SERVICES_COUNT - 1
            : activeServiceRef.current - 1;
        setScrollDirection("up"); // User scrolled up
        setActiveService(prevService);
        lastScrollTime.current = now;
      }
    };

    const handleTouchStart = (event) => {
      if (touchCooldownRef.current) return;
      touchStartY = event.changedTouches[0].screenY;
    };

    const handleTouchEnd = (event) => {
      if (scrollLock.current || touchCooldownRef.current) return;
      
      // Increased scroll lock duration for touch gestures
      scrollLock.current = true;
      setTimeout(() => {
        scrollLock.current = false;
      }, 1000); // Increased from 1000ms

      touchEndY = event.changedTouches[0].screenY;
      const diffY = touchStartY - touchEndY;
      const minSwipeDistance = 120; // Increased from 80

      if (Math.abs(diffY) > minSwipeDistance) {
        // Set cooldown to prevent rapid successive touches
        touchCooldownRef.current = true;
        setTimeout(() => {
          touchCooldownRef.current = false;
        }, 1000); // 1.5 second cooldown

        const now = Date.now();
        if (diffY > 0) {
          // Swipe up - go to next service (circular)
          const nextService =
            activeServiceRef.current === SERVICES_COUNT - 1
              ? 0
              : activeServiceRef.current + 1;
          setScrollDirection("down"); // Swipe up = scroll down
          setActiveService(nextService);
          lastScrollTime.current = now;
        } else {
          // Swipe down - go to previous service (circular)
          const prevService =
            activeServiceRef.current === 0
              ? SERVICES_COUNT - 1
              : activeServiceRef.current - 1;
          setScrollDirection("up"); // Swipe down = scroll up
          setActiveService(prevService);
          lastScrollTime.current = now;
        }
      }
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const nextService =
            activeServiceRef.current === SERVICES_COUNT - 1
              ? 0
              : activeServiceRef.current + 1;
          setScrollDirection("down"); // Arrow down = scroll down
          setActiveService(nextService);
          lastScrollTime.current = Date.now();
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevService =
            activeServiceRef.current === 0
              ? SERVICES_COUNT - 1
              : activeServiceRef.current - 1;
          setScrollDirection("up"); // Arrow up = scroll up
          setActiveService(prevService);
          lastScrollTime.current = Date.now();
          break;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main
      className="services-page overflow-hidden"
      aria-labelledby="services-heading"
      style={{
        cursor: 'url("/images/custom-cursor.svg") 2 2, auto',
        minHeight: "100vh",
      }}
    >
      <h1 id="services-heading" className="sr-only">
       Design Studio Services for Startups and Growing Brands
       </h1>
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
