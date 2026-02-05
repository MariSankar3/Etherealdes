"use client";

import React, { useState, useEffect, useRef } from "react";
import { ROUTE } from "../../constants/constants";
import { Android, Arrow, Chrome, IOS } from "../../components/icons/icons";
import Link from "next/link";
import { caseStudyData } from "./caseStudyDetails";

function CaseStudyInfo({ caseStudyId, caseStudyDetails }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("goal");
  const scrollContainerRef = useRef(null);
  const sectionElementsRef = useRef(new Map());
  const tickingRef = useRef(false);

  // Use provided caseStudyDetails or fallback to default
  const details = caseStudyDetails || caseStudyData.jugl;
  const sections = details.sections;

  const getOpacityClass = (sectionId) => {
    const activeIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    const currentIndex = sections.findIndex(
      (section) => section.id === sectionId
    );
    const distance = Math.abs(currentIndex - activeIndex);
    switch (distance) {
      case 0:
        return "opacity-100";
      case 1:
        return "opacity-60";
      case 2:
        return "opacity-40";
      case 3:
        return "opacity-30";
      case 4:
        return "opacity-20";
      default:
        return "opacity-10";
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      sections.forEach((section) => {
        const element = scrollContainer.querySelector(`#${section.id}`);
        if (element) {
          sectionElementsRef.current.set(section.id, element);
        }
      });
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = scrollContainerRef.current?.scrollTop || 0;
          setIsScrolled(scrollPosition > 80);
          const targetPosition = 250 + 20;
          let newActiveSection = "goal";
          let minDistance = Infinity;

          sectionElementsRef.current.forEach((element, id) => {
            const elementTop = element.offsetTop;
            const distance = Math.abs(
              elementTop - scrollPosition - targetPosition
            );
            if (distance < minDistance) {
              minDistance = distance;
              newActiveSection = id;
            }
          });

          setActiveSection((prev) =>
            prev !== newActiveSection ? newActiveSection : prev
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        sectionElementsRef.current.clear();
      };
    }
  }, [sections]);

  // Handle smooth scrolling to sections with proper offset
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    const element = sectionElementsRef.current.get(sectionId);
    if (element) {
      const scrollContainer = scrollContainerRef.current;
      const elementTop = element.offsetTop;
      const topBarHeight = 260;
      const offset = 20;
      scrollContainer.scrollTo({
        top: elementTop - topBarHeight - offset,
        behavior: "smooth",
      });
    }
  };

  const renderContentItem = (item, index) => {
    switch (item.type) {
      case "block":
        return (
          <div key={index} className={item.className || "flex flex-col gap-2"}>
            {item.items.map((child, childIndex) =>
              renderContentItem(child, childIndex)
            )}
          </div>
        );
      case "span":
        return (
          <span key={index} className={item.className || undefined}>
            {item.text}
          </span>
        );
      case "paragraph":
        return (
          <p key={index} className={item.className || undefined}>
            {item.text}
          </p>
        );
      case "list":
        return (
          <div key={index} className={item.className || undefined}>
            <ul>
              {item.items.map((li, liIndex) => {
                // If li is an array of nodes, render accordingly
                if (Array.isArray(li)) {
                  return (
                    <li key={liIndex}>
                      {li.map((spanItem, spanIndex) =>
                        renderContentItem(spanItem, spanIndex)
                      )}
                    </li>
                  );
                }
                // If li is a string, render plain text
                return <li key={liIndex}>{li}</li>;
              })}
            </ul>
          </div>
        );
      case "cards":
        return (
          <div key={index}>
            <div className={item.layout}>
              {item.cards.map((card, cardIdx) => (
                <div
                  key={cardIdx}
                  className="p-8 flex flex-col justify-center items-center gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                >
                  {card.title && (
                    <div className={card.textClass || ""}>{card.title}</div>
                  )}
                  {card.number && (
                    <div className="text-[52px] font-semibold">
                      {card.number}
                    </div>
                  )}
                  {card.footer && (
                    <div className="font-bold">{card.footer}</div>
                  )}
                  {card.note && (
                    <div className={card.textClass || "text-[#ffffffb3]"}>
                      {card.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case "h3":
        return (
          <h3 key={index} className={item.className || undefined}>
            {item.text}
          </h3>
        );
      case "image":
        return (
          <div key={index} className={item.wrapperClassName || ""}>
            <img
              src={item.src}
              alt={item.alt}
              className={item.className || ""}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 flex flex-col overflow-auto w-full"
    >
      {/* Top bar */}
      <div
        className={`flex flex-col sm:flex-row border-b border-[#4F4E4E] md:sticky top-0 z-10 transition-all duration-900 ease-in-out ${
          isScrolled ? "md:h-[250px]" : "md:h-[400px]"
        }`}
      >
        <div className="flex-1 sm:flex flex-col justify-center bg-[#121212]">
          <div className="flex flex-col p-[30px] gap-4 justify-center">
            <Link href={"/work"} className="cursor-pointer md:hidden">
              <Arrow className="p-1 w-6 h-6 -rotate-180 text-white" />
            </Link>
            <div className="text-[16px] text-[#FFFFFF99] font-antonio ">
              {caseStudyId || "Case Study"}
            </div>
            <div className="uppercase text-[26px] text-white font-anton">
              {details.title}
            </div>
            <div className="flex">
              <div className="flex gap-2">
                <IOS className="w-6 h-6 text-white" />
                <Chrome className="w-6 h-6 text-white" />
                <Android className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <Link
                href={ROUTE.GET_IN_TOUCH.PATH}
                className="w-fit flex items-center gap-2.5 font-antonio text-[16px] bg-[#FF4E21] p-[10px] text-white"
              >
                Contact us
                <Arrow className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-px sm:w-px sm:h-full bg-[#4E4E4E]"></div>
        <div className="flex-1 sm:block w-full border-[#4F4E4E] border-b">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={details.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="h-[2px] bg-[#4F4E4E] w-full"></div>
      <div className="case-study font-raleway flex justify-center flex-1 pt-[24px] md:pt-[40px] sm:px-[80px]">
        <div className="grid md:grid-cols-[auto_1fr] gap-1 md:gap-4 justify-between max-w-[1100px] ">
          <div className="hidden md:flex w-full xl:min-w-[283px] 2xl:min-w-[323px] md:sticky top-[250px] h-fit text-white px-[16px] md:p-[10px] xl:p-[20px] 2xl:p-[40px] gap-4 flex-col text-[21px] font-400 font-anton">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={(e) => handleSectionClick(e, section.id)}
                className={`transition-all duration-500 ease-in-out transform hover:scale-105 text-left ${getOpacityClass(
                  section.id
                )}`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col text-white justify-center px-[16px] md:px-0">
            {sections.map((section) => (
              <div
                key={section.id}
                className="p-[40px_0px] flex flex-col gap-4"
              >
                <div className="flex flex-col">
                  <h1
                    id={section.id}
                    className="font-antonio text-[#DBF900] font-[400] text-[16px]"
                  >
                    {section.label}
                  </h1>
                  <h2 className="font-anton font-400 text-[26px] text-white upper">
                    {section.subtitle}
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  {section.content.map((item, index) =>
                    renderContentItem(item, index)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyInfo;
