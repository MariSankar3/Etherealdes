import React from 'react'
import MidSec from './components/MidSecContent'
import RightSecContent from './components/RightSecContent'
import { ROUTE } from '../constants/constants'
import CommonLayout from '../components/common/CommonLayout'

export const metadata = {
  title: "Ethereal Design – UI/UX, Web & Product Design Studio",
  description: "At EtherealDesign,we believe great design is invisible.We blend creativity,and UX thinking to craft delightful, intuitive digital experience that drive result.",
  // alternates: {
  //   canonical: "https://etherealdesign.io/services",
  // },
};


function Page() {
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <h2 className="sr-only">
        Why Teams Trust Ethereal Design Studio
      </h2>

      <p className="sr-only">
        Learn why startups and growing companies trust Ethereal Design Studio for UI UX design,
        web development, mobile apps, and digital product strategy. See client testimonials,
        strengths, and what makes our design studio reliable and effective.
      </p>
      {/* Desktop / Tablet */}
      <div className="hidden md:block w-full h-screen">

        <CommonLayout
          page={ROUTE.GET_IN_TOUCH.LABEL}
          midsec={<MidSec />}
        >
          <RightSecContent />
        </CommonLayout>
      </div>

      {/* Mobile */}
      <div className="block md:hidden w-full h-screen">
        <CommonLayout
          page={ROUTE.GET_IN_TOUCH.LABEL}
          midsec={<RightSecContent />}
        >
          <MidSec />
        </CommonLayout>
      </div>

    </div>
  )
}

export default Page
