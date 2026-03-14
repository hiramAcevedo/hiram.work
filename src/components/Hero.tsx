"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, Linkedin, Download, ArrowDown } from "lucide-react";
import LogoHA, { type LogoPhase } from "./LogoHA";

/* ── timing constants (seconds) ─────────────────────────── */
const DRAW_DURATION = 1.8;        // flyIn animations complete (last flyIn: 0.99 delay + 0.7 dur)
const SLIDE_DURATION = 0.7;       // logo slides left
const POST_SLIDE_PAUSE = 0.15;    // pause before impact
const DESTRUCT_WAIT = 0.1;        // pause before destruction
const REGEN_WAIT = 0.4;           // pause before regeneration
const LOOP_WAIT = 0.3;            // pause before ticker

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const cvPath = locale === "es" ? "/cv/Hiram_Acevedo_CV_ES.pdf" : "/cv/Hiram_Acevedo_CV.pdf";
  const [split, setSplit] = useState(false);
  const [logoPhase, setLogoPhase] = useState<LogoPhase>("drawing");
  const [showInfo, setShowInfo] = useState(false);

  // Phase 1: After drawing, start the slide
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplit(true); // triggers layout animation (center → left)
      // After slide completes, trigger impact
      setTimeout(() => {
        setLogoPhase("impact");
      }, (SLIDE_DURATION + POST_SLIDE_PAUSE) * 1000);
    }, DRAW_DURATION * 1000);
    return () => clearTimeout(timer);
  }, []);

  // Phase callbacks from LogoHA
  const handlePhaseComplete = useCallback((phase: LogoPhase) => {
    if (phase === "impact") {
      // After shake, start destruction
      setTimeout(() => setLogoPhase("destruct"), DESTRUCT_WAIT * 1000);
    }
    if (phase === "destruct") {
      // Show info panel + start regen
      setShowInfo(true);
      setTimeout(() => setLogoPhase("regen"), REGEN_WAIT * 1000);
    }
    if (phase === "regen") {
      // Start the ticker loop
      setTimeout(() => setLogoPhase("loop"), LOOP_WAIT * 1000);
    }
  }, []);

  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <LayoutGroup>
        <motion.div
          layout
          className={`max-w-5xl w-full flex items-center gap-8 lg:gap-16 ${
            split
              ? "flex-col lg:flex-row lg:justify-start lg:items-start"
              : "flex-col lg:flex-row lg:justify-center"
          }`}
          transition={{ duration: SLIDE_DURATION, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo + ticker column — centered while drawing, flows left when split */}
          <motion.div
            layout
            transition={{ duration: SLIDE_DURATION, ease: [0.22, 1, 0.36, 1] }}
            className="w-[300px] md:w-[380px] lg:w-[513px] shrink-0"
          >
            <LogoHA phase={logoPhase} onPhaseComplete={handlePhaseComplete} />
            {/* Skill ticker — appears under logo where text used to be */}
            <AnimatePresence>
              {logoPhase === "loop" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="-mt-[44px]"
                >
                  <SkillTicker />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info panel — appears after destruction */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 flex-1"
              >
                <div>
                  {/* Hidden on mobile — logo wordmark already has the name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight"
                  >
                    {t("name")}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-3xl text-[var(--accent)] font-semibold font-[family-name:var(--font-heading)] lg:mt-2"
                  >
                    {t("subtitle")}
                  </motion.p>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="text-xl md:text-2xl text-[var(--ink)]/60 max-w-md leading-relaxed"
                >
                  {t("tagline")}
                </motion.p>

                {/* Primary CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-1"
                >
                  <a
                    href={cvPath}
                    download
                    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity font-[family-name:var(--font-heading)]"
                  >
                    <Download size={16} />
                    {t("downloadCV")}
                  </a>
                  <a
                    href="https://linkedin.com/in/hiram-acevedo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] rounded-lg font-semibold hover:bg-[var(--surface-1)] hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all font-[family-name:var(--font-heading)]"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/hiramAcevedo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] rounded-lg font-semibold hover:bg-[var(--surface-1)] hover:border-[var(--ink)] transition-all font-[family-name:var(--font-heading)]"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </motion.div>

                {/* Secondary links */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="text-base text-[var(--ink)]/40 mt-1"
                >
                  <a
                    href="mailto:hiram@hiram.work"
                    className="hover:text-[var(--ink)] transition-colors"
                  >
                    hiram@hiram.work
                  </a>
                  {" · "}
                  <a
                    href="https://hiramlab.center"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    hiramlab.center
                  </a>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showInfo ? 1 : 0 }}
        transition={{ delay: showInfo ? 1.0 : 0, duration: 0.5 }}
        className="absolute bottom-6 md:bottom-12"
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

/* ── Skill Ticker (rotating tech keywords) ─────────────── */

const SKILLS: { label: string; href?: string }[] = [
  { label: "Next.js" },
  { label: "React" },
  { label: "TypeScript" },
  { label: "Java" },
  { label: "Spring Boot" },
  { label: "Python" },
  { label: "FastAPI" },
  { label: "AI / LLM" },
  { label: "Node.js" },
  { label: "PostgreSQL" },
  { label: "Docker" },
  { label: "Tailwind CSS" },
  { label: "PHP" },
  { label: "HTML / CSS" },
  { label: "Git" },
  { label: "REST APIs" },
  { label: "Oracle DB" },
  { label: "MongoDB" },
  { label: "Framer Motion" },
  { label: "HiramLab", href: "https://hiramlab.center" },
];

const TICKER_ITEMS = [...SKILLS, ...SKILLS];

function SkillTicker() {
  return (
    <div
      style={{
        overflow: "hidden",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "max-content",
          animation: "tickerScroll 25s linear infinite",
        }}
      >
        {TICKER_ITEMS.map((skill, i) => {
          const Tag = skill.href ? "a" : "span";
          const extraProps = skill.href
            ? { href: skill.href, target: "_blank" as const, rel: "noopener noreferrer" }
            : {};
          return (
            <Tag
              key={`${skill.label}-${i}`}
              {...extraProps}
              style={{
                display: "inline-block",
                padding: "6px 16px",
                fontSize: "16px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                borderRadius: "3px",
                border: `1px solid ${skill.href ? "var(--accent)" : "var(--border)"}`,
                backgroundColor: skill.href ? "transparent" : "var(--ink)",
                color: skill.href ? "var(--accent)" : "var(--bg)",
                opacity: 1,
                cursor: skill.href ? "pointer" : "default",
                textDecoration: "none",
                transition: "opacity 0.2s, border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--accent)";
                if (!skill.href) {
                  el.style.backgroundColor = "var(--accent)";
                  el.style.color = "#FFFFFF";
                } else {
                  el.style.color = "var(--accent)";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                const el = e.currentTarget;
                el.style.borderColor = skill.href ? "var(--accent)" : "var(--border)";
                if (!skill.href) {
                  el.style.backgroundColor = "var(--ink)";
                  el.style.color = "var(--bg)";
                } else {
                  el.style.color = "var(--accent)";
                }
              }}
            >
              {skill.label}
            </Tag>
          );
        })}
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
