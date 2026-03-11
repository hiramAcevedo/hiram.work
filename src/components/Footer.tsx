"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

export default function Footer() {
  const t = useTranslations("footer");
  const theme = useTheme();

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
