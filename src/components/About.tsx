"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: t("stats.projects"), label: t("stats.projectsLabel") },
    { value: t("stats.gpa"), label: t("stats.gpaLabel") },
    { value: t("stats.oracle"), label: t("stats.oracleLabel") },
    { value: t("stats.patients"), label: t("stats.patientsLabel") },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-8 font-[family-name:var(--font-heading)]"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-4 text-[var(--ink)]/70 text-base md:text-lg leading-relaxed max-w-3xl"
        >
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>
            {t("founder")}{" "}
            <a
              href="https://hiramlab.center"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              {t("founderAt")}
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="text-center p-4 rounded-lg bg-[var(--surface-1)] border border-[var(--border)]"
            >
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent)] font-[family-name:var(--font-heading)]">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--ink)]/50 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
