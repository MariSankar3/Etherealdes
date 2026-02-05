import { Anton, Antonio, Raleway, Ubuntu } from "next/font/google";
import "./globals.css";
import LeftSec from "./components/common/LeftSec";
import { GoogleAnalytics } from "@next/third-parties/google";
import LayoutWrapperClient from "./components/common/LayoutWrapperClient";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const antonio = Antonio({ variable: "--font-antonio", subsets: ["latin"] });
const ubuntu = Ubuntu({ variable: "--font-ubuntu", subsets: ["latin"], weight: ["300", "400", "500", "700"] });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"] });

export const metadata = {
  title: "Ethereal Design – UI/UX, Web & Product Design Studio",
  description: "At EtherealDesign,we believe great design is invisible.We blend creativity,and UX thinking to craft delightful, intuitive digital experience that drive result."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ethereal Design Studio",
              "url": "https://etherealdesign.io",
              "sameAs": [
                "https://www.linkedin.com/in/ethereal-design-b95453363/"
              ]
            })
          }}
        />
      </head>

      <body
        className={`${anton.variable} ${antonio.variable} ${ubuntu.variable} ${raleway.variable} antialiased flex w-dvw h-dvh bg-[#121212] overflow-hidden`}
      >
        <GoogleAnalytics gaId="G-WCVQE1YKP5" />

        <LayoutWrapperClient>
          <LeftSec />
          {children}
        </LayoutWrapperClient>
      </body>
    </html>
  );
}
