"use client";

import React, { useState } from 'react';
import { Hamburger, Linkedin, Close } from '../icons/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import UserConfiguration from "../../Config/UserConfiguration";
const SOCIAL_LINKS = UserConfiguration.SOCIAL_LINKS;
import { motion } from "framer-motion";
import MenuSidebar from '../feature/MenuSidebar';
import AnimatedHamburger from './AnimatedHamburger';
import EtherealDesign from '../common/EtherealDesign';

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

function LeftSec() {
  const pathname = usePathname();
  const router = useRouter();
  const isAllInOne = pathname === "/menu/";
  const [menuOpen, setMenuOpen] = useState(false);

  const CURRENT_COLOR = menuOpen
    ? "text-[#121212]"
    : (isAllInOne ? "text-[#121212]" : "text-white");

  const CURRENT_BG_COLOR = menuOpen
    ? "bg-[#FF4E21]"
    : (isAllInOne ? "bg-[#FF4E21]" : "bg-[#121212]");

  const BORDER = menuOpen
    ? "border-r border-black"
    : "border-r border-[#4E4E4E]";

  return (
    /* ===== Semantic Navigation Wrapper ===== */
    <nav
      aria-label="Primary sidebar navigation"
      className="relative"
    >
      <motion.div
        className={`relative flex flex-col w-[60px] sm:w-[80px] flex-shrink-0 justify-center h-dvh items-center z-[200] ${CURRENT_COLOR} ${CURRENT_BG_COLOR} ${BORDER}`}
        initial="hidden"
        animate="visible"
      >

        {/* ===== SEO Brand Heading (Invisible) ===== */}
        <p className="sr-only">
          Ethereal Designs – Creative UI UX Design Studio
        </p>

        {/* ===== Top: Logo + Menu Toggle ===== */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <div className={`h-[103px] ${menuOpen ? 'hidden' : 'flex flex-col'}`}>
            <div className="my-auto" aria-hidden="true">
              <EtherealDesign />
            </div>
            <div className="w-[46px] md:w-[72px] border border-[#4F4E4E]" />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className={`cursor-pointer ${menuOpen ? 'mt-5' : 'mt-2'}`}
          >
            <AnimatedHamburger open={menuOpen} />
          </button>
        </motion.div>

        {/* ===== Middle: Copyright Text ===== */}
        <motion.div
          variants={itemVariants}
          className="text-[11px] flex font-antonio"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <p
            style={{ writingMode: "sideways-lr" }}
            className={`tracking-[2px] ${menuOpen ? 'font-bold' : ''}`}
          >
            © 2025 . Ethereal Designs . All rights Reserved
          </p>
        </motion.div>

        {/* ===== Bottom: Social Link ===== */}
        <motion.div
          variants={itemVariants}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: -24,
          }}
        >
          <Link
            href={SOCIAL_LINKS.LINKEDIN.PATH}
            aria-label="Ethereal Designs LinkedIn profile"
            rel="noopener noreferrer"
            target="_blank"
            className="pb-[50px]"
            alt="Ethereal Designs LinkedIn"
          >
            <Linkedin className={CURRENT_COLOR} />
          </Link>
        </motion.div>

        {/* ===== Sidebar Overlay ===== */}
        {menuOpen && (
          <div
            className="fixed inset-0 left-[60px] sm:left-[80px] z-[100]"
            role="dialog"
            aria-modal="true"
          >
            <MenuSidebar onClose={() => setMenuOpen(false)} />
          </div>
        )}
      </motion.div>
    </nav>
  );
}

export default LeftSec;
