"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Stethoscope, Code2 } from "lucide-react";

const experienceItems = [
  { key: "hiramlab", icon: FlaskConical, accent: true },
  { key: "endopolis", icon: Stethoscope, accent: false },
  { key: "freelance", icon: Code2, accent: false },
] as const;

export default function Experience() {
  const t = useTranslations("experience");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 font-[family-name:var(--font-heading)]"
        >
          {t("title")}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border)]" />

          <div className="flex flex-col gap-10">
            {experienceItems.map(({ key, icon: Icon, accent }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative pl-10"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-1 w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center ${
                    accent
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--surface-1)]"
                  }`}
                >
                  <Icon
                    size={12}
                    className={accent ? "text-white" : "text-[var(--ink)]/50"}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                      {t(`items.${key}.role`)}
                    </h3>
                    <p className="text-[var(--accent)] font-semibold text-base font-[family-name:var(--font-heading)]">
                      {t(`items.${key}.org`)}
                    </p>
                  </div>
                  <span className="text-base text-[var(--ink)]/40 font-[family-name:var(--font-mono)] whitespace-nowrap">
                    {t(`items.${key}.date`)}
                  </span>
                </div>

                <ul className="mt-2 flex flex-col gap-1.5">
                  {[0, 1, 2].map((bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="text-base text-[var(--ink)]/60 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-[var(--accent)]/60"
                    >
                      {t(`items.${key}.bullets.${bulletIdx}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
