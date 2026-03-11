"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

export default function LocaleSuggester() {
  const locale = useLocale();
  const t = useTranslations("localeSuggester");
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (getCookie("locale-dismissed")) return;
    if (getCookie("preferred-locale")) return;

    const browserLang = navigator.language.toLowerCase();
    const isSpanishBrowser = browserLang.startsWith("es");
    const isEnglishBrowser = browserLang.startsWith("en");

    if (locale === "en" && isSpanishBrowser) setShow(true);
    if (locale === "es" && isEnglishBrowser) setShow(true);
  }, [locale]);

  const handleSwitch = () => {
    const target = locale === "en" ? "es" : "en";
    setCookie("preferred-locale", target, 365);
    setShow(false);
    router.replace(pathname, { locale: target });
  };

  const handleDismiss = () => {
    setCookie("locale-dismissed", "true", 30);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 z-50 flex items-center gap-3 px-4 py-3 bg-[var(--surface-1)] border border-[var(--border)] rounded-xl shadow-lg max-w-[280px]"
        >
          <Globe size={16} className="text-[var(--ink)]/50 shrink-0" />
          <span className="text-sm">
            {locale === "en" ? t("suggest") : t("suggestEn")}
          </span>
          <button
            onClick={handleSwitch}
            className="px-3 py-1 text-xs font-semibold bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {locale === "en" ? t("switch") : t("switchEn")}
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="text-[var(--ink)]/30 hover:text-[var(--ink)] transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
