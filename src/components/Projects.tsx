"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const t = useTranslations("projects");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      className="py-24 md:py-32 px-6 bg-[var(--surface-1)]"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 font-[family-name:var(--font-heading)]"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              name={t(`items.${project.id}.name`)}
              hook={t(`items.${project.id}.hook`)}
              viewLive={t("viewLive")}
              viewRepo={t("viewRepo")}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
