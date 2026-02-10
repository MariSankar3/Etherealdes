import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Redirect } from "../../../icons/icons";

function Fifth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [isMobile, setIsMobile] = React.useState(false);

React.useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);


  return (
    <section
      ref={ref}
      aria-labelledby="work-portfolio"
      className="flex-1 flex flex-col h-full"
    >
      {/* Animated background image */}
      <motion.img
        src= {isMobile ? "/work-laptop.png" : "/laptop_img.png"}
        alt="Design studio portfolio preview on laptop screen"
        className="inset-0 w-full h-[85%] px-4 sm:px-0 object-contain sm:object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
        loading="lazy"

      />

      {/* CTA Link - Slide up */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="bottom-0 left-0 right-0 border-t border-[#4F4E4E]"
      >
        <Link
          href="/work"
          className="font-antonio text-[24px] bg-[#121212] flex justify-center items-center p-[8px] sm:p-[16px] md:p-[20px] lg:p-[34px] xl:p-[40px] text-[#DBF900]"
        >
          Work
          <Redirect />
        </Link>
      </motion.div>
    </section>
  );
}

export default Fifth;
