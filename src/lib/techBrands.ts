import {
  siNextdotjs,
  siReact,
  siTypescript,
  siAngular,
  siVuedotjs,
  siTailwindcss,
  siFramer,
  siJavascript,
  siSpringboot,
  siPython,
  siFastapi,
  siPhp,
  siLaravel,
  siNodedotjs,
  siPostgresql,
  siMysql,
  siMongodb,
  siSupabase,
  siPrisma,
  siOllama,
  siSqlite,
  siVercel,
  siRailway,
  siGit,
  siDocker,
  siLinux,
  siFigma,
} from "simple-icons/icons";

interface TechBrand {
  color: string;
  path: string;
}

const brandsMap: Record<string, TechBrand> = {
  "Next.js": { color: `#${siNextdotjs.hex}`, path: siNextdotjs.path },
  React: { color: `#${siReact.hex}`, path: siReact.path },
  TypeScript: { color: `#${siTypescript.hex}`, path: siTypescript.path },
  Angular: { color: `#${siAngular.hex}`, path: siAngular.path },
  "Vue.js": { color: `#${siVuedotjs.hex}`, path: siVuedotjs.path },
  "Tailwind CSS": { color: `#${siTailwindcss.hex}`, path: siTailwindcss.path },
  "Framer Motion": { color: `#${siFramer.hex}`, path: siFramer.path },
  Java: { color: `#${siJavascript.hex}`, path: siJavascript.path },
  "Spring Boot": { color: `#${siSpringboot.hex}`, path: siSpringboot.path },
  Python: { color: `#${siPython.hex}`, path: siPython.path },
  FastAPI: { color: `#${siFastapi.hex}`, path: siFastapi.path },
  PHP: { color: `#${siPhp.hex}`, path: siPhp.path },
  Laravel: { color: `#${siLaravel.hex}`, path: siLaravel.path },
  "Node.js": { color: `#${siNodedotjs.hex}`, path: siNodedotjs.path },
  PostgreSQL: { color: `#${siPostgresql.hex}`, path: siPostgresql.path },
  MySQL: { color: `#${siMysql.hex}`, path: siMysql.path },
  MongoDB: { color: `#${siMongodb.hex}`, path: siMongodb.path },
  Supabase: { color: `#${siSupabase.hex}`, path: siSupabase.path },
  Prisma: { color: `#${siPrisma.hex}`, path: siPrisma.path },
  Ollama: { color: `#${siOllama.hex}`, path: siOllama.path },
  SQLite: { color: `#${siSqlite.hex}`, path: siSqlite.path },
  Vercel: { color: `#${siVercel.hex}`, path: siVercel.path },
  Railway: { color: `#${siRailway.hex}`, path: siRailway.path },
  Git: { color: `#${siGit.hex}`, path: siGit.path },
  Docker: { color: `#${siDocker.hex}`, path: siDocker.path },
  Linux: { color: `#${siLinux.hex}`, path: siLinux.path },
  Figma: { color: `#${siFigma.hex}`, path: siFigma.path },
  Affinity: { color: "#222324", path: "M12 0L0 24h24L12 0zm0 5.6l8.4 16.8H3.6L12 5.6z" },
  Photoshop: { color: "#31A8FF", path: "M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.63.01v3.36c.16.01.3.01.52.01.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.62-.23-.89-.17-.26-.41-.44-.76-.55zM0 0v24h24V0H0zm14.7 11.76c-.41.46-.97.79-1.59.95-.65.17-1.33.26-2.01.25-.27 0-.53 0-.79-.01-.26-.01-.5-.04-.72-.07v4.68h-2.1V6.1c.56-.09 1.12-.14 1.68-.17.56-.04 1.09-.06 1.59-.06 1.07-.02 2.12.22 3.07.71.73.41 1.17 1.18 1.17 2.03-.01.81-.28 1.53-.78 2.03-.3.34-.55.62-.52 1.12zm5.4 1.1c0 .52-.07 1.04-.21 1.54-.13.42-.35.82-.64 1.16-.28.32-.63.56-1.02.7-.44.15-.9.22-1.37.22-.32 0-.63-.02-.95-.07-.32-.04-.64-.11-.95-.22v-2c.27.15.56.27.86.35.28.08.56.12.85.12.55 0 .95-.14 1.2-.42.25-.28.38-.71.38-1.28V9.49h2.1v3.37h-.25z" },
  Illustrator: { color: "#FF9A00", path: "M14.65 6.89l-1.24 4.56h2.47l-1.23-4.56zM0 0v24h24V0H0zm15.9 17.52l-.73-2.66h-3.24l-.72 2.66H9.09l3.22-11.1h2.37l3.28 11.1h-1.06zm-7.4-4.83c0 .18-.01.36-.04.53h-4.8c-.01.5.09 1 .3 1.45.16.33.41.61.72.81.31.2.67.3 1.03.3.34 0 .67-.04 1-.13.33-.09.64-.22.93-.38l.28.76c-.62.38-1.34.57-2.07.55-.64.02-1.27-.15-1.82-.47-.51-.32-.91-.78-1.16-1.32-.27-.61-.4-1.28-.38-1.95-.02-.67.11-1.33.37-1.95.24-.54.61-1.02 1.08-1.38.47-.35 1.04-.53 1.63-.52.59-.02 1.16.17 1.61.52.42.36.72.84.87 1.38.12.46.17.93.15 1.4l.3.0z" },
};

export function getTechBrand(name: string): TechBrand | undefined {
  return brandsMap[name];
}
