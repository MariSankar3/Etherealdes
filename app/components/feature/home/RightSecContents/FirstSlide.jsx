import React from "react";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

function MidSecContent({ index }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative sm:flex-1 bg-[#121212] flex flex-col justify-between sm:justify-center font-antonio w-full gap-4 sm:gap-[40px] px-[15px] py-[40px] sm:pt-[90px] lg:pt-[20px] sm:pl-[40px] sm:pr-[40px] h-full"
    >
      <motion.div className="flex flex-col justify-between md:justify-center gap-[16px] sm:gap-[32px] md:gap-[40px] 2xl:w-[895px] max-w-full">
        {/* Animated Title Words */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.01,
              },
            },
          }}
          className="flex flex-wrap items-baseline"
        >
          {"Design that speaks connects & converts"
            .split(" ")
            .map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.98, skewY: 0 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    skewY: 0,
                    transition: { duration: 0.5, ease: "easeIn" },
                  },
                }}
                className="mr-2 mb-1 uppercase leading-none text-[#DBF900] font-700 text-[36px] sm:text-[48px] xl:text-[96px] max-w-[90vw] sm:max-w-[90%] xl:max-w-[600px] 2xl:max-w-[800px] break-words"
                aria-label={word}
              >
                {word}
              </motion.span>
            ))}
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex justify-end">
        <p className="max-w-[180px] md:max-w-[300px] xl:max-w-[360px] leading-[20px] xs:leading-[24px] sm:leading-[30px] xl:leading-[36px] tracking-[0.16em] text-white font-300 text-[13px] xs:text-[15px] sm:text-[20px] xl:text-[24px]">
          We bring clarity to your product through smart UX and impactful
          visuals
        </p>
      </motion.div>
    </motion.div>
  );
}

export default MidSecContent;
