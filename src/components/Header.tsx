"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitch from "./LocaleSwitch";
import { useTheme } from "@/hooks/useTheme";

const navItems = ["about", "experience", "education", "contact"] as const;

export default function Header() {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSrc =
    theme === "dark"
      ? "/assets/just-logo-dark.svg"
      : "/assets/just-logo-light.svg";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / site name — logo slides in from right of text */}
        <a href="#" aria-label="Home" className="relative flex items-center h-10" style={{ minWidth: 130 }}>
          {/* "hiram.work" text — slides right when logo arrives */}
          <span
            className={`absolute whitespace-nowrap text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--ink)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pastHero ? "translate-x-14 opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            hiram.work
          </span>
          {/* Logo icon — slides in from right to take text's place */}
          <div
            className={`absolute w-12 h-12 -top-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pastHero ? "translate-x-0 opacity-100" : "translate-x-28 opacity-0"
            }`}
          >
            <img
              src={logoSrc}
              alt="HA"
              className="h-12 w-12"
            />
          </div>
        </a>

        {/* Desktop: nav + toggles all pushed right */}
        <div className="hidden md:flex items-center justify-end gap-6 mr-[-23px]">
          {/* Download CV — slide-in before nav items */}
          <div className="overflow-hidden rounded-lg">
            <a
              href="/cv/Hiram_Acevedo_CV.pdf"
              download
              className={`flex items-center gap-2 h-9 px-4 bg-[var(--accent)] text-white text-sm font-semibold rounded-lg hover:opacity-90 font-[family-name:var(--font-heading)] whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                pastHero ? "translate-x-0" : "translate-x-[110%]"
              }`}
            >
              <Download size={14} />
              {t("downloadCV")}
            </a>
          </div>

          {/* Nav items */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              // Insert the Projects dropdown after "education"
              if (item === "contact") {
                return (
                  <span key="projects-then-contact" className="contents">
                    {/* Projects dropdown: work + stack + HiramLab */}
                    <div className="relative group">
                      <a
                        href="#work"
                        className="relative flex items-center gap-1 text-base font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors font-[family-name:var(--font-heading)] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--ink)] group-hover:after:w-full after:transition-all after:duration-200"
                      >
                        {t("work")}
                        <ChevronDown size={14} className="mt-px transition-transform duration-200 group-hover:rotate-180" />
                      </a>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg min-w-[180px] py-2 backdrop-blur-lg">
                          <a
                            href="#work"
                            className="block px-4 py-2 text-sm font-semibold text-[var(--ink)]/80 hover:text-[var(--ink)] hover:bg-[var(--surface-1)] transition-colors font-[family-name:var(--font-heading)]"
                          >
                            {t("work")}
                          </a>
                          <a
                            href="#stack"
                            className="block px-4 py-2 text-sm font-semibold text-[var(--ink)]/80 hover:text-[var(--ink)] hover:bg-[var(--surface-1)] transition-colors font-[family-name:var(--font-heading)]"
                          >
                            {t("stack")}
                          </a>
                          <div className="my-1 mx-3 border-t border-[var(--border)]" />
                          <a
                            href="https://hiramlab.center"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--surface-1)] transition-colors font-[family-name:var(--font-heading)]"
                          >
                            {t("lab")} ↗
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Contact */}
                    <a
                      href="#contact"
                      className="relative text-base font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors font-[family-name:var(--font-heading)] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--ink)] hover:after:w-full after:transition-all after:duration-200"
                    >
                      {t("contact")}
                    </a>
                  </span>
                );
              }
              return (
                <a
                  key={item}
                  href={`#${item}`}
                  className="relative text-base font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors font-[family-name:var(--font-heading)] pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--ink)] hover:after:w-full after:transition-all after:duration-200"
                >
                  {t(item)}
                </a>
              );
            })}
          </nav>

          {/* Toggles */}
          <div className="flex items-center gap-3">
            <LocaleSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {["about", "experience", "education"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                    }, 350);
                  }}
                  className="text-lg font-medium font-[family-name:var(--font-heading)]"
                >
                  {t(item)}
                </a>
              ))}
              {/* Projects group */}
              <div className="flex flex-col gap-2">
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }, 350);
                  }}
                  className="text-lg font-medium font-[family-name:var(--font-heading)]"
                >
                  {t("work")}
                </a>
                <a
                  href="#stack"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" });
                    }, 350);
                  }}
                  className="pl-4 text-base font-medium text-[var(--ink)]/60 font-[family-name:var(--font-heading)]"
                >
                  {t("stack")}
                </a>
                <a
                  href="https://hiramlab.center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pl-4 text-base font-medium text-[var(--accent)] font-[family-name:var(--font-heading)]"
                >
                  {t("lab")} ↗
                </a>
              </div>
              {["contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                    }, 350);
                  }}
                  className="text-lg font-medium font-[family-name:var(--font-heading)]"
                >
                  {t(item)}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                <LocaleSwitch />
                <ThemeToggle />
                <a
                  href="/cv/Hiram_Acevedo_CV.pdf"
                  download
                  className="flex items-center gap-2 h-9 px-4 bg-[var(--accent)] text-white text-sm font-semibold rounded-lg font-[family-name:var(--font-heading)]"
                >
                  <Download size={14} />
                  {t("downloadCV")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
