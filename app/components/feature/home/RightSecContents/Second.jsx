"use client";

import React, { useRef, useEffect } from "react";
import CubeImg from "../../../common/CubeImg";
import { motion, useInView, useAnimation } from "framer-motion";

import gsap from "gsap";

function Second() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const subtextRef = useRef(null);

  // Split subtext into lines (for this example, 2 lines)
  const subtextLines = [
    "You'll always know what you're paying — no surprises or hidden costs. ",
    "",
  ];
   const metadata = {
  title: "Simple Pricing – Transparent Plans with No Hidden Costs",
  description: "Understand our simple pricing. No hidden fees. No surprises.",
};


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
        rotate: [0, -12, 12, 0],
        scale: [1, 1.08, 1.08, 1],
        y: [0, -6, -6, 0],
        transition: {
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    } else {
      wavingControls.stop();
    }
  }, [isInView, wavingControls]);

  return (
    <section
      ref={ref}
      className="flex flex-col justify-between md:gap-[25px] pt-[20px] font-antonio font-300 w-full h-[100%] md:min-h-[400px] md:mb-10"
    >
      {/* Animated Title Words: Slide-up, fade-in, scale/skew, synchronized */}
      <h2 id="pricing-title" className="sr-only">
  Simple Pricing
</h2>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {},
        }}
        className="flex flex-wrap items-baseline pl-[15px] md:p-[24px] mb-4 sm:mb-0"
      >
        
        {"Simple Pricing".split(" ").map((word, idx) => (
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
            aria-label={word}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtext Animation: Each line slides up with GSAP, in sync */}
      <div className="w-full flex justify-end items-end md:pr-[20px] px-[15px] sm:pr-[20px] mt-4 sm:mt-0">
        <p className="sr-only">
  You'll always know what you're paying — no surprises or hidden costs.
</p>

        <div
          ref={subtextRef}
          className="w-[180px] sm:w-[250px] xl:w-[300px]"
          style={{ minHeight: 56 }}
        >
          {subtextLines.map((line, idx) => (
            <div
              key={idx}
              style={{ transform: "translateY(32px)", opacity: 0 }}
              className="sm:w-[250px] xl:w-[300px] text-[16px] font-thin md:font-normal md:text-[20px] justify-end"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full h-[400px] md:h-[550px] md:mt-[40px]">
        <div className="absolute inset-0 flex items-end ">
          <img
            src="./home/slide_1/smile-bg.png"
            alt="Design that connects"
            className="w-full h-auto object-fill sm:hidden xl:h-[60vh]"
            loading="lazy"
          />
        </div>

          <img
            src="./home/slide_1/yellow-bg.svg"
            alt="Simple Pricing"
            className="h-auto md:h-[90%] lg:h-[85%] object-contain hidden sm:block absolute bottom-0 right-0"
            loading="lazy"
          />

        <img
          src="./home/slide_1/dots.svg"
          alt="Decorative dotted pattern for pricing section"
          className="h-[65%] md:h-[68%] xl:h-[60%] object-fill hidden sm:block absolute top-[-15%] xl:top-[-10%] right-[5%]"
          loading="lazy"
        />

        <img
          src="./home/slide_1/box.svg"
          alt="3D cube illustration for pricing section"
          className="w-[20vw] md:w-[15vw] 2xl:w-[10vw] h-auto object-contain hidden sm:block absolute bottom-[-10%] left-[-5%]"
          loading="lazy"
        />

        <div className="absolute left-[10%] sm:bottom-[15%] bottom-[25%] xl:bottom-[35%] w-[135px] md:w-[160px] xl:w-[32%] xl:left-[15%] sm:top-[5%] xl:top-[0]">
          <motion.img
            src="./home/slide_1/your-smile-balls.svg"
            alt="Animated pricing feature illustration"
            loading="lazy"
            className="w-full h-full object-contain"
            animate={wavingControls}
            initial={{ rotate: 0, scale: 1 }}
          />
        </div>

        <div className="absolute sm:right-[10%] sm:bottom-[5%] right-[5%] bottom-[3%] w-[100px] xl:w-[20%] lg:w-[120px]">
          <motion.img
            src="./home/slide_1/smile-2.svg"
            alt="Animated pricing visual element"
            className="w-full h-full object-contain"
            loading="lazy"
            animate={wavingControls}
            initial={{ rotate: 0, scale: 1 }}
          />
        </div>
      </div>
    </section>
    
  );
  <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Simple Pricing",
  "description": "Transparent pricing with no hidden costs",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
})}
</script>

}

export default Second;
