import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import gsap from "gsap";
import CubeImg from "../../../common/CubeImg";

function Third() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const subtextRef = useRef(null);

  /* ===== SEO TEXT (single source of truth) ===== */
  const headingText = "Unlimited Revisions";
  const subtextLines = [
    "Not happy yet? No worries —",
    "we'll make changes until you're fully satisfied.",
  ];

  // Animation-only title split
  const titleWords = headingText.split(" ");

  useEffect(() => {
    if (isInView && subtextRef.current) {
      gsap.to(subtextRef.current.children, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    } else if (subtextRef.current) {
      gsap.set(subtextRef.current.children, { y: 32, opacity: 0 });
    }
  }, [isInView]);

  const wavingControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      wavingControls.start({
        rotate: [0, -10, 10, 0],
        scale: [1, 1.05, 1.05, 1],
        transition: {
          duration: 10,
          ease: "easeInOut",
        },
      });
    }
  }, [isInView, wavingControls]);

  return (
    /* ===== Semantic Section ===== */
    <section
      ref={ref}
      aria-labelledby="third-heading"
      className="flex flex-col justify-between md:gap-[25px] pt-[20px] font-antonio font-300 w-full h-[100%] md:min-h-[400px] md:mb-10"
    >
      {/* ===== SEO ONLY (Invisible to UI) ===== */}
      <h2 id="third-heading" className="sr-only">
        {headingText}
      </h2>

      <p className="sr-only">
        Not happy yet? No worries — we’ll make changes until you’re fully satisfied.
        Our unlimited revision policy ensures complete client satisfaction.
      </p>

      {/* ===== Animated Title (Visual Only) ===== */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: {} }}
        className="flex flex-wrap items-baseline pl-[15px] md:p-[24px] mb-4"
        aria-hidden="true"
      >
        {titleWords.map((word, idx) => (
          <motion.span
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 32, scale: 0.98, skewY: 0 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                skewY: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="mr-2 mb-1 capitalize text-[300] md:text-400 text-[26px] md:text-[34px]"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* ===== Subtext Animation (GSAP untouched) ===== */}
      <div className="w-full flex justify-end items-end md:pr-[20px] px-[15px] sm:pr-[20px] mt-4 sm:mt-0">
        <div
          ref={subtextRef}
          className="w-[180px] sm:w-[250px] xl:w-[300px]"
          style={{ minHeight: 56 }}
          aria-hidden="true"
        >
          {subtextLines.map((line, idx) => (
            <div
              key={idx}
              style={{ transform: "translateY(32px)", opacity: 0 }}
              className="text-[16px] font-thin md:font-normal md:text-[20px] justify-end"
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* ===== Visual Media ===== */}
      <div className="relative w-full h-[400px] md:h-[550px] md:mt-[40px]">
        <img
          src="./home/slide_2/revision_bg.png"
          alt="Design revision background grid"
          className="absolute bottom-0 left-0 w-full object-contain"
        />

        <motion.img
          src="./home/slide_2/women_revision.svg"
          alt="Illustration representing unlimited design revisions"
          className="absolute bottom-[10px] md:bottom-[20px] right-[10%] w-[65%] md:w-[280px] lg:w-[350px]"
          animate={wavingControls}
          initial={{ rotate: 0, scale: 1 }}
        />
      </div>
    </section>
  );
}

export default Third;
