"use client";

import React, { useState, useEffect, useRef } from "react";
import { ROUTE } from "../../constants/constants";
import { Android, Arrow, Chrome, IOS } from "../../components/icons/icons";
import Link from "next/link";

function CS_003() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("goal");
  const scrollContainerRef = useRef(null);
  const sectionElementsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const sections = [
    { id: "goal", label: "Goal" },
    { id: "challenges", label: "Challenges" },
    { id: "solution", label: "Solution" },
    { id: "businessImpact", label: "Business Impact" },
    { id: "ourProcess", label: "Our Process" },
    { id: "conclusion", label: "Conclusion" },
  ];

  const getOpacityClass = (sectionId) => {
    const activeIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    const currentIndex = sections.findIndex(
      (section) => section.id === sectionId
    );
    const distance = Math.abs(currentIndex - activeIndex);
    switch (distance) {
      case 0:
        return "opacity-100";
      case 1:
        return "opacity-60";
      case 2:
        return "opacity-40";
      case 3:
        return "opacity-30";
      case 4:
        return "opacity-20";
      default:
        return "opacity-10";
    }
  };

  useEffect(() => {
    // Cache section elements on mount
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      sections.forEach((section) => {
        const element = scrollContainer.querySelector(`#${section.id}`);
        if (element) {
          sectionElementsRef.current.set(section.id, element);
        }
      });
    }
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = scrollContainerRef.current?.scrollTop || 0;
          setIsScrolled(scrollPosition > 80);
          const targetPosition = 250 + 20;
          let newActiveSection = "goal";
          let minDistance = Infinity;
          sectionElementsRef.current.forEach((element, id) => {
            const elementTop = element.offsetTop;
            const distance = Math.abs(
              elementTop - scrollPosition - targetPosition
            );
            if (distance < minDistance) {
              minDistance = distance;
              newActiveSection = id;
            }
          });
          setActiveSection((prev) =>
            prev !== newActiveSection ? newActiveSection : prev
          );
          ticking = false;
        });
        ticking = true;
      }
    };
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        sectionElementsRef.current.clear();
      };
    }
  }, []);

  // Handle smooth scrolling to sections with proper offset
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    const element = sectionElementsRef.current.get(sectionId);
    if (element) {
      const scrollContainer = scrollContainerRef.current;
      const elementTop = element.offsetTop;
      const topBarHeight = 260;
      const offset = 20;
      scrollContainer.scrollTo({
        top: elementTop - topBarHeight - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 flex flex-col overflow-auto w-full"
    >
      {/* Top bar */}
      <div
        className={`flex flex-col sm:flex-row border-b border-[#4F4E4E] md:sticky top-0 z-10 transition-all duration-900 ease-in-out ${
          isScrolled ? "md:h-[250px]" : "md:h-[400px]"
        }`}
      >
        <div className="flex-1 sm:flex flex-col justify-center bg-[#121212]">
          <div className="flex flex-col p-[30px] gap-4 justify-center">
            <Link href="/work" className="cursor-pointer md:hidden">
              <Arrow className="p-1 w-6 h-6 -rotate-180 text-white" />
            </Link>
            <div className="text-[16px] text-[#FFFFFF99] font-antonio">
              CS_003
            </div>
            <div className="uppercase text-[26px] text-white font-anton">
              Saltbox
            </div>
            <div className="flex">
              <IOS />
              <Chrome />
              <Android />
            </div>
            <div>
              <Link
                href={ROUTE.GET_IN_TOUCH.PATH}
                className="w-fit flex items-center gap-2.5 font-antonio text-[16px] bg-[#FF4E21] p-[10px] text-white"
              >
                Contact us
                <Arrow className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-px sm:w-px sm:h-full bg-[#4E4E4E]" />
        <div className="flex-1 sm:block w-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="/case-study/saltbox/saltbox-video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="h-[2px] bg-[#4F4E4E] w-full" />
      <div className="case-study font-raleway flex justify-center flex-1 pt-[24px] md:pt-[40px] sm:px-[80px]">
        <div className="grid md:grid-cols-[auto_1fr] gap-1 md:gap-4 justify-between max-w-[1100px]">
          <div className="hidden md:flex w-full xl:min-w-[283px] 2xl:min-w-[323px] md:sticky top-[250px] h-fit text-white px-[16px] md:p-[10px] xl:p-[20px] 2xl:p-[40px] gap-4 flex-col text-[21px] font-400 font-anton">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={(e) => handleSectionClick(e, section.id)}
                className={`transition-all duration-500 ease-in-out transform hover:scale-105 text-left ${getOpacityClass(
                  section.id
                )}`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col text-white justify-center px-[16px] md:px-0">
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="goal"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px]"
                >
                  Goal
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Project Overview
                </h2>
              </div>
              <p className="font-400 text-[16px] text-white">
                Saltbox is a dynamic Salesforce consulting practice with a bold
                vision—to redefine how B2B and D2C commerce operate across
                industries like manufacturing, consumer goods, and life
                sciences. Backed by Salesforce Ventures, their clients rely on
                them to lead complex digital transformations with speed and
                precision.
              </p>
              <p className="font-400 text-[16px] text-white mt-2">
                To support this, Saltbox needed a design partner who could match
                their pace, elevate their user experience, and bring consistency
                across all Salesforce-powered interfaces. Our team partnered
                with Saltbox to build a scalable, branded, and accessible UI
                system leveraging the Salesforce Lightning Design System (SLDS),
                ensuring every touchpoint was as seamless as the solutions they
                delivered.
              </p>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="challenges"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px]"
                >
                  Challenges
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Building on Salesforce Without Compromising Design
                </h2>
              </div>
              <p className="font-400 text-[16px] text-[#ffffffb3]">
                While Salesforce is robust in functionality, its out-of-the-box
                UI can fall short in delivering modern, brand-consistent
                experiences. Saltbox needed to
              </p>
              <div className="flex flex-col gap-2 text-[#ffffffb3]">
                <ul>
                  <li>
                    Streamline and unify the interface across their client
                    portals and internal tools.
                  </li>
                  <li>
                    Maintain a strong brand identity while working within SLDS
                    constraints.
                  </li>
                  <li>
                    Build accessible, responsive, and scalable UI components for
                    enterprise use cases.
                  </li>
                  <li>
                    Integrate seamlessly with third-party tools like ERP
                    systems, Slack, and email platforms.
                  </li>
                  <li>
                    Secure client consensus on data protection policies and
                    governance, ensuring all solutions meet legal and compliance
                    standards.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">In short</h3>
                <p className="text-[#ffffffb3]">
                  They needed the power of Salesforce, without compromising on
                  experience or efficiency—for their clients or their teams.
                </p>
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="solution"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px]"
                >
                  Solution
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  A Branded, Accessible UI System Built on SLDS
                </h2>
              </div>
              <div>
                <img
                  src="/case-study/saltbox/solution.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-raleway text-[16px] font-[600]">
                  We collaborated closely with Saltbox’s product and engineering
                  teams to design and implement a modular, SLDS-compliant design
                  system that delivered speed, consistency, and scalability.
                </p>
                <p className="text-white font-raleway text-[16px] mt-5 mb-4 font-[600]">
                  Key Implementation Highlights
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Theme-Driven Visual Identity</h3>
                <p className="text-[#ffffffb3]">
                  Using Salesforce’s theming capabilities and branding tokens,
                  we crafted a custom visual style that preserved Saltbox’s
                  brand DNA—color palettes, typography, and iconography—while
                  remaining compliant with Lightning standards.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">
                  Component-Led Development with SLDS
                </h3>
                <p className="text-[#ffffffb3] text-[14px]">
                  We utilized SLDS-native components such as lightning-button,
                  lightning-card, and lightning-datatable to:
                </p>
                <div className="flex flex-col gap-2 text-[#ffffffb3]">
                  <ul>
                    <li>Reduce development overhead</li>
                    <li>Minimize design-developer friction</li>
                    <li>Ensure consistency across all experiences</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">Accessibility at the Core</h3>
                <p className="text-[#ffffffb3] text-[14px]">
                  Following WCAG guidelines, we built interfaces that were
                  usable for all:
                </p>
                <div className="flex flex-col gap-2 text-[#ffffffb3]">
                  <ul>
                    <li>Content Hierarchy</li>
                    <li>
                      ARIA labels, proper contrast, and keyboard navigation
                    </li>
                    <li>Full screen-reader support</li>
                    <li>Mobile-friendly breakpoints for every screen</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">Responsive Design</h3>
                <p className="text-[#ffffffb3]">
                  Using Salesforce’s responsive grid system, we ensured that
                  applications rendered flawlessly across desktops, tablets, and
                  mobile devices—critical for on-the-go enterprise users.
                </p>
              </div>
            </div>

            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="businessImpact"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px]"
                >
                  Business Impact
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Elevating the Salesforce Experience for B2B
                </h2>
              </div>
              <div>
                <img
                  src="/case-study/saltbox/business_impact.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-raleway text-[16px] font-[600]">
                  The design system empowered Saltbox to deliver enhanced value
                  to its enterprise clients:
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">For Business Users:</h3>
                <div className="flex flex-col gap-2 text-[#ffffffb3]">
                  <ul>
                    <li>
                      Unified customer profiles, contracts, and communications
                      in one place
                    </li>
                    <li>
                      Automated workflows that reduced operational overhead
                    </li>
                    <li>
                      Custom dashboards for real-time insights across the buyer
                      journey
                    </li>
                    <li>
                      Role-based access control to ensure data security and
                      compliance
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">For End Users:</h3>
                <div className="flex flex-col gap-2 text-[#ffffffb3]">
                  <ul>
                    <li>A clean, modern interface with intuitive navigation</li>
                    <li>Mobile-ready access to core tools</li>
                    <li>Smart task prioritization via AI insights</li>
                    <li>
                      Reduced cognitive load via consistent design patterns
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="ourProcess"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px]"
                >
                  Our Process
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Design Execution Aligned with Salesforce Velocity
                </h2>
              </div>
              <p className="font-400 font-semibold text-[16px] text-white">
                Our approach was built on deep collaboration and agile delivery:
              </p>

              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">
                  Discovery & Requirements Mapping
                </h3>
                <p className="text-[#ffffffb3]">
                  Understood Saltbox’s internal needs and client workflows to
                  align design goals with business priorities.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">Design System Definition</h3>
                <p className="text-[#ffffffb3]">
                  Developed a scalable, tokenized design framework that worked
                  seamlessly with SLDS.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">Component Implementation & QA</h3>
                <p className="text-[#ffffffb3]">
                  Delivered reusable components with accessibility baked
                  in—tested across devices and user roles.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="font-antonio">Training & Handoff</h3>
                <p className="text-[#ffffffb3]">
                  Documented usage patterns, tokens, and guidelines to empower
                  internal Saltbox teams to continue evolving the system
                  post-deployment.
                </p>
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="conclusion"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px]"
                >
                  Conclusion
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Conclusion & Key Takeaways
                </h2>
              </div>
              <div className="py-4">
                <img
                  src="/case-study/saltbox/conclusion.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-400 font-semibold text-[16px] text-white">
                Our partnership with Saltbox resulted in a Salesforce-powered
                experience that is not only functional but beautiful, intuitive,
                and enterprise-ready. With the right mix of design consistency,
                accessibility, and technical rigor, Saltbox is now better
                equipped to help its clients scale their digital commerce
                journeys—faster and smarter.
              </p>

              <p className="font-400 font-semibold text-[16px] text-white">
                What We Learned:
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Design Consistency is a Multiplier
                </h3>
                <p className="text-[#ffffffb3]">
                  A reusable system accelerates development while strengthening
                  the brand.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Accessibility Can’t Be an Afterthought
                </h3>
                <p className="text-[#ffffffb3]">
                  Inclusive design increases adoption across diverse user
                  groups.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Working With Salesforce = Working with Constraints
                </h3>
                <p className="text-[#ffffffb3]">
                  The right partner helps turn limitations into leverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CS_003;
