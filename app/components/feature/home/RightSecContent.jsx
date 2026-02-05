"use client";

import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import First from "./RightSecContents/First";
import Second from "./RightSecContents/Second";
import Third from "./RightSecContents/Third";
import Fourth from "./RightSecContents/Fourth";
import Fifth from "./RightSecContents/Fifth";
import FirstSlide from "./RightSecContents/FirstSlide";

export const mobComponents = [FirstSlide, Second, Third, Fourth, First, Fifth];

const RightSecContent = forwardRef(
  ({ index, onIndexChange, onEmblaReady }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: true,
      align: "start",
      dragFree: false,
      speed: 20,
    });

    const isReadyRef = useRef(false);

    const components = [Second, Third, Fourth, First, Fifth];

    const isAnimatingRef = useRef(false);
    // Track animation state to avoid multiple advances while animating
    useEffect(() => {
      if (!emblaApi) return;
      const onScroll = () => {
        isAnimatingRef.current = true;
      };
      const onSettle = () => {
        isAnimatingRef.current = false;
      };
      emblaApi.on("scroll", onScroll);
      emblaApi.on("settle", onSettle);
      return () => {
        emblaApi.off("scroll", onScroll);
        emblaApi.off("settle", onSettle);
      };
    }, [emblaApi]);

    // Expose Embla API to parent so it can handle global wheel
    useEffect(() => {
      if (emblaApi && typeof onEmblaReady === "function") {
        onEmblaReady(emblaApi);
      }
    }, [emblaApi, onEmblaReady]);

    // Sync incoming index from parent to Embla (only if different)
    useEffect(() => {
      if (!emblaApi) return;
      if (!isReadyRef.current) {
        isReadyRef.current = true;
        emblaApi.reInit();
      }
      const target = (index || 0) % components.length;
      const current = emblaApi.selectedScrollSnap();
      if (current !== target) {
        emblaApi.scrollTo(target);
      }
    }, [index, emblaApi, components.length]);

    // Emit index to parent on user scroll/select
    useEffect(() => {
      if (!emblaApi) return;
      const onSelect = () => {
        const snap = emblaApi.selectedScrollSnap();
        if (typeof onIndexChange === "function") {
          onIndexChange(snap);
        }
      };
      emblaApi.on("select", onSelect);
      emblaApi.on("reInit", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
      };
    }, [emblaApi, onIndexChange]);

    return (
      <div className="flex flex-1 overflow-auto flex-col md:gap-4 sm:border-none lg:min-h-[400px] sm:min-h-0 h-full">
        {/* Desktop Layout (Embla viewport + container) */}
        <div
          ref={emblaRef}
          className="hidden sm:block overflow-hidden p-0 h-full border-t border-[#4F4E4E] sm:border-none"
        >
          <div className="flex h-full touch-pan-y">
            {components.map((Component, i) => (
              <div
                key={i}
                className="h-full md:h-full"
                style={{ flex: "0 0 100%" }}
              >
                <Component />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - keep as-is (index-driven) */}
        <div className="sm:hidden w-full h-full overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            {mobComponents[index] && React.createElement(mobComponents[index])}
            {!mobComponents[index] && (
              <div className="text-white text-center">
                Component not found for index: {index}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default RightSecContent;
