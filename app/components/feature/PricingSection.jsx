import React from "react";

export const PricingSection = () => {
  return (
    /* ===== Semantic Section ===== */
    <section
      aria-labelledby="pricing-heading"
      className="self-stretch my-auto min-w-60 w-[537px] max-md:max-w-full"
    >
      {/* ===== Navigation Tabs ===== */}
      <nav
        aria-label="Pricing navigation"
        className="flex flex-wrap items-center w-full text-base text-center text-white border-b-2 border-neutral-600 max-md:max-w-full"
      >
        <button
          type="button"
          aria-label="View work"
          className="flex-1 shrink gap-2.5 self-stretch px-4 py-6 my-auto whitespace-nowrap border-r-2 basis-0 border-neutral-600 min-w-60"
        >
          Work
        </button>

        <button
          type="button"
          aria-label="Get in touch"
          className="flex-1 shrink gap-2.5 self-stretch px-4 py-6 my-auto basis-0 min-w-60"
        >
          Get in Touch
        </button>
      </nav>

      {/* ===== Content ===== */}
      <article className="flex flex-col px-14 mt-14 text-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
        
        {/* SEO Heading */}
        <h2
          id="pricing-heading"
          className="self-start text-4xl leading-none"
        >
          Simple Pricing
        </h2>

        {/* SEO Description */}
        <p className="mt-56 text-xl font-light leading-6 max-md:mt-10">
          You'll always know what you're paying — no surprises, no hidden
          costs, and complete pricing transparency.
        </p>
      </article>

      {/* ===== Visual Illustration ===== */}
      <figure
        className="flex overflow-hidden gap-2.5 justify-center items-center mt-16 bg-neutral-900 h-[429px] max-md:mt-10 max-md:mr-1.5"
        aria-labelledby="pricing-image-caption"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f3e9f6e84cd854648fe291544cb42704db17bc7?placeholderIfAbsent=true&apiKey=1da207a400644bd1b0d011cc01c5f64a"
          className="object-contain self-stretch my-auto aspect-[1.22] min-w-60 w-[524px]"
          alt="Illustration explaining simple and transparent pricing"
        />
        <figcaption id="pricing-image-caption" className="sr-only">
          Simple pricing illustration representing transparency and clarity.
        </figcaption>
      </figure>
    </section>
  );
};
