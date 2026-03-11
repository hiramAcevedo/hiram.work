"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => obs.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? ("dark" as const)
    : ("light" as const);
}

function getServerSnapshot() {
  return "light" as const;
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
