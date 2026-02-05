"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import en from 'react-phone-number-input/locale/en.json';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';

// Dynamic import to prevent SSR issues
const PhoneInputWithCountry = React.lazy(() => import('react-phone-number-input'));

// function countryCodeToFlagEmoji(countryCode) {
//   if (!countryCode) return '🌐';
//   return countryCode
//     .toUpperCase()
//     .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
// }

function countryCodeToFlagEmoji(code) {
  if (!code) return '🌐';
  const emoji = code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  );
  return emoji;
}

const CustomCountrySelect = ({ value, onChange, disabled, name, onFocus, onBlur, theme }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const countries = useMemo(() => getCountries(), []);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    const term = searchTerm.toLowerCase();
    return countries.filter(c => 
      en[c]?.toLowerCase().includes(term) || 
      getCountryCallingCode(c).includes(term) ||
      c.toLowerCase().includes(term)
    );
  }, [countries, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const selected = value || 'IN';

  return (
    <div ref={containerRef} className="relative select-none">
      <button
        type="button"
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-2 py-1 rounded-sm"
        style={{
          color: theme.textColor,
          background: 'transparent',
          border: '1px solid transparent',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-xl">
          {countryCodeToFlagEmoji(selected)}
        </span>
        {/* <span className="text-base opacity-80">
          +{getCountryCallingCode(selected)}
        </span> */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke={theme.countryArrowColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute mt-2 w-[320px] max-h-[280px] overflow-hidden rounded-md shadow-lg z-50"
          style={{
            background: theme.dropdownBg,
            border: `1px solid ${theme.dropdownBorder}`,
          }}
        >
          {/* Search Input */}
          <div className="p-3 border-b" style={{ borderBottomColor: theme.dropdownBorder }}>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded border-none outline-none"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: theme.dropdownText,
                border: `1px solid ${theme.dropdownBorder}`,
              }}
            />
          </div>

          {/* Countries List */}
          <div className="max-h-[220px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <div
                  key={c}
                  role="option"
                  aria-selected={c === selected}
                  onClick={() => { onChange(c); setOpen(false); setSearchTerm(''); }}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer text-sm"
                  style={{
                    color: theme.dropdownText,
                    background: c === selected ? theme.dropdownSelectedBg : 'transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = theme.dropdownHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = c === selected ? theme.dropdownSelectedBg : 'transparent'; }}
                >
                  <span className="text-lg w-6 text-center flag-emoji" aria-hidden="true">{countryCodeToFlagEmoji(c)}</span>
                  <span className="flex-1 truncate">{en[c]}</span>
                  <span className="opacity-70">+{getCountryCallingCode(c)}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm opacity-70" style={{ color: theme.dropdownText }}>
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PhoneInput = ({ 
  value, 
  onChange, 
  error, 
  placeholder = "Contact phone #",
  className = "",
  required = false,
  variants = null,
  // theme props
  borderColor = '#4F4E4E',
  focusBorderColor = '#FF4E21',
  textColor = '#FFFFFF',
  placeholderColor = '#9CA3AF',
  errorBgColor = 'rgba(0,0,0,0.8)',
  errorTextColor = '#F87171',
  countryArrowColor = '#FF4E21',
  defaultCountry = 'IN',
  // optional dropdown theme overrides
  dropdownBg,
  dropdownBorder,
  dropdownText,
  dropdownHoverBg,
  dropdownSelectedBg,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import('react-phone-number-input/style.css').catch(() => {
      console.warn('Phone input CSS failed to load');
    });
  }, []);

  const theme = {
    textColor,
    borderColor,
    focusBorderColor,
    placeholderColor,
    errorBgColor,
    errorTextColor,
    countryArrowColor,
    dropdownBg: dropdownBg ?? (textColor?.toLowerCase() === '#ffffff' ? 'rgba(0,0,0,0.95)' : '#FFFFFF'),
    dropdownBorder: dropdownBorder ?? borderColor,
    dropdownText: dropdownText ?? (textColor?.toLowerCase() === '#ffffff' ? '#FFFFFF' : '#121212'),
    dropdownHoverBg: dropdownHoverBg ?? (textColor?.toLowerCase() === '#ffffff' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
    dropdownSelectedBg: dropdownSelectedBg ?? (textColor?.toLowerCase() === '#ffffff' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'),
  };

  const InputShell = (
    <div 
      className="w-full h-[89px] bg-transparent border-b text-white tracking-[1px] transition-all duration-300"
      style={{
        borderBottomColor: borderColor,
        color: textColor,
      }}>
      <input
        type="tel"
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-full bg-transparent border-none outline-none font-antonio font-[100] text-[32px]"
        required={required}
        style={{ color: textColor }}
      />
    </div>
  );

  if (!isClient || hasError) {
    return (
      <motion.div variants={variants} className={`relative ${className}`}>
        {InputShell}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 left-0 text-sm font-medium px-2 py-1 rounded"
            style={{ background: errorBgColor, color: errorTextColor }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div variants={variants} className={`relative ${className}`}>
      <React.Suspense fallback={InputShell}>
        <ErrorBoundary onError={() => setHasError(true)}>
          <PhoneInputWithCountry
            international
            defaultCountry={defaultCountry}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            className="w-full h-[89px] bg-transparent border-b"
            style={{
              color: textColor,
              borderBottomColor: isFocused ? focusBorderColor : borderColor,
            }}
            countrySelectComponent={(props) => (
              <CustomCountrySelect
                {...props}
                theme={{
                  textColor: theme.textColor,
                  countryArrowColor: theme.countryArrowColor,
                  dropdownBg: theme.dropdownBg,
                  dropdownBorder: theme.dropdownBorder,
                  dropdownText: theme.dropdownText,
                  dropdownHoverBg: theme.dropdownHoverBg,
                  dropdownSelectedBg: theme.dropdownSelectedBg,
                }}
              />
            )}
          />
        </ErrorBoundary>
      </React.Suspense>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 text-sm font-medium px-2 py-1 rounded"
          style={{ background: errorBgColor, color: errorTextColor }}
        >
          {error}
        </motion.div>
      )}

      <style jsx>{`
        :global(.PhoneInputInput) {
          color: ${textColor} !important;
        }
        :global(.PhoneInputInput::placeholder) {
          color: ${placeholderColor} !important;
          opacity: 1 !important;
        }
        :global(.PhoneInputInput:focus) {
          outline: none !important;
        }
      `}</style>
    </motion.div>
  );
};

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) {
    console.error('PhoneInput Error:', error, errorInfo);
    this.props.onError?.();
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export default PhoneInput;
