"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function MidSec({
  activeService = 0,
  setActiveService,
  scrollDirection = "up",
}) {
  const imageContainerRef = useRef(null);
  const [previousService, setPreviousService] = useState(activeService);
  const [isAnimating, setIsAnimating] = useState(false);

  const serviceImages = [
    {
      id: 0,
      image: "/images/services/ui_ux.png",
      title: "UI/UX Design",
      mobimage: "/images/services/mobile/ui_ux.png",
    },
    {
      id: 1,
      image: "/images/services/api_backend.png",
      title: "API & Backend",
      mobimage: "/images/services/mobile/api_backend.png",
    },
    {
      id: 2,
      image: "/images/services/mobile_app.png",
      title: "Mobile Apps",
      mobimage: "/images/services/mobile/mobile_app.png",
    },
    {
      id: 3,
      image: "/images/services/chatbot.png",
      title: "AI & Chatbots",
      mobimage: "/images/services/mobile/chatbot.png",
    },
    {
      id: 4,
      image: "/images/services/frontend.png",
      title: "Frontend Develop",
      mobimage: "/images/services/mobile/frontend.png",
    },
    {
      id: 5,
      image: "/images/services/marketing.png",
      title: "Digital Marketing",
      mobimage: "/images/services/mobile/marketing.png",
    },
  ];

  // Animate when activeService changes
  useEffect(() => {
    if (
      imageContainerRef.current &&
      previousService !== activeService &&
      !isAnimating
    ) {
      setIsAnimating(true);

      const container = imageContainerRef.current;
      const isMobile = window.innerWidth < 645;

      const currentImage = container.querySelector(
        isMobile ? ".current-image-mobile" : ".current-image-desktop"
      );
      const newImage = container.querySelector(
        isMobile ? ".new-image-mobile" : ".new-image-desktop"
      );

      if (currentImage && newImage) {
        const isScrollingDown = scrollDirection === "down";

        gsap.set(newImage, {
          y: isScrollingDown ? "100%" : "-100%",
          opacity: 1,
        });
        gsap.set(currentImage, { y: "0%", opacity: 1 });

        gsap
          .timeline()
          .to(
            currentImage,
            {
              y: isScrollingDown ? "-100%" : "100%",
              opacity: 0.5,
              duration: 1.2, // slightly shorter for better feel
              ease: "power2.inOut",
            },
            0
          )
          .to(
            newImage,
            {
              y: "0%",
              opacity: 1,
              duration: 1.2,
              ease: "power2.inOut",
            },
            0
          )
          .call(() => {
            gsap.set(currentImage, { clearProps: "all" });
            gsap.set(newImage, { clearProps: "all" });
            setPreviousService(activeService);
            setIsAnimating(false); // unlock after animation
          });
      } else {
        setPreviousService(activeService);
        setIsAnimating(false);
      }
    }
  }, [activeService, previousService, isAnimating, scrollDirection]);

  // Click/scroll handlers with lock
  const handleScrollDown = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextService = activeService === 5 ? 0 : activeService + 1;
    setActiveService(nextService);

    // Extra lock to cover gap before GSAP starts
    setTimeout(() => setIsAnimating(false), 0);
  };

  // Wheel handler
  useEffect(() => {
    const handleWheel = (event) => {
      if (isAnimating) return;

      // Further increased threshold for more controlled scrolling
      if (event.deltaY > 120) {
        setIsAnimating(true);
        const next = activeService === 5 ? 0 : activeService + 1;
        setActiveService(next);

        setTimeout(() => setIsAnimating(false), 1300);
      } else if (event.deltaY < -120) {
        // Scroll up large enough
        setIsAnimating(true);
        const prev = activeService === 0 ? 5 : activeService - 1;
        setActiveService(prev);

        setTimeout(() => setIsAnimating(false), 1300);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeService, isAnimating, setActiveService]);

  return (
    <section
      aria-labelledby="services-visual-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative flex flex-col md:min-h-screen lg:border-l-0 border-r-0 border-b-[1px] lg:border-b-none border-[#4E4E4E] overflow-hidden h-[270px] md:h-full flex-shrink-0"
    >
      <h2 id="services-visual-heading" className="sr-only">
        Design Studio Services — Visual Overview
      </h2>
      <ul className="sr-only">
        {serviceImages.map((s) => (
          <li key={s.id}>{s.title} service by our design studio</li>
        ))}
      </ul>

      <div
        ref={imageContainerRef}
        className="flex-1 relative overflow-hidden w-full h-[full]"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Previous Image - Desktop */}
          <img
            loading="lazy"
            src={serviceImages[previousService]?.image}
            alt={serviceImages[previousService]?.title}
            className="absolute w-full h-full current-image-desktop object-cover sm:object-fill sm:h-full sm:block hidden"
          />
          {/* Previous Image - Mobile */}
          <img
            src={serviceImages[previousService]?.mobimage}
            alt={serviceImages[previousService]?.title}
            loading="lazy"
            className="sm:hidden absolute w-full h-full current-image-mobile object-cover"
          />
          {/* New Image - Desktop */}
          <img
            src={serviceImages[activeService]?.image}
            alt={serviceImages[activeService]?.title}
            loading="lazy"
            className="absolute w-full h-full new-image-desktop sm:object-fill sm:h-full sm:block hidden"
          />
          {/* New Image - Mobile */}
          <img
            src={serviceImages[activeService]?.mobimage}
            alt={serviceImages[activeService]?.title}
            loading="lazy"
            className="sm:hidden w-full h-full new-image-mobile object-cover "
          />
        </div>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute bottom-4 right-4 sm:right-1/2 sm:translate-x-1/2 transform z-20">
        <img
          src="/images/services/scroll-down.png"
          alt="scroll down"
          className="w-[50px] h-[50px] md:w-[90px] md:h-[90px] object-contain cursor-pointer"
          onClick={handleScrollDown}
          aria-label="View next service"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default MidSec;
