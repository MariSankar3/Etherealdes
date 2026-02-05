import React from "react";

export const NavigationDots = () => {
  return (
    <nav className="flex absolute right-0 bottom-0 z-0 flex-col justify-center items-end px-4 py-10 w-[59px]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f9a69aef33164914dd8fc23201ce267195be06?placeholderIfAbsent=true&apiKey=1da207a400644bd1b0d011cc01c5f64a"
        className="object-contain w-full aspect-[13.51]"
        alt="Navigation dot active"
      />
      {[...Array(4)].map((_, index) => (
        <img
          key={index}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8caeb11061024056422c96e448baadb23ffa3445?placeholderIfAbsent=true&apiKey=1da207a400644bd1b0d011cc01c5f64a"
          className="object-contain mt-8 w-full aspect-[10.53]"
          alt="Navigation dot"
        />
      ))}
    </nav>
  );
}
