import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Aman Kumar",
  initials: "",
  url: "https://imtheaman.vercel.app",
  location: "Bangalore, India",
  locationLink: "https://www.google.com/maps/place/bangalore",
  description:
    "Senior Software Engineer | Frontend | Kotlin | React | React Native | Android | iOS | Web",
  summary:
    `I’m a Senior Software Engineer based in Bangalore, India. with 3.5+ years of hands-on experience architecting and delivering high-quality, scalable mobile apps on both React Native and native Android (Kotlin & Jetpack Compose) platforms. I thrive on turning complex requirements into elegant user experiences, whether that means building an end-to-end cross-platform app, optimizing performance under the hood, or mentoring fellow developers to help them grow.

Throughout my career, I’ve:

 1. Launched and maintained multiple production-grade apps on the App Store and Google Play, consistently achieving user ratings above 4.8.

 2. Authored and open-sourced multiple npm packages—everything from UUID persistence to custom date-time pickers and design systems—that simplify common challenges and power beautiful interfaces.

 3. Drove performance improvements through advanced caching (WebView, network, and images), pre-initialization techniques, and architectural refactoring, cutting load times by up to 40% and boosting engagement metrics.

 4. Built robust CI/CD pipelines with Jenkins and Xcode Cloud, slashing release cycles by 60% and reducing critical post-release issues by 85%.

 5. Led and mentored junior engineers, establishing code-review cultures and hands-on training that ramped new hires in under two weeks and increased overall team throughput by 30%.

I’m passionate about exploring emerging mobile technologies—AOSP customizations, gRPC, real-time architectures, SDUI, OTA, Accessibility and mobile application security—and bringing those innovations to the apps I build. When I’m not coding, you’ll find me contributing to open-source, optimizing developer workflows, or experimenting with new UI/UX patterns.`,
  avatarUrl: "/me.png",
  skills: [
    "Kotlin",
    "Swift",
    "Android",
    "iOS",
    "KMP",
    "React Native",
    "Flutter",
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "Rust",
    "C++",
    "C",
    "WASM",
    "HTML",
    "CSS",
    "Javascript",
    "Web Components",
    "SQL",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "https://github.com/imtheaman", icon: Icons.github, label: "GitHub" },
    { href: "https://leetcode.com/u/imtheaman", icon: Icons.leetcode, label: "Leetcode" },
    { href: "https://linkedin.com/in/imtheaman", icon: Icons.linkedin, label: "LinkedIn" },
  ],
  contact: {
    email: "imtheaman@proton.me",
    tel: "+91 9631529630",
    social: {
      Blog: {
        name: "Blog",
        url: "/blog",
        icon: Icons.book,
        navbar: true,
      },
      Support: {
        name: "Support",
        url: "/support",
        icon: Icons.support,
        navbar: true,
      },
      Tools: {
        name: "Tools",
        url: "/tools",
        icon: Icons.tools,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:imtheaman@proton.me",
        icon: Icons.email,
        navbar: false,
      },
      whatsapp: {
        name: "Send message",
        url: "https://api.whatsapp.com/send/?phone=919631529630",
        icon: Icons.whatsapp,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "TouchBlack",
      href: "https://touchblack.app",
      badges: [],
      location: "Bangalore, India",
      title: "Senior Software Engineer",
      logoUrl: "/touchblack.jpg",
      start: "Dec 2023",
      end: "Present",
      description:
        [
          `Built and shipped cross-platform mobile app from concept to deployment, managing full release cycle on Google Play and Apple App Store, while maintaining
strong user ratings of 4.8+.`,
          `Set up a mentoring system for junior devs that included regular code reviews and
hands-on technical guidance, which boosted team output by about 30% and got
new hires up to speed in just 10 days instead of a month`,
          `Created and published NPM packages including rn-unique-identifier for UUID
persistence, rn-performant-blurview, date-time-picker, timeline-calendar, Touchblack design system and Touchblack icon system.`,
          `Used pre-initialization and caching of WebView to deliver YouTube and Vimeo playback that feels like a native experience, cutting load times by 40% and increasing
video completion rates`,
          `Implemented network and image caching, YouTube-inspired gesture controls, realtime messaging, and role-based access controls, significantly improving performance and user experience across different device types`,
          `Integrated Cashfree and Pinelabs payment gateways to enable app subscriptions
and payments, ensuring seamless financial transactions while maintaining compliance with App Store and Google Play policies`,
          `Set up Jenkins and Xcode Cloud pipelines to automate our build and testing processes, resulting in 60% faster deployment cycles and 85% reduction in critical
post-release issues`
        ]
    },
    {
      company: "NextCMS",
      badges: [],
      href: "#",
      location: "Remote",
      title: "Fellow",
      logoUrl: "/nextcms.jpg",
      start: "May 2023",
      end: "Present",
      partTime: true,
      description:
        ["Building NextCMS as a modern alternative to wordpress, shopify etc. with drag n drop builder which generates webapps in next.js/react(server+client) and apps using kotlin, react native."]
    },
    {
      company: "Freelance",
      badges: [],
      href: "#",
      location: "Remote",
      title: "Mobile Application Developer",
      logoUrl: "/upwork.jpg",
      start: "Dec 2022",
      end: "Dec 2023",
      description:
        [
          `Collaborated with clients on requirement analysis, solution development, and multiplatform deployment, maintaining 100%on-time delivery rate and more than65%
client retention`,
          `Customized AOSP build with restricted communication ports and enhanced security protocols, meeting enterprise security requirements for clients in military
sector`,
          `Optimized React Native applications, improving performance metrics by 35-55%
through code refactoring, architectural improvements, and strategic implementation of native modules for computationally intensive tasks`,
          `Developed and delivered 5 mobile applications in a year across diverse domains
(e-commerce, fitness tracking, inventory management) with integrated analytics
and crash reporting systems, reducing bug resolution time by 45% and enhancing
user engagement through data-driven UI/UX improvements.`
        ],
    },
    {
      company: "Metafic",
      href: "https://metafic.co",
      badges: [],
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/metafic.jpg",
      start: "Oct 2021",
      end: "Dec 2022",
      description:
        [
          `Developed a hybrid mobile application for Uber in-vehicle tablets that dynamically switched between static and location-specific video advertisements based
on real-time geolocation`,
          `Engineered a sophisticated geofence-based advertising system with priority handling that automatically selected and played the highest-priority ads when vehicles entered overlapping geographic zones`,
          `Created an efficient background scheduler for midnight content synchronization
that ensured all tablets had the latest advertisement inventory while minimizing
network usage`,
          `Built a complementary web application with Google Maps integration allowing advertisers to create geofences, assign video content, set playback priorities, and
visualize coverage areas with color-coded priority indicators`
        ],
    },
  ],
  certifications: [
    {
      course: "JavaScript(Advanced)",
      href: "https://www.hackerrank.com/certificates/fbf1f02624ed",
      author: "HackerRank",
      logoUrl: "/hackerrank.jpg",
      completedAt: "05 Jun 2025",
    },
    {
      course: "JavaScript(Intermediate)",
      href: "https://www.hackerrank.com/certificates/fbf1f02624ed",
      author: "HackerRank",
      logoUrl: "/hackerrank.jpg",
      completedAt: "05 Jun 2022",
    },
    {
      course: "JavaScript(Basic)",
      href: "https://www.hackerrank.com/certificates/4e29305a3b11",
      author: "HackerRank",
      logoUrl: "/hackerrank.jpg",
      completedAt: "05 Jun 2022",
    },
    {
      course: "The Complete SQL Bootcamp: Go from Zero to Hero",
      href: "https://ude.my/UC-c692efed-aa7d-457c-a11b-b97bd25a0b54",
      author: "Jose Portilla",
      logoUrl: "/udemy.jpg",
      completedAt: "03 Dec 2020",
    },
  ],
  projects: [
    {
      title: "TouchBlack",
      href: "https://touchblack.app",
      dates: "Dec 2023 - Present",
      active: false,
      description:
        [
          `- Simplifying Film Production currently for the TV Commercial, Digital Production Houses and Talent.`,
          `- Built and shipped cross-platform mobile app from concept to deployment, man-
aging full release cycle on Google Play and Apple App Store, while maintaining
strong user ratings of 4.8+.`
        ],
      technologies: [
        "React Native",
        "Next.js",
        "Typescript",
        "Kotlin",
        "Swift",
        "Notifications",
        "Android",
        "iOS",
        "Storybook",
        "Zod",
      ],
      links: [
        {
          type: "App",
          href: "https://touchblack.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/touchblack_feature_image.png",
      video: "",
    },
    {
      title: "UPI Without SIM",
      href: "https://github.com/imtheaman/upi-without-sim",
      dates: "Oct 2023 - Nov 2023",
      active: true,
      description:
        [
          `- Developed UPI supplementary application enabling UPI account access without registered SIM card requirement.`,
          `- Built command and control server for secure payload management, demonstrating Android system vulnerability.`
        ],
      technologies: [
        "Kotlin",
        "Java",
        "MongoDB",
        "Typescript",
        "Nodejs",
        "AOSP",
        "Android"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/imtheaman/upi-without-sim",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/upi-hacked.jpg",
      video: "",
    },
    {
      title: "AI Content Moderation",
      href: "https://github.com/imtheaman/ai-content-moderation",
      dates: "April 2025 - May 2025",
      active: true,
      description:
        [
          `- Engineered a comprehensive network traffic interception system supporting HTTP/HTTPS
and WebSocket protocols with custom SSL/TLS certificate handling for secure deep
packet inspection`,
          `- Architected platform-specific implementations for Windows, macOS, Linux, Android, and iOS using native APIs (WinDivert, Network Extensions, Netfilter, VPN
Service) while maintaining consistent cross-platform functionality`
        ],
      technologies: [
        "Python",
        "Typescript",
        "Low Level Programming",
        "bart-large-nmli",
        "Windows",
        "MacOS",
        "Android",
        "iOS",
        "Web",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/imtheaman/ai-content-moderator",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ai-content-moderation.jpg",
      video: "",
    },
    {
      title: "Home Designer AI",
      href: "https://github.com/imtheaman/home-designer-ai",
      dates: "Jul 2025 - Present",
      active: true,
      description:
        [
          `- Developed an interactive 3D interior and home design platform enabling users to create and customize virtual spaces based on personal preferences.`,
          `- Implemented end-to-end ML workflows including pretraining, finetuning, and posttraining of 3D design models to enhance design accuracy and user personalization.`,
          `- Designed and optimized the core 3D modeling pipeline to generate realistic, customizable home and interior layouts tailored to diverse user requirements.`
        ],
      technologies: [
        "Typescript",
        "React",
        "PostgreSQL",
        "Python",
        "TailwindCSS",
        "Shadcn UI",
        "AWS",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/imtheaman/home-designer-ai",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/home-designer.png",
      video: "",
    },
  ],
} as const;
