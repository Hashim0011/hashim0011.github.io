import type { Dict } from "./types";

export const en: Dict = {
  locale: "en",
  dir: "ltr",

  profile: {
    name: "Hashim Al Masaabi",
    firstName: "Hashim",
    headline: "Software Engineer",
    roles: ["Software Engineer.", "Business Analyst.", "Frontend Developer.", "Automation Builder."],
    location: "Riyadh, Saudi Arabia",
    phone: "0555657087",
    phoneHref: "+966555657087",
    // wa.me wants bare digits with the country code and no plus sign.
    whatsapp: "966555657087",
    whatsappMessage:
      "Hi Hashim, I came across your portfolio and would like to talk about a project.",
    email: "hashimabdullatef@gmail.com",
    linkedin: "https://www.linkedin.com/in/hashim-almasaabi-b51ba4353/",
    intro:
      "Most projects go wrong before a line of code gets written, because what the client pictures never quite reaches the developer. I work between the two: I listen, get the idea straight, then build something people just use, without anyone explaining it.",
    availability: "Open to new projects",
  },

  stats: [
    { value: 4.9, suffix: "/5", label: "GPA, Software Engineering", decimals: 1 },
    { value: 2, suffix: "+", label: "Years building for clients", decimals: 0 },
    { value: 40, suffix: "+", label: "Projects & interfaces shipped", decimals: 0 },
    { value: 1, suffix: "st", label: "Place, national hackathon", decimals: 0 },
  ],

  services: [
    {
      icon: "code",
      title: "Frontend Development",
      copy: "React and TypeScript interfaces that stay fast and readable: component systems, responsive layouts, and state that behaves the same on the tenth screen as it did on the first.",
    },
    {
      icon: "clipboard",
      title: "Business Analysis",
      copy: "I sit with stakeholders, take the messy version of a requirement, and hand back user stories, acceptance criteria, and specs a developer can build from without guessing.",
    },
    {
      icon: "bug",
      title: "QA & Software Testing",
      copy: "Manual and automated testing, defect validation, and regression passes before a release ships, so the bug report arrives from me and not from your customer.",
    },
    {
      icon: "workflow",
      title: "Process Automation",
      copy: "n8n workflows that connect the tools a team already pays for. Sheets sync themselves, reports build themselves, and the manual copy-paste hour disappears from the week.",
    },
    {
      icon: "search",
      title: "SEO Optimisation",
      copy: "Semantic markup, clean metadata, and Core Web Vitals that pass: the technical groundwork that puts your site in front of the people already searching for what you do.",
    },
    {
      icon: "figma",
      title: "UI/UX Design",
      copy: "Wireframes, prototypes, and design systems in Figma and Framer, validated with early concept testing, then handed over as an interface I can also build.",
    },
  ],

  projects: [
    {
      id: "samad",
      image: "/projects/samad.webp",
      title: "Samad: Bilingual Corporate Website",
      category: "Client Project",
      year: "2026",
      visual: "web",
      blurb:
        "An Arabic/English corporate site with true RTL mirroring, a canvas-animated hero, and 23 project case studies.",
      detail:
        "Built end to end in Next.js 15 and React 19, with the localisation layer written from scratch: typed dictionaries that make a missing translation a compile-time error, locale-segmented routing, and middleware that reads language from a cookie, then Accept-Language. Arabic is the primary layout, so the SVG arch, carousel arrows, and per-word animations mirror programmatically rather than being duplicated per locale. The hero is a hand-written canvas scene that pauses off-screen and thins its particle budget on mobile.",
      stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "GSAP"],
      metric: "RTL-first, 23 case studies",
    },
    {
      id: "sanal-app",
      image: "/projects/sanal-app.webp",
      title: "Mobile App for iOS & Android",
      category: "Sanal AI",
      year: "2026",
      visual: "devices",
      blurb:
        "React Native screens for the Sanal AI app, from redesigned legacy flows through to live API wiring.",
      detail:
        "Designed and built the app interfaces for both platforms in React Native, reworking older screens into one consistent system and tightening the journeys around them. Connected every screen to the backend and REST APIs, so the AI assistant, discovery cards, order history, and account settings all run on live data rather than mockups.",
      stack: ["React Native", "REST APIs", "UI/UX Design"],
      metric: "Shipped on iOS and Android",
    },
    {
      id: "faten",
      image: "/projects/faten.webp",
      title: "Faten: Intellectual Security Platform",
      category: "Graduation Project",
      year: "2025",
      visual: "chat",
      blurb:
        "A full-stack awareness platform with authentication, an educational CMS, and AI chatbot workflows.",
      detail:
        "Designed the database, built Supabase authentication and real-time data handling, then layered an educational CMS on top so non-technical editors could publish structured content. Led the lifecycle end to end: planning, design, development, integration, deployment.",
      stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "n8n"],
      metric: "Full lifecycle owned",
    },
    {
      id: "dashyai",
      image: "/projects/dashyai.webp",
      title: "DashyAI: Analytics & Dashboard Automation",
      category: "Product",
      year: "2025",
      visual: "dashboard",
      blurb:
        "An AI-powered analytics platform with live KPI dashboards and what-if scenario forecasting.",
      detail:
        "Built end to end across the dashboard UI, the API layer, and the automation behind it. Google Sheets stays in sync through n8n workflows, KPI views update in real time, and an integrated AI chatbot reads the user data to explain patterns and recommend next steps.",
      stack: ["React", "Node.js", "n8n", "REST APIs", "Google Sheets"],
      metric: "Real-time sync",
    },
    {
      id: "fateen",
      title: "Fateen: Misinformation Detection",
      category: "Hackathon Winner",
      year: "2026",
      visual: "analytics",
      blurb:
        "An AI chatbot that verifies digital content across text, images, video, audio, and links.",
      detail:
        "Built for the Intellectual Empowerment Hackathon at Prince Sattam Bin Abdulaziz University and awarded 1st place. A multimodal analysis pipeline for content verification, recognised by the judging panel for technical innovation and real-world social impact.",
      stack: ["AI Workflows", "Multimodal Analysis", "React"],
      metric: "1st place",
    },
    {
      id: "jzaa",
      image: "/projects/jzaa.webp",
      title: "Corporate Website, Requirements to Maintenance",
      category: "Jzaa Agency",
      year: "2025 to Present",
      visual: "web",
      blurb:
        "The agency's own website, owned end to end: requirements gathered in person, sections designed, the site built, SEO set up, domain and hosting connected, and maintained since.",
      detail:
        "It started with a meeting rather than a brief. I sat with the team, worked out what the agency actually needed the site to do, and turned that conversation into a set of requirements we agreed on before any design existed.\n\nFrom there I designed several of the sections, built the site, and set up the technical SEO: semantic markup, clean metadata, and the groundwork that lets the pages be found. I connected their own domain, configured the hosting, and took it live.\n\nIt has stayed with me since. Development and maintenance are mine: updates, fixes, and the changes the agency asks for as the business moves.",
      stack: ["React", "Tailwind CSS", "Framer", "Technical SEO", "Hosting & DNS"],
      metric: "Live and maintained",
    },
    {
      id: "sanal",
      image: "/projects/sanal.webp",
      title: "Merchant & Web Application Features",
      category: "Sanal AI",
      year: "2026 to Present",
      visual: "devices",
      blurb:
        "Frontend features for a merchant platform, shipped on an Agile cadence with a cross-functional team.",
      detail:
        "Requirements analysis through to release: turning business needs into technical specifications and user stories, developing and enhancing frontend features for the web and merchant apps, then validating them through testing before each sprint review.",
      stack: ["React", "TypeScript", "Agile", "Jira"],
      metric: "Shipping in production",
    },
  ],

  experience: [
    {
      company: "Sanal AI",
      title: "Software Engineer",
      period: "04/2026 to Present",
      location: "Riyadh, Saudi Arabia",
      current: true,
      points: [
        "Gather and analyse business requirements, translating them into technical specifications and user stories.",
        "Develop and enhance frontend features for web and merchant applications, focused on usability, performance, and maintainability.",
        "Collaborate with cross-functional teams on product enhancements, UI/UX improvements, and feature delivery.",
        "Perform software testing, defect validation, and quality assurance to support reliable releases.",
        "Participate in Agile planning, sprint reviews, stakeholder meetings, and prioritisation.",
      ],
    },
    {
      company: "Jzaa Agency",
      title: "Frontend Web Developer, Freelance",
      period: "11/2025 to Present",
      location: "Riyadh, Saudi Arabia",
      current: true,
      points: [
        "Gather client requirements and translate business needs into responsive website and landing-page solutions.",
        "Design and develop modern business websites including service pages, portfolios, contact forms, and company profiles.",
        "Build responsive interfaces focused on usability, performance, and accessibility across devices.",
        "Manage client communication, technical guidance, progress updates, and post-launch support.",
      ],
    },
    {
      company: "Silky System",
      title: "Software Engineering Trainee, Co-op",
      period: "01/2026 to 04/2026",
      location: "Riyadh, Saudi Arabia",
      current: false,
      points: [
        "Conduct manual and automated testing to identify defects and support software quality.",
        "Analyse client business needs and translate requirements into practical technical specifications.",
        "Collaborate with developers to improve workflows and user experience.",
        "Design scalable solutions that bridge stakeholder requirements and functional implementation.",
      ],
    },
  ],

  education: [
    {
      school: "Prince Sattam Bin Abdulaziz University",
      title: "Bachelor of Software Engineering",
      period: "2021 to 2026",
      location: "Saudi Arabia",
      note: "GPA 4.90 / 5.00",
    },
  ],

  award: {
    place: "1st Place",
    title: "Intellectual Empowerment Hackathon",
    org: "Prince Sattam Bin Abdulaziz University",
    year: "2026",
    copy: "Built Fateen, an AI-powered chatbot for misinformation detection and digital content verification, with multimodal analysis across text, images, video, audio, and links. Recognised for technical innovation and real-world social impact.",
  },

  skillGroups: [
    {
      label: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "HTML5 & CSS3",
        "Tailwind CSS",
      ],
    },
    {
      label: "Backend & Data",
      items: [
        "Node.js",
        "Supabase",
        "PostgreSQL",
        "RESTful APIs",
      ],
    },
    {
      label: "Analysis & Automation",
      items: [
        "Requirements Analysis",
        "n8n Automation",
        "Jira & Agile",
        "Excel & SQL Reporting",
      ],
    },
  ],

  toolbelt: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "REST APIs",
    "Tailwind CSS",
    "n8n",
    "Jira",
    "GitHub",
    "Figma",
    "Framer",
    "Excel",
    "VS Code",
  ],

  certifications: [
    "Business Analysis Fundamentals",
    "Excel Skills for Business I, II & IV",
    "Wireframing & Low-Fidelity Prototyping",
    "React Front-End Development",
    "UX Research & Early Concept Testing",
    "SQL Fundamentals for Data Analysts",
  ],

  nav: [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "resume", label: "Resume" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],

  ui: {
    greeting: "Hi, I’m",
    // trailing space: it sits directly before the typed role
    rolePrefix: "a ",
    findMeOn: "Find me on",
    bestSkillOn: "Best skill on",
    scroll: "Scroll",
    scrollAria: "Scroll to next section",
    hireMe: "Hire me",
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    closeProject: "Close project",
    emailLabel: "Email",
    basedIn: "Based in",
    phoneLabel: "Phone",
    linkedinLabel: "LinkedIn",
    switchToArabic: "التبديل إلى العربية",
    switchToEnglish: "Switch to English",

    sections: {
      services: { eyebrow: "What I do", title: "Services I offer", highlight: "offer" },
      work: { eyebrow: "Selected work", title: "Things I have built", highlight: "built" },
      resume: { eyebrow: "Resume", title: "The road so far", highlight: "far" },
      skills: { eyebrow: "Capabilities", title: "What I work with", highlight: "with" },
      contact: {
        eyebrow: "Contact",
        title: "Let us build something together",
        highlight: "together",
      },
    },

    resumeTabs: {
      experience: "Experience",
      education: "Education & Awards",
      certifications: "Certifications",
    },

    contact: {
      availableTitle: "Available for work",
      availableCopy:
        "Freelance projects, full-time roles, or a website that needs to exist by next month. Send the details and I will reply within a day.",
      name: "Your name",
      namePlaceholder: "Full name",
      email: "Email address",
      emailPlaceholder: "you@company.com",
      subject: "Subject",
      subjectPlaceholder: "What is this about?",
      message: "Message",
      messagePlaceholder: "Tell me about the project, the timeline, and what success looks like.",
      send: "Send message",
      sent: "Draft opened",
      sentNote: "Your mail client should be open with the message ready to send.",
      fallbackSubject: "New message from",
      errName: "Tell me who you are",
      errEmail: "A valid email, please",
      errMessage: "A little more detail helps",
    },

    footer: {
      blurb:
        "Software engineer and business analyst, turning requirements into interfaces people actually enjoy using.",
      rights: "Designed and built in Riyadh.",
    },

    whatsapp: { label: "Chat with Hashim on WhatsApp", hint: "Chat on WhatsApp" },
  },
};
