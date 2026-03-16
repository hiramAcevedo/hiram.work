"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, Linkedin, Download, ArrowDown } from "lucide-react";
import LogoHA, { type LogoPhase } from "./LogoHA";

/* ── timing constants (seconds) ─────────────────────────── */
const DRAW_DURATION = 1.8;        // flyIn animations complete (last flyIn: 0.99 delay + 0.7 dur)
const SLIDE_DURATION = 0.7;       // logo slides left
const POST_SLIDE_PAUSE = 0.3;     // pause after slide before showing content

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const cvPath = locale === "es" ? "/cv/Hiram_Acevedo_CV_ES.pdf" : "/cv/Hiram_Acevedo_CV.pdf";
  const [split, setSplit] = useState(false);
  const [logoPhase, setLogoPhase] = useState<LogoPhase>("drawing");
  const [showInfo, setShowInfo] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [mobileShiftUp, setMobileShiftUp] = useState(false);  // mobile step 1: rect lifts away from text
  const [mobileDetach, setMobileDetach] = useState(false);    // mobile step 2: text blurs, balls fall

  // Detect lg breakpoint for directional animations
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // After drawing completes: orchestrate the transition
  useEffect(() => {
    const timer = setTimeout(() => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        // Desktop: split → slide left → showInfo → layoutId
        setSplit(true);
        setTimeout(() => {
          setShowInfo(true);
          setLogoPhase("loop");
        }, (SLIDE_DURATION + POST_SLIDE_PAUSE) * 1000);
      } else {
        // Mobile choreography — 3 staggered steps with VISIBLE separation:
        // 1) Rect (elements 1-10) lifts up BIG inside SVG — text/balls stay put
        setMobileShiftUp(true);
        // 2) 0ms: text starts fading immediately with rect lift
        setMobileDetach(true);
        // 3) 100ms: layout shift + reset SVG offset (they cancel out for smooth settle)
        setTimeout(() => {
          setMobileShiftUp(false);   // rect returns to SVG origin (moves down)
          setSplit(true);
          setShowInfo(true);         // layout shifts container up (moves up)
          setLogoPhase("loop");      // ↑ these two roughly cancel → rect stays put
        }, 100);
      }
    }, DRAW_DURATION * 1000);
    return () => clearTimeout(timer);
  }, []);

  /* ── mobile vs desktop: different animation triggers ──
     Desktop: split → hideText + floating H1 + slide left → showInfo → layoutId flies to panel
     Mobile:  mobileShiftUp (rect lifts in SVG) → 250ms → mobileDetach (text blurs, balls fall)
              → 550ms → showInfo (layout shift) + mobileShiftUp reset (cancel → rect stays)
  */
  const hideLogoText = isLg ? split : mobileDetach;

  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <LayoutGroup>
        <motion.div
          layout
          className={`max-w-5xl w-full flex items-center gap-5 md:gap-8 lg:gap-16 ${
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
            <LogoHA phase={logoPhase} hideText={hideLogoText} desktopSlide={isLg} mobileShiftUp={mobileShiftUp} />

            {/* Desktop only: HTML takeover of name — replaces SVG text,
                then layoutId animates it to the info panel when showInfo fires */}
            {isLg && split && !showInfo && (
              <motion.h1
                layoutId="hero-name"
                initial={{ filter: "blur(6px)", opacity: 0.7 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{
                  filter: { duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.3 },
                  layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
                className="text-[3.5rem] font-normal font-[family-name:var(--font-logo)] leading-tight text-[var(--ink)] -mt-[84px]"
              >
                {t("name")}
              </motion.h1>
            )}

            {/* Skill ticker — appears under logo where text used to be */}
            <AnimatePresence>
              {logoPhase === "loop" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="-mt-[36px] md:-mt-[44px]"
                >
                  <SkillTicker />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info panel — name flies in via layoutId, rest fades in */}
          {showInfo && (
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 md:gap-5 flex-1">
              <div>
                <motion.h1
                  layoutId={isLg ? "hero-name" : undefined}
                  initial={isLg
                    ? { filter: "blur(4px)" }
                    : { opacity: 0, filter: "blur(8px)" }
                  }
                  animate={isLg
                    ? { filter: "blur(0px)" }
                    : { opacity: 1, filter: "blur(0px)" }
                  }
                  transition={isLg
                    ? {
                        filter: { duration: 0.35, ease: "easeOut" },
                        layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                      }
                    : {
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.1,      // SVG text started blurring 250ms ago, nearly gone
                      }
                  }
                  className="text-4xl md:text-5xl lg:text-7xl font-normal font-[family-name:var(--font-logo)] leading-tight"
                >
                  {t("name")}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-xl md:text-3xl text-[var(--accent)] font-semibold font-[family-name:var(--font-heading)] lg:mt-2"
                >
                  {t("subtitle")}
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base md:text-2xl text-[var(--ink)]/60 max-w-md leading-snug md:leading-relaxed"
              >
                {t("tagline")}
              </motion.p>

              {/* Primary CTAs — mobile: CV | stacked socials · desktop: 3 inline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-3 mt-1"
              >
                {/* CV Download — always full */}
                <a
                  href={cvPath}
                  download
                  className="flex items-center gap-2 px-5 py-2.5 md:py-2.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity font-[family-name:var(--font-heading)]"
                >
                  <Download size={16} />
                  {t("downloadCV")}
                </a>

                {/* Divider — mobile only */}
                <div className="w-px h-9 bg-[var(--border)] md:hidden" />

                {/* Social buttons — stacked on mobile, inline on desktop */}
                <div className="flex flex-col md:flex-row gap-1.5 md:gap-3">
                  <a
                    href="https://linkedin.com/in/hiram-acevedo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 border border-[var(--border)] rounded-lg text-sm md:text-base font-semibold hover:bg-[var(--surface-1)] hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all font-[family-name:var(--font-heading)]"
                  >
                    <Linkedin size={14} className="md:w-4 md:h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/hiramAcevedo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 border border-[var(--border)] rounded-lg text-sm md:text-base font-semibold hover:bg-[var(--surface-1)] hover:border-[var(--ink)] transition-all font-[family-name:var(--font-heading)]"
                  >
                    <Github size={14} className="md:w-4 md:h-4" />
                    GitHub
                  </a>
                </div>
              </motion.div>

              {/* Secondary links */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="text-sm md:text-base text-[var(--ink)]/40 mt-0 md:mt-1"
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
            </div>
          )}
        </motion.div>
      </LayoutGroup>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showInfo ? 1 : 0 }}
        transition={{ delay: showInfo ? 1.0 : 0, duration: 0.5 }}
        className="absolute bottom-3 md:bottom-12"
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
              className="ticker-chip"
              style={{
                display: "inline-block",
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
        .ticker-chip {
          padding: 4px 10px;
          font-size: 13px;
        }
        @media (min-width: 768px) {
          .ticker-chip {
            padding: 6px 16px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
