export interface Project {
  id: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "endopolis",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    liveUrl: "https://endopolis.vercel.app",
  },
  {
    id: "hanziflow",
    stack: ["Next.js", "Python", "FastAPI", "Ollama", "SQLite"],
  },
  {
    id: "supplie",
    stack: ["Next.js", "React", "TypeScript", "Material UI", "NextAuth"],
    liveUrl: "https://supplie.me",
  },
  {
    id: "eventmanager",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    liveUrl: "https://event-managerv2-production.up.railway.app/events",
  },
  {
    id: "movieCatalog",
    stack: ["Angular", "TypeScript", "Laravel", "PHP", "MySQL"],
  },
  {
    id: "hospitalSystem",
    stack: ["Java", "Spring Boot", "React", "Material UI", "MySQL"],
  },
];
