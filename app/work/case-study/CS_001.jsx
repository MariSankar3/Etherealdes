"use client";

import React, { useState, useEffect, useRef } from "react";
import { ROUTE } from "../../constants/constants";
import { Android, Arrow, Chrome, IOS } from "../../components/icons/icons";
import Link from "next/link";

function CaseStudy() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("goal");
  const scrollContainerRef = useRef(null);
  const sectionElementsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const sections = [
    { id: "goal", label: "Goal" },
    { id: "challenges", label: "Challenges" },
    { id: "building-jugl", label: "Building Jugl" },
    { id: "solution", label: "Solution" },
    { id: "test-and-validating", label: "Test & Validating" },
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
            <Link href={"/work"} className="cursor-pointer md:hidden">
              <Arrow className="p-1 w-6 h-6 -rotate-180 text-white" />
            </Link>
            <div className="text-[16px] text-[#FFFFFF99] font-antonio ">
              CS_001
            </div>
            <div className="uppercase text-[26px] text-white font-anton">
              Jugl mobile crm
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
        <div className="flex-1 sm:block w-full border-[#4F4E4E] border-b">
          {/* <img className='w-full h-full object-cover' src="/images/work-page-right-sec-bg-image.png" alt="" /> */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/case-study/jugl/jugl_video.mp4" type="video/mp4" />
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
                We engineered Jugl, a comprehensive SaaS platform, to solve the
                core operational challenges facing Small and Medium-sized
                Enterprises (SMEs) by dismantling their operational silos. As an
                intuitive, all-in-one tool, Jugl serves as a central
                collaboration hub designed to connect diverse teams—from
                management to field staff—uniting them on a single platform. Our
                focus on mobile-first accessibility and seamless integration
                resulted in a unified workflow across web and mobile
                applications, making teamwork effortless and efficient.
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
                  Untangling Fragmented SME Workflows
                </h2>
              </div>
              <p className="font-400 text-[16px] text-[#ffffffb3]">
                Small and medium-sized businesses are often slowed down by
                deep-rooted inefficiency. Our research revealed that the biggest
                obstacle to their growth was not a lack of tools, but an
                overabundance of disconnected ones. Their daily operations are
                typically spread across a mix of spreadsheets, emails, CRMs, and
                messaging apps. This fragmented approach creates significant
                problems: scattered data, duplicated work, poor visibility for
                managers, and critical communication gaps. This pain was
                especially acute for mobile and field staff, who were often
                disconnected from the essential tools and real-time updates
                needed to perform their jobs effectively.
              </p>
              <div className="flex flex-col gap-2">
                <b>The data quantified this frustration</b>
                <ul className="text-[#ffffffb3]">
                  <li>
                    {" "}
                    Employees use an average of 4-5 different applications daily
                    simply to coordinate their work.
                  </li>
                  <li>
                    {" "}
                    A significant portion of the workday is lost to "context
                    switching"—logging in and out of different systems.
                  </li>
                  <li>
                    {" "}
                    User satisfaction with their existing toolset was
                    consistently low, with a strong demand for a single source
                    of truth.
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-[40px_0px] flex flex-col gap-4">
              <div className="flex flex-col">
                <h1
                  id="building-jugl"
                  className="font-antonio text-[#DBF900] font-[400] text-[16px] "
                >
                  Building Jugl
                </h1>
                <h2 className="font-anton font-400 text-[26px] text-white">
                  Human Impact | user interviews
                </h2>
              </div>
              <p className="font-400 text-[16px] text-white">
                Understanding why this app is needed and pinpointing the key
                factors that will drive its success in the market.
              </p>
              <div className="w-[190px] h-[160px]">
                <img
                  src="/case-study/jugl/1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Project Manager</h3>
                <p className="text-[#ffffffb3]">
                  spent hours manually compiling progress reports from scattered
                  data. She lived with the constant risk of missed deadlines
                  because of communication lags between platforms. She needed a
                  unified command center.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Sales Executive</h3>
                <p className="text-[#ffffffb3]">
                  felt unprepared in front of clients. He couldn't answer simple
                  questions about an order status from his phone because the CRM
                  and inventory systems were separate, making him feel
                  inefficient and unprofessional.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-anton font-400 text-[26px] text-white">
                  User-Centered Design Process
                </h2>
                <p className="text-white">
                  We followed a structured, iterative User-Centered Design (UCD)
                  process to ensure every design decision was grounded in user
                  needs and business goals.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Information Architecture (IA)</h3>
                <p className="text-[#ffffffb3]">
                  Our first step was to create the application's blueprint. We
                  mapped out the complete user journey, organizing Jugl's
                  extensive features into a logical structure to ensure users
                  could easily navigate the platform without feeling
                  overwhelmed.
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
                  With the IA as our guide, we translated the structure into
                  basic screen layouts. These wireframes focused purely on
                  functionality and flow, allowing us to test core usability
                  with users for early feedback
                </p>
              </div>
              <div className="w-full rounded-[30px] ">
                <img
                  src="/case-study/jugl/3.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Jugl Design System</h3>
                <p className="text-[#ffffffb3]">
                  To ensure consistency across web and mobile, we developed a
                  robust design system with a comprehensive library of reusable
                  UI components, color palettes, and typography guidelines. This
                  accelerated the development process and guaranteed a cohesive
                  user experience.
                </p>
              </div>
              <div className="w-full rounded-[30px] ">
                <img
                  src="/case-study/jugl/4.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  High-Fidelity UI Design & Iteration
                </h3>
                <p className="text-[#ffffffb3]">
                  Finally, we combined our tested wireframes with the design
                  system to produce pixel-perfect UI screens. These polished
                  designs were again put through user feedback sessions to catch
                  any remaining issues before the final handoff to development.
                </p>
              </div>
              <div className="w-full rounded-[30px] ">
                <img
                  src="/case-study/jugl/5.png"
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
                  The Complete Business Command Center
                </h2>
              </div>
              <p className="font-400 font-semibold text-[16px] text-white">
                To address these challenges directly, we designed Jugl to be the
                single source of truth for SMEs. It consolidates the essential
                functions of a business into one intuitive and powerful
                platform.
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Unified Task Management</h3>
                <p className="text-[#ffffffb3]">
                  Assign, track, and manage all team tasks in one central place.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Integrated Communication</h3>
                <p className="text-[#ffffffb3]">
                  Centralize conversations, file sharing, and conduct secure
                  audio/video calls with internal teams, external clients, and
                  vendors.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Secure Cloud Storage (Jugl Drive)
                </h3>
                <p className="text-[#ffffffb3]">
                  Provide teams and clients with a dedicated, secure space to
                  store, access, and share important documents and project
                  files.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Multi-Organization Collaboration
                </h3>
                <p className="text-[#ffffffb3]">
                  Enable seamless collaboration between different businesses by
                  creating shared, permission-based workspaces for joint
                  projects.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Order & Resource Management</h3>
                <p className="text-[#ffffffb3]">
                  Streamline order processing and allocate business resources
                  with maximum efficiency.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Inventory Management</h3>
                <p className="text-[#ffffffb3]">
                  Track stock levels and manage assets directly within the
                  platform.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Automated HR Workflows</h3>
                <p className="text-[#ffffffb3]">
                  Simplify employee onboarding, leave requests, and other
                  essential HR processes.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Performance & Recognition Management
                </h3>
                <p className="text-[#ffffffb3]">
                  A comprehensive module to drive employee growth. Set
                  individual and team goals, track performance against targets,
                  and foster a positive work culture through a built-in system
                  for accolades and recognition.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Integrated Ticketing System</h3>
                <p className="text-[#ffffffb3]">
                  Gain instant, actionable insights with intelligent,
                  easy-to-understand dashboards
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Mobile-First Accessibility</h3>
                <p className="text-[#ffffffb3]">
                  Empower the entire team to stay productive from anywhere, at
                  any time.
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
                To ensure Jugl was truly intuitive, we conducted remote
                usability testing on our prototypes using Maze. This allowed us
                to gather actionable, data-driven feedback to validate our
                design choices.
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
                      <div className="text-[52px] font-semibold">43</div>
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
                      <div className="text-[52px] font-semibold">43</div>
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
                      <div className="text-[#ffffffb3]">
                        Create a Project & Assign a Task
                      </div>
                      <div className="text-[52px] font-semibold">94%</div>
                      <div className="font-bold">Success Rate</div>
                    </div>
                    <div
                      className="p-8 flex flex-col gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                      // style={{
                      //   background:
                      //     "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%",
                      // }}
                    >
                      <div className="text-[#ffffffb3]">
                        Update a Sales Lead on Mobile
                      </div>
                      <div className="text-[52px] font-semibold">12.2%</div>
                      <div className="font-bold">Misclick Rate</div>
                      <div className="text-[#ffffffb3]">
                        While the success rate was high, this data pointed to a
                        cluttered mobile interface causing user frustration.
                      </div>
                    </div>
                    <div
                      className="p-8 flex flex-col gap-1 rounded-[25px] bg-[#242424] border border-[#4F4E4E]"
                      // style={{
                      //   background:
                      //     "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%",
                      // }}
                    >
                      <div className="text-[#ffffffb3]">
                        Generate a Weekly Report
                      </div>
                      <div className="text-[52px] font-semibold">14.4%</div>
                      <div className="font-bold">Misclick Rate</div>
                      <div className="text-[#ffffffb3]">
                        This indicated that the process for filtering and
                        generating reports was not as intuitive as it could be.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">Redesigned the Mobile UI</h3>
                <p className="text-[#ffffffb3]">
                  In response to the high misclick rate, we decluttered the
                  interface and introduced a "Quick Actions" bar, which saw the
                  misclick rate drop to under 20% in follow-up tests.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Improved Feature Discoverability
                </h3>
                <p className="text-[#ffffffb3]">
                  In response to the high misclick rate, we decluttered the
                  interface and introduced a "Quick Actions" bar, which saw the
                  misclick rate drop to under 20% in follow-up tests.
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
                Jugl successfully addresses the critical pain points of SMEs by
                replacing a chaotic mix of tools with a single, streamlined
                platform. This case study demonstrates the value of a
                user-centered approach, translating deep user understanding into
                a product that delivers measurable results.
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  A Unified Experience is Non-Negotiable
                </h3>
                <p className="text-[#ffffffb3]">
                  A single platform provides users with a sense of control and
                  relief.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Data-Driven Validation is Crucial
                </h3>
                <p className="text-[#ffffffb3]">
                  Usability testing data allowed us to move beyond assumptions
                  and fix real problems before launch.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-antonio">
                  Mobile-First is Mission-Critical
                </h3>
                <p className="text-[#ffffffb3]">
                  For modern SMEs, seamless functionality on the go is essential
                  for adoption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudy;
