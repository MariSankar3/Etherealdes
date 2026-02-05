import React from "react";
import { NavigationDots } from "./NavigationDots";

export const MainContent = () => {
  return (
    <section className="flex relative flex-col flex-1 shrink items-start self-stretch p-10 basis-0 min-w-60 max-md:px-5 max-md:max-w-full">
      <header className="flex z-0 gap-3 items-end">
        <div className="flex w-12 min-h-12" />
      </header>
      <article className="text-primary z-0 self-stretch py-10 mt-36 w-full max-md:mt-10 max-md:max-w-full">
        <h2 className="text-7xl font-bold uppercase leading-[91px] max-md:max-w-full max-md:text-4xl max-md:leading-[51px]">
          Design That Speaks Connects & Converts
        </h2>
        <div className="flex flex-wrap gap-10 mt-10 w-full text-2xl font-light leading-7 text-white tracking-[4.8px] max-md:max-w-full">
          <div className="flex shrink-0 h-[54px] w-[100px]" />
          <p className="flex-1 shrink self-start basis-0 max-md:max-w-full">
            We bring clarity to your product through smart UX and
            impactful visuals
          </p>
        </div>
      </article>
      <NavigationDots />
    </section>
  );
}
