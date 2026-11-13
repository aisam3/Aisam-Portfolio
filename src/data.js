import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiSupabase,
  SiPostgresql,
  SiPrisma,
  SiFirebase,
  SiGithub,
} from "react-icons/si";

export const profile = {
  name: "Aisam Abbas",
  firstName: "Aisam",
  lastName: "Abbas",
  role: "Full-Stack Developer",
  email: "aisamabbas03@gmail.com",
  phone: "+92 346 7900942",
  phoneHref: "tel:+923467900942",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  linkedin: "https://www.linkedin.com/in/aisam-abbas/",
  resume: "/resume.pdf",
  portrait: "/Assets/portimage.jpg",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export const roles = ["Full-Stack Developer", "React Developer", "Web Designer", "CS Student"];

export const marqueeWords = [
  "Interfaces",
  "Motion",
  "React",
  "Next.js",
  "Clean Code",
  "Design Systems",
  "Performance",
  "Accessibility",
];

export const skills = [
  { name: "React", group: "Library", Icon: SiReact, color: "#61dafb" },
  { name: "Next.js", group: "Framework", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "JavaScript", group: "Language", Icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", group: "Language", Icon: SiTypescript, color: "#3178c6" },
  { name: "HTML5", group: "Markup", Icon: SiHtml5, color: "#e34f26" },
  { name: "CSS3", group: "Styling", Icon: SiCss3, color: "#1572b6" },
  { name: "Sass", group: "Styling", Icon: SiSass, color: "#cc6699" },
  { name: "Tailwind", group: "Styling", Icon: SiTailwindcss, color: "#38bdf8" },
  { name: "Bootstrap", group: "Styling", Icon: SiBootstrap, color: "#7952b3" },
  { name: "Supabase", group: "Backend", Icon: SiSupabase, color: "#3ecf8e" },
  { name: "PostgreSQL", group: "Database", Icon: SiPostgresql, color: "#4169e1" },
  { name: "Prisma", group: "ORM", Icon: SiPrisma, color: "#ffffff" },
  { name: "Firebase", group: "Backend", Icon: SiFirebase, color: "#ffca28" },
  { name: "GitHub", group: "Workflow", Icon: SiGithub, color: "#ffffff" },
];

export const projects = [
  {
    title: "Titon",
    subtitle: "Lead Management Platform",
    description:
      "Full-stack lead management app with advanced filtering, pagination and user profiles. Supabase for secure, scalable data, plus performance work, bug fixes and a production deploy.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    link: "https://titon-iota.vercel.app/",
    tags: ["Next.js", "TypeScript", "Supabase", "Prisma"],
    badge: "Latest",
  },
  {
    title: "Global IT Solution",
    subtitle: "Agency Website",
    description:
      "A modern React website showcasing digital services and IT expertise, focused on bold layout and smooth interactions.",
    image: "/Assets/portfolio1.png",
    link: "https://global-it-nine.vercel.app",
    tags: ["React", "Tailwind", "UI/UX"],
  },
  {
    title: "CRUD Dashboard",
    subtitle: "Realtime Data App",
    description:
      "A CRUD application wired to Firebase to create, read, update and delete records in real time.",
    image: "/Assets/crud.png",
    link: "https://crud-chi-inky.vercel.app",
    tags: ["React", "Firebase", "Dashboard"],
  },
  {
    title: "E-Commerce Admin",
    subtitle: "Analytics Dashboard",
    description:
      "An e-commerce dashboard with data visualisation, user management and real-time sales tracking.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    link: null,
    tags: ["E-Commerce", "Admin", "Analytics"],
  },
  {
    title: "Social Media App",
    subtitle: "Realtime Social Platform",
    description:
      "A social networking app with live chat, posts, likes and a rich, interactive interface.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    link: null,
    tags: ["Social", "Real-time", "Chat"],
  },
];

export const testimonials = [
  {
    quote: "Aisam just gets it. Delivered perfectly, zero back and forth.",
    author: "Mark",
    place: "Germany",
  },
  {
    quote: "The UI and animations blew our entire team away. Hired him again instantly.",
    author: "Harry",
    place: "United Kingdom",
  },
];
