"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
    <footer className="border-t border-[var(--accent)] bg-[var(--surface-1)]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={
              theme === "dark"
                ? "/assets/just-logo-dark.svg"
                : "/assets/just-logo-light.svg"
            }
            alt="HA"
            width={24}
            height={24}
          />
          <span className="text-sm text-[var(--ink)]/50">
            {t("copyright")}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-[var(--ink)]/40">
          <a
            href="https://github.com/hiramAcevedo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/hiram-acevedo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://hiramlab.center"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            HiramLab
          </a>
        </div>
      </div>
    </footer>
  );
}
