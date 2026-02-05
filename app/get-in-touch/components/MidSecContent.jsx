"use client"
import { ROUTE } from '../../constants/constants'
import Link from 'next/link'
import React from 'react'
import UserConfiguration from "../../Config/UserConfiguration"
import { motion } from 'framer-motion';
const SOCIAL_LINKS = UserConfiguration.SOCIAL_LINKS
function MidSecContent() {
    // Animation variants from home page
    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };
    const fadeUpWord = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    return (
        <motion.section
            aria-labelledby="work-with-us-heading"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className='flex flex-col justify-between py-4 md:py-[24px] md:pl-[40px] md:pr-[40px] md:my-[20px] md:h-full px-4 gap-4'
        >
            <h2 id="work-with-us-heading" className="sr-only">
             Work with Ethereal Design Studio
            </h2>
            <div className='flex flex-col w-full md:w-[403px] gap-[16px]'>
                <div className='flex flex-col  text-[#DBF900]'>
                    <motion.div
                        className="flex flex-wrap items-baseline"
                        variants={staggerContainer}
                    >
                        <motion.span
                            variants={fadeUpWord}
                            className="mr-2 mb-1 uppercase leading-none text-[#DBF900] font-anton text-4xl md:text-[42px] font-[400]"
                        >
                            Work with us
                        </motion.span>
                    </motion.div>
                </div>
                <nav
                    aria-label="Page navigation"
                    className='font-antonio font-[400] text-[16px] flex flex-col gap-[16px]'
                    variants={staggerContainer}
                >
                    <motion.h2 className='uppercase tracking-[5px]' variants={fadeUpWord}>Sitemap</motion.h2>
                    <motion.div variants={staggerContainer} className="flex flex-col gap-[8px]">
                        <motion.span variants={fadeUpWord}><Link href={ROUTE.HOME.PATH}>Home</Link></motion.span>
                        <motion.span variants={fadeUpWord}><Link href={ROUTE.WORK.PATH}>Work</Link></motion.span>
                        <motion.span variants={fadeUpWord}><Link href={ROUTE.TEAMS_TRUST.PATH}>Teams Trust</Link></motion.span>
                        <motion.span variants={fadeUpWord}><Link href={ROUTE.ABOUT_US.PATH}>About us</Link></motion.span>
                        <motion.span variants={fadeUpWord}><Link href={ROUTE.GET_IN_TOUCH.PATH}>Contact</Link></motion.span>
                    </motion.div>
                </nav>
                <motion.div
                    className='font-antonio font-[400] flex flex-col gap-[16px] text-[16px]'
                    variants={staggerContainer}
                >
                    <motion.h2 className='uppercase tracking-[5px]' variants={fadeUpWord}>Socials</motion.h2>
                    <motion.div variants={staggerContainer} className="flex flex-col gap-[8px]">
                        <motion.span variants={fadeUpWord}><Link href={SOCIAL_LINKS.LINKEDIN}>Linkedin</Link></motion.span>
                        {/* <motion.span variants={fadeUpWord}><Link href={SOCIAL_LINKS.INSTAGRAM}>instagram</Link></motion.span>
                        <motion.span variants={fadeUpWord}><Link href={SOCIAL_LINKS.BEHANCE}>Behance</Link></motion.span> */}
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className='flex flex-col gap-[16px]'
                variants={staggerContainer}
            >
                <motion.div
                    className='font-antonio font-[400] flex flex-col gap-[16px] text-[16px]'
                >
                    <motion.h2 className='uppercase tracking-[5px] text-[#DBF900]' variants={fadeUpWord}>Contact Details</motion.h2>
                    <motion.div variants={staggerContainer} className="flex flex-col gap-[8px]">
                        <motion.span variants={fadeUpWord}><Link href={`tel:${SOCIAL_LINKS.MOBILE.PATH}`}>Mobile: {SOCIAL_LINKS.MOBILE.LABEL}</Link></motion.span>
                        <motion.span variants={fadeUpWord}><Link href={`mailto:${SOCIAL_LINKS.EMAIL.PATH}`}>Email: {SOCIAL_LINKS.EMAIL.LABEL}</Link></motion.span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default MidSecContent