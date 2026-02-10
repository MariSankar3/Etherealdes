import React from "react";
import Data from "../../Config/UserConfiguration.json";
import { Indicator } from "../../components/icons/icons";

function MidSec({ activeIndex, numIndicators }) {
  const { TeamsTrust } = Data;
  const { MidSection } = TeamsTrust;
  const { Title, Para } = MidSection;

  return (
    /* ===== Semantic Section ===== */
    <section
      aria-labelledby="teams-trust-mid-heading"
      className="flex flex-col p-[20px] md:p-none gap-[16px] border-b-[1px] border-[#4E4E4E] md:border-b-none md:h-full relative"
    >
      {/* ===== Content ===== */}
      <div className="flex flex-col gap-[16px] lg:w-[350px]">
        {/* Proper heading (was plain <p>) */}
        <h2
          id="teams-trust-mid-heading"
          className="text-[40px] font-[400] md:p-[40px_0_0_20px] lg:p-[40px_0_0_40px] font-[Anton] text-[#DBF900] tracking-wider max-w-[100px]"
        >
          {Title}
        </h2>

        {/* Descriptive paragraph */}
        <p className="sm:pl-[40px] font-antonio tracking-[0.2em] sm:tracking-normal">
          {Para}
        </p>
      </div>

      {/* ===== Indicators (decorative) ===== */}
      {typeof activeIndex === "number" && numIndicators > 0 && (
        <div
          className="hidden md:flex flex-col gap-[30px] items-end absolute right-[30px] bottom-[30px] z-10"
          aria-hidden="true"
        >
          {[...Array(numIndicators)].map((_, i) => (
            <Indicator
              key={i}
              className={`transition-all duration-300 ${
                activeIndex % numIndicators === i
                  ? "text-white w-[30px]"
                  : "text-[#4F4E4E] w-[20px]"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MidSec;
