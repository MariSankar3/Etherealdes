"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FormInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className = "",
  variants = null,
  name,
  // theme props
  borderColor = '#4F4E4E',
  focusBorderColor = '#FF4E21',
  textColor = '#FFFFFF',
  placeholderColor = '#9CA3AF',
  errorBgColor = 'rgba(0,0,0,0.8)',
  errorTextColor = '#F87171',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const baseClasses = `
    w-full h-[89px] bg-transparent border-b 
    tracking-[1px] focus:outline-none transition-all duration-300
    font-antonio font-[100] text-[32px]
  `;

  const inputStyle = {
    color: textColor,
    borderBottomColor: isFocused ? focusBorderColor : borderColor,
  };

  const placeholderStyle = {
    color: placeholderColor,
  };

  return (
    <motion.div
      variants={variants}
      className={`relative ${className}`}
    >
      {type === 'textarea' ? (
        <motion.textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={`
            ${baseClasses}
            h-auto min-h-[120px] resize-none
          `}
          style={inputStyle}
          {...props}
        />
      ) : (
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses}`}
          style={inputStyle}
          {...props}
        />
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 text-sm font-medium px-2 py-1 rounded"
          style={{
            background: errorBgColor,
            color: errorTextColor,
          }}
        >
          {error}
        </motion.div>
      )}

      <style jsx>{`
        :global(input::placeholder),
        :global(textarea::placeholder) {
          color: ${placeholderColor} !important;
          opacity: 1 !important;
        }
      `}</style>
    </motion.div>
  );
};

export default FormInput;
