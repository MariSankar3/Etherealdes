"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTE } from "../../constants/constants";
import { Android, Arrow, Chrome, IOS } from "../../components/icons/icons";
import { caseStudyData } from "./caseStudyDetails";

function CaseStudyInfo({ caseStudyId, caseStudyDetails }) {
  const details = caseStudyDetails || caseStudyData.jugl;
  const sections = details.sections;

  const scrollRef = useRef(null);
  const sectionRefs = useRef(new Map());

  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerStateRef = useRef(false);

  /* ---------------------------------
     CACHE SECTION ELEMENTS
  ----------------------------------*/
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    sections.forEach((s) => {
      const el = container.querySelector(`#${s.id}`);
      if (el) sectionRefs.current.set(s.id, el);
    });

    return () => sectionRefs.current.clear();
  }, [sections]);

  /* ---------------------------------
     SCROLL HANDLER (STABLE)
  ----------------------------------*/
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let raf = null;

    const onScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const top = container.scrollTop;

        // header shrink (one-time toggle)
        if (!headerStateRef.current && top > 120) {
          headerStateRef.current = true;
          setIsScrolled(true);
        }
        if (headerStateRef.current && top < 40) {
          headerStateRef.current = false;
          setIsScrolled(false);
        }

        // active section detection
        let closest = activeSection;
        let min = Infinity;

        sectionRefs.current.forEach((el, id) => {
          const d = Math.abs(el.offsetTop - top - 20);
          if (d < min - 25) {
            min = d;
            closest = id;
          }
        });

        setActiveSection((p) => (p === closest ? p : closest));
        raf = null;
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  /* ---------------------------------
     SIDEBAR OPACITY
  ----------------------------------*/
  const getOpacity = (id) => {
    const ai = sections.findIndex((s) => s.id === activeSection);
    const ci = sections.findIndex((s) => s.id === id);
    const d = Math.abs(ai - ci);

    return (
      ["opacity-100", "opacity-60", "opacity-40", "opacity-30", "opacity-20"][
        d
      ] || "opacity-10"
    );
  };

  /* ---------------------------------
     SCROLL TO SECTION
  ----------------------------------*/
  const goToSection = (e, id) => {
    e.preventDefault();
    const el = sectionRefs.current.get(id);
    if (!el) return;

    scrollRef.current.scrollTo({
      top: el.offsetTop - 20,
      behavior: "smooth",
    });
  };

  /* ---------------------------------
     CONTENT RENDERER
  ----------------------------------*/
  const renderItem = (item, i) => {
    switch (item.type) {
      case "block":
        return (
          <div key={i} className={item.className || "flex flex-col gap-4"}>
            {item.items.map(renderItem)}
          </div>
        );

      case "span":
        return (
          <span key={i} className={item.className}>
            {item.text}
          </span>
        );

      case "paragraph":
        return (
          <p key={i} className={item.className}>
            {item.text}
          </p>
        );

      case "list":
        return (
          <ul key={i} className={item.className}>
            {item.items.map((li, j) => (
              <li key={j}>{Array.isArray(li) ? li.map(renderItem) : li}</li>
            ))}
          </ul>
        );

      case "cards":
        return (
          <div key={i}>
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
          <h3 key={i} className={item.className}>
            {item.text}
          </h3>
        );

      case "image":
        return (
          <div key={i} className={item.wrapperClassName || "w-full my-6"}>
            <img
              src={item.src}
              alt={item.alt || ""}
              className={item.className || "w-full rounded-xl"}
              loading="lazy"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#121212]">
      {/* ================= HEADER ================= */}
      <div
        className={`sticky top-0 z-20 transition-[height] duration-500 ease-out
        ${isScrolled ? "h-[250px]" : "h-[400px]"}
        flex border-b border-[#4F4E4E]`}
      >
        <div className="flex-1 flex flex-col justify-center gap-4 p-8 text-white">
          <Link href="/work" className="md:hidden">
            <Arrow className="w-6 h-6 -rotate-180" />
          </Link>

          <div className="text-[#ffffff99] font-antonio text-[16px]">
            {caseStudyId || "Case Study"}
          </div>

          <div className="text-[26px] uppercase font-anton">
            {details.title}
          </div>

          <div className="flex gap-2">
            <IOS className="w-6 h-6" />
            <Chrome className="w-6 h-6" />
            <Android className="w-6 h-6" />
          </div>

          <Link
            href={ROUTE.GET_IN_TOUCH.PATH}
            className="w-fit flex items-center gap-2 bg-[#FF4E21] px-4 py-2 font-antonio"
          >
            Contact us <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="hidden md:block w-1/2 border-l border-[#4F4E4E] border-b">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={details.videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-1 overflow-hidden font-raleway">
        <div className="max-w-[1100px] mx-auto w-full flex">
          {/* LEFT (STABLE) */}
          <div className="hidden md:flex w-[260px] shrink-0 flex-col gap-4 p-6 text-white font-anton">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={(e) => goToSection(e, s.id)}
                className={`text-left text-[24px] transition-opacity duration-300 ${getOpacity(
                  s.id,
                )}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* RIGHT (SCROLLS) */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto px-6 py-10 text-white"
          >
            <div className="flex flex-col gap-16">
              {sections.map((s) => (
                <section key={s.id} id={s.id}>
                  <h1 className="text-[#DBF900] text-[16px] font-antonio">
                    {s.label}
                  </h1>
                  <h2 className="text-[26px] font-anton mb-4">{s.subtitle}</h2>

                  <div className="flex flex-col gap-4">
                    {s.content.map(renderItem)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyInfo;
