"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getTechBrand } from "@/lib/techBrands";

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
  design: ["Affinity", "Photoshop", "Illustrator", "Figma"],
};

function TechBadge({ tech }: { tech: string }) {
  const brand = getTechBrand(tech);

  return (
    <span
      className="group/badge inline-flex items-center gap-2 px-3 py-1.5 text-base bg-[var(--surface-1)] border border-[var(--border)] rounded-lg hover:bg-[var(--surface-2)] transition-all duration-200 cursor-default font-[family-name:var(--font-code)]"
      style={
        {
          "--brand-color": brand?.color ?? "var(--accent)",
        } as React.CSSProperties
      }
    >
      {brand && (
        <svg
          viewBox="0 0 24 24"
          width={14}
          height={14}
          className="shrink-0 fill-[var(--ink)]/40 group-hover/badge:fill-[var(--brand-color)] transition-colors duration-200"
        >
          <path d={brand.path} />
        </svg>
      )}
      <span className="group-hover/badge:text-[var(--brand-color)] transition-colors duration-200">
        {tech}
      </span>
    </span>
  );
}

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
              <h3 className="text-base font-semibold uppercase tracking-wider text-[var(--ink)]/40 mb-3 font-[family-name:var(--font-heading)]">
                {t(category)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stackData[category].map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
