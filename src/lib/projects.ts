export interface Project {
  id: string;
  icon: string;
  image: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  detailUrl: string;
}

const LAB = "https://hiramlab.center/projects";

export const projects: Project[] = [
  {
    id: "endopolis",
    icon: "Stethoscope",
    image: "/projects/endopolis_landpage-card.jpeg",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    liveUrl: "https://endopolis.vercel.app",
    repoUrl: "https://github.com/hiramAcevedo/endopolis",
    detailUrl: `${LAB}/endopolis`,
  },
  {
    id: "hanziflow",
    icon: "Languages",
    image: "/projects/HanziFlow-card.png",
    stack: ["Next.js", "Python", "FastAPI", "Ollama", "SQLite"],
    liveUrl: "https://hanziflow-writer.vercel.app",
    repoUrl: "https://github.com/hiramAcevedo/hanziflow-writer",
    detailUrl: `${LAB}/hanziflow`,
  },
  {
    id: "supplie",
    icon: "ShoppingCart",
    image: "/projects/supplie-me-card.jpeg",
    stack: ["Next.js", "React", "TypeScript", "Material UI", "NextAuth"],
    liveUrl: "https://supplie.me",
    repoUrl: "https://github.com/hiramAcevedo/Supplie.me",
    detailUrl: `${LAB}/supplie`,
  },
  {
    id: "contextDistill",
    icon: "FileText",
    image: "/projects/contextdistill-card.webp",
    stack: ["Python", "Pandoc", "Ollama", "trafilatura", "SSE"],
    repoUrl: "https://github.com/hiramAcevedo/context-distill",
    detailUrl: `${LAB}/contextdistill`,
  },
  {
    id: "precisionScroll",
    icon: "Scan",
    image: "/projects/precision-scroll-capture-card.webp",
    stack: ["JavaScript", "Manifest V3", "Canvas API", "Service Workers"],
    repoUrl: "https://github.com/hiramAcevedo/precision-scroll-capture",
    detailUrl: `${LAB}/precision-scroll-capture`,
  },
  {
    id: "gestureCommander",
    icon: "Hand",
    image: "/projects/GestureCommander-card.webp",
    stack: ["Swift", "SPM", "Accessibility API", "LaunchAgent"],
    repoUrl: "https://github.com/hiramAcevedo/GestureCommander",
    detailUrl: `${LAB}/gesturecommander`,
  },
];
