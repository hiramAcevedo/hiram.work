"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Stethoscope,
  Languages,
  ShoppingCart,
  Calendar,
  Film,
  Hospital,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/lib/projects";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Languages,
  ShoppingCart,
  Calendar,
  Film,
  Hospital,
};

interface ProjectCardProps {
  project: Project;
  name: string;
  hook: string;
  viewLive: string;
  viewRepo: string;
  index: number;
}

export default function ProjectCard({
  project,
  name,
  hook,
  viewLive,
  viewRepo,
  index,
}: ProjectCardProps) {
  const Icon = iconMap[project.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group flex flex-col bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Thumbnail placeholder */}
      <div className="h-36 bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface-1)] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--accent)]/5" />
        {Icon ? (
          <Icon size={32} className="text-[var(--ink)]/20" />
        ) : (
          <span className="text-4xl font-bold text-[var(--ink)]/10 font-[family-name:var(--font-heading)]">
            {name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">
          {name}
        </h3>
        <p className="text-sm text-[var(--ink)]/60 leading-relaxed flex-1">
          {hook}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs bg-[var(--surface-2)] rounded font-[family-name:var(--font-code)] text-[var(--ink)]/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-2 pt-3 border-t border-[var(--border)]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline font-medium"
            >
              <ExternalLink size={14} />
              {viewLive}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[var(--ink)]/60 hover:text-[var(--ink)] transition-colors"
            >
              <Github size={14} />
              {viewRepo}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
