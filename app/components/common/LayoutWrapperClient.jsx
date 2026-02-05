"use client";
import React, { useEffect, useState } from "react";
import SplashTransition from "./SplashTransition";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AboutUsModal from "../../components/common/AboutUsModal";

function LayoutWrapperClient({ children }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);
  const [showSplash, setShowSplash] = useState(true); // Splash is mounted
  const [showContent, setShowContent] = useState(false); // Controls when content is visible
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    setShowSplash(true);
    setShowContent(false);

    // Reveal content when yellow overlay goes off (after 1.8s: 0.8s logo + 1s yellow overlay)
    const revealContentTimeout = setTimeout(() => {
      setShowContent(true);
    }, 2500); // 0.8s (logo) + 1s (yellow overlay)

    // Start splash exit after total animation (2.7s)
    const animTimeout = setTimeout(() => {
      setIsAnimating(false);
      // Wait for exit animation (0.6s) before unmounting splash
      const exitTimeout = setTimeout(() => {
        setShowSplash(false);
      }, 700); // Match exit duration + buffer
      return () => clearTimeout(exitTimeout);
    }, 2700);

    return () => {
      setIsAnimating(false);
      setShowSplash(false);
      setShowContent(false);
      clearTimeout(animTimeout);
      clearTimeout(revealContentTimeout);
    };
  }, [pathname]);

  useEffect(() => {
    window.openAboutUsModal = () => setAboutUsOpen(true);
    return () => {
      window.openAboutUsModal = undefined;
    };
  }, []);

  return (
    <>
      <AboutUsModal open={aboutUsOpen} onClose={() => setAboutUsOpen(false)} />
      {showSplash && <SplashTransition isAnimating={isAnimating} />}
      {showContent && children}
    </>
  );
}

export default LayoutWrapperClient;
