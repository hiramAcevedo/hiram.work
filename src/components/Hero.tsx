"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import LogoHA from "./LogoHA";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="h-[100dvh] flex flex-col items-center justify-center px-6 relative">
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
        <div className="w-[300px] max-h-[40dvh] aspect-square md:w-[420px] lg:w-[520px] shrink">
          <LogoHA />
        </div>

        <h1 className="sr-only">{t("name")}</h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="text-lg md:text-xl text-[var(--ink)]/60 font-[family-name:var(--font-heading)] font-medium"
        >
          {t("subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="text-base text-[var(--ink)]/50 max-w-lg"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <a
            href="/cv/Hiram_Acevedo_CV.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity font-[family-name:var(--font-heading)]"
          >
            <Download size={16} />
            {t("downloadCV")}
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-lg font-semibold hover:bg-[var(--surface-1)] transition-colors font-[family-name:var(--font-heading)]"
          >
            {t("contactMe")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.5 }}
          className="flex items-center gap-5 mt-4"
        >
          <a
            href="https://github.com/hiramAcevedo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/hiram-acevedo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:hiram@hiram.work"
            aria-label="Email"
            className="text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.5 }}
        className="absolute bottom-6 md:bottom-16"
      >
        <a
          href="#about"
          aria-label="Scroll down"
          className="text-[var(--ink)]/20 hover:text-[var(--ink)]/50 transition-colors"
        >
          <ArrowDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
