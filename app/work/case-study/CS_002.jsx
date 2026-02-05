"use client";

import React, { useState, useEffect, useRef } from "react";
import { ROUTE } from "../../constants/constants";
import { Android, Arrow, Chrome, IOS } from "../../components/icons/icons";
import Link from "next/link";

function CS_002() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('goal');
  const scrollContainerRef = useRef(null);
  const sectionElementsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const sections = [
    { id: 'goal', label: 'Goal' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'building-purple-quarter', label: 'Building Purple Quarter' },
    { id: 'solution', label: 'Solution' },
    { id: 'test-and-validating', label: 'Test & Validating' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  const getOpacityClass = (sectionId) => {
    const activeIndex = sections.findIndex(section => section.id === activeSection);
    const currentIndex = sections.findIndex(section => section.id === sectionId);
    const distance = Math.abs(currentIndex - activeIndex);
    switch (distance) {
      case 0: return 'opacity-100';
      case 1: return 'opacity-60';
      case 2: return 'opacity-40';
      case 3: return 'opacity-30';
      case 4: return 'opacity-20';
      default: return 'opacity-10';
    }
  };

  useEffect(() => {
    // Cache section elements on mount
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      sections.forEach(section => {
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
          let newActiveSection = 'goal';
          let minDistance = Infinity;
          sectionElementsRef.current.forEach((element, id) => {
            const elementTop = element.offsetTop;
            const distance = Math.abs(elementTop - scrollPosition - targetPosition);
            if (distance < minDistance) {
              minDistance = distance;
              newActiveSection = id;
            }
          });
          setActiveSection(prev => prev !== newActiveSection ? newActiveSection : prev);
          ticking = false;
        });
        ticking = true;
      }
    };
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
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
        behavior: 'smooth',
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
        className={`flex flex-col sm:flex-row border-b border-[#4F4E4E] md:sticky top-0 z-10 transition-all duration-900 ease-in-out ${isScrolled ? "md:h-[250px]" : "md:h-[400px]"
          }`}
      >
        <div className="flex-1 sm:flex flex-col justify-center bg-[#121212]">
          <div className="flex flex-col p-[30px] gap-4 justify-center">
            <Link href={"/work"} className="cursor-pointer md:hidden">
              <Arrow className="p-1 w-6 h-6 -rotate-180 text-white" />
            </Link>
            <div className="text-[16px] text-[#FFFFFF99] font-antonio ">
              CS_002
            </div>
            <div className="uppercase text-[26px] text-white font-anton">
              Purple Quarter - Elixir
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
        <div className="w-full h-px sm:w-px sm:h-full bg-[#4E4E4E]"></div>
        <div className="flex-1 sm:block w-full ">
          {/* <img className='w-full h-full object-cover' src="/images/work-page-right-sec-bg-image.png" alt="" /> */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/client-work.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="h-[2px] bg-[#4F4E4E] w-full"></div>
      <div className="case-study font-raleway flex justify-center flex-1 pt-[24px] md:pt-[40px] sm:px-[80px]">
        <div className="grid md:grid-cols-[auto_1fr] gap-1 md:gap-4 justify-between max-w-[1100px] ">
          <div className="hidden md:flex w-full xl:min-w-[283px] 2xl:min-w-[323px] md:sticky top-[250px] h-fit text-white px-[16px] md:p-[10px] xl:p-[20px] 2xl:p-[40px] gap-4 flex-col text-[21px] font-400 font-anton">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={(e) => handleSectionClick(e, section.id)}
                className={`transition-all duration-500 ease-in-out transform hover:scale-105 text-left ${getOpacityClass(section.id)}`}
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
                We engineered Purple Quarter, a specialized executive search firm,
                to solve the critical talent challenges faced by technology-driven organizations.
                Our goal was to bridge the gap between visionary companies and exceptional tech leadership.
                As an insight-driven partner, Purple Quarter serves as a strategic connector,
                aligning senior technology leaders with an organization's specific technical and cultural goals.
                By emphasizing deep technical knowledge and a tailored search approach, we ensure the
                process of hiring leadership is smooth, trustworthy, and strategic for our clients.
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
                  The High-Stakes Search for Tech Leadership
                </h2>
              </div>
              <p className="font-400 text-[16px] text-[#ffffffb3]">
                Technology-driven organizations often struggle to find the right leadership talent to drive innovation and growth. Our research showed the biggest obstacle isn't a lack of candidates, but the difficulty in identifying, assessing, and engaging high-calibre leaders who fit both technically and culturally.
                <br />
                Traditional search methods, relying on generic approaches and fragmented communication, fall short for these specialized roles. This creates significant problems, including prolonged hiring cycles, candidate mismatches, and a lack of confidentiality that senior executives require.
              </p>
              <div className="flex flex-col gap-2 text-[#ffffffb3]">
                <b>The data quantified this frustration</b>
                <ul>
                  <li>
                    {" "}
                    Many firms use dispersed networks and unofficial channels to find leadership talent.
                  </li>
                  <li>
                    {" "}
                    Significant time is lost to manual outreach and scattered candidate assessments.
                  </li>
                  <li>
                    {" "}
                    Satisfaction with traditional search methods is consistently low, with a strong demand for a specialized, transparent, and technically informed process.
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="building-purple-quarter"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px] "
                >
                  Building Purple Quarter
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Human Impact | User Interviews
                </h2>
              </div>
              <p className="font-600 text-[16px] text-white">
                This challenge was best understood through our user interviews:
              </p>
              <div className="w-[190px] h-[160px]">
                <img
                  src="/case-study/jugl/1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">The HR Leader</h3>
                <p className="text-[#ffffffb3]">
                  She struggled to coordinate executive searches using spreadsheets and email threads. She felt constant pressure for updates and risked losing top candidates to slow processes. She needed a single platform to manage searches and make data-driven decisions..
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">The Seasoned CTO</h3>
                <p className="text-[#ffffffb3]">
                  He was overwhelmed by generic recruiter approaches that ignored his technical background and career goals. He feared that exploring new roles could compromise his reputation at his current company. He wanted a discreet, trusted partner to connect him with roles that matched his ambition and skills.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-anton font-400 text-[26px] text-white uppercase">
                  User-Centered Design Process
                </h2>
                <p className="text-white font-raleway">
                  We followed a structured, iterative User-Centered Design (UCD)
                  process to ensure every design decision was grounded in user
                  needs and business goals.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Information Architecture (IA)</h3>
                <p className="text-[#ffffffb3]">
                  Our first step was to create the application’s blueprint. We mapped out the complete user journey, organizing the platform’s core features into a well-structured flow to ensure users could navigate effortlessly without experiencing friction or overload.
                </p>
              </div>
              <div className="w-full rounded-[30px] ">
                <img
                  src="/case-study/jugl/2.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Low-Fidelity Wireframing</h3>
                <p className="text-[#ffffffb3]">
                  We translated user requirements into basic screen layouts. These wireframes focused on functionality and flow, allowing us to test key interactions with clients and candidates for early feedback.
                </p>
              </div>
              <div className="w-full rounded-[30px] ">
                <img
                  src="/case-study/purple-quarter/3.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Purple Quarter Design System</h3>
                <p className="text-[#ffffffb3]">
                  We developed a robust design system with a library of UI components, bespoke colour palettes, and typography to reflect the brand's premium, tech-focused personality. This ensured a consistent, professional experience across all touchpoints.
                </p>
              </div>
              <div className="w-full rounded-[30px] ">
                <img
                  src="/case-study/purple-quarter/4.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  High-Fidelity UI Design & Iteration
                </h3>
                <p className="text-[#ffffffb3]">
                  We combined our validated wireframes and design system to create pixel-perfect UI screens. These polished designs underwent further user testing to resolve any remaining usability issues before development.
                </p>
              </div>
              <div className="w-full rounded-[30px] ">
                <img
                  src="/case-study/purple-quarter/5.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="solution"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px] "
                >
                  Solution
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  A Bespoke Platform for Tech Executive Search
                </h2>
              </div>
              <p className="font-400 font-semibold text-[16px] text-white">
                Purple Quarter provides a dedicated platform and service to address these challenges directly. Key solutions include:
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Dedicated Search Contracts</h3>
                <p className="text-[#ffffffb3]">
                  We provide dedicated, ongoing technology leadership recruitment with accelerated searches and cost savings through a stable, long-term relationship.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Centralized Talent Tool</h3>
                <p className="text-[#ffffffb3]">
                  Our platform enables clients to track search activity, view candidate details, and securely make executive hires in an efficient manner. It also includes a pre-vetted talent pool for rapid access to qualified candidates.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Strategic Profile Mapping</h3>
                <p className="text-[#ffffffb3]">
                  We go beyond job titles to specify the precise skills, experience, leadership style, and cultural fit required for a role, ensuring a perfect match.
                </p>
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="test-and-validating"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px] "
                >
                  Testing & Validation
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Data-Driven Usability Testing
                </h2>
              </div>
              <p className="font-400 font-semibold text-[16px] text-white">
                To ensure the platform was truly intuitive, we conducted remote usability testing on our prototypes using Maze.
              </p>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="font-antonio">Testing at a Glance</h3>
                  <div className="grid grid-auto md:grid-cols-2 gap-[18px]">
                    <div
                      className="p-8 flex flex-col justify-center items-center gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                    // style={{
                    //   background:
                    //     "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%",
                    // }}
                    >
                      <div className="">Total</div>
                      <div className="text-[52px] font-semibold">36</div>
                      <div className="font-bold">Responses</div>
                    </div>
                    <div
                      className="p-8 flex flex-col justify-center items-center gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                    // style={{
                    //   background:
                    //     "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%",
                    // }}
                    >
                      <div className="">Key Missions</div>
                      <div className="text-[52px] font-semibold">3</div>
                      <div className="font-bold">Tested Prototypes</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-antonio">Quantitative Test Results</h3>
                  <div className="grid grid-auto md:grid-cols-2 xl:grid-cols-3 gap-[18px]">
                    <div
                      className="p-8 flex flex-col gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                    // style={{
                    //   background:
                    //     "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%",
                    // }}
                    >
                      <div className="text-[#ffffffb3]">Create a Project & Assign a Task</div>
                      <div className="text-[52px] font-semibold">92%</div>
                      <div className="font-bold">Success Rate</div>
                      <div className="text-[#ffffffb3]">
                        While high, some user hesitation indicated a need for improved navigation cues.
                      </div>
                    </div>
                    <div
                      className="p-8 flex flex-col gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                    // style={{
                    //   background:
                    //     "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%",
                    // }}
                    >
                      <div className="text-[#ffffffb3]">Review Candidate Profile Details</div>
                      <div className="text-[52px] font-semibold">11.8%</div>
                      <div className="font-bold">Misclick Rate</div>
                      <div className="text-[#ffffffb3]">
                        This pointed to a cluttered profile layout that made it hard to scan information quickly.
                      </div>
                    </div>
                    <div
                      className="p-8 flex flex-col gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                    // style={{
                    //   background:
                    //     "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%",
                    // }}
                    >
                      <div className="text-[#ffffffb3]">Submit Feedback on Shortlisted Candidates</div>
                      <div className="text-[52px] font-semibold">15.6%</div>
                      <div className="font-bold">Misclick Rate</div>
                      <div className="text-[#ffffffb3]">
                        This suggested the feedback process was not as intuitive as it could be.
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-400 font-semibold text-[16px] text-white">Key Design Iterations from Testing</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Improved Feature Discoverability</h3>
                <p className="text-[#ffffffb3]">
                  After an initial test showed difficulty in finding the feedback section, we moved it to a more prominent location on the dashboard. In re-testing, the success rate for this task jumped to 93%.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Redesigned the Candidate Profile UI</h3>
                <p className="text-[#ffffffb3]">
                  In response to the high misclick rate, we simplified the profile layout and added a "Quick Review" sidebar. This successfully reduced the misclick rate to under 18% in follow-up tests.
                </p>
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="conclusion"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px] "
                >
                  Conclusion
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Conclusion & Key Takeaways
                </h2>
              </div>
              <p className="font-400 font-semibold text-[16px] text-white">
                Purple Quarter successfully addresses the unique challenges of tech executive recruitment by replacing generic, fragmented processes with a tailored, transparent platform. This case study demonstrates how a user-centred approach, translating deep insights from clients and candidates, delivers quantifiable and lasting value.
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Specialization is Non-Negotiable
                </h3>
                <p className="text-[#ffffffb3]">
                  A generic approach is ineffective for high-stakes tech leadership roles. A specialized platform that understands the nuances of technology and culture is essential.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  The Dual Experience is Critical
                </h3>
                <p className="text-[#ffffffb3]">
                  The platform must provide a seamless, confidential, and respectful experience for both the hiring client and the senior-level candidate.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Transparency Builds Trust
                </h3>
                <p className="text-[#ffffffb3]">
                  In a traditionally opaque industry, providing clients with clear, data-driven visibility into search progress is a powerful differentiator that builds confidence and strengthens partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CS_002;
