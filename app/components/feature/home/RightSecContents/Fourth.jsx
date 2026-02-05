import { motion, useInView, useAnimation } from "framer-motion";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function Fourth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const subtextRef = useRef(null);

  // Title split into words
  const titleWords = [
    "Not happy yet? No worries — ",
    "we'll make changes until you're fully satisfied.",
  ];
  // Subtext split into lines
  const subtextLines = [
    "You can keep sending design requests — we'll work on them one by one",
  ];

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

  useEffect(() => {
    if (isInView) {
      // Smiley BG animation: subtle pulse
      smileyBgControls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });

      // Smiley Face animation: bobbing effect
      smileyFaceControls.start({
        y: [0, -5, 0],
        rotate: [0, -3, 3, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });

      // Cross animation: spinning slowly
      crossControls.start({
        rotate: [0, 360],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        },
      });
    }
  }, [isInView]);

  const smileyBgControls = useAnimation();
  const smileyFaceControls = useAnimation();
  const crossControls = useAnimation();

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
    <section
      ref={ref}
      className="flex flex-col justify-between md:gap-[25px] pt-[20px] font-antonio font-300 w-full h-[100%] md:min-h-[400px] md:mb-10"
    >
      <meta itemProp="name" content="YourBrand Design Studio" />
<meta itemProp="serviceType" content="Design Studio" />

     <h2 className="sr-only">Modern Design Studio for Startups and Growing Brands</h2>
     <p className="text-[12px] uppercase tracking-widest text-gray-500 pl-[15px] md:pl-[24px] sr-only">
  Unlimited revisions by our design studio
</p>
      {/* Animated Title Words: Slide-up, fade-in, scale/skew, synchronized */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {},
        }}
        className="flex flex-wrap items-baseline pl-[15px] md:p-[24px] mb-4"
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
            className="mr-2 mb-1 capitalize md:text-400 text-[16px] sm:text-[26px] md:text-[20px] lg:text-[26px] xl:text-[34px]"
            aria-label={word}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
      <p className="sr-only">
  Our design studio offers unlimited design revisions for startups and growing brands.
  You can send design requests anytime and our team will work on them until you are fully satisfied.
</p>



      {/* Subtext Animation: Each line slides up with GSAP, in sync */}
      <div className="w-full flex justify-end items-end md:pr-[20px] px-[15px] sm:pr-[20px] mt-4 sm:mt-0">
        <div
          ref={subtextRef}
          className="w-[180px] sm:w-[250px] xl:w-[300px]"
          style={{ minHeight: 56 }}
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

      <div className="relative h-[500px] md:h-[600px] lg:h-[600px]">
        <div className="absolute bottom-0 w-full h-[100%] lg:h-full">
          <motion.img
            src="./home/slide_3/smiley_bg.svg"
            alt="Modern design studio workspace"
            className="absolute top-0 left-0 w-[70%] xl:w-[90%] block"
            // animate={smileyBgControls}
            aria-hidden="true"
             loading="lazy"
            initial={{ rotate: 0, scale: 1 }}
          />

          <motion.img
            src="./home/slide_3/smiley_face.svg"
            alt="Modern design studio workspace"
            className="absolute sm:h-[200px] xl:h-[280px] xl:w-[100%] w-[60%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={smileyFaceControls}
            initial={{ y: 0, rotate: 0 }}
            aria-hidden="true"
             loading="lazy"
          />

          {/* <motion.img
            src="./home/slide_3/smiley_face.svg"
            alt="Smiley Face"
            className="relative left-[20px] md:left-0 w-[70%] md:w-[280px] lg:w-[100%] h-[30vh] md:h-[35vh] lg:h-[40vh] xl:h-[40vh] 2xl:h-[48vh] lg:top-[15px] xl:top-[-50px] sm:block hidden"
            animate={smileyFaceControls}
            initial={{ y: 0, rotate: 0 }}
          /> */}

          <motion.img
            src="./home/slide_3/cross.svg"
            alt="Modern design studio workspace"
            className="absolute w-[55px] right-[5%] bottom-[5%] sm:hidden block"
            // animate={crossControls}
            initial={{ rotate: 0 }}
            aria-hidden="true"
            loading="lazy"
          />

          <motion.img
            src="./home/slide_3/cross_web.svg"
            alt="Modern design studio workspace"
            className="absolute w-[75px] xl:w-[100px] bottom-[10%] xl:bottom-[10%] 2xl:bottom-[20%] right-[10px] xl:right-[20px] sm:block hidden"
            // animate={smileyBgControls}
            initial={{ rotate: 0 }}
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default Fourth;
