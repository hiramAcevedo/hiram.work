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
    repoUrl: "https://github.com/hiramAcevedo/endopolis",
  },
  {
    id: "hanziflow",
    icon: "Languages",
    stack: ["Next.js", "Python", "FastAPI", "Ollama", "SQLite"],
    repoUrl: "https://github.com/hiramAcevedo/hanziflow-writer",
  },
  {
    id: "supplie",
    icon: "ShoppingCart",
    stack: ["Next.js", "React", "TypeScript", "Material UI", "NextAuth"],
    liveUrl: "https://supplie.me",
    repoUrl: "https://github.com/hiramAcevedo/Supplie.me",
  },
  {
    id: "eventmanager",
    icon: "Calendar",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    liveUrl: "https://event-managerv2-production.up.railway.app/events",
    repoUrl: "https://github.com/hiramAcevedo/event-manager_V2",
  },
  {
    id: "movieCatalog",
    icon: "Film",
    stack: ["Angular", "TypeScript", "Laravel", "PHP", "MySQL"],
    repoUrl: "https://github.com/hiramAcevedo/angular-movie-catalog",
  },
  {
    id: "hospitalSystem",
    icon: "Hospital",
    stack: ["Java", "Spring Boot", "React", "Material UI", "MySQL"],
    repoUrl: "https://github.com/hiramAcevedo/hospital-java-demo-test",
  },
];
