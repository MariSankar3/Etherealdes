"use client";
import React, { useState, useEffect, useRef } from "react";
import UserConfiguration from "../../Config/UserConfiguration.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "../../components/icons/icons";
import { motion, useAnimationControls, useInView } from "framer-motion";

function MidSec() {
  const works = UserConfiguration.Work;
  const pathname = usePathname();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const laptopAnimationControls = useAnimationControls();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isInView) {
      laptopAnimationControls.start({
        y: [0, -10, 10, 0],
        rotate: [0, -20, 5, 0],
        transition: {
          duration: 2,
          repeat: 1,
          ease: "easeInOut",
        },
      });
    }
  }, [isInView, laptopAnimationControls]);

  return (
    <section
      aria-labelledby="solution-heading"
      className="flex flex-col items-center md:h-full border border-l-0 border-b-0 border-t-0 border-l-[#4E4E4E] border-r-[#4E4E4E] py-5 px-4 md:px-10 md:py-10 space-y-10"
    >
      <meta itemProp="serviceType" content="Design Studio" />
      <meta itemProp="areaServed" content="Worldwide" />
      <div className="flex flex-col gap-4 w-full">
        <h2
          id="solution-heading"
          className="font-anton text-[20px] uppercase 2xl:text-[24px]"
        >
          Our solution to your digital product experience
        </h2>
        <p className="sr-only">
          Our design studio helps startups and businesses design, build, and
          improve digital products through user-centered design, UI UX, and
          branding.
        </p>
      </div>
      <div
        ref={ref}
        className="h-[250px] md:h-full w-full overflow-hidden shadow-lg"
      >
        <motion.img
          className="w-full h-full object-contain"
          src={isMobile ? "/work-laptop.png" : "/laptop_img.png"}
          alt="Design studio digital product solution preview on laptop screen"
          loading="lazy"
          animate={isMobile ? {} : laptopAnimationControls}
          initial={{ y: 0, rotate: 0 }}
        />
        {/* <video
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/purple_quarder_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </section>
  );
}

export default MidSec;
