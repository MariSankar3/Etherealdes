import React from 'react';
import { motion } from 'framer-motion';

const lineProps = {
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
};

function AnimatedHamburger({ open }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block',width:"50px" }}
    >
      {/* Top line */}
      <motion.line
        x1="7"
        y1="10"
        x2="25"
        y2="10"
        {...lineProps}
        initial={false}
        animate={open ? {
          transform: 'translateY(6px) rotate(45deg)'
        } : {
          transform: 'translateY(0px) rotate(0deg)'
        }}
        style={{ originX: '50%', originY: '50%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Middle line */}
      <motion.line
        x1="7"
        y1="16"
        x2="25"
        y2="16"
        {...lineProps}
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Bottom line */}
      <motion.line
        x1="7"
        y1="22"
        x2="25"
        y2="22"
        {...lineProps}
        initial={false}
        animate={open ? {
          transform: 'translateY(-6px) rotate(-45deg)'
        } : {
          transform: 'translateY(0px) rotate(0deg)'
        }}
        style={{ originX: '50%', originY: '50%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </svg>

  );
}

export default AnimatedHamburger;