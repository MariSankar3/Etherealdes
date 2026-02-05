import TeamsTrustComponent from './TeamsTrust'

export const metadata = {
  title: "Ethereal Design – UI/UX, Web & Product Design Studio",
  description: "At EtherealDesign,we believe great design is invisible.We blend creativity,and UX thinking to craft delightful, intuitive digital experience that drive result.",
  // alternates: {
  //   canonical: "https://etherealdesign.io/services",
  // },
};

function TeamsTrustPage() {
  return (
    <>
      
      <h2 className="sr-only">
        Why Teams Trust Ethereal Design Studio
      </h2>

      <p className="sr-only">
        Learn why startups and growing companies trust Ethereal Design Studio for UI UX design,
        web development, mobile apps, and digital product strategy. See client testimonials,
        strengths, and what makes our design studio reliable and effective.
      </p>

      <TeamsTrustComponent />

    </>
  )
}

export default TeamsTrustPage
