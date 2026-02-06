"use client";
import React, { useEffect, useRef } from "react";

function RightSecContent({ activeService, onActiveServiceChange }) {
  const [openIndex, setOpenIndex] = React.useState(activeService ?? 0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);
  const cardRefs = useRef([]);

  const services = [
    {
      id: 0,
      title: "UI/UX Design",
      description:
        "We rapidly turn ideas into testable MVPs, validating your vision early. Our intuitive, beautifully designed apps feature smooth animations that engage users. Backed by deep research and journey mapping, we uncover true user needs. AI-driven optimization enhances user flows, delivering seamless, intelligent experiences that evolve with your audience.",
    },
    {
      id: 1,
      title: "API & Backend",
      description:
        "We build scalable backends using Node.js and modern databases to support your app's growth. Our secure data flow is powered by RESTful and GraphQL APIs with strong authentication. We implement custom business logic, including tailored middleware and role-based permissions, ensuring your system aligns perfectly with your operations.",
    },
    {
      id: 2,
      title: "Mobile Apps",
      description:
        "We use Flutter to craft stunning, high-performance iOS and Android apps from a single codebase, ensuring broad reach and fast development. By integrating Firebase, we enable real-time data, secure authentication, and analytics. Our expert UI/UX design delivers seamless, intuitive experiences that keep users engaged and coming back.",
    },
    {
      id: 3,
      title: "AI & Chatbots",
      description:
        "We build intelligent AI chatbots tailored to your services, integrating smoothly across platforms. Our WhatsApp and Instagram bots engage users 24/7, handling inquiries and capturing leads automatically. With smart CRM integration, we streamline your sales funnel by connecting bots directly to your systems, boosting efficiency and conversions.",
    },
    {
      id: 4,
      title: "Frontend Develop",
      description:
        "We build modern, high-performance web apps using React.js, Next.js, and TypeScript. With Tailwind CSS, we ensure pixel-perfect responsiveness across all devices. Our development process includes automated CI/CD pipelines via GitHub, delivering seamless updates, improved efficiency, and reliable, scalable applications tailored to meet your business goals with precision.",
    },
    {
      id: 5,
      title: "Digital Marketing",
      description:
        "We help grow your brand through strategic community building on platforms like Meta and Google. Our SEO strategies boost your visibility, while targeted ad campaigns reach ideal customers for maximum ROI. With content tailored to attract, engage, and convert, we turn your audience into loyal customers and leads.",
    },
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll events to hide indicator and prevent page scroll
  useEffect(() => {
    const container = document.querySelector(".services-container");
    const handleScroll = (e) => {
      if (showScrollIndicator) {
        setShowScrollIndicator(false);
      }

      // Prevent the scroll event from bubbling up to the page
      e.stopPropagation();
    };

    const handleWheel = (e) => {
      // Prevent page scroll when scrolling within the accordion container
      if (container && container.contains(e.target)) {
        e.stopPropagation();
      }
    };

    if (container && isMobile) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [showScrollIndicator, isMobile]);

  // Update openIndex if parent changes activeService
  useEffect(() => {
    if (typeof activeService === "number" && activeService !== openIndex) {
      setOpenIndex(activeService);
    }
  }, [activeService]);

  // Scroll to active card on mobile when it changes
  useEffect(() => {
    if (isMobile && cardRefs.current[openIndex]) {
      const el = cardRefs.current[openIndex];
      const container = el?.closest(".services-container");

      if (el && container) {
        // Prevent page scroll and only scroll within the container
        setTimeout(() => {
          // Calculate the scroll position manually to avoid page scroll
          const elementRect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const elementHeight = elementRect.height;
          const containerHeight = containerRect.height;
          const elementOffsetTop = el.offsetTop;
          const containerScrollHeight = container.scrollHeight;

          // Show scroll indicator if needed
          setShowScrollIndicator(elementHeight > containerHeight);

          let targetScrollTop = container.scrollTop;

          // Calculate the position to show the full accordion
          const elementTop = elementRect.top - containerRect.top;
          const elementBottom = elementTop + elementHeight;

          if (elementBottom > containerHeight) {
            // Element extends beyond the bottom, scroll to show it fully
            targetScrollTop =
              elementOffsetTop - (containerHeight - elementHeight);
          } else if (elementTop < 0) {
            // Element is above the visible area, scroll to show it from the top
            targetScrollTop = elementOffsetTop - 20;
          }

          // Ensure we don't scroll past boundaries
          const maxScrollTop = Math.max(
            0,
            containerScrollHeight - containerHeight,
          );
          targetScrollTop = Math.max(
            0,
            Math.min(targetScrollTop, maxScrollTop),
          );

          // Only scroll if needed and within the container
          if (Math.abs(container.scrollTop - targetScrollTop) > 5) {
            container.scrollTo({
              top: targetScrollTop,
              behavior: "smooth",
            });
          }
        }, 200);
      }
    }
  }, [openIndex, isMobile, services.length]);

  const handleCardClick = (index) => {
    if (index === openIndex) return;
    setOpenIndex(index);
    if (onActiveServiceChange) onActiveServiceChange(index);
  };

  // Prevent page scroll when accordion is clicked
  const handleContainerClick = (e) => {
    // Prevent any click events from causing page scroll
    e.stopPropagation();
  };

  const handleMouseEnter = (index) => {
    if (index !== openIndex) {
      setOpenIndex(index);
      if (onActiveServiceChange) onActiveServiceChange(index);
    }
  };

  return (
    <section
      className="services-container flex flex-col sm:h-full border-r border-l-0 md:border-l border-[#4E4E4E] focus:outline-none h-[calc(100vh-320px)] overflow-auto md:overflow-hidden relative"
      onClick={handleContainerClick}
      aria-labelledby="services-list-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Design Studio Services" />
      <meta itemProp="itemListOrder" content="Unordered" />

      <h2 id="services-list-heading" className="sr-only">
        Design Studio Services — What We Offer
      </h2>

      {/* Scroll indicator for mobile */}
      {isMobile && showScrollIndicator && (
        <div className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs animate-pulse">
          Scroll to see more
        </div>
      )}

      {services.map((service, index) => (
        <article
          key={service.id}
          ref={(el) => (cardRefs.current[index] = el)}
          onClick={() => handleCardClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          className={`
                        relative w-full cursor-pointer border-b border-[#4E4E4E] last:border-b-0 overflow-hidden flex flex-col
                        ${
                          index === openIndex
                            ? "bg-[#313131] text-white py-[12px] sm:py-[20px] xl:py-[28px] gap-2 lg:gap-4"
                            : "bg-[#121212] text-white hover:bg-[#1a1a1a]"
                        }
                    `}
          style={
            index === openIndex
              ? { flex: "0 0 auto" }
              : {
                  flex: isMobile ? "0 0 auto" : "1 0 auto",
                  minHeight: isMobile ? 50 : 45,
                  height: "auto",
                }
          }
        >
          {/* Card Header - Always Visible */}
          <div
            className={`card-header px-[16px] sm:px-[24px] lg:px-[32px] flex items-center ${
              index === openIndex ? "" : "h-full"
            }`}
          >
            <h3
              className={`
                            card-title uppercase font-antonio text-[18px] sm:text-[20px] lg:text-[26px] font-[300] leading-tight
                            ${index === openIndex ? "text-white" : "text-white"}
                        `}
            >
              {service.title}
            </h3>
          </div>
          {/* Card Content - Always present, visibility controlled by class */}
          <div
            className={`card-content px-[16px] sm:px-[24px] lg:px-[32px]${
              index === openIndex
                ? " card-content--open"
                : " card-content--closed"
            }`}
          >
            <div className="space-y-[12px] sm:space-y-[16px] lg:space-y-[20px]">
              <p className="font-antonio text-[14px] sm:text-[15px] lg:text-[16px] font-[400] leading-relaxed text-white line-height-[24px] md:line-height-[20px]">
                {service.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default RightSecContent;
