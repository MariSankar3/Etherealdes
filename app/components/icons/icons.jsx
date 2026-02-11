export function Linkedin({ className = "" }) {
  return (
    <svg className={`w-12 h-6 ${className}`}>
      <use href="/icons/icons.svg#linkedin" />
    </svg>
  );
}
export function ChevronRight({ className = "" }) {
  return (
    <svg className={`w-6 h-6 ${className}`}>
      <use href="/icons/icons.svg#chevron-right" />
    </svg>
  );
}

export function Hamburger({ className = "" }) {
  return (
    <svg className={`w-12 h-6 text-white ${className}`}>
      <use href="/icons/icons.svg#hamburger" />
    </svg>
  );
}

export function Close({ className = "" }) {
  return (
    <svg className={`w-12 h-6 ${className}`}>
      <use href="/icons/icons.svg#close" />
    </svg>
  );
}
export function Indicator({ className = "", ...props }) {
  return (
    <div className={`w-[15px] h-fit border-b ${className}`} {...props}></div>
  );
}

export function IOS({ className = "" }) {
  return (
    <svg className={`w-6 h-6 ${className}`}>
      <use href="/icons/ios.svg" />
    </svg>
  );
}

export function Chrome({ className = "" }) {
  return (
    <svg className={`w-6 h-6 ${className}`}>
      <use href="/icons/chrome.svg" />
    </svg>
  );
}

export function Android({ className = "" }) {
  return (
    <svg className={`w-6 h-6 ${className}`}>
      <use href="/icons/android.svg" />
    </svg>
  );
}

export function Redirect({ className = "" }) {
  return (
    <svg className={`w-8 h-8 text-[#DBF900] ${className}`}>
      <use href="/icons/icons.svg#redirect" />
    </svg>
  );
}

export function Arrow({ className = "" }) {
  return (
    <svg className={`text-[#FFFFFF] ${className}`}>
      <use href="/icons/icons.svg#arrow" />
    </svg>
  );
}
