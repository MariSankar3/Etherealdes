import React from "react";

export const Sidebar = () => {
  return (
    <aside className="flex self-stretch my-auto max-md:hidden">
      <nav className="flex flex-col justify-between items-center p-6 w-20 max-md:hidden max-md:px-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbfeab8c5440824f1d86c4f9084e7e9cc569c378?placeholderIfAbsent=true&apiKey=1da207a400644bd1b0d011cc01c5f64a"
          className="object-contain w-8 aspect-square"
          alt="Navigation icon top"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c11d0adf0b77f7964a097b189d9e78129ae35181?placeholderIfAbsent=true&apiKey=1da207a400644bd1b0d011cc01c5f64a"
          className="object-contain w-8 aspect-square mt-[867px] max-md:mt-10"
          alt="Navigation icon bottom"
        />
      </nav>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/45d428436b77228c5b7070d4efce16c4684544b6?placeholderIfAbsent=true&apiKey=1da207a400644bd1b0d011cc01c5f64a"
        className="object-contain shrink-0 self-start w-0"
        alt=""
      />
    </aside>
  );
}
