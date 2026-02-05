"use client"
import React, { useState } from 'react'
import MidSec from './components/MidSec'
import RightSecContent from './components/RightSecContent'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTE } from '../constants/constants'
import CommonLayout from '../components/common/CommonLayout'
import UserConfiguration from "../Config/UserConfiguration.json";
gsap.registerPlugin(ScrollTrigger);


function TeamsTrustComponent() {
    const { TeamsTrust } = UserConfiguration;
    const numCards = TeamsTrust.RightSecContent.length;
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <CommonLayout midsec={<MidSec activeIndex={activeIndex} numIndicators={numCards} />} page={ROUTE.TEAMS_TRUST.LABEL}>
            <RightSecContent setActiveIndex={setActiveIndex} />
        </CommonLayout>
    )
}

export default TeamsTrustComponent