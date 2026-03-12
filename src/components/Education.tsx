"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const educationKeys = [
  "udg",
  "oracle",
  "oracleAcademy",
  "tcs",
  "toefl",
  "certs",
] as const;

const activeItems = new Set(["udg", "oracleAcademy", "tcs"]);

export default function Education() {
  const t = useTranslations("education");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="education"
      className="py-24 md:py-32 px-6 bg-[var(--surface-1)]"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto">
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
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />

          <div className="space-y-8">
            {educationKeys.map((key, i) => {
              const isActive = activeItems.has(key);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative pl-8"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                      isActive
                        ? "bg-[var(--accent)] border-[var(--accent)]"
                        : "bg-[var(--surface-1)] border-[var(--border)]"
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h3 className="font-bold font-[family-name:var(--font-heading)] text-xl">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="text-base text-[var(--accent)] font-medium">
                        {t(`items.${key}.org`)}
                      </p>
                      <p className="text-base text-[var(--ink)]/50 mt-0.5">
                        {t(`items.${key}.detail`)}
                      </p>
                    </div>
                    <span className="text-sm text-[var(--ink)]/40 font-[family-name:var(--font-code)] whitespace-nowrap">
                      {t(`items.${key}.date`)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
