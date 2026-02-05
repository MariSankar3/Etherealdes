"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import CaseStudyModal from "./CaseStudyModal";
import { useRouter } from "next/navigation";
import { CASE_STUDY } from "../case-study/caseStudyData";

function RightSecContent() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const tooltipRef = useRef(null);
  const exitTimeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (hoveredImage && tooltipRef.current) {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
      gsap.set(tooltipRef.current, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
        x: 0,
        y: 0,
      });
      gsap.to(tooltipRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [hoveredImage]);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (image) => {
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
    setHoveredImage(image);
  };

  const handleMouseMove = (e) => {
    if (!tooltipRef.current) return;
    const tooltipWidth = 300;
    const tooltipHeight = 215;
    let x = e.clientX + 20;
    let y = e.clientY + 20;
    if (x + tooltipWidth > window.innerWidth)
      x = window.innerWidth - tooltipWidth - 20;
    if (y + tooltipHeight > window.innerHeight)
      y = window.innerHeight - tooltipHeight - 20;
    gsap.to(tooltipRef.current, { x, y, duration: 0.1, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    exitTimeoutRef.current = setTimeout(() => {
      if (tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setHoveredImage(null),
        });
      } else {
        setHoveredImage(null);
      }
    }, 50);
  };

  const handleCardClick = (caseStudy) => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setSelectedCaseStudy(caseStudy);
      setIsModalOpen(true);
    } else {
      localStorage.setItem("selectedCaseStudyId", caseStudy.id);
      router.push("/work/case-study");
    }
  };

  return (
    /* ===== Semantic Section ===== */
    <section
      aria-labelledby="case-studies-heading"
      className="relative md:h-full"
    >
      {/* ===== SEO ONLY ===== */}
      <h2 id="case-studies-heading" className="sr-only">
        Selected Client Case Studies and Work Portfolio
      </h2>

      {/* Tooltip preview (visual only) */}
      {hoveredImage && (
        <img
          ref={tooltipRef}
          src={hoveredImage}
          alt=""
          aria-hidden="true"
          className="fixed z-50 w-[300px] h-[175px] object-cover pointer-events-none rounded-lg hidden md:block"
          style={{
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.6)",
            top: 0,
            left: 0,
          }}
        />
      )}

      {/* Case Study Modal */}
      <CaseStudyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseStudy={selectedCaseStudy}
      />

      {/* Case Study Grid */}
      <div
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 h-full pl-[1px]"
      >
        {CASE_STUDY.map((case_study, idx) => {
          const isDisabled = case_study.detailsKey === "more_projects";
          return (
            <article
              key={idx}
              role="listitem"
              aria-label={case_study.title}
              className={`group relative flex flex-col border-[1px_1px_0_0] border-[#4F4E4E] justify-center items-center w-full h-[90px] md:h-full gap-2 p-6 overflow-hidden transition-colors duration-300 hover:bg-[#ffffff0f]
              ${isDisabled ? "cursor-default" : "cursor-pointer"}`}
              onMouseEnter={() =>
                isDisabled ? null : handleMouseEnter(case_study.image)
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() =>
                isDisabled ? null : handleCardClick(case_study)
              }
            >
              {/* Crawlable title */}
              <span className="sr-only">{case_study.title}</span>

              <img
                src={case_study.clientIcon}
                className="transition-all duration-300 w-16 h-16 object-contain xl:w-[80px] xl:h-[80px]"
                alt={`${case_study.title} client logo`}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RightSecContent;
