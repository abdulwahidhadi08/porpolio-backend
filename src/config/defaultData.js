export const DEFAULT_PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "🛍️",
    github: "#",
    live: "#",
    order: 1,
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, team features, and project analytics.",
    tech: ["React", "Firebase", "Tailwind CSS", "Redux"],
    image: "✅",
    github: "#",
    live: "#",
    order: 2,
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with interactive maps, forecasts, and location-based features.",
    tech: ["React", "API Integration", "Charts.js", "Geolocation"],
    image: "🌤️",
    github: "#",
    live: "#",
    order: 3,
  },
  {
    title: "Social Media Analytics",
    description: "Analytics dashboard for social media metrics with data visualization and trend analysis.",
    tech: ["React", "D3.js", "Express", "PostgreSQL"],
    image: "📊",
    github: "#",
    live: "#",
    order: 4,
  },
  {
    title: "Chat Application",
    description: "Real-time messaging app with user authentication, file sharing, and notification system.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    image: "💬",
    github: "#",
    live: "#",
    order: 5,
  },
  {
    title: "Blog Platform",
    description: "Content management system with markdown support, tags, comments, and SEO optimization.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "MDX"],
    image: "📝",
    github: "#",
    live: "#",
    order: 6,
  },
];

export const DEFAULT_SKILLS = [
  {
    category: "Frontend",
    order: 1,
    skills: [
      {
        name: "React",
        icon: `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="8" fill="#087EA4" />
  <ellipse cx="50" cy="50" rx="38" ry="14.5" stroke="#087EA4" strokeWidth="3" />
  <ellipse cx="50" cy="50" rx="38" ry="14.5" stroke="#087EA4" strokeWidth="3" transform="rotate(60 50 50)" />
  <ellipse cx="50" cy="50" rx="38" ry="14.5" stroke="#087EA4" strokeWidth="3" transform="rotate(120 50 50)" />
</svg>`,
      },
      {
        name: "JavaScript",
        icon: `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="16" fill="#F7DF1E"/>
  <path d="M50 62c0 4.5-2.5 7.5-6.5 7.5-3.8 0-6.2-2.5-6.2-6.5h3.8c0 1.8.8 2.8 2.4 2.8 1.4 0 2.2-.8 2.2-2.2v-21h4.3v20.4zm22.4.6c0 4.8-3.5 7.4-8 7.4-4.8 0-7.7-2.6-7.7-7.4h3.8c0 2.4 1.4 3.7 3.9 3.7 2 0 3.3-1 3.3-2.6 0-1.8-1-2.4-4-3.5L61.3 49c-3.2-1.2-4.5-3.2-4.5-6.4 0-4 3.2-6.8 7.6-6.8 4.2 0 7 2.4 7 6.4h-3.8c0-1.8-1-2.8-3.2-2.8-1.8 0-3 .8-3 2.2 0 1.4.8 2 3 2.8l2.6.9c3.8 1.4 5.4 3.4 5.4 7.3z" fill="#323330"/>
</svg>`,
      },
      {
        name: "Tailwind CSS",
        icon: `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 20c-13.3 0-21.7 6.7-25 20 5-6.7 10.8-9.2 17.5-7.5 3.8.9 6.5 3.7 9.5 6.8C57 44.3 62.8 50 75 50c13.3 0 21.7-6.7 25-20-5 6.7-10.8 9.2-17.5 7.5-3.8-.9-6.5-3.7-9.5-6.8C68 25.7 62.2 20 50 20zm-25 30c-13.3 0-21.7 6.7-25 20 5-6.7 10.8-9.2 17.5-7.5 3.8.9 6.5 3.7 9.5 6.8C32 74.3 37.8 80 50 80c13.3 0 21.7-6.7 25-20-5 6.7-10.8 9.2-17.5 7.5-3.8-.9-6.5-3.7-9.5-6.8C43 55.7 37.2 50 25 50z" fill="#06B6D4"/>
</svg>`,
      },
      {
        name: "TypeScript",
        icon: `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="16" fill="#3178C6"/>
  <path d="M35 36h28v7H52v26h-7V43H35v-7zm35 15.5c0-5-3.5-7.5-8.5-9.2l-2.7-.9c-2.5-.8-3.3-1.6-3.3-2.8c0-1.3 1-2.2 2.7-2.2c1.8 0 2.6.9 2.6 2.5h6.3c0-4.8-3.5-7.7-8.9-7.7c-5.3 0-8.9 2.8-8.9 7.5c0 4.8 3.3 7 8.3 8.7l2.7.9c2.7.9 3.5 1.8 3.5 3.1c0 1.5-1.1 2.5-3 2.5c-2.1 0-3.2-1.1-3.2-3.2h-6.3c0 5.4 3.7 8.4 9.5 8.4c5.8 0 9.2-2.8 9.2-7.7z" fill="white"/>
</svg>`,
      },
    ],
  },
  {
    category: "Databases & Tools",
    order: 2,
    skills: [
      {
        name: "MongoDB",
        icon: `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 4C47.8 4 21.6 32.5 21.6 56.5c0 19.6 12.7 34.8 28.4 39.2c15.7-4.4 28.4-19.6 28.4-39.2C78.4 32.5 52.2 4 50 4z" fill="#13AA52"/>
  <path d="M50 87V13c6.5 6.5 19.6 24 19.6 43.5c0 15.2-8.7 26.1-19.6 30.5z" fill="#118D4B"/>
  <path d="M50 87c-6.5-6.5-19.6-24-19.6-43.5c0-15.2 8.7-26.1 19.6-30.5v74z" fill="#3FA048"/>
  <path d="M50 13v74c-2.2-.4-4.3-1.7-6.5-3.5c-4.3-3.5-8.7-11-8.7-27C34.8 38.7 47.8 21.7 50 13z" fill="#589636"/>
</svg>`,
      },
      {
        name: "Git & Github",
        icon: `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="16" fill="#F05032"/>
  <circle cx="75" cy="75" r="10" fill="white" />
  <circle cx="25" cy="25" r="10" fill="white" />
  <circle cx="25" cy="75" r="10" fill="white" />
  <path d="M25 35v30" stroke="white" strokeWidth="6" strokeLinecap="round" />
  <path d="M35 35c20 0 40 20 40 40" stroke="white" strokeWidth="6" strokeLinecap="round" />
</svg>`,
      },
    ],
  },
];
