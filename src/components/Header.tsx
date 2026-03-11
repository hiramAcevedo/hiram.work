"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitch from "./LocaleSwitch";
import Image from "next/image";

const navItems = ["about", "work", "stack", "education", "contact"] as const;

export default function Header() {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const check = () => {
      setTheme(
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light"
      );
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center">
        <a href="#" aria-label="Home">
          <Image
            src={
              theme === "dark"
                ? "/assets/just-logo-dark.svg"
                : "/assets/just-logo-light.svg"
            }
            alt="HA"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </a>

        <nav className="hidden md:flex items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm font-medium text-[var(--ink)]/70 hover:text-[var(--ink)] transition-colors font-[family-name:var(--font-heading)]"
            >
              {t(item)}
            </a>
          ))}
          <a
            href="https://hiramlab.center"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity font-[family-name:var(--font-heading)]"
          >
            {t("lab")}
          </a>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-3">
          <LocaleSwitch />
          <ThemeToggle />
          <a
            href="/cv/Hiram_Acevedo_CV.pdf"
            download
            className="flex items-center gap-2 h-9 px-4 bg-[var(--accent)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity font-[family-name:var(--font-heading)]"
          >
            <Download size={14} />
            {t("downloadCV")}
          </a>
        </div>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
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
              <a
                href="https://hiramlab.center"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-[var(--accent)] font-[family-name:var(--font-heading)]"
              >
                {t("lab")}
              </a>
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
