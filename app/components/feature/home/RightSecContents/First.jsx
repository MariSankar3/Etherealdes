import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function First() {
  const pRef = useRef(null);

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        } else {
          gsap.set(el, { opacity: 0, y: 40 });
        }
      });
    };

    const observer = new window.IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="h-full flex flex-col justify-center font-antonio items-center text-[18px] sm:text-[24px] font-300">
      <meta itemProp="name" content="Ethereal Design Studio" />
<meta itemProp="serviceType" content="Design Studio" />

      <h2 id="about-design-studio" className="sr-only">
      About Ethereal Design Studio
      </h2>

      <p
        ref={pRef}
        itemProp="description"
        className="w-full sm:max-w-[75%] p-[20px] sm:p-0 text-justify leading-relaxed"
        style={{ letterSpacing: "0em" }}
      >
        At Ethereal Design, we believe that good design is invisible — it just
        works. We don’t just push pixels; we understand your users, your
        business, and your challenges. Our team brings together strategy,
        creativity, and deep UX thinking to craft digital experiences that are
        intuitive, delightful, and results-driven.
      </p>
    </section>
  );
}

export default First;
