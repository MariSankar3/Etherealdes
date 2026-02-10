export const caseStudyData = {
  jugl: {
    id: "CS_001",
    title: "Jugl mobile crm",
    videoSrc: "/case-study/jugl/jugl_video.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "paragraph",
            text: `We engineered Jugl, a comprehensive SaaS platform, to solve the core operational challenges facing Small and Medium-sized Enterprises (SMEs) by dismantling their operational silos. As an intuitive, all-in-one tool, Jugl serves as a central collaboration hub designed to connect diverse teams—from management to field staff—uniting them on a single platform. Our focus on mobile-first accessibility and seamless integration resulted in a unified workflow across web and mobile applications, making teamwork effortless and efficient.`,
            className: "font-400 text-[16px] text-white",
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle: "Untangling Fragmented SME Workflows",
        content: [
          {
            type: "paragraph",
            text: `Small and medium-sized businesses are often slowed down by deep-rooted inefficiency. Our research revealed that the biggest obstacle to their growth was not a lack of tools, but an overabundance of disconnected ones. Their daily operations are typically spread across a mix of spreadsheets, emails, CRMs, and messaging apps. This fragmented approach creates significant problems: scattered data, duplicated work, poor visibility for managers, and critical communication gaps. This pain was especially acute for mobile and field staff, who were often disconnected from the essential tools and real-time updates needed to perform their jobs effectively.`,
            className: "font-400 text-[16px] text-[#ffffffb3]",
          },
          {
            type: "paragraph",
            text: "The data quantified this frustration:",
            className: "font-bold text-[18px] text-[#ffffff] mb-0",
          },
          {
            type: "list",
            items: [
              "Employees use an average of 4-5 different applications daily simply to coordinate their work.",
              'A significant portion of the workday is lost to "context switching"—logging in and out of different systems.',
              "User satisfaction with their existing toolset was consistently low, with a strong demand for a single source of truth.",
            ],
            className: "flex flex-col gap-2 mb-2 text-[#ffffffb3]",
          },
        ],
      },
      {
        id: "building-jugl",
        label: "Building Jugl",
        subtitle: "Human Impact | User Interviews",
        content: [
          {
            type: "paragraph",
            text: `Understanding why this app is needed and pinpointing the key factors that will drive its success in the market.`,
            className: "font-400 text-[16px] text-white",
          },
          {
            type: "image",
            src: "/case-study/jugl/1.png",
            alt: "",
            className: "w-[190px] h-[160px] object-cover",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2 mb-4",
            items: [
              {
                type: "h3",
                text: "Project Manager",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Spent hours manually compiling progress reports from scattered data. She lived with the constant risk of missed deadlines because of communication lags between platforms. She needed a unified command center.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2 mb-4",
            items: [
              {
                type: "h3",
                text: "Sales Executive",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Felt unprepared in front of clients. He couldn't answer simple questions about an order status from his phone because the CRM and inventory systems were separate, making him feel inefficient and unprofessional.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2 mb-4",
            items: [
              {
                type: "h3",
                text: "User-Centered Design Process",
                className: "font-anton font-400 text-[26px] text-white",
              },
              {
                type: "paragraph",
                text: `We followed a structured, iterative User-Centered Design (UCD) process to ensure every design decision was grounded in user needs and business goals.`,
                className: "text-white",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2 mb-4",
            items: [
              {
                type: "h3",
                text: "Information Architecture (IA)",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Our first step was to create the application's blueprint. We mapped out the complete user journey, organizing Jugl's extensive features into a logical structure to ensure users could easily navigate the platform without feeling overwhelmed.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/jugl/2.png",
            alt: "",
            className: "w-full h-full rounded-[30px] pb-[20px] mb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Low-Fidelity Wireframing",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `With the IA as our guide, we translated the structure into basic screen layouts. These wireframes focused purely on functionality and flow, allowing us to test core usability with users for early feedback.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/jugl/3.png",
            alt: "",
            className:
              "w-full h-full rounded-[30px] py-[25px] border-[#4F4E4E] border-[1px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Jugl Design System",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `To ensure consistency across web and mobile, we developed a robust design system with a comprehensive library of reusable UI components, color palettes, and typography guidelines. This accelerated the development process and guaranteed a cohesive user experience.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/jugl/4.png",
            alt: "",
            className: "w-full h-full rounded-[30px] pb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "High-Fidelity UI Design & Iteration",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Finally, we combined our tested wireframes with the design system to produce pixel-perfect UI screens. These polished designs were again put through user feedback sessions to catch any remaining issues before the final handoff to development.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/jugl/5.png",
            alt: "",
            className: "w-full h-full rounded-[30px] pb-[20px]",
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: "The Complete Business Command Center",
        content: [
          {
            type: "paragraph",
            text: `To address these challenges directly, we designed Jugl to be the single source of truth for SMEs. It consolidates the essential functions of a business into one intuitive and powerful platform.`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Unified Task Management",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Assign, track, and manage all team tasks in one central place.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Integrated Communication",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Centralize conversations, file sharing, and conduct secure audio/video calls with internal teams, external clients, and vendors.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Secure Cloud Storage (Jugl Drive)",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Provide teams and clients with a dedicated, secure space to store, access, and share important documents and project files.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Multi-Organization Collaboration",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Enable seamless collaboration between different businesses by creating shared, permission-based workspaces for joint projects.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Order & Resource Management",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Streamline order processing and allocate business resources with maximum efficiency.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Inventory Management",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Track stock levels and manage assets directly within the platform.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Automated HR Workflows",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Simplify employee onboarding, leave requests, and other essential HR processes.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Performance & Recognition Management",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `A comprehensive module to drive employee growth. Set individual and team goals, track performance against targets, and foster a positive work culture through a built-in system for accolades and recognition.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Integrated Ticketing System",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Gain instant, actionable insights with intelligent, easy-to-understand dashboards.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Mobile-First Accessibility",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Empower the entire team to stay productive from anywhere, at any time.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "test-and-validating",
        label: "Testing & Validation",
        subtitle: "Data-Driven Usability Testing",
        content: [
          {
            type: "paragraph",
            text: `To ensure Jugl was truly intuitive, we conducted remote usability testing on our prototypes using Maze. This allowed us to gather actionable, data-driven feedback to validate our design choices.`,
            className: "font-400 font-semibold text-[16px] text-white",
          },

          {
            type: "block",
            className: "flex flex-col gap-4",
            items: [
              {
                type: "h3",
                text: "Testing at a Glance",
                className: "font-antonio",
              },
              {
                type: "cards",
                layout: "grid grid-auto md:grid-cols-2 gap-[18px] mb-4",
                cards: [
                  {
                    title: "Total",
                    number: "43",
                    footer: "Responses",
                  },
                  {
                    title: "Key Missions",
                    number: "43",
                    footer: "Tested Prototypes",
                  },
                ],
              },
            ],
          },

          {
            type: "block",
            className: "flex flex-col gap-4",
            items: [
              {
                type: "h3",
                text: "Quantitative Test Results",
                className: "font-antonio",
              },
              {
                type: "cards",
                layout:
                  "grid grid-auto md:grid-cols-2 xl:grid-cols-3 gap-[18px] mb-4",
                cards: [
                  {
                    title: "Create a Project & Assign a Task",
                    number: "94%",
                    footer: "Success Rate",
                    textClass: "text-[#ffffffb3]",
                  },
                  {
                    title: "Update a Sales Lead on Mobile",
                    number: "12.2%",
                    footer: "Misclick Rate",
                    note: "While the success rate was high, this data pointed to a cluttered mobile interface causing user frustration.",
                    textClass: "text-[#ffffffb3]",
                  },
                  {
                    title: "Generate a Weekly Report",
                    number: "14.4%",
                    footer: "Misclick Rate",
                    note: "This indicated that the process for filtering and generating reports was not as intuitive as it could be.",
                    textClass: "text-[#ffffffb3]",
                  },
                ],
              },
            ],
          },

          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Redesigned the Mobile UI",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `In response to the high misclick rate, we decluttered the interface and introduced a "Quick Actions" bar, which saw the misclick rate drop to under 20% in follow-up tests.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },

          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Improved Feature Discoverability",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `In response to the high misclick rate, we decluttered the interface and introduced a "Quick Actions" bar, which saw the misclick rate drop to under 20% in follow-up tests.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "paragraph",
            text: `Jugl successfully addresses the critical pain points of SMEs by replacing a chaotic mix of tools with a single, streamlined platform. This case study demonstrates the value of a user-centered approach, translating deep user understanding into a product that delivers measurable results.`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "A Unified Experience is Non-Negotiable",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `A single platform provides users with a sense of control and relief.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Data-Driven Validation is Crucial",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Usability testing data allowed us to move beyond assumptions and fix real problems before launch.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mb-2",
            items: [
              {
                type: "h3",
                text: "Mobile-First is Mission-Critical",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `For modern SMEs, seamless functionality on the go is essential for adoption.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },


  purple_quarter: {
    id: "CS_002",
    title: "Purple Quarter - Elixir",
    videoSrc: "/client-work.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "paragraph",
            text: `We engineered Purple Quarter, a specialized executive search firm, to solve the critical talent challenges faced by technology-driven organizations. Our goal was to bridge the gap between visionary companies and exceptional tech leadership. As an insight-driven partner, Purple Quarter serves as a strategic connector, aligning senior technology leaders with an organization's specific technical and cultural goals. By emphasizing deep technical knowledge and a tailored search approach, we ensure the process of hiring leadership is smooth, trustworthy, and strategic for our clients.`,
            className: "font-400 text-[16px] text-white",
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle: "The High-Stakes Search for Tech Leadership",
        content: [
          {
            type: "paragraph",
            text: `Technology-driven organizations often struggle to find the right leadership talent to drive innovation and growth. Our research showed the biggest obstacle isn't a lack of candidates, but the difficulty in identifying, assessing, and engaging high-calibre leaders who fit both technically and culturally.
Traditional search methods, relying on generic approaches and fragmented communication, fall short for these specialized roles. This creates significant problems, including prolonged hiring cycles, candidate mismatches, and a lack of confidentiality that senior executives require.`,
            className: "font-400 text-[16px] text-[#ffffffb3]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 text-[#ffffffb3]",
            items: [
              {
                type: "paragraph",
                text: "The data quantified this frustration",
                className: "font-bold",
              },
              {
                type: "list",
                items: [
                  "Many firms use dispersed networks and unofficial channels to find leadership talent.",
                  "Significant time is lost to manual outreach and scattered candidate assessments.",
                  "Satisfaction with traditional search methods is consistently low, with a strong demand for a specialized, transparent, and technically informed process.",
                ],
                className: "flex flex-col gap-2",
              },
            ],
          },
        ],
      },
      {
        id: "building-purple-quarter",
        label: "Building Purple Quarter",
        subtitle: "Human Impact | User Interviews",
        content: [
          {
            type: "paragraph",
            text: `This challenge was best understood through our user interviews:`,
            className: "font-600 text-[16px] text-white",
          },
          {
            type: "image",
            src: "/case-study/jugl/1.png",
            alt: "",
            className: "w-[190px] h-[160px] object-cover",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              { type: "h3", text: "The HR Leader", className: "font-antonio" },
              {
                type: "paragraph",
                text: `She struggled to coordinate executive searches using spreadsheets and email threads. She felt constant pressure for updates and risked losing top candidates to slow processes. She needed a single platform to manage searches and make data-driven decisions..`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "The Seasoned CTO",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `He was overwhelmed by generic recruiter approaches that ignored his technical background and career goals. He feared that exploring new roles could compromise his reputation at his current company. He wanted a discreet, trusted partner to connect him with roles that matched his ambition and skills.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h2",
                text: "User-Centered Design Process",
                className:
                  "font-anton font-400 text-[26px] text-white uppercase",
              },
              {
                type: "paragraph",
                text: `We followed a structured, iterative User-Centered Design (UCD) process to ensure every design decision was grounded in user needs and business goals.`,
                className: "text-white font-raleway",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Information Architecture (IA)",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Our first step was to create the application’s blueprint. We mapped out the complete user journey, organizing the platform’s core features into a well-structured flow to ensure users could navigate effortlessly without experiencing friction or overload.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/jugl/2.png",
            alt: "",
            className: "w-full h-full rounded-[30px] pb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Low-Fidelity Wireframing",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We translated user requirements into basic screen layouts. These wireframes focused on functionality and flow, allowing us to test key interactions with clients and candidates for early feedback.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/purple-quarter/3.svg",
            alt: "",
            className: "w-full h-full rounded-[30px] pb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Purple Quarter Design System",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We developed a robust design system with a library of UI components, bespoke colour palettes, and typography to reflect the brand's premium, tech-focused personality. This ensured a consistent, professional experience across all touchpoints.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/purple-quarter/4.svg",
            alt: "",
            className: "w-full h-full rounded-[30px] pb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "High-Fidelity UI Design & Iteration",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We combined our validated wireframes and design system to create pixel-perfect UI screens. These polished designs underwent further user testing to resolve any remaining usability issues before development.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "image",
            src: "/case-study/purple-quarter/5.png",
            alt: "",
            className: "w-full h-full rounded-[30px] pb-[20px]",
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: "A Bespoke Platform for Tech Executive Search",
        content: [
          {
            type: "paragraph",
            text: `Purple Quarter provides a dedicated platform and service to address these challenges directly. Key solutions include:`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Dedicated Search Contracts",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We provide dedicated, ongoing technology leadership recruitment with accelerated searches and cost savings through a stable, long-term relationship.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Centralized Talent Tool",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Our platform enables clients to track search activity, view candidate details, and securely make executive hires in an efficient manner. It also includes a pre-vetted talent pool for rapid access to qualified candidates.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Strategic Profile Mapping",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We go beyond job titles to specify the precise skills, experience, leadership style, and cultural fit required for a role, ensuring a perfect match.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "test-and-validating",
        label: "Test & Validating",
        subtitle: "Data-Driven Usability Testing",
        content: [
          {
            type: "paragraph",
            text: `To ensure the platform was truly intuitive, we conducted remote usability testing on our prototypes using Maze.`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-4",
            items: [
              {
                type: "h3",
                text: "Testing at a Glance",
                className: "font-antonio",
              },
              {
                type: "cards",
                layout: "grid grid-auto md:grid-cols-2 gap-[18px]",
                cards: [
                  { title: "Total", number: "36", footer: "Responses" },
                  {
                    title: "Key Missions",
                    number: "3",
                    footer: "Tested Prototypes",
                  },
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-4",
            items: [
              {
                type: "h3",
                text: "Quantitative Test Results",
                className: "font-antonio",
              },
              {
                type: "cards",
                layout:
                  "grid grid-auto md:grid-cols-2 xl:grid-cols-3 gap-[18px]",
                cards: [
                  {
                    title: "Create a Project & Assign a Task",
                    number: "92%",
                    footer: "Success Rate",
                    note: "While high, some user hesitation indicated a need for improved navigation cues.",
                    textClass: "text-[#ffffffb3]",
                  },
                  {
                    title: "Review Candidate Profile Details",
                    number: "11.8%",
                    footer: "Misclick Rate",
                    note: "This pointed to a cluttered profile layout that made it hard to scan information quickly.",
                    textClass: "text-[#ffffffb3]",
                  },
                  {
                    title: "Submit Feedback on Shortlisted Candidates",
                    number: "15.6%",
                    footer: "Misclick Rate",
                    note: "This suggested the feedback process was not as intuitive as it could be.",
                    textClass: "text-[#ffffffb3]",
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            text: "Key Design Iterations from Testing",
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Improved Feature Discoverability",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `After an initial test showed difficulty in finding the feedback section, we moved it to a more prominent location on the dashboard. In re-testing, the success rate for this task jumped to 93%.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Redesigned the Candidate Profile UI",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `In response to the high misclick rate, we simplified the profile layout and added a "Quick Review" sidebar. This successfully reduced the misclick rate to under 18% in follow-up tests.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "paragraph",
            text: `Purple Quarter successfully addresses the unique challenges of tech executive recruitment by replacing generic, fragmented processes with a tailored, transparent platform. This case study demonstrates how a user-centred approach, translating deep insights from clients and candidates, delivers quantifiable and lasting value.`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Specialization is Non-Negotiable",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `A generic approach is ineffective for high-stakes tech leadership roles. A specialized platform that understands the nuances of technology and culture is essential.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "The Dual Experience is Critical",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `The platform must provide a seamless, confidential, and respectful experience for both the hiring client and the senior-level candidate.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Transparency Builds Trust",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `In a traditionally opaque industry, providing clients with clear, data-driven visibility into search progress is a powerful differentiator that builds confidence and strengthens partnerships.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },
  saltbox: {
    id: "CS_003",
    title: "Saltbox",
    videoSrc: "/case-study/saltbox/saltbox-video.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "paragraph",
            text: `Saltbox is a dynamic Salesforce consulting practice with a bold vision—to redefine how B2B and D2C commerce operate across industries like manufacturing, consumer goods, and life sciences. Backed by Salesforce Ventures, their clients rely on them to lead complex digital transformations with speed and precision.`,
            className: "font-400 text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: `To support this, Saltbox needed a design partner who could match their pace, elevate their user experience, and bring consistency across all Salesforce-powered interfaces. Our team partnered with Saltbox to build a scalable, branded, and accessible UI system leveraging the Salesforce Lightning Design System (SLDS), ensuring every touchpoint was as seamless as the solutions they delivered.`,
            className: "font-400 text-[16px] text-white mt-2",
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle: "Building on Salesforce Without Compromising Design",
        content: [
          {
            type: "paragraph",
            text: `While Salesforce is robust in functionality, its out-of-the-box UI can fall short in delivering modern, brand-consistent experiences. Saltbox needed to`,
            className: "font-400 text-[16px] text-[#ffffffb3]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 text-[#ffffffb3]",
            items: [
              {
                type: "list",
                items: [
                  "Streamline and unify the interface across their client portals and internal tools.",
                  "Maintain a strong brand identity while working within SLDS constraints.",
                  "Build accessible, responsive, and scalable UI components for enterprise use cases.",
                  "Integrate seamlessly with third-party tools like ERP systems, Slack, and email platforms.",
                  "Secure client consensus on data protection policies and governance, ensuring all solutions meet legal and compliance standards.",
                ],
                className: "flex flex-col gap-2",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              { type: "h3", text: "In short", className: "font-antonio" },
              {
                type: "paragraph",
                text: `They needed the power of Salesforce, without compromising on experience or efficiency—for their clients or their teams.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: "A Branded, Accessible UI System Built on SLDS",
        content: [
          {
            type: "image",
            src: "/case-study/saltbox/solution.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: `We collaborated closely with Saltbox’s product and engineering teams to design and implement a modular, SLDS-compliant design system that delivered speed, consistency, and scalability.`,
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "paragraph",
            text: `Key Implementation Highlights`,
            className:
              "text-white font-raleway text-[16px] mt-5 mb-4 font-[600]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Theme-Driven Visual Identity",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Using Salesforce’s theming capabilities and branding tokens, we crafted a custom visual style that preserved Saltbox’s brand DNA—color palettes, typography, and iconography—while remaining compliant with Lightning standards.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Component-Led Development with SLDS",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We utilized SLDS-native components such as lightning-button, lightning-card, and lightning-datatable to:`,
                className: "text-[#ffffffb3] text-[14px]",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "Reduce development overhead",
                      "Minimize design-developer friction",
                      "Ensure consistency across all experiences",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Accessibility at the Core",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Following WCAG guidelines, we built interfaces that were usable for all:`,
                className: "text-[#ffffffb3] text-[14px]",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "Content Hierarchy",
                      "ARIA labels, proper contrast, and keyboard navigation",
                      "Full screen-reader support",
                      "Mobile-friendly breakpoints for every screen",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Responsive Design",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Using Salesforce’s responsive grid system, we ensured that applications rendered flawlessly across desktops, tablets, and mobile devices—critical for on-the-go enterprise users.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "businessImpact",
        label: "Business Impact",
        subtitle: "Elevating the Salesforce Experience for B2B",
        content: [
          {
            type: "image",
            src: "/case-study/saltbox/business_impact.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: `The design system empowered Saltbox to deliver enhanced value to its enterprise clients:`,
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "For Business Users:",
                className: "font-antonio",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "Unified customer profiles, contracts, and communications in one place",
                      "Automated workflows that reduced operational overhead",
                      "Custom dashboards for real-time insights across the buyer journey",
                      "Role-based access control to ensure data security and compliance",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "For End Users:",
                className: "font-antonio",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "A clean, modern interface with intuitive navigation",
                      "Mobile-ready access to core tools",
                      "Smart task prioritization via AI insights",
                      "Reduced cognitive load via consistent design patterns",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ourProcess",
        label: "Our Process",
        subtitle: "Design Execution Aligned with Salesforce Velocity",
        content: [
          {
            type: "paragraph",
            text: `Our approach was built on deep collaboration and agile delivery:`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Discovery & Requirements Mapping",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Understood Saltbox’s internal needs and client workflows to align design goals with business priorities.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Design System Definition",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Developed a scalable, tokenized design framework that worked seamlessly with SLDS.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Component Implementation & QA",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Delivered reusable components with accessibility baked in—tested across devices and user roles.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Training & Handoff",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Documented usage patterns, tokens, and guidelines to empower internal Saltbox teams to continue evolving the system post-deployment.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "image",
            src: "/case-study/saltbox/conclusion.png",
            alt: "",
            className: "w-full h-full py-4",
          },
          {
            type: "paragraph",
            text: `Our partnership with Saltbox resulted in a Salesforce-powered experience that is not only functional but beautiful, intuitive, and enterprise-ready. With the right mix of design consistency, accessibility, and technical rigor, Saltbox is now better equipped to help its clients scale their digital commerce journeys—faster and smarter.`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: `What We Learned:`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Design Consistency is a Multiplier",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `A reusable system accelerates development while strengthening the brand.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Accessibility Can’t Be an Afterthought",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Inclusive design increases adoption across diverse user groups.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Working With Salesforce = Working with Constraints",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `The right partner helps turn limitations into leverage.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },
  saltbox_healthcare: {
    id: "CS_004",
    title: "Saltbox Healthcare",
    videoSrc: "/case-study/saltbox/saltbox-video.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "list",
            items: [
              "Saltbox Healthcare is a forward-thinking healthcare solutions provider with an ambitious mission — to redefine how care delivery, patient engagement, and healthcare operations work in a digital-first world.",
              "From hospitals and clinics to pharmaceutical companies and research labs, Saltbox Healthcare serves a broad spectrum of the healthcare ecosystem, helping organizations deliver better outcomes through innovative, secure, and compliant technology",
              "To achieve this, Saltbox Healthcare needed a design partner who could match their pace, elevate the patient and provider experience, and unify their digital touchpoints",
              "Our team partnered with Saltbox Healthcare to create a scalable, branded, and accessible digital experience platform, ensuring every interaction — whether by a patient, provider, or administrator — was intuitive, secure, and impactful.",
            ],
            className: "custom-list",
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle:
          "Delivering Modern Healthcare Experiences Without Compromising Compliance",
        content: [
          {
            type: "paragraph",
            text: `In healthcare, technology is only as good as its ability to improve lives — safely and securely. Saltbox Healthcare faced the challenge of :`,
            className: "font-400 text-[16px] text-[#ffffffb3]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 text-[#ffffffb3]",
            items: [
              {
                type: "list",
                items: [
                  "Unifying patient portals, provider dashboards, and administrative tools into one consistent experience.",
                  "Maintaining a strong, trusted brand identity while ensuring HIPAA compliance and medical accessibility standards",
                  "Designing responsive, accessible interfaces for patients, clinicians, and operational teams.",
                  "Integrating seamlessly with EHR systems, lab tools, telehealth platforms, and secure messaging solutions",
                  "Securing stakeholder alignment on data governance, patient privacy, and security policies.",
                ],
                className: "flex flex-col gap-2",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              { type: "h3", text: "In short", className: "font-antonio" },
              {
                type: "paragraph",
                text: `They needed the innovation of modern healthcare technology without sacrificing trust, compliance, or usability.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: "A Unified, Accessible Digital Care Platform",
        content: [
          {
            type: "image",
            src: "/case-study/saltbox_healthcare/solution.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: `We collaborated closely with Saltbox’s product and engineering teams to design and implement a modular, SLDS-compliant design system that delivered speed, consistency, and scalability.`,
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "paragraph",
            text: `Key Implementation Highlights`,
            className:
              "text-white font-raleway text-[16px] mt-5 mb-4 font-[600]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Brand-Driven Visual Identity",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We translated Saltbox Healthcare’s commitment to care and trust into a clear visual language — calming color palettes, readable typography, and intuitive iconography — while meeting medical accessibility guidelines.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Component-Led Development",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We built reusable, secure UI components for :`,
                className: "text-[#ffffffb3] text-[14px]",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "Patient registration & scheduling",
                      "Telehealth video consultation",
                      "Lab results & prescription tracking",
                      "Billing & insurance management",
                      "This reduced development time, minimized inconsistencies, and ensured faster deployment of new features.",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Accessibility at the Core",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Following WCAG and healthcare-specific accessibility guidelines, we ensured :`,
                className: "text-[#ffffffb3] text-[14px]",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "Clear content hierarchy and medical terminology support",
                      "ARIA labels, high-contrast modes, and screen reader optimization",
                      "Mobile-friendly breakpoints for patient access anywhere",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Interoperable & Secure Integrations",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Designed for smooth integration with EHR/EMR systems, secure file sharing, and HIPAA-compliant communication tools.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "businessImpact",
        label: "Business Impact",
        subtitle: "Improving Care for Patients & Efficiency for Providers",
        content: [
          {
            type: "image",
            src: "/case-study/saltbox_healthcare/business_impact.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: `The design system empowered Saltbox to deliver enhanced value to its enterprise clients:`,
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "For Healthcare Professionals:",
                className: "font-antonio",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "Unified access to patient records, lab results, and care plans",
                      "Automated workflows reducing administrative burden",
                      "Real-time analytics for patient outcomes and operational efficiency",
                      "Role-based permissions to safeguard sensitive data",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "For Patients:",
                className: "font-antonio",
              },
              {
                type: "block",
                className: "flex flex-col gap-2 text-[#ffffffb3]",
                items: [
                  {
                    type: "list",
                    items: [
                      "Easy appointment booking and telehealth access",
                      "Simple, secure lab result viewing",
                      "Personalized care reminders and medication tracking",
                      "Consistent, intuitive navigation across devices",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ourProcess",
        label: "Our Process",
        subtitle: "Agile & Collaborative Execution",
        content: [
          {
            type: "paragraph",
            text: `Our approach was built on deep collaboration and agile delivery:`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Discovery & Requirements Mapping",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `We collaborated with clinicians, patients, and administrators to ensure the platform met real-world needs.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Design System Definition",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Created a scalable, compliant, and patient-friendly design framework.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Component Implementation & QA",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Built and tested reusable components under strict compliance and accessibility standards.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-2",
            items: [
              {
                type: "h3",
                text: "Training & Handoff",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Equipped Saltbox Healthcare teams with guidelines and tools to maintain and expand the system.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "image",
            src: "/case-study/saltbox_healthcare/conclusion.png",
            alt: "",
            className: "w-full h-full py-4",
          },
          {
            type: "paragraph",
            text: `Our partnership with Saltbox resulted in a Salesforce-powered experience that is not only functional but beautiful, intuitive, and enterprise-ready. With the right mix of design consistency, accessibility, and technical rigor, Saltbox is now better equipped to help its clients scale their digital commerce journeys—faster and smarter.`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: `What We Learned:`,
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Consistency Builds Trust",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `A unified experience reassures patients and reduces provider errors.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Accessibility is Care ",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Inclusive design is essential in healthcare, not optional.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Compliance Can Be a Creative Constraint ",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Working within regulations can still yield beautiful, human-centered solutions.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },
  kalagato: {
    id: "CS_005",
    title: "Kalagato",
    videoSrc: "/case-study/saltbox/saltbox-video.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "paragraph",
            text: "In the early days, many mobile app developers struggled to accurately value their apps, find the right buyers, or unlock their full revenue potential. Without access to large-scale user data, most creators had to rely on guesswork, making it hard to know when—or how—to sell. This gap left promising apps underperforming, overlooked, or sold for less than they were worth. KalaGato set out to solve this by using real user behavior data to identify high-potential apps, improve their performance, and guide smooth, profitable exits.",
            className: "font-400 text-[16px] text-white",
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle: "Turning Complex KPI’s into Clear Dashboards",
        content: [
          {
            type: "image",
            src: "/case-study/kalagato/challenges.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Complex Data Presentation",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Analytics involved multiple KPIs (LTV, churn rate, acquisition cost, growth potential) which could overwhelm users.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Serving Multiple User Personal",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Needed to design for both app sellers (valuation, growth insights) and buyers (discovery, acquisition potential) in one platform.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Balancing Detail with Usability",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Too much data risked clutter; too little risked losing actionable insights.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Ensuring Consistency Across Devices",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Desktop dashboards needed to translate seamlessly to mobile without losing clarity.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Onboarding First-Time Users",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Non-technical users needed guidance to understand analytics terminology and dashboard functions.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Building Trust & Credibility Visually",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Users are sharing sensitive business data, so trust signals needed to be clear in design.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Performance & Feedback",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Large datasets caused slow load times and users needed visible feedback during refreshes.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: "Turning Data Complexity into Design Clarity",
        content: [
          {
            type: "image",
            src: "/case-study/kalagato/solution.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "We transformed overwhelming multi-KPI analytics into a streamlined, user-friendly experience with intuitive dashboards, role-specific layouts, progressive disclosure, and a consistent design system—ensuring every insight is both accessible and actionable.",
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "paragraph",
            text: "Key Implementation Highlights",
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Simplified Data Visualization",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Used clean, color-coded charts with summaries (“Key Insights”) above each visualization.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Personal-Based Dashboards",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Role-based layouts—sellers see valuation and optimization tools; buyers see app potential and acquisition opportunities.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Progressive Disclosure",
                className: "font-antonio mt-2",
              },
              {
                type: "paragraph",
                text: `High-level KPIs shown first; users can expand sections for detailed analytics.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Responsive Design System",
                className: "font-antonio mt-2",
              },
              {
                type: "paragraph",
                text: `Created a unified design library ensuring consistent colors, typography, and spacing across desktop and mobile.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Guided Onboarding & Tooltips",
                className: "font-antonio mt-2",
              },
              {
                type: "paragraph",
                text: `Added walkthroughs, quick-start checklists, and inline help for key metrics.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Trust-Enhancing Design Elements",
                className: "font-antonio mt-2",
              },
              {
                type: "paragraph",
                text: `Displayed compliance badges (GDPR, SOC2), security icons, and professional brand colors for credibility.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Smooth Data Refresh & Performance Indicators",
                className: "font-antonio mt-2",
              },
              {
                type: "paragraph",
                text: `Added “Last Updated” timestamps, subtle animations for refreshed data, and optimized queries for faster loads.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "image",
            src: "/case-study/kalagato/conclusion.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "In the end, our approach proved that powerful analytics don’t have to feel overwhelming. By combining simplicity, tailored experiences, and trust-focused design with fast performance and continuous refinement, we turned a complex data platform into an intuitive, engaging tool. This balance between depth and usability ensured users could focus on insights—not on figuring out the interface.",
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: "What We Learned:",
            className: "font-400 font-semibold text-[16px] text-white py-4",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Simplicity Wins",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Even advanced analytics must feel simple and approachable to keep users engaged.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Different Users Need Different Journeys:",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Tailoring layouts and content for different personas improves relevance and usability.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Visual Trust Matters",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Compliance badges, clean layouts, and consistent branding reduce hesitation for sensitive data sharing.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Onboarding is Critical",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `First-time user flows can make or break adoption, especially in data-heavy tools.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Performance is UX",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Fast, responsive dashboards directly impact user satisfaction.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Iterative Testing Pays Off",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Regular user feedback led to small design changes that had big impacts on clarity and usability.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },
  shopify: {
    id: "CS_006",
    title: "Shopify - Sports",
    videoSrc: "/case-study/saltbox/saltbox-video.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "paragraph",
            text: "Design and develop a Shopify store that works for multiple sports categories and products while keeping the shopping process simple and engaging.",
            className: "font-400 text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: "Key objectives:",
            className: "font-600 text-[16px] text-white mt-4",
          },
          {
            type: "list",
            className: "text-[#ffffffb3]",
            items: [
              "Create an eye-catching hero section that inspires visitors right away.",
              "Showcase featured and popular products directly on the homepage.",
              "Make browsing by collections easy for customers.",
              "Present product details clearly with multiple image views and bold pricing.",
              "Build trust through brand promises and featured-in logos.",
              "Ensure a smooth shopping experience across desktop and mobile.",
            ],
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle: "Building credibility for a new store",
        content: [
          {
            type: "image",
            src: "/case-study/shopify/challenges.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Diverse product range",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Designing layouts that look good whether displaying skateboards, apparel, or sports accessories.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Navigation simplicity",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Avoiding clutter while still offering quick links to different sports categories.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Visual consistency",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Maintaining a unified brand style across all sports imagery.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Trust-building",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Making sure new customers feel confident purchasing from a fresh online store.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Performance optimization",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Sports images can be large and detailed, so we had to keep load times fast.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: " Collection tiles with strong visuals",
        content: [
          {
            type: "image",
            src: "/case-study/shopify/solution.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "Our design approach focused on creating an engaging and trustworthy shopping experience. From a dynamic hero banner and best-seller highlights to visually striking category tiles, every element was crafted for clarity and appeal. We optimized performance, ensured full responsiveness, and built credibility through trust signals, making the store both fast and user-friendly.",
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "paragraph",
            text: "Key Implementation Highlights",
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "list",
            items: [
              [
                {
                  type: "span",
                  text: "Dynamic hero banner",
                  className: "font-bold text-[16px]",
                },
                {
                  type: "span",
                  text: " with lifestyle imagery and clear calls-to-action like “Explore Now.”",
                  className: "text-[#ffffffb3] text-[16px]",
                },
              ],
              [
                {
                  type: "span",
                  text: "Featured & Popular product",
                  className: "font-bold text-[16px]",
                },
                {
                  type: "span",
                  text: " sections to spotlight best-sellers and promotions.",
                  className: "text-[#ffffffb3] text-[16px]",
                },
              ],
              [
                {
                  type: "span",
                  text: "Shop by Collection tiles",
                  className: "font-bold text-[16px]",
                },
                {
                  type: "span",
                  text: " with strong visuals for different sports categories.",
                  className: "text-[#ffffffb3] text-[16px]",
                },
              ],
              [
                {
                  type: "span",
                  text: "Detailed product pages",
                  className: "font-bold text-[16px]",
                },
                {
                  type: "span",
                  text: " including multiple product images, sizes, and purchase options.",
                  className: "text-[#ffffffb3] text-[16px]",
                },
              ],
              [
                {
                  type: "span",
                  text: "Credibility boosters",
                  className: "font-bold text-[16px]",
                },
                {
                  type: "span",
                  text: " - “Our Promise” section with icons, plus “Featured In” logos from recognized publications",
                  className: "text-[#ffffffb3] text-[16px]",
                },
              ],
              [
                {
                  type: "span",
                  text: "Optimized images & code",
                  className: "font-bold text-[16px]",
                },
                {
                  type: "span",
                  text: " for faster loading without losing visual impact.",
                  className: "text-[#ffffffb3] text-[16px]",
                },
              ],
              [
                {
                  type: "span",
                  text: "Fully responsive design",
                  className: "font-bold text-[16px]",
                },
                {
                  type: "span",
                  text: " for seamless shopping on mobile, tablet, and desktop.",
                  className: "text-[#ffffffb3] text-[16px]",
                },
              ],
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "image",
            src: "/case-study/shopify/conclusion.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "Through this project, we discovered the importance of adaptable layouts for showcasing diverse sports products. High-quality visuals and clear navigation proved far more effective than text-heavy or cluttered designs. Most importantly, building trust and ensuring fast performance significantly boosted customer confidence and conversions.",
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: "What We Learned:",
            className: "font-400 font-semibold text-[16px] text-white py-4",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Multi-category sports stores need flexible layouts",
                className: "font-antonio mt-4",
              },
              {
                type: "paragraph",
                text: `The design must adapt visually whether showing a skateboard, a jersey, or a tennis racket.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Strong visuals sell",
                className: "font-antonio mt-4",
              },
              {
                type: "paragraph",
                text: `Customers respond more to high-quality product and action shots than text-heavy descriptions.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Clarity beats complexity",
                className: "font-antonio mt-4",
              },
              {
                type: "paragraph",
                text: `Simple navigation wins over overstuffed menus.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Trust is essential for first-time buyers",
                className: "font-antonio mt-4",
              },
              {
                type: "paragraph",
                text: `Our promises and recognitions make a difference.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Speed = better conversions",
                className: "font-antonio mt-4",
              },
              {
                type: "paragraph",
                text: `Performance optimization directly impacts sales.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },
  jugl_bee: {
    id: "CS_007",
    title: "jugl bee",
    videoSrc: "/case-study/jugl/jugl_video.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "paragraph",
            text: "With the rapid shift to online education, teachers and students faced multiple challenges.",
            className: "font-400 text-[16px] text-white",
          },
          {
            type: "list",
            items: [
              "Managing classes, assignments, and discussions across scattered platforms.",
              "Difficulty in tracking progress, submissions, and deadlines",
              "Lack of a unified space for lesson delivery, communication, and resource sharing",
              "Teachers spending more time on admin tasks instead of focusing on teaching",
            ],
            className: "flex flex-col gap-2 mb-2 text-[#ffffff]",
          },
          {
            type: "h3",
            text: "Goal",
            className: "font-600 mt-4",
          },
          {
            type: "paragraph",
            text: "Create a single platform for schools, tutors, and academies to manage",
            className: "font-400 text-[16px] text-[#ffffffb3]",
          },

          {
            type: "list",
            className: "text-[#ffffffb3]",
            items: [
              "Live/recorded classes",
              "Assignments & submissions",
              "Group discussions & chats",
              "Course resources & payments",
            ],
          },
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle: "Clarifying navigation for smoother journeys",
        content: [
          {
            type: "image",
            src: "/case-study/jugl_bee/challenges.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Visual Hierarchy Issues",
                className: "font-antonio",
              },
              {
                type: "list",
                className: "text-[#ffffffb3]",
                items: [
                  "Inconsistent typography, icon styles, and color use across web and mobile.",
                  "Multiple colours used without a clear priority or meaning, making scanning difficult.",
                  "Lesson titles truncated without an easy way to view full titles.",
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Information Overload",
                className: "font-antonio mt-2",
              },
              {
                type: "list",
                className: "text-[#ffffffb3]",
                items: [
                  "Mobile dashboard stacks too many modules in one scroll, causing user fatigue.",
                  "Mixed content types in lesson/chat screens without visual grouping.",
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Navigation Confusion",
                className: "font-antonio mt-2",
              },
              {
                type: "list",
                className: "text-[#ffffffb3]",
                items: [
                  "Web version uses unlabelled icons until hover—confusing for first-time users.",
                  "Mobile has multiple equally emphasized actions, making it unclear what’s primary.",
                ],
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Accessibility Gaps",
                className: "font-antonio mt-2",
              },
              {
                type: "list",
                className: "text-[#ffffffb3]",
                items: [
                  "Low colour contrast in some UI elements.",
                  "Icon-only navigation reduces usability for low-vision users or those unfamiliar with icons.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: "Key Features to Enhance Teaching and Learning",
        content: [
          {
            type: "image",
            src: "/case-study/jugl_bee/solution.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "The app included features to address these pain points:",
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "h4",
            text: "Key Implementation Highlights",
            className: "font-antonio mt-4",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Centralized Lesson Management",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Teachers can schedule, edit, and manage lessons in one place, accessible by students on both web & mobile.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Assignment Tracking & Status",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Clear status indicators for “On Time,” “Delayed,” and “Query” so both teachers and students know the current progress.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Integrated Communication",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Public and private group chats, one-to-one messaging, and class discussions for instant doubt resolution.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Resource Library",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Store and share videos, documents, and notes directly in the app for quick access.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Performance Insights",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Teachers can track payments, attendance, and student engagement through reports.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Multi-device Access",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Consistent experience across desktop and mobile, ensuring accessibility anytime, anywhere.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "image",
            src: "/case-study/jugl_bee/conclusion.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "In the end, our approach proved that powerful analytics don’t have to feel overwhelming. By combining simplicity, tailored experiences, and trust-focused design with fast performance and continuous refinement, we turned a complex data platform into an intuitive, engaging tool. This balance between depth and usability ensured users could focus on insights—not on figuring out the interface.",
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: "What We Learned:",
            className: "font-400 font-semibold text-[16px] text-white py-4",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Consistency Builds Trust",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `A shared design system should guide typography, colours, and spacing for both web and mobile.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Prioritize Through Visual Hierarchy:",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Highlight urgent tasks like upcoming classes or pending assignments over secondary modules.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Chunk Information",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Use tabs or collapsible sections to reduce vertical scrolling.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Accessible by Design",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Ensure proper contrast, always pair icons with text, and avoid unnecessary text truncation.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Mobile-first Thinking",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Start with mobile constraints to ensure a smoother experience for the primary user group.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },


  
  stx: {
    id: "CS_003",
    title: "STX Case Study",
    videoSrc: "/case-study/jugl/jugl_video.mp4",
    sections: [
      {
        id: "goal",
        label: "Goal",
        subtitle: "Project Overview",
        content: [
          {
            type: "paragraph",
            text: "We designed STX, a next-generation online betting platform, to deliver a fast, intuitive, and transparent betting experience across sports and non-traditional markets such as politics and culture. The core objective was to simplify decision-making in a high-pressure, real-time environment while maintaining trust, security, and performance at scale. STX was built as a mobile-first product with full parity across web and iOS, ensuring a seamless experience regardless of how or where users place their bets. Our focus was on reducing friction throughout the betting journey—from discovery to bet placement and portfolio tracking—while supporting both casual and experienced bettors.",
            className: "font-400 text-[16px] text-white",
          },
         
        ],
      },
      {
        id: "challenges",
        label: "Challenges",
        subtitle: "Reducing Complexity in Real-Time Betting",
        content: [
         {
  type: "block",
  className: "flex flex-col gap-4",
  items: [
    {
      type: "paragraph",
      text: "Online betting platforms often overwhelm users with dense information, unclear odds presentation, and fragmented workflows. Our research revealed that the biggest challenge for bettors was not a lack of options, but difficulty in understanding and acting on them quickly.",
      className: "text-[#ffffffb3]"
    },
    {
      type: "list",
      className: "list-disc pl-5 text-[#ffffffb3]",
      items: [
        "Overcrowded interfaces during live events",
        "Confusing navigation between markets and bet slips",
        "Low confidence in bet confirmation and wallet transparency",
        "Friction when switching between sports and non-sports markets"
      ]
    },
    {
      type: "paragraph",
      text: "These issues were especially critical during live betting, where delays or mistakes directly impact user trust and engagement.",
      className: "text-[#ffffffb3]"
    }
  ]
},
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "The data quantified this frustration",
                className: "font-antonio mt-2",
              },
              {
                type: "list",
                className: "text-[#ffffffb3]",
                items: [
                  "Users frequently abandoned bets during live events due to UI confusion",
                  "A large portion of support requests were related to bet status and wallet clarity",
                  "New users struggled to understand odds and market structures",
                  "CMobile users demanded speed but encountered higher error rates under pressure"
                ],
              },
            ],
          },
          
        ],
      },
      {
        id: "solution",
        label: "Solution",
        subtitle: "Key Features to Enhance Teaching and Learning",
        content: [
          {
            type: "image",
            src: "/case-study/jugl_bee/solution.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "The app included features to address these pain points:",
            className: "text-white font-raleway text-[16px] font-[600]",
          },
          {
            type: "h4",
            text: "Key Implementation Highlights",
            className: "font-antonio mt-4",
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Centralized Lesson Management",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Teachers can schedule, edit, and manage lessons in one place, accessible by students on both web & mobile.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Assignment Tracking & Status",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Clear status indicators for “On Time,” “Delayed,” and “Query” so both teachers and students know the current progress.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Integrated Communication",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Public and private group chats, one-to-one messaging, and class discussions for instant doubt resolution.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Resource Library",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Store and share videos, documents, and notes directly in the app for quick access.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Performance Insights",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Teachers can track payments, attendance, and student engagement through reports.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
          {
            type: "block",
            className: "flex flex-col gap-2",
            items: [
              {
                type: "h3",
                text: "Multi-device Access",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: "Consistent experience across desktop and mobile, ensuring accessibility anytime, anywhere.",
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        label: "Conclusion",
        subtitle: "Conclusion & Key Takeaways",
        content: [
          {
            type: "image",
            src: "/case-study/jugl_bee/conclusion.png",
            alt: "",
            className: "w-full h-full pb-[20px]",
          },
          {
            type: "paragraph",
            text: "In the end, our approach proved that powerful analytics don’t have to feel overwhelming. By combining simplicity, tailored experiences, and trust-focused design with fast performance and continuous refinement, we turned a complex data platform into an intuitive, engaging tool. This balance between depth and usability ensured users could focus on insights—not on figuring out the interface.",
            className: "font-400 font-semibold text-[16px] text-white",
          },
          {
            type: "paragraph",
            text: "What We Learned:",
            className: "font-400 font-semibold text-[16px] text-white py-4",
          },
          {
            type: "block",
            className: "flex flex-col gap-2 mt-4",
            items: [
              {
                type: "h3",
                text: "Consistency Builds Trust",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `A shared design system should guide typography, colours, and spacing for both web and mobile.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Prioritize Through Visual Hierarchy:",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Highlight urgent tasks like upcoming classes or pending assignments over secondary modules.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Chunk Information",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Use tabs or collapsible sections to reduce vertical scrolling.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Accessible by Design",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Ensure proper contrast, always pair icons with text, and avoid unnecessary text truncation.`,
                className: "text-[#ffffffb3]",
              },
              {
                type: "h3",
                text: "Mobile-first Thinking",
                className: "font-antonio",
              },
              {
                type: "paragraph",
                text: `Start with mobile constraints to ensure a smoother experience for the primary user group.`,
                className: "text-[#ffffffb3]",
              },
            ],
          },
        ],
      },
    ],
  },
};



