import React from 'react'
import RightSecContent from './components/RightSecContent'
import CommonLayout from '../components/common/CommonLayout'
import MidSec from './components/MidSec'
import { ROUTE } from '../constants/constants'

export const metadata = {
  title: "Ethereal Design – UI/UX, Web & Product Design Studio",
  description: "At EtherealDesign,we believe great design is invisible.We blend creativity,and UX thinking to craft delightful, intuitive digital experience that drive result.",
  // alternates: {
  //   canonical: "https://etherealdesign.io/services",
  // },
};

function Workpage() {
  return (
    <section
      aria-labelledby="work-page-heading"
      className="w-full"
    >
      <h2 id="work-page-heading" className="sr-only">
        Our Design Work — Selected Projects by Ethereal Design Studio
      </h2>

      <p className="sr-only">
        Explore a selection of our design studio projects including UI UX design,
        branding, web applications, mobile apps, and digital experiences created
        for startups and growing businesses.
      </p>

      <CommonLayout midsec={<MidSec />} page={ROUTE.WORK.LABEL}>
        <RightSecContent />
      </CommonLayout>
    </section>
  )
}

export default Workpage
