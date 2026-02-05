import { useEffect, useState } from 'react';
import { useMotionValue, useTransform, motion, AnimatePresence } from 'framer-motion';

const duration = 1.2;

// Main container animation (black background, then slides out completely)
const splashVariants = {
  initial: {
    x: 0,
    backgroundColor: '#000000', // Start with black
  },
  animate: {
    x: 0,
    backgroundColor: '#000000', // Keep black
    transition: {
      backgroundColor: {
        duration: 0.01,
      },
    },
  },
  exit: {
    x: '100vw', // Slide the entire splash screen out to the right
    backgroundColor: '#000000', // Keep black during exit
    transition: {
      x: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
      backgroundColor: {
        duration: 0.01,
      },
    },
  },
};

// Yellow overlay slides from left to right, then wipes out
const overlayVariants = {
  initial: { x: '-100vw' }, // Start off-screen left
  animate: {
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.8, // Wait for logo reveal
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: { 
    x: '100vw', 
    transition: { 
      duration: 0.6, // Faster exit
      ease: [0.76, 0, 0.24, 1] 
    } 
  },
};

// Logo reveal animation (reveals from left to right like a curtain)
const logoRevealVariants = {
  initial: { 
    clipPath: 'inset(0 100% 0 0)', // Hide everything (clip from right)
    opacity: 1
  },
  animate: {
    clipPath: 'inset(0 0% 0 0)', // Reveal everything (no clipping)
    opacity: 1,
    transition: {
      clipPath: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1], // Smooth easing
      },
      opacity: {
        duration: 0.01,
        delay: 0.3,
      }
    },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

// Logo for yellow background (revealed by overlay)
const logoYellowVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 1.6, // When yellow overlay covers the logo
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

export default function SplashTransition({ isAnimating }) {
  const [phase, setPhase] = useState('animate');
  const overlayX = useMotionValue('-100vw');
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (isAnimating) {
      setPhase('animate');
    } else {
      setPhase('exit');
    }
  }, [isAnimating]);

  // Map overlayX to mask width for logo reveal effect
  const maskWidth = useTransform(overlayX, (latest) => {
    const width = windowWidth || 0;
    if (typeof latest === 'number') return `${Math.max(0, latest + width)}px`;
    if (typeof latest === 'string' && latest.endsWith('vw')) {
      const vw = parseFloat(latest);
      return `${Math.max(0, (vw + 100) / 100 * width)}px`;
    }
    const px = parseFloat(latest);
    return `${Math.max(0, px + width)}px`;
  });

  return (
    <AnimatePresence mode="wait">
      {isAnimating && (
        <motion.div
          className="fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center"
          variants={splashVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Yellow overlay slides from left to right */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-[#DBF900]"
            variants={overlayVariants}
            initial="initial"
            animate={phase}
            exit="exit"
            style={{ zIndex: 1, x: overlayX }}
            onUpdate={({ x }) => overlayX.set(x)}
          />
          
          {/* Logo container */}
          <div className="flex items-center justify-center relative z-10 w-20 h-20">
            {/* Logo for black bg - scales up with bounce */}
            <motion.div
              className="absolute left-0 top-0 w-20 h-20 flex items-center justify-center"
              variants={logoRevealVariants}
              initial="initial"
              animate={phase === 'animate' ? 'animate' : 'exit'}
              style={{ zIndex: 2 }}
            >
              <img
                src="/logo.png"
                alt="Logo White"
                className="w-20 h-20"
              />
            </motion.div>
            
            {/* Logo for yellow bg - revealed by overlay */}
            <motion.div
              className="absolute left-0 top-0 h-20 overflow-hidden"
              style={{ width: maskWidth, zIndex: 3 }}
              variants={logoYellowVariants}
              initial="initial"
              animate={phase === 'animate' ? 'animate' : 'exit'}
            >
              <img
                src="/logo-black.png"
                alt="Logo Black"
                className="w-20 h-20"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


