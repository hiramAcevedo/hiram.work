"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="h-9 w-9 flex items-center justify-center text-xs font-semibold rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors font-[family-name:var(--font-code)]"
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
