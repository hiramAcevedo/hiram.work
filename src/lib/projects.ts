export interface Project {
  id: string;
  icon: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "endopolis",
    icon: "Stethoscope",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    liveUrl: "https://endopolis.vercel.app",
  },
  {
    id: "hanziflow",
    icon: "Languages",
    stack: ["Next.js", "Python", "FastAPI", "Ollama", "SQLite"],
  },
  {
    id: "supplie",
    icon: "ShoppingCart",
    stack: ["Next.js", "React", "TypeScript", "Material UI", "NextAuth"],
    liveUrl: "https://supplie.me",
  },
  {
    id: "eventmanager",
    icon: "Calendar",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    liveUrl: "https://event-managerv2-production.up.railway.app/events",
  },
  {
    id: "movieCatalog",
    icon: "Film",
    stack: ["Angular", "TypeScript", "Laravel", "PHP", "MySQL"],
  },
  {
    id: "hospitalSystem",
    icon: "Hospital",
    stack: ["Java", "Spring Boot", "React", "Material UI", "MySQL"],
  },
];
