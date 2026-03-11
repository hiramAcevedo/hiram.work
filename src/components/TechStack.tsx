"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stackData = {
  frontend: [
    "Next.js",
    "React",
    "TypeScript",
    "Angular",
    "Vue.js",
    "Tailwind CSS",
    "Framer Motion",
  ],
  backend: [
    "Java",
    "Spring Boot",
    "Python",
    "FastAPI",
    "PHP",
    "Laravel",
    "Node.js",
  ],
  dataAi: [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Supabase",
    "Prisma",
    "Ollama",
    "SQLite",
  ],
  devops: ["Vercel", "Railway", "Git", "Docker", "Linux"],
  design: ["Affinity Designer", "Affinity Photo", "Figma"],
};

export default function TechStack() {
  const t = useTranslations("stack");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 font-[family-name:var(--font-heading)]"
        >
          {t("title")}
        </motion.h2>

        <div className="space-y-8">
          {(
            Object.keys(stackData) as Array<keyof typeof stackData>
          ).map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1, duration: 0.4 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]/40 mb-3 font-[family-name:var(--font-heading)]">
                {t(category)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stackData[category].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm bg-[var(--surface-1)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] hover:bg-[var(--surface-2)] transition-colors cursor-default font-[family-name:var(--font-code)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
