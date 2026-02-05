import Home from './components/feature/home/Home'
// import Test from './test/page';
export const metadata = {
  title: "Ethereal Design – UI/UX, Web & Product Design Studio",
  description: "At EtherealDesign,we believe great design is invisible.We blend creativity,and UX thinking to craft delightful, intuitive digital experience that drive result.",
   keywords: [
    "digital product studio",
    "UX UI design agency",
    "product strategy",
    "startup design team",
    "AI powered design",
  ],
  alternates: {
    canonical: "http://localhost:3000/", // 👈 ADD THIS
  },
  openGraph: {
    title: "About Ethereal Design",
    description:
      "We transform complex ideas into beautiful, user-friendly digital products.",
    url: "https://etherealdesign.i0",
    siteName: "Ethereal Design",
    type: "website",
  },
};

function page() {
  
  return (
      <Home/>
  )
}

export default page