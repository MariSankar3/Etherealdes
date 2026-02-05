"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "../../components/icons/icons";
import CaseStudyInfo from "../case-study/CaseStudyInfo";
import { caseStudyData as caseStudyDetails } from "../case-study/caseStudyDetails";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 40,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

function CaseStudyModal({ open, onClose, caseStudy }) {
  const backdropRef = useRef(null);

  // Get case study details if available
  const getCaseStudyDetails = () => {
    if (caseStudy?.detailsKey && caseStudyDetails[caseStudy.detailsKey]) {
      return caseStudyDetails[caseStudy.detailsKey];
    }
    return null;
  };

  const caseStudyDetailsData = getCaseStudyDetails();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
    } else {
      document.removeEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  function handleBackdrop(e) {
    // Only close if clicking directly on the backdrop, not on modal content
    if (e.target === backdropRef.current) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={backdropRef}
          className="fixed inset-0 z-[999] flex items-end justify-center sm:items-end sm:justify-center"
          style={{
            background:
              "linear-gradient(120deg, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.4) 100%)",
            backdropFilter: "blur(2px)",
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            y: 100,
            opacity: 0,
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={handleBackdrop}
        >
          <div className="w-full">
            <div className="w-full flex items-center justify-end">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-[#DBF900] transition-colors cursor-pointer"
              >
                <Close className="w-8 h-8" />
              </button>
            </div>
            <motion.div
              className="relative w-full h-full sm:h-auto sm:max-h-[85vh] md:max-h-[80vh] lg:max-h-[90vh] sm:rounded-t-2xl bg-[#121212] p-0 flex flex-col items-center border-t border-b border-[#4F4E4E] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CaseStudyInfo
                caseStudyId={caseStudy?.id}
                caseStudyDetails={caseStudyDetailsData}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CaseStudyModal;
