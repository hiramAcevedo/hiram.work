"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Stethoscope,
  Languages,
  ShoppingCart,
  FileText,
  Scan,
  Hand,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/lib/projects";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Languages,
  ShoppingCart,
  FileText,
  Scan,
  Hand,
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
      className="group relative flex flex-col bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Card-level link — whole card is clickable */}
      <a
        href={project.detailUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`View ${name} details on HiramLab`}
      />

      {/* Project image thumbnail */}
      <div className="h-44 relative overflow-hidden bg-[var(--surface-2)]">
        <Image
          src={project.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* Subtle gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-1)]/20 to-transparent" />
        {/* Arrow indicator on hover */}
        <ArrowUpRight
          size={18}
          className="absolute top-3 right-3 text-white/0 group-hover:text-white/80 transition-all duration-300 drop-shadow-md"
        />
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

        {/* Live / Code links — elevated above the card link */}
        <div className="relative z-20 flex items-center gap-3 mt-2 pt-3 border-t border-[var(--border)]">
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
